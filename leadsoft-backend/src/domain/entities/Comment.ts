  import { v4 as uuidv4 } from 'uuid';

  export class Comment {
    public readonly id?: string;
    public readonly candidateId: string;
    public readonly author: string;
    public readonly content: string;
    public readonly createdAt: string;
  
    constructor(
      candidateId: string,
      author: string,
      content: string,
      createdAt?: string,
      id?: string
    ) {
      if (!author.trim()) throw new Error("Autor não pode estar em branco");
      if (!content.trim()) throw new Error("Comentário não pode estar vazio");
  
      this.id = id ?? `comments/${uuidv4()}`;
      this.candidateId = candidateId;
      this.author = author.trim();
      this.content = content.trim();
      this.createdAt = createdAt ?? new Date().toISOString();
    }
  }
  