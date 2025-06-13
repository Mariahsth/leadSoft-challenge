"use client";
import { breakpoints } from "@/styles/breakPoints";
import { ItemGaleriaProps } from "@/types/ItemGaleriaTypes";
import styled from "styled-components";
import { FaComment } from "react-icons/fa";
import { Botao, Card } from "@/styles/FomularioStyle";
import { useSlideInOnView } from "@/hooks/useSlideInOnView";
import { useState } from "react";

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
const ContainerImagem = styled.div`
  height: 100%;
  display:flex;
  align-items:center;
  justify-content:center;
`;
const NomeItemGaleria = styled.h2`
  font-size: 1em;
`;
const ContainerBotao = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
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

export default function ItemGaleria({
  nome,
  imagem,
  legenda,
}: ItemGaleriaProps) {
  const slideInRef = useSlideInOnView("slide-in", { threshold: 0.1 });
  const [imgSrc, setImgSrc] = useState(imagem);

  return (
    <ItemGaleriaContainer ref={slideInRef} className="slide-out">
      <NomeItemGaleria>{nome}</NomeItemGaleria>
      <ContainerImagem>
        <ImagemItemGaleria
          src={imgSrc}
          alt={`imagem de ${nome}`}
          onError={() => setImgSrc('/fallback-image.png')}
        />

      </ContainerImagem>
      <p>{legenda}</p>
      <ContainerBotao>
        <BotaoComentar className="BotaoComentar">
          <TextoBotao>Comentar</TextoBotao>
          <IconeComentario />
        </BotaoComentar>
      </ContainerBotao>
    </ItemGaleriaContainer>
  );
}
