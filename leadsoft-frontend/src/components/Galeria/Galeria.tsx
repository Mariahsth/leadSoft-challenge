'use client';
import { useEffect, useState } from "react";
import { buscarCandidatos } from "@/services/candidateService";
import ItemGaleria from "./ItemGaleria";
import { ContainerItensGaleria, ContainerTitulo } from "@/styles/ReusableStyle";
import { GaleriaSection, ErroBusca } from "./GaleriaStyle";
import { useSlideInOnView } from "@/hooks/useSlideInOnView";
import type { Candidate } from "@/types/Candidate";

export default function Galeria() {
  const slideInRef = useSlideInOnView("slide-in", { threshold: 0.1 });
  const [candidatos, setCandidatos] = useState<Candidate[]>([]);
  const [erro, setErro] = useState("");

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await buscarCandidatos();
        setCandidatos(data);
      } catch {
        setErro("Ops! Houve um problema ao buscar os candidatos inscritos");
      }
    };
    fetch();
  }, []);

  return (
    <GaleriaSection id="galeria">
      <ContainerTitulo ref={slideInRef} className="slide-in">
        <h2>Galeria</h2>
        <h3>Explore os bastidores de uma jornada rumo ao futuro</h3>
      </ContainerTitulo>
      {erro ? (
        <ErroBusca>{erro}</ErroBusca>
      ) : candidatos.length === 0 ? (
        <ErroBusca>Nenhum candidato inscrito, seja o primeiro!</ErroBusca>
      ) : (
        <ContainerItensGaleria>
          {candidatos.map((item) => (
            <ItemGaleria
              key={item.id}
              id={item.id}
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
