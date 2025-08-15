import styled from "styled-components";
import { FiX } from "react-icons/fi";
import {
  Card,
  ContainerHorizontal,
  ContainerBotao,
} from "@/styles/ReusableStyle";
import { FaComment } from "react-icons/fa";
export const ItemGaleriaContainer = styled(Card)`
  padding: 1rem;
  gap: 0.5rem;
`;

export const ContainerImagem = styled(ContainerHorizontal)`
  height: 100%;
`;

export const ContainerBotaoComentar = styled(ContainerBotao)`
  width: 100%;

`;

export const TextoBotao = styled.span`
  color: var(--secundary-color12);
`;

export const ContainerComentarios = styled.div`
  display: flex;
  text-align: left;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 0.3rem;
  border: 1px solid var(--secundary-color9);
  border-radius: 16px;
  padding: 0.5rem;
  margin-bottom: 0.5rem;

  &:hover {
    border: 1px solid var(--primary-color3);
    p {
      color: var(--primary-color3);
    }
  }
`;

export const ExcluirComentario = styled(FiX)`
  cursor: pointer;

  &:hover {
    color: var(--primary-color3);
  }
`;
