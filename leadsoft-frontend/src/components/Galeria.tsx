"use client";
import { breakpoints } from "@/styles/breakPoints";
import styled from "styled-components";
import ItemGaleria from "./ItemGaleria";
import { useSlideInOnView } from "@/hooks/useSlideInOnView";
import { SlideInTitleH2, SlideInTitleH3 } from "@/styles/slideAnimation";
import { useEffect, useState } from "react";
import { buscarCandidatos } from "@/services/galeriaService";


const GaleriaSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 9rem 1rem;
  gap: 0.8rem;
  text-align: center;
  justify-content:center;
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


export default function Galeria() {
    const slideInRef = useSlideInOnView("slide-in", { threshold: 0.1 });
    const slideInRef2 = useSlideInOnView("slide-in", { threshold: 0.1 });
    const [candidatos, setCandidatos] = useState([]);
    const [erro, setErro] = useState("");


    useEffect(() => {
        const fetchCandidatos = async () => {
          try {
            const data = await buscarCandidatos();
            setCandidatos(data);
          } catch (err: any) {
            setErro(err.message);
          }
        };
    
        fetchCandidatos();
      }, []);
    
      if (erro) return <p>Erro: {erro}</p>;

      console.log(candidatos)
      
  return (
    <GaleriaSection id='galeria'>
        <SlideInTitleH2 ref={slideInRef} className="slide-in">Galeria</SlideInTitleH2>
        <SlideInTitleH3 ref={slideInRef2} className="slide-in">Explore os bastidores de uma jornada rumo ao futuro</SlideInTitleH3>
        <ContainerItensGaleria>
            {candidatos.map((item:any)=> (
                <ItemGaleria key={item.id} nome={item.name} imagem={item.image} legenda={item.caption}/>
            ))}
            
        </ContainerItensGaleria>
    </GaleriaSection>
  );
}
