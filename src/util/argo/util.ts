import axios from 'axios';
import { uuid } from 'uuidv4';
import { ArgoVoto } from '../../models/Argo';
import { Homework, Mark, Subject, Topic } from '../../models/Student';
import { getDefaultSchoolPeriods, orderArrayByDate } from '../dates';
import { endpoint, headers as argoHeaders } from './api';

export const prettyTeacher = (docente: string) =>
  docente ? docente.split('Prof. ')[1].replace('(', '').replace(')', '') : null;

export const checkMark = (mark: ArgoVoto) => {
  const { desProva, desCommento, codVotoPratico, decValore, codVoto } = mark;
  let description = '';
  if (desProva && desCommento) {
    description = `${desProva} ${desCommento}`;
  } else if (desProva && !desCommento) {
    description = desProva;
  } else if (!desProva && desCommento) {
    description = desCommento;
  } else {
    description = 'Nessuna Descrizione';
  }
  let type = '';
  let value;
  switch (codVotoPratico.toLowerCase()) {
    case 'n':
      type = 'Orale';
      break;
    case 's':
      type = 'Scritto';
      break;
    case 'p':
      type = 'Pratico';
      break;
    default:
      break;
  }
  if (decValore) {
    value = decValore;
  } else if (codVoto === 'IP') {
    value = '+';
  } else if (codVoto === 'IN') {
    value = '-';
  } else {
    value = codVoto;
  }
  return {
    description,
    value,
    type,
  };
};

export const getArgoHeaders = async (school_code: string, token: string) => {
  const response = await axios.get(`${endpoint}/schede`, {
    headers: {
      ...argoHeaders,
      'x-cod-min': school_code,
      'x-auth-token': token,
    },
  });
  const { prgAlunno, prgScheda, prgScuola } = response.data[0];

  const headers = {
    ...argoHeaders,
    'x-cod-min': school_code,
    'x-auth-token': token,
    'x-prg-alunno': prgAlunno,
    'x-prg-scheda': prgScheda,
    'x-prg-scuola': prgScuola,
  };
  return headers;
};

export const capitalize = (word: string) =>
  word[0].toUpperCase() + word.slice(1).toLowerCase();

export const fixSubject = (subject: string) => {
  const clearedSubject = subject
    .replaceAll('.', '')
    .replaceAll(',', '')
    .split(/\s+/);
  const lowerSubject = subject.toLocaleLowerCase();
  if (lowerSubject.includes('educazione') && lowerSubject.includes('fisica')) {
    return 'Ed. Fisica';
  }
  if (lowerSubject.includes('scienze')) {
    if (lowerSubject.includes('motori')) {
      return 'Ed. Fisica';
    }
    return 'Scienze';
  }
  if (
    lowerSubject.includes('letter') ||
    lowerSubject.includes('antologia') ||
    lowerSubject.includes('italian')
  ) {
    return 'Italiano';
  }
  if (lowerSubject.includes('ingles')) {
    return 'Inglese';
  }
  if (lowerSubject.includes('fisica')) {
    return 'Fisica';
  }
  if (lowerSubject.includes('religion')) {
    return 'Religione';
  }
  if (lowerSubject.includes('informatic')) {
    return 'Informatica';
  }
  if (lowerSubject.includes('diritt')) {
    return 'Diritto';
  }
  if (lowerSubject.includes('civic')) {
    return 'Ed. Civica';
  }
  if (lowerSubject.includes('matematica')) {
    return 'Matematica';
  }
  if (lowerSubject.includes('arte')) {
    return 'Arte';
  }
  if (lowerSubject.includes('storia') || !lowerSubject.includes('geografia')) {
    if (lowerSubject.includes('geografia')) {
      return 'Geostoria';
    }
    return 'Storia';
  }
  if (lowerSubject.includes('geografia')) {
    return 'Geograsfia';
  }
  return capitalize(clearedSubject.join(' '));
};

export const checkSubjectColor = (subject: string) => {
  const subj = fixSubject(subject).toLowerCase().split(/\s+/);
  let color;

  if (
    subj.includes('letteratura') ||
    subj.includes('italiano') ||
    subj.includes('antologia')
  ) {
    color = '#ed912f';
  } else if (
    subj.includes('arte') ||
    subj.includes('tecnica') ||
    subj.includes('disegno')
  ) {
    color = '#b133e8';
  } else if (subj.includes('geografia') || subj.includes('storia')) {
    color = '#345ee5';
  } else if (subj.includes('matematica')) {
    color = '#ed322f';
  } else if (subj.includes('inglese')) {
    color = '#efec2f';
  } else if (
    subj.includes('motoria') ||
    (subj.includes('educazione') && subj.includes('fisica')) ||
    subj.includes('ed.fisica')
  ) {
    color = '#f27d9c';
  } else if (
    subj.includes('scienze') ||
    subj.includes('biologia') ||
    subj.includes('chimica') ||
    subj.includes('terra')
  ) {
    color = '#3fef39';
  } else if (subj.includes('religione') || subj.includes('cattolica')) {
    color = '#34c5e5';
  } else if (subj.includes('fisica') && !subj.includes('educazione')) {
    color = '#34c5e5';
  } else {
    color = '#345ee5';
  }
  return color;
};

export const checkMarkColor = (mark: number | string) => {
  let color;
  switch (true) {
    case mark <= 4:
      color = '#DB1616';
      break;
    case mark > 4 && mark < 6:
      color = '#DE4700';
      break;
    case mark >= 6 && mark < 7.5:
      color = '#F1B417';
      break;
    case mark >= 7.5 && mark < 9:
      color = '#A2C614';
      break;
    case mark >= 9 && mark < 10:
      color = '#18C34B';
      break;
    case mark === 10:
      color = '#12dbaf';
      break;
    case mark === '+':
      color = '#18C34B';
      break;
    case mark === '-' ||
      mark === 'NoC' ||
      mark === 'N' ||
      mark === 'NC' ||
      mark === 'Nc':
      color = '#DB1616';
      break;
    default:
      color = '#5385E7';
      break;
  }
  return color;
};

export const getSubjects = (
  homeworks: Homework[],
  marks: Mark[],
  topics: Topic[]
) => {
  let subjects: Subject[] = [];
  homeworks.forEach((hw) => {
    if (!subjects.some(({ name }) => name === hw.subject)) {
      subjects.push({
        name: hw.subject,
        homeworks: [],
        marks: [],
        topics: [],
        color: checkSubjectColor(hw.subject),
        avg: {},
        id: uuid(),
      });
    }
  });
  marks.forEach((mark) => {
    if (!subjects.some(({ name }) => name === mark.subject)) {
      subjects.push({
        name: mark.subject,
        homeworks: [],
        marks: [],
        topics: [],
        color: checkSubjectColor(mark.subject),
        avg: {},
        id: uuid(),
      });
    }
  });
  topics.forEach((topic) => {
    if (!subjects.some(({ name }) => name === topic.subject)) {
      subjects.push({
        name: topic.subject,
        homeworks: [],
        marks: [],
        topics: [],
        color: checkSubjectColor(topic.subject),
        avg: {},
        id: uuid(),
      });
    }
  });
  subjects = subjects.map((s) => {
    const sHomeworks = homeworks
      .filter((h) => h.subject === s.name)
      .sort((a, b) => {
        if (a.deadline && b.deadline) {
          return b.deadline.getTime() - a.deadline.getTime();
        }
        if (a.deadline && !b.deadline) {
          return -1;
        }
        if (b.deadline && !a.deadline) {
          return 1;
        }
        return b.date.getTime() - a.date.getTime();
      });
    const sMarks = marks.filter((h) => h.subject === s.name);
    const sTopics = topics.filter((h) => h.subject === s.name);
    return {
      ...s,
      homeworks: orderArrayByDate(sHomeworks),
      topics: orderArrayByDate(sTopics),
      marks: orderArrayByDate(sMarks),
    };
  });

  const getSchoolPeriods = () => {
    const local = localStorage.getItem('schoolPeriods');
    let periods = getDefaultSchoolPeriods();
    if (local) {
      periods = JSON.parse(local);
    }
    return periods;
  };
  const getAvg = (_marks: Mark[]) => {
    const valueable = _marks.filter((m) => typeof m.value === 'number');
    const marksSum = valueable.reduce((avg, b) => {
      return typeof b.value === 'number' ? avg + b.value : avg;
    }, 0);
    const avg = parseFloat(
      valueable.length > 0 ? (marksSum / valueable.length).toFixed(1) : '0.0'
    );
    return avg;
  };
  subjects = subjects.map((s) => {
    const periods = getSchoolPeriods();
    const totalAvg = getAvg(s.marks);
    const firstAvg = getAvg(
      s.marks.filter(
        (m) =>
          m.date.getMonth() >= new Date(periods.first.start).getMonth() &&
          m.date.getMonth() <= new Date(periods.first.end).getMonth() &&
          m.date.getFullYear() === new Date(periods.first.end).getFullYear()
      )
    );
    const secondAvg = getAvg(
      s.marks.filter(
        (m) =>
          m.date.getMonth() >= new Date(periods.second.start).getMonth() &&
          m.date.getMonth() <= new Date(periods.second.end).getMonth() &&
          m.date.getFullYear() === new Date(periods.second.end).getFullYear()
      )
    );
    return {
      ...s,
      avg: {
        total: totalAvg,
        first: firstAvg,
        second: secondAvg,
      },
    };
  });
  return [...subjects.map((s) => ({ ...s, name: fixSubject(s.name) }))];
};
