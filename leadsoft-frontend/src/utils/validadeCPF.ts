export const validateCPF = (cpf: string): boolean => {
    // Remove qualquer caractere não numérico
    cpf = cpf.replace(/[^\d]+/g, '');

    // CPF deve ter 11 dígitos e não pode ser sequência repetida
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;
  
    // Cálculo do 1º dígito verificador
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += +cpf[i] * (10 - i);
    }
    let remainder = sum % 11;
    const check1 = remainder < 2 ? 0 : 11 - remainder;
    if (check1 !== +cpf[9]) return false;

    // Cálculo do 2º dígito verificador
    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += +cpf[i] * (11 - i);
    }
    remainder = sum % 11;
    const check2 = remainder < 2 ? 0 : 11 - remainder;

    return check2 === +cpf[10];
  };
  