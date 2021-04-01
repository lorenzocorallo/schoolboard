const endpoint = 'https://www.portaleargo.it/famiglia/api/rest';
const keyApp = 'ax6542sdru3217t4eesd9';
const version = '2.1.0';
const appCode = 'APF';
const produttore = 'ARGO Software s.r.l. - Ragusa';

const headers = {
  'x-key-app': keyApp,
  'x-version': version,
  'x-produttore-software': produttore,
  'x-app-code': appCode,
};

export { endpoint, headers };
