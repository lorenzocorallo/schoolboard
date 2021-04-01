export interface ArgoStudente {
  firstName: string;
  lastName: string;
  gender: string;
  school: string;
  class: string;
}

export interface ArgoOggiBase {
  ordine: number;
  codMin: string;
  prgScuola: number;
  prgScheda: number;
  tipo: string;
  titolo: string;
  prgAlunno: number;
  numAnno: number;
  giorno: string;
}

export interface ArgoOggiCompito extends ArgoOggiBase {
  dati: ArgoCompito;
}
export interface ArgoOggiVoto extends ArgoOggiBase {
  dati: ArgoVoto;
}
export interface ArgoOggiCircolare extends ArgoOggiBase {
  dati: ArgoCircolare;
}
export interface ArgoOggiPromemoria extends ArgoOggiBase {
  dati: ArgoPromemoria;
}
export interface ArgoOggiArgomento extends ArgoOggiBase {
  dati: ArgoArgomento;
}

export interface ArgoCompito {
  codMin: string;
  prgScuola: number;
  datCompitiPresente: boolean;
  numAnno: number;
  datGiorno: string;
  docente: string;
  desCompiti: string;
  prgMateria: number;
  desMateria: string;
  prgClasse: number;
  datCompiti: string;
}

export interface ArgoCircolare {
  codMin: string;
  desOggetto: string;
  datScadenzaAdesione: string | null;
  numAnno: number;
  desMessaggio: string;
  presaVisione: boolean;
  dataConfermaPresaVisione: string | null;
  richiediAd: boolean;
  richiediPv: boolean;
  adesione: boolean;
  allegati: [];
  adesioneModificabile: boolean;
  prgMessaggio: number;
  desUrl: string | null;
  dataConfermaAdesione: string | null;
  datGiorno: string;
}

export interface ArgoArgomento {
  codMin: string;
  prgScuola: number;
  numAnno: number;
  desArgomento: string;
  datGiorno: string;
  docente: string;
  prgMateria: number;
  desMateria: string;
  prgClasse: number;
}

export interface ArgoVoto {
  codMin: string;
  prgScuola: number;
  desProva: string;
  prgAlunno: number;
  codVotoPratico: string;
  decValore: number;
  numAnno: string;
  docente: string;
  prgMateria: number;
  codVoto: string;
  prgScheda: number;
  datGiorno: string;
  desMateria: string;
  desCommento: string;
}

export interface ArgoPromemoria {
  codMin: string;
  prgScuola: number;
  desMittente: string;
  desAnnotazioni: string;
  prgProgressivo: number;
  numAnno: string;
  datGiorno: string;
  prgAnagrafe: number;
  prgClasse: number;
}

export interface ArgoAssenza {
  codEvento: 'A' | 'U' | 'R' | string;
  codMin: string;
  prgScuola: number;
  numOra: number | null;
  datGiustificazione: string;
  prgAlunno: number;
  numAnno: number;
  registrataDa: string;
  prgScheda: number;
  binUid: string;
  datAssenza?: string;
  giustificataDa?: string;
  desAssenza?: string;
  flgDaGiustificare?: boolean;
}
