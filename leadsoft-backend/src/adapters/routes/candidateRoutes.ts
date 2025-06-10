import express from 'express';
import { CandidateController } from '../controllers/CandidateController';
import { RegisterCandidate } from '../../application/use-cases/RegisterCandidate';
import { RavenCandidateRepository } from '../../infrastructure/database/RavenCandidateRepository';
import { GoogleRecaptchaVerifier } from '../../infrastructure/services/GoogleRecaptchaVerifier';

const router = express.Router();

const recaptchaVerifier = new GoogleRecaptchaVerifier(process.env.RECAPTCHA_SECRET_KEY!);
const candidateRepository = new RavenCandidateRepository(/* store RavenDB */);
const registerCandidate = new RegisterCandidate(candidateRepository, recaptchaVerifier);
const candidateController = new CandidateController(registerCandidate);

router.post('/register', candidateController.register.bind(candidateController));

export default router;
