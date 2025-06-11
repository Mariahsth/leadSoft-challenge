"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateDateOfBirth = validateDateOfBirth;
function validateDateOfBirth(dateOfBirth) {
    // Verifica se o formato da data é válido (dd/mm/yyyy)
    const regex = /^(0[1-9]|1[0-9]|2[0-9]|3[01])\/(0[1-9]|1[0-2])\/((19|20)\d\d)$/;
    if (!regex.test(dateOfBirth)) {
        return false;
    }
    // Converte a data para o formato Date
    const [day, month, year] = dateOfBirth.split('/');
    const birthDate = new Date(`${year}-${month}-${day}`);
    // Calcula a idade
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();
    // Se a pessoa ainda não fez aniversário este ano, subtrai 1 da idade
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
        age--;
    }
    // Verifica se a idade é maior ou igual a 18
    return age >= 18;
}
