"use client";
import { breakpoints } from "@/styles/breakPoints";
import styled from "styled-components";
import ItemGaleria from "./ItemGaleria";


const GaleriaSection=styled.section`
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
padding: 1rem 2rem;
border: 1px solid var(--secundary-color12);
padding:9rem 1rem;
gap:0.8rem;
text-align:center;
`
const ContainerItensGaleria=styled.div`
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap:1rem;
    padding:1rem;
    margin-top:2rem;

    @media (max-width: ${breakpoints.tablet}) {
        grid-template-columns: repeat(3, minmax(0, 1fr));
    }
    @media (max-width: ${breakpoints.mobile}) {
        grid-template-columns: repeat(1, minmax(0, 1fr));
    }
`


export default function Galeria() {
    const listaGaleria=[
        {
            id:1,
            nome:'Nome1',
            imagem:'/LeadIA-perfil.png',
            legenda:'Legenda1'
        },
        {
            id:2,
            nome:'Nome2',
            imagem:'/LeadIA-perfil.png',
            legenda:'Legenda2'
        },
        {
            id:3,
            nome:'Nome3',
            imagem:'/LeadIA-perfil.png',
            legenda:'Legenda3'
        },
        {
            id:4,
            nome:'Nome4',
            imagem:'/LeadIA-perfil.png',
            legenda:'Legenda4'
        },
        {
            id:5,
            nome:'Nome5',
            imagem:'/LeadIA-perfil.png',
            legenda:'Legenda5'
        },
        {
            id:6,
            nome:'Nome6',
            imagem:'/LeadIA-perfil.png',
            legenda:'Legenda6'
        },
        {
            id:7,
            nome:'Nome74',
            imagem:'/LeadIA-perfil.png',
            legenda:'Legenda7'
        },
        {
            id:8,
            nome:'Nome8',
            imagem:'/LeadIA-perfil.png',
            legenda:'Legenda8'
        },
    ]
  return (
    <GaleriaSection id='galeria'>
        <h2>Galeria</h2>
        <h4>Explore os bastidores de uma jornada rumo ao futuro.</h4>
        <ContainerItensGaleria>
            {listaGaleria.map((item)=> (
                <ItemGaleria key={item.id} nome={item.nome} imagem={item.imagem} legenda={item.legenda}/>
            ))}
            
        </ContainerItensGaleria>
    </GaleriaSection>
  );
}
