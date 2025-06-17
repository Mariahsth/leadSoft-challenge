"use client";
import { breakpoints } from "@/styles/breakPoints";
import { ItemGaleriaProps } from "@/types/ItemGaleriaTypes";
import styled from "styled-components";
import { FaComment,FaPlus, FaMinus } from "react-icons/fa";
import { Botao, Card, ContainerBotao, ContainerHorizontal } from "@/styles/ReusableStyle";
import { useSlideInOnView } from "@/hooks/useSlideInOnView";
import React, { useState } from "react";
import { usePathname } from "next/navigation";

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
  nome,
  imagem,
  legenda,
  cpf, 
  dataNascimento,
  email
}: ItemGaleriaProps) {
  const slideInRef = useSlideInOnView("slide-out", { threshold: 0.1 });
  const pathname = usePathname();
  const isAdminPage = pathname === "/admin";
  const [visualizarDetalhes, setVisualizarDetalhes] = useState(false)

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
          <BotaoComentar onClick={() => setVisualizarDetalhes(!visualizarDetalhes)} className="BotaoComentar">
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
            
          </BotaoComentar>
        </>
      )
      :
      (
      <ContainerBotaoComentar>
        <BotaoComentar className="BotaoComentar">
          <TextoBotao>Comentar</TextoBotao>
          <IconeComentario />
        </BotaoComentar>
      </ContainerBotaoComentar>
      )
      }
    </ItemGaleriaContainer>
  );
})
