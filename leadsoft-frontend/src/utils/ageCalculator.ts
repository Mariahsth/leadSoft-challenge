export function ageCalculator(dataNascimento?: string): number | null {
    if (!dataNascimento) return null;
  
    const hoje = new Date();
    const nascimento = new Date(dataNascimento);
  
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mesAtual = hoje.getMonth();
    const diaAtual = hoje.getDate();
  
    const mesNascimento = nascimento.getMonth();
    const diaNascimento = nascimento.getDate();
  
    if (mesAtual < mesNascimento || (mesAtual === mesNascimento && diaAtual < diaNascimento)) {
      idade--;
    }
  
    return idade;
  }
  