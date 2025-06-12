import { Name } from '../value-objects/Name';
import { Email } from '../value-objects/Email';
import { Caption } from '../value-objects/Caption';
import { DateOfBirth } from '../value-objects/DateOfBirth';
import { CPF } from '../value-objects/CPF';
import { v4 as uuidv4 } from 'uuid';


export class Candidate {
  public readonly id: string;
  public readonly name: Name;
  public readonly email: Email;
  public readonly caption: Caption;
  public readonly dateOfBirth: DateOfBirth;
  public readonly cpf: CPF;

  constructor(
    name: Name,
    email: Email,
    caption: Caption,
    dateOfBirth: DateOfBirth,
    cpf: CPF,
    id?: string 
  ) {
    this.id = id ?? `${uuidv4()}`
    this.name = name;
    this.email = email;
    this.caption = caption;
    this.dateOfBirth = dateOfBirth;
    this.cpf = cpf;
  }
}
