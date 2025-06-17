import { Comment } from "@/types/Comment";
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

export const buscarComentarios = async (candidateId: string): Promise<Comment[]> => {
  const response = await apiClient.get(`/api/comments/${candidateId}`);
  const rawComments = response.data;
  return rawComments.map((comment: any) => ({
    ...comment,
    id: comment['@metadata']?.['@id'], 
  }));
};

export const deleteComment = async (commentId: string, token: string) => {
  const encodedId = encodeURIComponent(commentId); 
  console.log("Comentário ID encoded:", encodedId);
  const response = await apiClient.delete(`/api/comments/${encodedId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};