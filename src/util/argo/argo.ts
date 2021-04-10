import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { prettyTeacher, checkMark, getArgoHeaders, getSubjects } from './util';
import {
  ArgoArgomento,
  ArgoCompito,
  ArgoPromemoria,
  ArgoStudente,
  ArgoVoto,
  ArgoOggiCompito,
  ArgoOggiVoto,
  ArgoOggiArgomento,
  ArgoOggiPromemoria,
  ArgoOggiCircolare,
  ArgoAssenza,
} from '../../models/Argo';
import Student, {
  Homework,
  Mark,
  Topic,
  Memo,
  News,
  Today,
} from '../../models/Student';
import { headers as argoHeaders, endpoint as argoEndpoint } from './api';
import { orderArrayByDate } from '../dates';

export const argoLogin = async (
  school_code: string,
  username: string,
  password: string
) => {
  const response = await axios.get(`${argoEndpoint}/login`, {
    headers: {
      ...argoHeaders,
      'x-cod-min': school_code,
      'x-user-id': username,
      'x-pwd': password,
    },
  });

  if (response.status !== 200) throw new Error('Authentication failed');
  const data = await response.data;
  const { token }: { token: string } = data;
  localStorage.setItem('auth-token', token);
  localStorage.setItem('school-code', school_code);

  return { token, schoolCode: school_code };
};

export const fetchUserData = async (school_code: string, token: string) => {
  const response = await axios.get(`${argoEndpoint}/schede`, {
    headers: {
      ...argoHeaders,
      'x-cod-min': school_code,
      'x-auth-token': token,
    },
  });

  const {
    alunno,
    desScuola,
    desDenominazione,
    desCorso,
    annoScolastico,
  } = response.data[0];
  const { desNome, desCognome, flgSesso } = alunno;
  const info: ArgoStudente = {
    firstName: desNome,
    lastName: desCognome,
    gender: flgSesso,
    school: desScuola,
    class: `${desDenominazione}${desCorso}`,
  };
  const currentYear = {
    start: new Date(annoScolastico.datInizio),
    end: new Date(annoScolastico.datFine),
  };
  return { info, currentYear };
};

export const fetchHomeworks = async (school_code: string, token: string) => {
  const headers = await getArgoHeaders(school_code, token);
  const response = await axios.get(`${argoEndpoint}/compiti`, {
    headers,
  });

  const data: ArgoCompito[] = await response.data.dati;

  const fixedData: Homework[] = data.map(
    ({
      datGiorno,
      desMateria,
      desCompiti,
      datCompiti,
      datCompitiPresente,
      docente,
    }) => {
      const teacher = prettyTeacher(docente);
      return <Homework>{
        id: uuidv4(),
        subject: desMateria,
        homework: desCompiti,
        date: new Date(datGiorno),
        deadline: datCompitiPresente && new Date(datCompiti),
        teacher,
      };
    }
  );
  return fixedData;
};

export const fetchToday = async (school_code: string, token: string) => {
  const today = new Date();
  const todayDay = today.getDate();
  const todayMonth = today.getMonth() + 1;
  const todayYear = today.getFullYear();
  const headers = await getArgoHeaders(school_code, token);

  const response = await axios.get(
    `${argoEndpoint}/oggi/?datGiorno=${todayYear}-${todayMonth}-${todayDay}`,
    {
      headers,
    }
  );

  const argo = await response.data.dati;

  const argoMarks: ArgoOggiVoto[] = argo.filter(
    (item: ArgoOggiVoto) => item.ordine === 20
  );
  const argoHomeworks: ArgoOggiCompito[] = argo.filter(
    (item: ArgoOggiCompito) => item.ordine === 40
  );
  const argoTopics: ArgoOggiArgomento[] = argo.filter(
    (item: ArgoOggiArgomento) => item.ordine === 50
  );
  const argoMemos: ArgoOggiPromemoria[] = argo.filter(
    (item: ArgoOggiPromemoria) => item.ordine === 60
  );
  const argoNews: ArgoOggiCircolare[] = argo.filter(
    (item: ArgoOggiCircolare) => item.ordine === 70
  );

  const homeworks = argoHomeworks.map(({ dati }) => {
    const { datGiorno, desMateria, desCompiti, datCompiti, docente } = dati;
    const teacher = docente ? prettyTeacher(docente) : null;

    return <Homework>{
      id: uuidv4(),
      date: new Date(datGiorno),
      subject: desMateria,
      homework: desCompiti,
      deadline: new Date(datCompiti),
      teacher,
    };
  });

  const marks = argoMarks.map(({ dati }) => {
    const { type, description, value } = checkMark(dati);
    const teacher = dati.docente ? prettyTeacher(dati.docente) : null;

    return <Mark>{
      id: uuidv4(),
      date: new Date(dati.datGiorno),
      subject: dati.desMateria,
      description,
      value,
      type,
      teacher,
    };
  });

  const topics = argoTopics.map(({ dati }) => {
    const { desMateria, desArgomento, docente, datGiorno } = dati;
    const teacher = docente ? prettyTeacher(docente) : null;

    return <Topic>{
      id: uuidv4(),
      description: desArgomento,
      date: new Date(datGiorno),
      subject: desMateria,
      teacher,
    };
  });

  const memos = argoMemos.map(({ dati }) => {
    const { desAnnotazioni, desMittente, datGiorno } = dati;
    return <Memo>{
      id: uuidv4(),
      description: desAnnotazioni,
      author: desMittente,
      date: new Date(datGiorno),
    };
  });

  const news = argoNews.map(({ dati }) => {
    const { desMessaggio, desUrl, richiediPv, richiediAd } = dati;
    return <News>{
      description: desMessaggio,
      url: desUrl,
      requested: {
        pv: richiediPv,
        av: richiediAd,
      },
    };
  });

  return <Today>{ homeworks, marks, topics, memos, news };
};

export const fetchMarks = async (school_code: string, token: string) => {
  const headers = await getArgoHeaders(school_code, token);
  const response = await axios.get(`${argoEndpoint}/votigiornalieri`, {
    headers,
  });
  const data: ArgoVoto[] = await response.data.dati;
  const marks = data.map((item) => {
    const { value, type, description } = checkMark(item);

    return <Mark>{
      id: uuidv4(),
      value,
      description,
      subject: item.desMateria,
      date: new Date(item.datGiorno),
      type,
    };
  });
  return orderArrayByDate(marks);
};

export const fetchTopics = async (school_code: string, token: string) => {
  const headers = await getArgoHeaders(school_code, token);
  const response = await axios.get(`${argoEndpoint}/argomenti`, {
    headers,
  });
  const data: ArgoArgomento[] = await response.data.dati;
  const topics = data.map((item) => {
    const { desArgomento, datGiorno, desMateria, docente } = item;
    const teacher = prettyTeacher(docente);
    return <Topic>{
      id: uuidv4(),
      description: desArgomento,
      subject: desMateria,
      date: new Date(datGiorno),
      teacher,
    };
  });
  return orderArrayByDate(topics);
};

export const fetchMemos = async (school_code: string, token: string) => {
  const headers = await getArgoHeaders(school_code, token);
  const response = await axios.get(`${argoEndpoint}/promemoria`, {
    headers,
  });
  const data: ArgoPromemoria[] = await response.data.dati;
  const memos = data.map((item) => {
    const { desMittente, desAnnotazioni, datGiorno } = item;
    return <Memo>{
      id: uuidv4(),
      description: desAnnotazioni,
      date: new Date(datGiorno),
      author: desMittente,
    };
  });
  return orderArrayByDate(memos);
};

export const fetchAbsents = async (school_code: string, token: string) => {
  const headers = await getArgoHeaders(school_code, token);
  const response = await axios.get(`${argoEndpoint}/assenze`, {
    headers,
  });
  const data: ArgoAssenza[] = await response.data.dati;
  const absents: ArgoAssenza[] = [];
  const exits: ArgoAssenza[] = [];
  const delays: ArgoAssenza[] = [];
  data.forEach((item) => {
    const { codEvento } = item;
    switch (codEvento) {
      case 'A':
        absents.push(item);
        break;
      case 'I':
        delays.push(item);
        break;
      case 'U':
        exits.push(item);
        break;

      default:
        break;
    }
  });
  return { absents, exits, delays };
};

export const fetchStudent = async (school_code: string, token: string) => {
  const { info, currentYear } = await fetchUserData(school_code, token);

  const marks = await fetchMarks(school_code, token);
  const topics = await fetchTopics(school_code, token);
  const homeworks = await fetchHomeworks(school_code, token);
  const memos = await fetchMemos(school_code, token);
  const subjects = getSubjects(homeworks, marks, topics);

  const today = await fetchToday(school_code, token);
  const absents = await fetchAbsents(school_code, token);

  const student: Student = {
    isLogged: true,
    info,
    absents,
    currentYear,
    memos,
    topics,
    today,
    marks,
    subjects,
    homeworks,
    authToken: token,
  };

  return student;
};
