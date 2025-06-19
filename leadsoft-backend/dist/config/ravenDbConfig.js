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
const tls_1 = __importDefault(require("tls"));
dotenv_1.default.config();
tls_1.default.checkServerIdentity = () => undefined;
process.env['RAVEN_NodeJs_UseIpv6'] = 'false';
const getRavenDbConnection = () => {
    const certificatePath = process.env.RAVEN_CERT_PATH || path_1.default.resolve(__dirname, 'backend.pfx');
    const certificateBuffer = fs_1.default.readFileSync(certificatePath);
    console.log("📁 Carregando certificado de:", certificatePath);
    console.log("🔐 Tamanho do buffer do certificado:", certificateBuffer.length);
    console.log("🔍 RAVEN_URL:", process.env.RAVEN_URL);
    console.log("📁 Existe certificado?", fs_1.default.existsSync(certificatePath));
    const store = new ravendb_1.DocumentStore(process.env.RAVEN_URL, process.env.RAVEN_DATABASE, {
        type: 'pfx',
        certificate: certificateBuffer,
        password: process.env.RAVEN_CERT_PASSWORD || '',
    });
    store.initialize();
    return store;
};
exports.getRavenDbConnection = getRavenDbConnection;
