import { Comment } from "../entities/Comment";

export interface CommentRepository {
  add(comment: Comment): Promise<void>;
  getByCandidateId(candidateId: string): Promise<Comment[]>;
  deleteById(commentId: string): Promise<void>;
}
