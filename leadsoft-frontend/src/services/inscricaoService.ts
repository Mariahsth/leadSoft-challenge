import apiClient from './apiClient';

export const enviarInscricao = async (formData: FormData) => {
  try {
    const response = await apiClient.post('/api/register', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error:any) {
    throw new Error(error.message || 'Erro ao enviar inscrição');
  }
};