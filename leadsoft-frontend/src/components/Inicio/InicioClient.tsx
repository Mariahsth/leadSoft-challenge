"use client";

import {
  TituloInicio,
  TextoDestaque,
  ConteudoInicio,
  ConteudoTexto,
  CardInicio,
} from "./InicioStyle";
import { MdRocketLaunch } from "react-icons/md";
import { HiOutlineSparkles } from "react-icons/hi2";
import { ContainerColuna } from "@/styles/ReusableStyle";
import { useSlideInOnView } from "@/hooks/useSlideInOnView";

export default function InicioClient() {
  const slideInRef = useSlideInOnView("slide-in", { threshold: 0.1 });
  const slideInRef2 = useSlideInOnView("slide-in", { threshold: 0.05 });

  return (
    <>
      <TituloInicio ref={slideInRef} className="slide-in">
        <h1>
          Missão Marte com a <TextoDestaque>LeadSoft </TextoDestaque>
        </h1>
        <div>
          <MdRocketLaunch color="var(--secundary-color5)" size={32} />
        </div>
      </TituloInicio>
      <ConteudoInicio ref={slideInRef2} className="slide-out">

        <ContainerColuna>
          <CardInicio>
            <h2>Embarque na Missão!</h2>
            <h4>Atenção, exploradores do futuro!</h4>
            <ConteudoTexto>
              <p>
                  A <TextoDestaque>LeadIA</TextoDestaque>, nossa agente espacial mais
                  inteligente e visionária, está formando a tripulação perfeita para
                  uma missão inédita rumo a Marte — e você pode ser parte dessa
                  jornada histórica!
              </p>
              <div>
                  <p>
                    Na LeadSoft, acreditamos que a inovação não tem limites — e
                    agora, vamos além da Terra em busca de novos horizontes,
                    desafios e conquistas.
                  </p>
                  <p>
                    Se você é movido por tecnologia, coragem e um espírito
                    aventureiro, essa missão é para você!
                  </p>
              </div>
                <p>
                  Descubra os desafios, conheça a tripulação e inscreva-se para
                  fazer parte da nossa história interplanetária.
                </p>
                <div>
                  <p>Prepare-se para decolar com a gente.</p>
                  <HiOutlineSparkles color="var(--secundary-color9)" size={24} />
                </div>
            </ConteudoTexto>
          </CardInicio>
        </ContainerColuna>
      </ConteudoInicio>
    </>
  );
}
