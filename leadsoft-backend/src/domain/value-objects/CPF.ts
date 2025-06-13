import { validateCPF } from '../../utils/cpfValidator';

export class CPF {
  private value: string;

  constructor(value: string) {
    const cleanedValue = value.replace(/\D/g, ''); 
    if (!validateCPF(cleanedValue)) {
      throw new Error('CPF inválido');
    }
    this.value = cleanedValue;
  }

  public getValue() {
    return this.value;
  }
}
