import dotenv from 'dotenv';
import { DocumentStore } from 'ravendb';
import path from 'path';
import fs from 'fs';

dotenv.config();


export const getRavenDbConnection = (): DocumentStore => {
  const certificatePath = process.env.RAVEN_CERT_PATH || path.resolve(__dirname, 'free.mariahsth.client.certificate.2025-06-20.with.password.pfx');
  const certificatePassword = process.env.RAVEN_CERT_PASSWORD;

  if (!fs.existsSync(certificatePath)) {
    throw new Error(`❌ Certificado não encontrado em: ${certificatePath}`);
  }

  const certificateBuffer = fs.readFileSync(certificatePath);
  const ravenUrl = process.env.RAVEN_URL;
  const database = process.env.RAVEN_DATABASE;

  console.log("📁 Carregando certificado de:", certificatePath);
  console.log("🔐 Tamanho do buffer do certificado:", certificateBuffer.length);
  console.log("🔍 RAVEN_URL:", process.env.RAVEN_URL);
  console.log("📁 Existe certificado?", fs.existsSync(certificatePath));

  if (!ravenUrl || !database || !certificatePassword) {
    throw new Error('❌ Variáveis de ambiente RAVEN_URL, RAVEN_DATABASE ou RAVEN_CERT_PASSWORD não estão definidas');
  }

  const store = new DocumentStore(
    ravenUrl,
    database,
    {
      type: 'pfx',
      certificate: certificateBuffer,
      password: certificatePassword || '',
    }
  );

  store.initialize();
  return store;
};
