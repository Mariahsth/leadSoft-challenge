import apiClient from "./apiClient";

export const enviarComentario = async (comment: {
  candidateId: string;
  author: string;
  content: string;
  recaptchaToken: string;
}) => {
  const response = await apiClient.post("/api/comments", comment);
  return response.data;
};

export const buscarComentarios = async (candidateId: string) => {
  const response = await apiClient.get(`/api/comments/${candidateId}`);
  return response.data;
};
