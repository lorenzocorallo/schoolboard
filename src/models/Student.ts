import { ArgoAssenza, ArgoStudente } from './Argo';

export interface Mark {
  id: string;
  value: string | number;
  description: string;
  subject: string;
  type: string;
  date: Date;
}

export interface Homework {
  id: string;
  subject: string;
  homework: string;
  teacher: string;
  date: Date;
  deadline?: Date;
}

export interface Topic {
  id: string;
  description: string;
  subject: string;
  date: Date;
  teacher: string;
}

export interface Memo {
  id: string;
  description: string;
  author: string;
  date: Date;
}

export interface News {
  id: string;
  description: string;
  url?: string;
  author: string;
  date: Date;
  requested: {
    pv: boolean;
    av: boolean;
  };
}

export interface Today {
  marks: Mark[];
  topics: Topic[];
  memos: Memo[];
  news: News[];
  homeworks: Homework[];
}

export interface Subject {
  name: string;
  color: string;
  homeworks: Homework[];
  marks: Mark[];
  topics: Topic[];
  avg: {
    total?: number;
    first?: number;
    second?: number;
  };
}

export default interface Student {
  isLogged: boolean;
  info: ArgoStudente;
  currentYear: {
    start: Date;
    end: Date;
  };
  absents: {
    absents: ArgoAssenza[];
    delays: ArgoAssenza[];
    exits: ArgoAssenza[];
  };
  homeworks: Homework[];
  marks: Mark[];
  memos: Memo[];
  topics: Topic[];
  today: Today;
  subjects: Subject[];
  authToken: string;
}
