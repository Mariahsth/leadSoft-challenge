// import dotenv from 'dotenv';
// import { DocumentStore } from 'ravendb';
// import path from 'path';
// import fs from 'fs';
// import tls from 'tls';

// dotenv.config();

// tls.checkServerIdentity = () => undefined;

// if (process.env.NODE_ENV !== 'production') {
//   process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
// }
// process.env['RAVEN_NodeJs_UseIpv6'] = 'false';

// export const getRavenDbConnection = (): DocumentStore => {
//   const certificatePath = process.env.RAVEN_CERT_PATH || path.resolve(__dirname, 'backend.pfx');

//   const certificateBuffer = fs.readFileSync(certificatePath);
//   console.log("📁 Carregando certificado de:", certificatePath);
//   console.log("🔐 Tamanho do buffer do certificado:", certificateBuffer.length);
//   console.log("🔍 RAVEN_URL:", process.env.RAVEN_URL);

//   const store = new DocumentStore(
//     process.env.RAVEN_URL!,
//     process.env.RAVEN_DATABASE!,
//     {
//       type: 'pfx',
//       certificate: certificateBuffer,
//       password: process.env.RAVEN_CERT_PASSWORD || '',
//     }
//   );

//   store.initialize();
//   return store;
// };
import { DocumentStore } from 'ravendb';
import path from 'path';
import fs from 'fs';
import tls from 'tls';
import dotenv from 'dotenv';

dotenv.config();

tls.checkServerIdentity = () => undefined;

process.env['RAVEN_NodeJs_UseIpv6'] = 'false';

export const getRavenDbConnection = (): DocumentStore => {
  const certPath = path.resolve(__dirname, '../certs/backend.pfx'); // Pasta certs no projeto
  let certificateBuffer: Buffer;

  try {
    certificateBuffer = fs.readFileSync(certPath);
    console.log('📁 Certificado carregado com sucesso.');
  } catch (err) {
    console.error('❌ Falha ao ler o certificado:', err);
    throw err;
  }

  const store = new DocumentStore(
    process.env.RAVEN_URL!,
    process.env.RAVEN_DATABASE!,
    {
      type: 'pfx',
      certificate: certificateBuffer,
      password: process.env.RAVEN_CERT_PASSWORD || '',
    }
  );

  store.initialize();
  return store;
};
