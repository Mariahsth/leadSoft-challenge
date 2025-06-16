export interface User {
    id: string;
    user: string;
    passwordHash: string;
  }
  
  export interface UserRepository {
    findByEmail(user: string): Promise<User | null>;
  }
  