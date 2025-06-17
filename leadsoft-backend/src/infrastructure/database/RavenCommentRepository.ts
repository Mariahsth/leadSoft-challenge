import { CommentRepository } from "../../domain/repositories/CommentRepository";
import { Comment } from "../../domain/entities/Comment";
import { getRavenDbConnection } from "../../config/ravenDbConfig";

export class RavenCommentRepository implements CommentRepository {
  async add(comment: Comment): Promise<void> {
    const session = getRavenDbConnection().openSession();
    await session.store(comment, `comments/${Date.now()}`);
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
    return comments;
  }
}
