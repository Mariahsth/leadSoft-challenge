import { validateCPF } from '../../utils/cpfValidator';

export class CPF {
  private value: string;

  constructor(value: string) {
    if (!validateCPF(value)) {
      throw new Error('CPF inválido');
    }
    this.value = value;
  }

  public getValue() {
    return this.value;
  }
}
