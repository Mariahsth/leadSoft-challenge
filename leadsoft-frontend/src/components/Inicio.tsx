"use client";
import styled from "styled-components";
import { MdRocketLaunch } from "react-icons/md";
import { HiOutlineSparkles } from "react-icons/hi2";
import { breakpoints } from "@/styles/breakPoints";
import { slideInStyle } from "@/styles/slideAnimation";
import { useSlideInOnView } from "@/hooks/useSlideInOnView";
import { ContainerColuna, ContainerHorizontal } from "@/styles/ReusableStyle";

const ContainerInicio = styled(ContainerColuna)`
  padding: 1rem 5rem;

  @media (max-width: ${breakpoints.tablet}) {
    padding: 1rem;
  }
`;
const TituloInicio = styled(ContainerHorizontal)`
  gap: 1rem;
  font-size: 1.7em;
  padding: 1em 0;
  text-align:center;
  ${slideInStyle}
  @media (max-width: ${breakpoints.tablet}) {
    flex-direction: column;
  }
  @media (max-width: ${breakpoints.mobile}) {
    font-size: 1.2em;
  }
`;
const TextoDestaque = styled.strong`
  color: var(--primary-color2);
`;
const ConteudoInicio = styled.div`
  display: flex;
  border: 1px solid var(--secundary-color12);
  border-radius: 16px;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.25);
  ${slideInStyle}
  @media (max-width: ${breakpoints.mobile}) {
    flex-direction: column;
  }
`;
const ImgLeadIA = styled.img`
  width: 15rem;
  height: auto;
`;
const LegendaLeadIA = styled.p`
  border: 1px solid var(--secundary-color12);
  border-radius: 0 0 0 16px;
  padding: 1rem;
  background: linear-gradient(
    to bottom,
    var(--primary-color1),
    var(--secundary-color12)
  );

  @media (max-width: ${breakpoints.mobile}) {
    border-radius: 0;
  }
`;
const ContainerImgInicio = styled(ContainerColuna)`
  width: 50%;
  border-right: 1px solid var(--secundary-color12);
  background-image: url("/space.webp");
  background-size: cover;
  background-position: center;
  border-radius: 16px 0 0 16px;
  opacity: 1;
  overflow: hidden;
  @media (max-width: ${breakpoints.mobile}) {
    width: 100%;
    border-radius: 16px 16px 0 0;
  }
`;
const ContainerTextoInicio = styled(ContainerColuna)`
  justify-content: space-between;
  width: 80%;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url("/astronaut.webp");
    background-size: cover;
    background-position: 50% 50%;
    opacity: 0.2;
    z-index: 0;
    border-radius: 0 16px 16px 0;
    overflow: hidden;
  }

  & > * {
    position: relative;
    z-index: 1;
  }

  & > h2 {
    margin-top: 2rem;
  }
  @media (max-width: ${breakpoints.mobile}) {
    width: 100%;
    border-radius: 0 0 16px 16px;
  }
`;
const ConteudoTexto = styled(ContainerColuna)`
  margin: 3rem 0.5rem;
  gap: 0.7rem;
  text-align:center;
`;

export default function Inicio() {
  const slideInRef = useSlideInOnView("slide-in", { threshold: 0.1 });
  const slideInRef2 = useSlideInOnView("slide-in", { threshold: 0.05 });

  return (
    <ContainerInicio>
      <TituloInicio ref={slideInRef} className="slide-in">
        <h1 >
          Missão Marte com a <TextoDestaque>LeadSoft </TextoDestaque>
        </h1>
        <div >
          <MdRocketLaunch color="var(--secundary-color5)" size={32} />
        </div>
      </TituloInicio>
      <ConteudoInicio ref={slideInRef2} className="slide-out">
        <ContainerImgInicio>
          <ImgLeadIA src="/LeadIA.webp" alt="Ilustração da inteligência artificial LeadSoft" loading="lazy" />
          <LegendaLeadIA>
            A <TextoDestaque>LeadIA</TextoDestaque>, nossa agente espacial mais
            inteligente e visionária, está formando a tripulação perfeita para
            uma missão inédita rumo a Marte — e você pode ser parte dessa
            jornada histórica!
          </LegendaLeadIA>
        </ContainerImgInicio>
        <ContainerTextoInicio>
          <h2>Embarque na Missão!</h2>
          <ContainerColuna>
            <h4>Atenção, exploradores do futuro!</h4>
            <ConteudoTexto>
              <p>
                Na LeadSoft, acreditamos que a inovação não tem limites — e
                agora, vamos além da Terra em busca de novos horizontes,
                desafios e conquistas.
              </p>
              <p>
                Se você é movido por tecnologia, coragem e um espírito
                aventureiro, essa missão é para você!
              </p>
              <p>
                Descubra os desafios, conheça a tripulação e inscreva-se para
                fazer parte da nossa história interplanetária.
              </p>

              <p>Prepare-se para decolar com a gente.</p>
              <HiOutlineSparkles color="var(--secundary-color9)" size={24} />
            </ConteudoTexto>
          </ContainerColuna>
        </ContainerTextoInicio>
      </ConteudoInicio>
    </ContainerInicio>
  );
}
