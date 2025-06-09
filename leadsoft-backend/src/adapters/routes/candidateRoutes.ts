import {Router} from 'express';
import { registerCandidate } from '../controllers/CandidateController';

const router=Router();

router.post('/', registerCandidate)

export default router;