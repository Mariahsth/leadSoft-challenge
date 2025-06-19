"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = void 0;
const uuid_1 = require("uuid");
class Comment {
    constructor(candidateId, author, content, createdAt, id) {
        if (!author.trim())
            throw new Error("Autor não pode estar em branco");
        if (!content.trim())
            throw new Error("Comentário não pode estar vazio");
        this.id = id ?? `comments/${(0, uuid_1.v4)()}`;
        this.candidateId = candidateId;
        this.author = author.trim();
        this.content = content.trim();
        this.createdAt = createdAt ?? new Date().toISOString();
    }
}
exports.Comment = Comment;
