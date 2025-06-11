"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const candidateRoutes_1 = __importDefault(require("./adapters/routes/candidateRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api', candidateRoutes_1.default);
app.get('/', (req, res) => {
    res.send('API da missão LeadSoft está no ar! 🚀');
});
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        message: err.message || 'Erro interno no servidor',
    });
});
app.listen(PORT, () => {
    console.log(`Servidor escutando em http://localhost:${PORT}`);
});
