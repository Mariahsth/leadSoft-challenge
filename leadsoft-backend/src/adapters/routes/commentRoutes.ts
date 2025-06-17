import { Router } from "express";
import { CommentOnCandidate } from "../../application/use-cases/CommentOnCandidate";
import { RavenCommentRepository } from "../../infrastructure/database/RavenCommentRepository";
import { CommentController } from "../controllers/CommentController";
import { GoogleRecaptchaVerifier } from "../../infrastructure/services/GoogleRecaptchaVerifier";

const router = Router();


const commentRepo = new RavenCommentRepository();
const recaptchaVerifier = new GoogleRecaptchaVerifier(process.env.RECAPTCHA_SECRET_KEY!);
const commentUseCase = new CommentOnCandidate(commentRepo, recaptchaVerifier);
const controller = new CommentController(commentUseCase, commentRepo);

router.post("/comments", controller.add.bind(controller));
router.get("/comments/:candidateId", controller.getByCandidate.bind(controller));

export default router;
