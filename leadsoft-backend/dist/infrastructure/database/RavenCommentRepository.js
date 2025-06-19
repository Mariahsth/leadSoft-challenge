"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RavenCommentRepository = void 0;
const ravenDbConfig_1 = require("../../config/ravenDbConfig");
const uuid_1 = require("uuid");
class RavenCommentRepository {
    async add(comment) {
        const session = (0, ravenDbConfig_1.getRavenDbConnection)().openSession();
        const id = `comments/${(0, uuid_1.v4)()}`;
        await session.store(comment, id);
        session.advanced.getMetadataFor(comment)['@collection'] = 'Comments';
        await session.saveChanges();
    }
    async getByCandidateId(candidateId) {
        const session = (0, ravenDbConfig_1.getRavenDbConnection)().openSession();
        const comments = await session
            .query({ collection: "Comments" })
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
    async deleteById(commentId) {
        const session = (0, ravenDbConfig_1.getRavenDbConnection)().openSession();
        const comment = await session.load(commentId);
        if (!comment) {
            throw new Error("Comentário não encontrado");
        }
        await session.delete(comment);
        await session.saveChanges();
    }
}
exports.RavenCommentRepository = RavenCommentRepository;
