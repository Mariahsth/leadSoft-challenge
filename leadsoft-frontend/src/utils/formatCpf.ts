export function formatCPF(cpf?: string): string {
    if (!cpf) return "";
    if (/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(cpf)) {
      return cpf;
    }
  
    return cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4");
  }