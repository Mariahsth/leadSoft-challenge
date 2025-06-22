"use client";
import styled from "styled-components";
import ItemGaleria from "./ItemGaleria";
import { useSlideInOnView } from "@/hooks/useSlideInOnView";
import { useEffect, useState } from "react";
import { buscarCandidatos } from "@/services/candidateService";
import { ContainerItensGaleria, ContainerTitulo } from "@/styles/ReusableStyle";
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
        <h2>Galeria</h2>
        <h3>Explore os bastidores de uma jornada rumo ao futuro</h3>
      </ContainerTitulo>
      {erro ? (
        <ErroBusca>Erro: {erro}</ErroBusca>
      ) : candidatos.length === 0 ? (
        <ErroBusca>Nenhum candidato inscrito, seja o primeiro!</ErroBusca>
      ) : (
        <ContainerItensGaleria>
          {candidatos.map((item) => (
            <ItemGaleria
              id={item.id}
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
