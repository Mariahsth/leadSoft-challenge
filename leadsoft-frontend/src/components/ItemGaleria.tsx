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
import { enviarComentario, buscarComentarios, deleteComment } from "@/services/commentService";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { Comment } from "@/types/Comment";
import { formatCPF } from "@/utils/formatCpf";
import { formatDate } from "@/utils/formatDate";

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
const ContainerComentarios=styled.div`
display:flex;
text-align:left;
justify-content:center;
align-items:center;
width:100%;
gap:0.3rem;
border:1px solid var(--secundary-color9);
border-radius:16px;
padding:0.5rem;
margin-bottom:0.5rem;

&:hover{
border:1px solid var(--primary-color3);
  p{
    color:var(--primary-color3);

  }
}
`
const ExcluirComentario=styled(FiX)`
cursor:pointer;

&:hover{
color:var(--primary-color3);
}
`
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

  const handleDeleteComment = async (comment:Comment) => {

    if (!comment.id) {
      alert("ID do comentário não encontrado.");
      return;
    }
    
    if (!confirm(`Deseja realmente excluir o comentário de ${comment.author}?`)) return;

    const token = Cookies.get("token");
    if (!token) {
      alert("Você não está autenticado");
      return;
    }

    try {
      await deleteComment(comment.id, token);
      const atualizados = await buscarComentarios(id);
      setComentarios(atualizados);
      alert("Comentário excluído com sucesso!");
    } catch (err: any) {
      alert(err.message);
    }
  };

  const novoComentario = async () => {
    if (!author || !content) {
      alert("Preencha nome e comentário");
      return;
    }
    if (content.length > 150) {
      alert("O comentário deve ter no máximo 150 caracteres.");
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
      setAuthor("");
      setContent("");
      setMostrarComentario(!mostrarComentario)
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
          
          {visualizarDetalhes && (
            <>
              <div style={{ textAlign: "left" }}>
                <p><strong>CPF:</strong> {formatCPF(cpf)}</p>
                <p><strong>Email:</strong> {email}</p>
                <p><strong>Data de nascimento:</strong> {formatDate(dataNascimento)}</p>
              </div>
              <h5>Comentários:</h5>
              {comentarios.length > 0 ? 
              (
                <ul >
                  {comentarios.map((c, i) => (
                    <li key={i} >
                      <ContainerComentarios >
                        <ContainerColuna>
                          <h5 >{c.author}:</h5>
                          <p style={{textAlign:'center'}}>{c.content}</p>
                        </ContainerColuna>
                        <ExcluirComentario onClick={() => handleDeleteComment(c)}/>
                      </ContainerComentarios>
                    </li>
                  ))}
                </ul>
              )
              : 
              (
                <p>Nenhum comentário</p>
              )
            
            }
            </>
          )}
          <Botao onClick={() => {
            setVisualizarDetalhes(!visualizarDetalhes)
            setMostrarComentario(!mostrarComentario)
            }}>
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
          <Botao onClick={handleDelete} style={{ marginTop: "0" }}>
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


