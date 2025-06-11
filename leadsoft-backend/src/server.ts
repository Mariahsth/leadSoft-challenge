import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import candidateRoutes from './adapters/routes/candidateRoutes';

dotenv.config();

const app=express();
const PORT = process.env.PORT || 5000;

app.use(cors())

app.use(express.json());

app.use('/api', candidateRoutes);

app.get('/', (req, res) => {
    res.send('API da missão LeadSoft está no ar! 🚀')
})

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
      message: err.message || 'Erro interno no servidor',
    });
  });

app.listen(PORT, () => {
    console.log(`Servidor escutando em http://localhost:${PORT}`)
})