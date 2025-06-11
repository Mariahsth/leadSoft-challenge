"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRavenDbConnection = void 0;
const ravendb_1 = require("ravendb");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const tls_1 = __importDefault(require("tls"));
tls_1.default.checkServerIdentity = () => undefined; // ⚠️ ignora hostname do SSL
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
process.env['RAVEN_NodeJs_UseIpv6'] = 'false';
const getRavenDbConnection = () => {
    const certificatePath = path_1.default.resolve(__dirname, 'backend.pfx');
    const certificateBuffer = fs_1.default.readFileSync(certificatePath);
    const store = new ravendb_1.DocumentStore('https://127.0.0.1:443', 'leadsoft', {
        type: 'pfx',
        certificate: certificateBuffer,
        password: '',
    });
    store.initialize();
    return store;
};
exports.getRavenDbConnection = getRavenDbConnection;
