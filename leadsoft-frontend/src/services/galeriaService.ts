import apiClient from './apiClient';
import { Candidate } from '@/types/Candidate';

export const buscarCandidatos = async (): Promise<Candidate[]> => {
  try {
    const response = await apiClient.get('/api/candidates');
    const candidatos = response.data;

    return candidatos.map((candidato: any): Candidate => {
      const attachment = candidato['@metadata']?.['@attachments']?.[0];
      const imageUrl = attachment
        ? `${process.env.NEXT_PUBLIC_API_URL}/api/candidates/${candidato.id}/image`
        : '/fallback-image.png'; 

      return {
        ...candidato,
        image: imageUrl,
      };
    });
  } catch (error: any) {
    throw new Error(error.message || 'Erro ao buscar candidatos');
  }
};