use anyhow::{Result, anyhow};
use chrono::prelude::*;
use std::collections::HashMap;
use reqwest::{self, redirect::Policy, Client, header::{HeaderMap, self}};
use rand::distributions::{Alphanumeric, DistString};
use hex;
use base64;
use sha2::{Sha256, Digest};
use serde::{Serialize, Deserialize};

use base64::{Engine as _, engine::{self, general_purpose}, alphabet};

use crate::data::DashboardJson;
const CUSTOM_ENGINE: engine::GeneralPurpose =
engine::GeneralPurpose::new(&alphabet::URL_SAFE, general_purpose::NO_PAD);

fn base64_encode(bytes: &[u8]) -> String {
    let mut buf = String::new();
    CUSTOM_ENGINE.encode_string(bytes, &mut buf);
    
    return buf;
}

fn random_str(len: usize) -> String {
    Alphanumeric.sample_string(&mut rand::thread_rng(), len)
}

const CHALLENGE_URL: &'static str = "https://auth.portaleargo.it/oauth2/auth";
const LOGIN_URL: &'static str = "https://www.portaleargo.it/auth/sso/login";
const TOKEN_URL: &'static str = "https://auth.portaleargo.it/oauth2/token";
const REDIRECT_URI: &'static str = "it.argosoft.didup.famiglia.new://login-callback";
const CLIENT_ID: &'static str = "72fd6dea-d0ab-4bb9-8eaa-3ac24c84886c";
const USER_AGENT: &'static str = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36 ";
const ENDPOINT: &'static str = "https://www.portaleargo.it/appfamiglia/api/rest/";

fn get_location(res: &reqwest::Response) -> Result<String> {
    if let Some(l) = res.headers().get("Location") {
        return Ok(l.to_str().unwrap().to_string());
    } else {
        return Err(anyhow!("Wrong credentials (Location not found)"));
    }
}

#[derive(Debug)]
struct LoginChallenge {
    login_challenge: String,
    code_verifier: String,
}

async fn get_login_challenge(client: &Client) -> Result<LoginChallenge> {
    let code_verifier = hex::encode(random_str(64));
    let sha = Sha256::digest(code_verifier.to_string());

    let code_challenge = base64_encode(&sha); 
    let state = base64_encode(random_str(32).as_bytes());

    let mut params = HashMap::new();
    params.insert("redirect_uri", REDIRECT_URI); 
    params.insert("client_id", CLIENT_ID); 
    params.insert("response_type", "code"); 
    params.insert("prompt", "login"); 
    params.insert("state", state.as_str()); 
    params.insert("scope", "openid offline profile user.roles argo"); 
    params.insert("code_challenge", &code_challenge); 
    params.insert("code_challenge_method", "S256"); 

    let res = client.get(CHALLENGE_URL).query(&params).send().await?;
    let hs = res.headers();
    
    let location = hs.get("location").unwrap();
    let login_challenge = location.to_str()?.split_once("login_challenge=").unwrap().1.to_string();
    // Ok(login_challenge.to_string())
    Ok(LoginChallenge {
        login_challenge,
        code_verifier,
    })
}


#[derive(Serialize, Deserialize, Debug)] 
struct Tokens {
    #[serde(default)]
    login_token: String,
    access_token: String,
    refresh_token: String,
    id_token: String,
    token_type: String,
    scope: String,
    expires_in: i32
}


fn get_url(path: &str) -> String {
    return ENDPOINT.to_string() + &path.to_string()
}

pub struct Argo {
    tokens: Option<Tokens>,
    school_code: String,
}

impl Argo {
    pub fn new() -> Self {
        return Argo { tokens: None, school_code: String::new() }
    }
    pub async fn login(&mut self, school_code: &str, username: &str, password: &str) -> Result<()> {
        let client = reqwest::ClientBuilder::new()
            .redirect(Policy::none())
            .cookie_store(true)
            .build()?;

        let lc = get_login_challenge(&client).await?;

        let mut data = HashMap::new();
        data.insert("challenge", lc.login_challenge.as_str());
        data.insert("client_id", CLIENT_ID);
        data.insert("prefill", "true");
        data.insert("famiglia_customer_code", school_code);
        data.insert("username", username);
        data.insert("password", password);
        data.insert("login", "true");


        let res = client.post(LOGIN_URL)
            .form(&mut data)
            .send().await?;
        let mut location = get_location(&res)?;

        let mut code: Option<String> = None;
        while code.is_none() {
            let res = client.get(location).send().await?;
            location = get_location(&res)?;
            if let Some(sp1) = location.split_once("code=") {
                if let Some(sp2) = sp1.1.split_once("&") {
                    code = Some(sp2.0.to_string());
                } 
            }
        }
        if code.is_none() {
            return Err(anyhow!("Wrong credentials"));
        }
        let code = code.unwrap();
        data.clear();
        data.insert("code", &code);
        data.insert("grant_type", "authorization_code");
        data.insert("redirect_uri", REDIRECT_URI);
        data.insert("code_verifier", lc.code_verifier.as_str());
        data.insert("client_id", CLIENT_ID);

        let mut tokens = client.post(TOKEN_URL)
            .form(&mut data)
            .send().await?
            .json::<Tokens>()
        .await?;

        let mut headers = HeaderMap::new();
        headers.insert("User-Agent", USER_AGENT.parse().unwrap());
        headers.insert("Content-Type", "Application/json".parse().unwrap());
        headers.insert("Authorization", ("Bearer ".to_string() + &tokens.access_token.to_string()).parse().unwrap());
        headers.insert("Accept", "Application/json".parse().unwrap());

        let json = serde_json::json!({
            "clientID": base64_encode(random_str(64).as_bytes()),
            "lista-x-auth-token": [],
            "x-auth-token-corrente": null,
            "lista-opzioni-notifiche": {}
        });
        let res = client.post(ENDPOINT.to_string() + "login")
            .headers(headers)
            .json(&json)
            .send().await?
            .json::<serde_json::Value>().await?;
        // .json().await?;

        // retrieve only the token field on the big json returned by api, without
        // defining multiple structs
        // {data: [{ token: string }]}
        let token = res.get("data").unwrap().get(0).unwrap().get("token").unwrap();
        tokens.login_token = token.to_owned().to_string().replace("\"", "");

        self.tokens = Some(tokens);
        self.school_code = school_code.to_string();
        Ok(())
    }

    pub async fn get_dashboard(&mut self) -> Result<()> {
        let client = reqwest::Client::new();    
        let date: DateTime<Local>= Local::now();
        let date = format!("{}", date.format("%Y-%m-%d %H:%M:%S"));
        let json = serde_json::json!({
            "dataultimoaggiornamento": date.to_string(),
        });
        let data = client.post(get_url("dashboard/dashboard"))
            .headers(self.get_headers())
            .json(&json)
            .send().await?
            .json::<DashboardJson>().await?;

        let data = &data.data.data[0];
        println!("{:#?}", data.classes.iter().map(|c| &c.homeworks).filter(|v| v.len() > 0).flatten().filter(|v| v.deadline == "2023-01-27").collect::<Vec<_>>());
        println!("{:#?}", data.news);

        Ok(())
    }

    fn get_headers(&self) -> HeaderMap {
        let mut h = HeaderMap::new();
        if let Some(tokens) = &self.tokens {
            h.insert(header::CONTENT_TYPE, "application/json".parse().unwrap());
            h.insert(header::AUTHORIZATION, ("Bearer ".to_string() + &tokens.access_token).parse().unwrap());
            h.insert(header::ACCEPT, "application/json".parse().unwrap());
            h.insert("x-cod-min", self.school_code.parse().unwrap());
            h.insert("x-auth-token", tokens.login_token.to_string().parse().unwrap());
        }
        return h;
    }
}
