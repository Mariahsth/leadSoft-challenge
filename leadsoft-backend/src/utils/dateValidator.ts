export function validateDateOfBirth(dateOfBirth: string): boolean {
  // Verifica se o formato está correto: yyyy-MM-dd
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(dateOfBirth)) {
    return false;
  }

  const birthDate = new Date(dateOfBirth);
  if (isNaN(birthDate.getTime())) {
    return false;
  }

  // Calcula a idade
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  const dayDiff = today.getDate() - birthDate.getDate();

  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age--;
  }

  return age >= 18;
}
