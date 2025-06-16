import apiClient from './apiClient';

export const login = async (credentials: { user: string; password: string }) => {
  try {
    const response = await apiClient.post("/api/login", credentials);
    return response.data; 
  } catch (error: any) {
    if (error.response && error.response.data) {
      throw error.response.data;
    }
    throw new Error("Erro inesperado ao fazer login.");
  }
};
