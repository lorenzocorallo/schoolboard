# Schoolboard

### This branch `electorn` is no longer maintained. Refer to `tauri` branch, actually in development.

## 0. Requisiti
- Windows 7/8/8.1/10
- Una connessione a internet
- Un account registro elettronico ARGO (altri registri non sono supportati)

## 1. Installazione 
1) Andare su questo [link](https://github.com/lorenzocorallo/schoolboard/releases) oppure cliccare a destra su "Releases"
2) Cliccare su "Assets" della versione più in alto e in seguito sul file *Schoolboard.setup.X.X.X* (X.X.X rappresenta la versione)
3) A volte potrebbe essere necessario disattivare l'antivirus (soprattutto nel caso si stia usando un antivirus diverso da Windows Defender)
4) Avviare il file
5) Alla comparsa della schermata di SmartScreen cliccare su **Ulteriori informazioni** e su **Esegui comunque** che apparirà accanto a **Non eseguire**

![SmartScreen Alert](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/27018349763/original/cagTAOqT4HNvS9zONU21uJ3SNCHZoc8HaQ.jpg?1577712856)

6) In seguito l'applicazione si installerà in automatico, creando un collegamento sul Desktop e Menu Start (in seguito sarà possibile personalizzare l'installazione)
7) All'avvio bisognerà effettuare il login con le credenziali del [registro](https://www.portaleargo.it/argoweb/famiglia/)

## 2. Struttura
![image](https://user-images.githubusercontent.com/66379281/114284849-0f06d080-9a53-11eb-80b1-231ff9026585.png)

L'applicazione è strutturata in tre parti:
1) Menu (a sinistra): permette di muoversi tra le sezioni dell'app
2) Serve per mostrare il contenuto della sezione selezionata
3) Sidebar (a destra) che contiene: 
- un calendario per cambiare la data a cui si riferisce la Dashboard (vedi sezioni in basso)
- tasto per aggiornare i dati
- numero di assenze, ritardi e uscite anticipate
- promemoria del giorno selezionato (di base il giorno corrente)

## 3. Sezioni
1) Dashboard: ultimi tre voti, compiti assegnati per il giorno selezionato (nel caso sia selezionato "oggi", i compiti visualizzati saranno quelli per il giorno dopo) e lezioni del giorno selezioanto
2) Voti: all'inizio viene visualizzato un grafico a linee che mostra le medie di tutte le materie (primo periodo, secondo periodo, anno completo) e vengono visualizzate tutte le materie con la media totale. Queste materie possono essere aperte per visualizzare il grafico dell'andamento dei voti della materia e l'elenco dei voti suddivisi per data e dal più alto al più basso (e viceversa)
3) Compiti: vengono visualizzati tutti i compiti ordinati per **data di consegna**
4) Promemoria: vengono visualizzati tutti i promemoria della bacheca (verifiche, entrate positicipate ed uscite anticipate, etc...)

## 4. Futuri aggiornamenti in programma
- Animazioni migliori per alcune zone dell'app (come quella dei voti)
- Sezione impostazioni per: effettuare il logout, cambiare il colore delle materie, cambiare il nome delle materie, cambiare i colori dell'app, cambiare i periodi (attualmente sono 01-09/31-12 e 01-01/30-06) e altre personalizzazioni
- Filti avanzati per compiti e memo

## 5. Crediti
- [Main boilerplate](https://github.com/electron-react-boilerplate/electron-react-boilerplate)
- Luis Dodaj, Davide De Gaetano e Dora Fassi per il design
