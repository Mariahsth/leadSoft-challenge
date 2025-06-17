import { CommentRepository } from "../../domain/repositories/CommentRepository";
import { Comment } from "../../domain/entities/Comment";
import { getRavenDbConnection } from "../../config/ravenDbConfig";
import { v4 as uuidv4 } from "uuid";

export class RavenCommentRepository implements CommentRepository {
  async add(comment: Comment): Promise<void> {
    const session = getRavenDbConnection().openSession();

    const id = `comments/${uuidv4()}`;
    await session.store(comment, id);
    session.advanced.getMetadataFor(comment)['@collection'] = 'Comments';

    await session.saveChanges();
  }

  async getByCandidateId(candidateId: string): Promise<Comment[]> {
    const session = getRavenDbConnection().openSession();
    const comments = await session
      .query<Comment>({ collection: "Comments" })
      .whereEquals("candidateId", candidateId)
      .orderBy("createdAt")
      .all();
    return comments.map((comment) => {
      const metadata = session.advanced.getMetadataFor(comment);
      return {
        ...comment,
        id: metadata['@id'], 
      };
    });
  }

  async deleteById(commentId: string): Promise<void> {
    const session = getRavenDbConnection().openSession();
  
    const comment = await session.load(commentId);
    if (!comment) {
      throw new Error("Comentário não encontrado");
    }
  
    await session.delete(comment);
    await session.saveChanges();
  }
}