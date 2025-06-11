"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const CandidateController_1 = require("../controllers/CandidateController");
const RegisterCandidate_1 = require("../../application/use-cases/RegisterCandidate");
const RavenCandidateRepository_1 = require("../../infrastructure/database/RavenCandidateRepository");
const GoogleRecaptchaVerifier_1 = require("../../infrastructure/services/GoogleRecaptchaVerifier");
const router = express_1.default.Router();
const recaptchaVerifier = new GoogleRecaptchaVerifier_1.GoogleRecaptchaVerifier(process.env.RECAPTCHA_SECRET_KEY);
const candidateRepository = new RavenCandidateRepository_1.RavenCandidateRepository();
const registerCandidate = new RegisterCandidate_1.RegisterCandidate(candidateRepository, recaptchaVerifier);
const candidateController = new CandidateController_1.CandidateController(registerCandidate, candidateRepository);
router.post('/register', candidateController.register.bind(candidateController));
router.get('/candidates', candidateController.getAllCandidates.bind(candidateController));
router.get('/candidates/:id', candidateController.getCandidateById.bind(candidateController));
exports.default = router;
