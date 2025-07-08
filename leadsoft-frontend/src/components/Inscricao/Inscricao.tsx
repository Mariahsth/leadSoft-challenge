import { FormSection, ContainerTitulo } from "@/styles/ReusableStyle";
import { ImgFoguete } from "./InscricaoStyle";
import InscricaoClient from "./InscricaoClient";

export default function Inscricao() {
  return (
    <FormSection id="form">
      <ContainerTitulo>
        <h2>Grandes jornadas começam com um clique</h2>
        <h3>Inscreva-se e transforme o amanhã</h3>
        <ImgFoguete src="/rocket3.png" alt="Foguete" loading="lazy" />
      </ContainerTitulo>

      <InscricaoClient />
    </FormSection>
  );
}
