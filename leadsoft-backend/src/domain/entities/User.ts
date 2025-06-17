import { Email } from '../value-objects/Email';
import { v4 as uuidv4 } from 'uuid';

export class User {
  public readonly id: string;
  public readonly email: Email;
  public readonly passwordHash: string;

  constructor(email: Email, passwordHash: string, id?: string) {
    this.id = id ?? uuidv4();
    this.email = email;
    this.passwordHash = passwordHash;
  }
}
