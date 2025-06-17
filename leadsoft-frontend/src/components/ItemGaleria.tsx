"use client";
import { breakpoints } from "@/styles/breakPoints";
import { ItemGaleriaProps } from "@/types/ItemGaleriaTypes";
import styled from "styled-components";
import { FaComment,FaPlus, FaMinus, FaTrash } from "react-icons/fa";
import { Botao, Card, ContainerBotao, ContainerHorizontal } from "@/styles/ReusableStyle";
import { useSlideInOnView } from "@/hooks/useSlideInOnView";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { deleteCandidate } from "@/services/candidateService";
import Cookies from "js-cookie";


const ItemGaleriaContainer = styled(Card)`
  padding: 1rem;
  gap: 0.5rem;
`;
const ImagemItemGaleria = styled.img`
  width: 100%;
  height: auto;
  display: block;
  object-fit: cover;
`;
const ContainerImagem = styled(ContainerHorizontal)`
  height: 100%;
`;
const NomeItemGaleria = styled.h2`
  font-size: 1em;
`;
const ContainerBotaoComentar = styled(ContainerBotao)`
  width: 100%;

  @media (max-width: ${breakpoints.mobile}) {
    justify-content: end;
  }
`;
const BotaoComentar = styled(Botao)`
  @media (max-width: ${breakpoints.tablet}) {
    width: 75%;
  }
  @media (max-width: ${breakpoints.mobile}) {
    background: transparent;
    padding: 0;
    width: auto;
    justify-content: flex-end;
    padding-right: 0;
    margin-right: 1rem;
    box-shadow: none;

    &:hover {
      background: none;
      color: none;
    }
  }
`;

const TextoBotao = styled.span`
  color: var(--secundary-color12);
`;

const TextoBotaoComentario = styled(TextoBotao)`
  @media (max-width: ${breakpoints.tablet}) {
    font-size: 0.8em;
  }
  @media (max-width: ${breakpoints.mobile}) {
    display: none;
  }
`;

const IconeComentario = styled(FaComment)`
  color: var(--secundary-color8);
  font-size: 1em;

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 2em;
    color: var(--secundary-color7);

    &:hover {
      color: var(--secundary-color6);
    }
  }
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
}: ItemGaleriaProps & { id: string, onDelete?: (id: string) => void }) {
  const slideInRef = useSlideInOnView("slide-out", { threshold: 0.1 });
  const pathname = usePathname();
  const isAdminPage = pathname === "/admin";
  const [visualizarDetalhes, setVisualizarDetalhes] = useState(false)

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

      // notifica o pai para remover da lista
      if (onDelete) onDelete(id);
    } catch (err: any) {
      alert(err.message);
    }
  };


  return (
    <ItemGaleriaContainer ref={slideInRef} className="slide-out">
      <NomeItemGaleria>{nome}</NomeItemGaleria>
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
      {isAdminPage ? 
      (
        <>
          <Botao onClick={() => setVisualizarDetalhes(!visualizarDetalhes)} >
            {visualizarDetalhes ? 
            (
              <>
                <TextoBotao >Ver menos</TextoBotao>
                <FaMinus/>
              </>
            ) 
            : 
            (
              <>
              <TextoBotao >Ver mais</TextoBotao>
              <FaPlus/>
              </>

            )}
            
          </Botao>
          {visualizarDetalhes ? 
          (
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
          ) 
          : 
          (
            ''
          )}
          <Botao onClick={handleDelete}>
            <TextoBotao>Excluir</TextoBotao>
            <FaTrash />
          </Botao>
        </>
      )
      :
      (
      <ContainerBotaoComentar>
        <BotaoComentar className="BotaoComentar">
          <TextoBotaoComentario>Comentar</TextoBotaoComentario>
          <IconeComentario />
        </BotaoComentar>
      </ContainerBotaoComentar>
      )
      }
    </ItemGaleriaContainer>
  );
})
