"use client";
import { ItemGaleriaProps } from "@/types/ItemGaleriaTypes";
import styled from "styled-components";
import { FaComment, FaPlus, FaMinus, FaTrash } from "react-icons/fa";
import { FiX, FiSend  } from "react-icons/fi";
import {
  Botao,
  Card,
  ContainerBotao,
  ContainerColuna,
  ContainerHorizontal,
  ImagemItemGaleria,
  Input,
  TexAreaInput,
} from "@/styles/ReusableStyle";
import { useSlideInOnView } from "@/hooks/useSlideInOnView";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { deleteCandidate } from "@/services/candidateService";
import Cookies from "js-cookie";
import { enviarComentario, buscarComentarios } from "@/services/commentService";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { Comment } from "@/types/Comment";

const ItemGaleriaContainer = styled(Card)`
  padding: 1rem;
  gap: 0.5rem;
`;
const ContainerImagem = styled(ContainerHorizontal)`
  height: 100%;
`;

const ContainerBotaoComentar = styled(ContainerBotao)`
  width: 100%;
`;
const TextoBotao = styled.span`
  color: var(--secundary-color12);
`;

export default React.memo(function ItemGaleria({
  id,
  nome,
  imagem,
  legenda,
  cpf,
  dataNascimento,
  email,
  onDelete,
}: ItemGaleriaProps & { id: string; onDelete?: (id: string) => void }) {
  const slideInRef = useSlideInOnView("slide-out", { threshold: 0.1 });
  const pathname = usePathname();
  const isAdminPage = pathname === "/admin";
  const [visualizarDetalhes, setVisualizarDetalhes] = useState(false);
  const [mostrarComentario, setMostrarComentario] = useState(false);
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [comentarios, setComentarios] = useState<Comment[]>([]);
  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleDelete = async () => {
    if (!confirm(`Deseja realmente excluir o candidato ${nome}?`)) return;

    const token = Cookies.get("token");
    if (!token) {
      alert("Você não está autenticado");
      return;
    }

    try {
      await deleteCandidate(id, token);
      alert("Candidato excluído com sucesso!");
      if (onDelete) onDelete(id);
    } catch (err: any) {
      alert(err.message);
    }
  };

  const novoComentario = async () => {
    if (!author || !content) {
      alert("Preencha nome e comentário");
      return;
    }

    const recaptchaToken = await executeRecaptcha?.("submit");
    if (!recaptchaToken) {
      alert("Erro ao verificar reCAPTCHA");
      return;
    }

    try {
      await enviarComentario({
        candidateId: id,
        author,
        content,
        recaptchaToken,
      });
      const novos = await buscarComentarios(id);
      setComentarios(novos);
      setContent("");
      alert("Comentário enviado com sucesso!");
    } catch (err: any) {
      alert(err.message || "Erro ao comentar");
    }
  };

  useEffect(() => {
    if (mostrarComentario) {
      buscarComentarios(id)
        .then(setComentarios)
        .catch(() => setComentarios([]));
    }
  }, [mostrarComentario]);

  return (
    <ItemGaleriaContainer ref={slideInRef} className="slide-out">
      <h2>{nome}</h2>
      <ContainerImagem>
        <ImagemItemGaleria
          src={imagem}
          alt={`imagem de ${nome}`}
          onError={(e) => {
            e.currentTarget.src = "/fallback-image.png";
          }}
        />
      </ContainerImagem>
      <p>{legenda}</p>
      {isAdminPage ? (
        <>
          <Botao onClick={() => setVisualizarDetalhes(!visualizarDetalhes)}>
            {visualizarDetalhes ? (
              <>
                <TextoBotao>Ver menos</TextoBotao>
                <FaMinus />
              </>
            ) : (
              <>
                <TextoBotao>Ver mais</TextoBotao>
                <FaPlus />
              </>
            )}
          </Botao>
          {visualizarDetalhes && (
            <>
              <ContainerHorizontal>
                <h5>CPF: </h5>
                <p>{cpf}</p>
              </ContainerHorizontal>
              <ContainerHorizontal>
                <h5>Email: </h5>
                <p>{email}</p>
              </ContainerHorizontal>
              <ContainerHorizontal>
                <h5>Data de nascimento: </h5>
                <p>{dataNascimento}</p>
              </ContainerHorizontal>
            </>
          )}
          <Botao onClick={handleDelete}>
            <TextoBotao>Excluir</TextoBotao>
            <FaTrash />
          </Botao>
        </>
      ) : (
        <>
          {mostrarComentario && (
            <ContainerColuna style={{ marginTop: "1rem" }}>
              <Input
                type="text"
                placeholder="Seu nome"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                style={{ marginBottom: "0.5rem", width: "100%" }}
              />
              <TexAreaInput
                placeholder="Escreva seu comentário"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={3}
                style={{ width: "100%", marginBottom: "0.5rem" }}
              />
              <Botao onClick={novoComentario}>
                <TextoBotao>Enviar</TextoBotao>
                <FiSend/>
              </Botao>
            </ContainerColuna>
          )}
          <ContainerBotaoComentar >
            <Botao
              onClick={() => setMostrarComentario(!mostrarComentario)}
              style={{ marginTop: "0" }}
            >
              {mostrarComentario ? (
                <>
                  <TextoBotao>Cancelar</TextoBotao>
                  <FiX />
                </>
              ) : (
                <>
                  <TextoBotao>Comentar</TextoBotao>
                  <FaComment />
                </>
              )}
            </Botao>
          </ContainerBotaoComentar>
        </>
      )}
    </ItemGaleriaContainer>
  );
});


