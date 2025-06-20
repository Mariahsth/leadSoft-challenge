import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import candidateRoutes from './adapters/routes/candidateRoutes';
import authRoutes from "./adapters/routes/auth";
import commentRoutes from "./adapters/routes/commentRoutes";

const app=express();
const PORT = process.env.PORT || 5000;
console.log("🔍 RAVEN_URL:", process.env.RAVEN_URL);

const allowedOrigins = [
  'http://localhost:3000',
  'https://lead-soft-challenge.vercel.app/',
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Não permitido por CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));


app.use('/api', candidateRoutes);
app.use("/api", commentRoutes);
app.use("/api/auth", authRoutes);

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
    console.log("🔍 RAVEN_URL:", process.env.RAVEN_URL);
})
