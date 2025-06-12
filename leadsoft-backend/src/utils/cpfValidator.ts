export function validateCPF(cpf: string): boolean {
    const cleanedCpf = cpf.replace(/\D/g, ''); // Remove qualquer caractere não numérico

    if (cleanedCpf.length !== 11) return false;
  
    // Validação básica do CPF (número repetido não é válido)
    const invalidCPFs = [
      '00000000000', '11111111111', '22222222222', '33333333333', '44444444444',
      '55555555555', '66666666666', '77777777777', '88888888888', '99999999999'
    ];
    if (invalidCPFs.includes(cleanedCpf)) return false;

  
    // Lógica de cálculo dos dígitos verificadores do CPF (simplificada)
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cleanedCpf.charAt(i)) * (10 - i);
    }
  
    let remainder = sum % 11;
    let firstDigit = remainder < 2 ? 0 : 11 - remainder;
  
    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cleanedCpf.charAt(i)) * (11 - i);
    }
  
    remainder = sum % 11;
    let secondDigit = remainder < 2 ? 0 : 11 - remainder;
  
    return cleanedCpf.charAt(9) === firstDigit.toString() && cleanedCpf.charAt(10) === secondDigit.toString();
  }
  