import express from 'express';
import { CandidateController } from '../controllers/CandidateController';
import { RegisterCandidate } from '../../application/use-cases/RegisterCandidate';
import { RavenCandidateRepository } from '../../infrastructure/database/RavenCandidateRepository';
import { GoogleRecaptchaVerifier } from '../../infrastructure/services/GoogleRecaptchaVerifier';
import { DeleteCandidate } from '../../application/use-cases/DeleteCandidate';
import multer from 'multer';
import { getRavenDbConnection } from '../../config/ravenDbConfig';

const upload = multer();

const router = express.Router();

const recaptchaVerifier = new GoogleRecaptchaVerifier(process.env.RECAPTCHA_SECRET_KEY!);

const candidateRepository = new RavenCandidateRepository();
const registerCandidate = new RegisterCandidate(candidateRepository, recaptchaVerifier);
const deleteCandidate = new DeleteCandidate(candidateRepository, recaptchaVerifier);
const candidateController = new CandidateController(registerCandidate, deleteCandidate, candidateRepository);

router.post('/register', upload.single('image'), candidateController.register.bind(candidateController));

router.get('/candidates', candidateController.getAllCandidates.bind(candidateController));

router.get('/candidates/:id', candidateController.getCandidateById.bind(candidateController));

router.delete('/candidates/:id', candidateController.delete.bind(candidateController));

router.get('/candidates/:id/image', async (req, res) => {
    const session = getRavenDbConnection().openSession();
    const { id } = req.params;
  
    const result = await session.advanced.attachments.get(id, 'LeadIA-perfil.png');
  
    if (!result || !result.data) {
      return res.status(404).send('Imagem não encontrada');
    }
  
    res.setHeader('Content-Type', result.details.contentType);
    result.data.pipe(res);
  });


export default router;
