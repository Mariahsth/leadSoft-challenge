import { DocumentStore } from 'ravendb';
import path from 'path';
import fs from 'fs';
import tls from 'tls';

tls.checkServerIdentity = () => undefined; // ⚠️ ignora hostname do SSL
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
process.env['RAVEN_NodeJs_UseIpv6'] = 'false';

export const getRavenDbConnection = (): DocumentStore => {
  const certificatePath = path.resolve(__dirname, 'backend.pfx');
  const certificateBuffer = fs.readFileSync(certificatePath);

  const store = new DocumentStore('https://127.0.0.1:443', 'leadsoft', {
    type: 'pfx',
    certificate: certificateBuffer,
    password: '',
  });

  store.initialize();
  return store;
};
