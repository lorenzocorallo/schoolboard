use serde::{Serialize, Deserialize, Deserializer};
use serde_json::Value;

fn deserialize_null_default<'de, D, T>(deserializer: D) -> Result<T, D::Error>
where
    T: Default + Deserialize<'de>,
    D: Deserializer<'de>,
{
    let opt = Option::deserialize(deserializer)?;
    Ok(opt.unwrap_or_default())
}

#[derive(Debug, Deserialize, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct Subject {
    #[serde(rename(deserialize = "abbreviazione"))]
    pub short: String,

    #[serde(rename(deserialize = "faMedia"))]
    pub count_in_avg: bool,

    #[serde(rename(deserialize = "materia"))]
    pub name: String,

    #[serde(rename(deserialize = "pk"))]
    pub id: String
}

#[derive(Debug, Deserialize, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct Period {
    #[serde(rename(deserialize = "dataInizio"))]
    pub start_date: String,

    #[serde(rename(deserialize = "dataFine"))]
    pub end_date: String,

    #[serde(rename(deserialize = "isScrutinioFinale"))]
    pub final_period: bool,

    #[serde(rename(deserialize = "pkPeriodo"))]
    pub id: String,
}

#[derive(Debug, Deserialize, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct Memos {
    #[serde(rename(deserialize = "datEvento"))]
    pub date: String,

    #[serde(rename(deserialize = "desAnnotazioni"))]
    pub title: String,

    #[serde(rename(deserialize = "docente"))]
    pub teacher_displayname: String,

    #[serde(rename(deserialize = "pkDocente"))]
    pub teacher_id: String,

    #[serde(rename(deserialize = "oraInizio"))]
    pub time_start: String,

    #[serde(rename(deserialize = "oraFine"))]
    pub time_end: String,
}


#[derive(Debug, Deserialize, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct Mark {
    #[serde(rename(deserialize = "pk"))]
    pub id: String,
    
    #[serde(rename(deserialize = "datEvento"))]
    pub date: String,

    #[serde(rename(deserialize = "valore"))]
    pub value: String,

    #[serde(rename(deserialize = "pkDocente"))]
    pub teacher_id: String,

    #[serde(rename(deserialize = "pkMateria"))]
    pub subject_id: String,

    #[serde(rename(deserialize = "descrizioneProva"))]
    pub desc: String,

    #[serde(rename(deserialize = "numMedia"))]
    pub multiplier: f32,
}

#[derive(Debug, Deserialize, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct Teacher {
    #[serde(rename(deserialize = "pk"))]
    pub id: String,
    
    #[serde(rename(deserialize = "desCognome"))]
    pub surname: String,
    
    #[serde(rename(deserialize = "desNome"))]
    pub firstname: String,
    
    #[serde(rename(deserialize = "desEmail"))]
    #[serde(deserialize_with = "deserialize_null_default")]
    pub email: String,
}

#[derive(Debug, Deserialize, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct Homework {
    #[serde(rename(deserialize = "compito"))]
    pub desc: String,

    #[serde(rename(deserialize = "dataConsegna"))]
    pub deadline: String,
}

#[derive(Debug, Deserialize, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct Class {
    #[serde(rename(deserialize = "pk"))]
    pub id: String,
    
    #[serde(rename(deserialize = "datGiorno"))]
    pub date: String,

    #[serde(rename(deserialize = "pkMateria"))]
    pub subject_id: String,

    #[serde(rename(deserialize = "pkDocente"))]
    pub teacher_id: String,

    #[serde(rename(deserialize = "docente"))]
    pub teacher_shortname: String,
    
    #[serde(rename(deserialize = "ora"))]
    pub hour_num: i8,

    #[serde(rename(deserialize = "attivita"))]
    #[serde(deserialize_with = "deserialize_null_default")]
    pub desc: String,

    #[serde(rename(deserialize = "compiti"))]
    #[serde(deserialize_with = "deserialize_null_default")]
    pub homeworks: Vec<Homework>,
}

#[derive(Debug, Deserialize, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct Notes {
    #[serde(rename(deserialize = "pk"))]
    pub id: String,
    
    #[serde(rename(deserialize = "datNota"))]
    pub date: String,
    
    #[serde(rename(deserialize = "flgAnnullata"))]
    pub canceled: bool,
    
    #[serde(rename(deserialize = "pkDocente"))]
    pub teacher_id: String,
    
    #[serde(rename(deserialize = "desDescrizione"))]
    pub desc: String,
    
    #[serde(rename(deserialize = "isVisualizzata"))]
    pub is_checked: bool,
    
    #[serde(rename(deserialize = "oraNota"))]
    pub time: String,
    
    #[serde(rename(deserialize = "flgTipo"))]
    pub type_flag: char,
}

#[derive(Debug, Deserialize, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct Appeal {
    #[serde(rename(deserialize = "pk"))]
    pub id: String,
    
    #[serde(rename(deserialize = "data"))]
    pub date: String,

    #[serde(rename(deserialize = "giustificata"))]
    pub is_justified: char,

    #[serde(rename(deserialize = "commentoGiustificazione"))]
    #[serde(deserialize_with = "deserialize_null_default")]
    pub justification: String,

    #[serde(rename(deserialize = "daGiustificare"))]
    pub need_justification: bool,

    #[serde(rename(deserialize = "docente"))]
    pub teacher_shortname: String,

    #[serde(rename(deserialize = "nota"))]
    pub desc: String,
}

#[derive(Debug, Deserialize, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct DashboardData {
    #[serde(rename(deserialize = "mediaGenerale"))]
    pub avg: f32,

    #[serde(rename(deserialize = "listaMaterie"))]
    pub subjects: Vec<Subject>,
    
    #[serde(rename(deserialize = "listaPeriodi"))]
    pub periods: Vec<Period>, 
    
    #[serde(rename(deserialize = "promemoria"))]
    pub memos: Vec<Memos>, 
    
    #[serde(rename(deserialize = "listaDocentiClasse"))]
    pub teachers: Vec<Teacher>, 
    
    #[serde(rename(deserialize = "registro"))]
    pub classes: Vec<Class>, 
    
    #[serde(rename(deserialize = "noteDisciplinari"))]
    pub notes: Vec<Notes>, 
    
    #[serde(rename(deserialize = "appello"))]
    pub appeal: Vec<Appeal>, 

    #[serde(rename(deserialize = "bacheca"))]
    pub news: Value
}

#[derive(Debug, Deserialize, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct DataObj {
    #[serde(rename(deserialize = "dati"))]
    pub data: Vec<DashboardData>
}

#[derive(Debug, Deserialize, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct DashboardJson {
    pub data: DataObj
}
