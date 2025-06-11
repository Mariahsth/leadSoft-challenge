"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRavenDbConnection = void 0;
const ravendb_1 = require("ravendb");
const path_1 = __importDefault(require("path"));
const getRavenDbConnection = () => {
    const store = new ravendb_1.DocumentStore('https://localhost:8080', 'leadsoft', {
        type: 'pfx',
        certificate: path_1.default.resolve(__dirname, 'admin.client.certificate.pfx'),
        password: '',
    });
    store.initialize();
    return store;
};
exports.getRavenDbConnection = getRavenDbConnection;
