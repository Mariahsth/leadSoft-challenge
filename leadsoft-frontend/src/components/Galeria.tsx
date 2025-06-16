"use client";
import styled from "styled-components";
import ItemGaleria from "./ItemGaleria";
import { useSlideInOnView } from "@/hooks/useSlideInOnView";
import { SlideInTitleH2, SlideInTitleH3 } from "@/styles/slideAnimation";
import { useEffect, useState } from "react";
import { buscarCandidatos } from "@/services/galeriaService";
import { ContainerTitulo } from "@/styles/ReusableStyle";
import type { Candidate } from "@/types/Candidate";

const GaleriaSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 9rem 1rem;
  gap: 0.8rem;
  text-align: center;
  justify-content: center;
`;

const ContainerItensGaleria = styled.div`
  width: 100%;
  max-width: 1200px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  padding: 1rem;
  margin-top: 2rem;
`;
const ErroBusca = styled.p`
  margin-top: 2rem;
`;

export default function Galeria() {
  const slideInRef = useSlideInOnView("slide-in", { threshold: 0.1 });
  const [candidatos, setCandidatos] = useState<Candidate[]>([]);
  const [erro, setErro] = useState("");

  useEffect(() => {
    const fetchCandidatos = async () => {
      try {
        const data = await buscarCandidatos();
        setCandidatos(data);
      } catch (err: any) {
        setErro("Ops! Houve um problema ao buscar os candidatos inscritos");
      }
    };

    fetchCandidatos();
  }, []);

  return (
    <GaleriaSection id="galeria">
      <ContainerTitulo ref={slideInRef} className="slide-in">
        <SlideInTitleH2>Galeria</SlideInTitleH2>
        <SlideInTitleH3>
          Explore os bastidores de uma jornada rumo ao futuro
        </SlideInTitleH3>
      </ContainerTitulo>
      {erro ? (
        <ErroBusca>Erro: {erro}</ErroBusca>
      ) : candidatos.length === 0 ? (
        <ErroBusca>Nenhum candidato inscrito, seja o primeiro!</ErroBusca>
      ) : (
        <ContainerItensGaleria>
          {candidatos.map((item) => (
            <ItemGaleria
              key={item.id}
              nome={item.name}
              imagem={item.image}
              legenda={item.caption}
            />
          ))}
        </ContainerItensGaleria>
      )}
    </GaleriaSection>
  );
}
