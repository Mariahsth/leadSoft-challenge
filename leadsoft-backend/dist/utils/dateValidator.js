"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateDateOfBirth = validateDateOfBirth;
function validateDateOfBirth(dateOfBirth) {
    //verifica o formato yyyy-mm-dd
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(dateOfBirth))
        return false;
    //calcula a idade
    const birthDate = new Date(dateOfBirth);
    if (isNaN(birthDate.getTime()))
        return false;
    const today = new Date();
    const minAge = 18;
    const maxAge = 120;
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
        age--;
    }
    return age >= minAge && age <= maxAge;
}
