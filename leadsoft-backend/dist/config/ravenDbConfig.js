"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRavenDbConnection = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const ravendb_1 = require("ravendb");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
dotenv_1.default.config();
const getRavenDbConnection = () => {
    const certificatePath = process.env.RAVEN_CERT_PATH || path_1.default.resolve(__dirname, 'free.mariahsth.client.certificate.2025-06-20.with.password.pfx');
    const certificatePassword = process.env.RAVEN_CERT_PASSWORD;
    if (!fs_1.default.existsSync(certificatePath)) {
        throw new Error(`❌ Certificado não encontrado em: ${certificatePath}`);
    }
    const certificateBuffer = fs_1.default.readFileSync(certificatePath);
    const ravenUrl = process.env.RAVEN_URL;
    const database = process.env.RAVEN_DATABASE;
    console.log("📁 Carregando certificado de:", certificatePath);
    console.log("🔐 Tamanho do buffer do certificado:", certificateBuffer.length);
    console.log("🔍 RAVEN_URL:", process.env.RAVEN_URL);
    console.log("📁 Existe certificado?", fs_1.default.existsSync(certificatePath));
    if (!ravenUrl || !database || !certificatePassword) {
        throw new Error('❌ Variáveis de ambiente RAVEN_URL, RAVEN_DATABASE ou RAVEN_CERT_PASSWORD não estão definidas');
    }
    const store = new ravendb_1.DocumentStore(ravenUrl, database, {
        type: 'pfx',
        certificate: certificateBuffer,
        password: certificatePassword || '',
    });
    store.initialize();
    return store;
};
exports.getRavenDbConnection = getRavenDbConnection;
