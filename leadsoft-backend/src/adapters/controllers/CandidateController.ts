import { Request, Response } from 'express';


export const registerCandidate= async (req:Request, res:Response) => {
try {
    const {name, cpf, email, date, legenda, imagem}=req.body;
    console.log('Dados recebidos:', { name, cpf, email, date, legenda, imagem });
    res.status(201).json({message:'Candidato registrado com sucesso'})
} catch (error) {
    res.status(500).json({message: 'Erro ao registrar candidato'})
}
}