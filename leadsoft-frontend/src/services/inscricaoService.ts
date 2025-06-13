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
    // Verifica se o erro veio do backend (ex: 400, 409...)
    if (error.response && error.response.data) {
      // Retorna o erro para o componente tratar
      throw error.response.data;
    }

    // Erro inesperado
    throw new Error(error.message || 'Erro ao enviar inscrição');
  }
};