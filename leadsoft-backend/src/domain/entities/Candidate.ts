import { Name } from '../value-objects/Name';
import { Email } from '../value-objects/Email';
import { Caption } from '../value-objects/Caption';
import { DateOfBirth } from '../value-objects/DateOfBirth';
import { CPF } from '../value-objects/CPF';
import { Image } from '../value-objects/Image';

export class Candidate {
  public readonly name: Name;
  public readonly email: Email;
  public readonly caption: Caption;
  public readonly dateOfBirth: DateOfBirth;
  public readonly cpf: CPF;
  public readonly image: Image;

  constructor(
    name: Name,
    email: Email,
    caption: Caption,
    dateOfBirth: DateOfBirth,
    cpf: CPF,
    image: Image
  ) {
    this.name = name;
    this.email = email;
    this.caption = caption;
    this.dateOfBirth = dateOfBirth;
    this.cpf = cpf;
    this.image = image;
  }
}
