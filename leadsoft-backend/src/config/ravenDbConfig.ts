import dotenv from 'dotenv';
import { DocumentStore } from 'ravendb';
import path from 'path';
import fs from 'fs';
import tls from 'tls';

dotenv.config();

tls.checkServerIdentity = () => undefined;


process.env['RAVEN_NodeJs_UseIpv6'] = 'false';

export const getRavenDbConnection = (): DocumentStore => {
  const certificatePath = process.env.RAVEN_CERT_PATH || path.resolve(__dirname, 'backend.pfx');

  const certificateBuffer = fs.readFileSync(certificatePath);
  console.log("📁 Carregando certificado de:", certificatePath);
  console.log("🔐 Tamanho do buffer do certificado:", certificateBuffer.length);
  console.log("🔍 RAVEN_URL:", process.env.RAVEN_URL);
  console.log("📁 Existe certificado?", fs.existsSync(certificatePath));

  const store = new DocumentStore(
    "https://a.leadia.ravendb.community",
    "leadsoft",
    {
      type: 'pfx',
      certificate: certificateBuffer,
      password: process.env.RAVEN_CERT_PASSWORD || '',
    }
  );

  store.initialize();
  return store;
};
