"use client";
import ProtectedRoute from "@/components/ProtectedRoute";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { ContainerItensGaleria, ContainerTitulo } from "@/styles/ReusableStyle";
import { PainelSection } from "@/components/PainelAdmin";
import ItemGaleria from "@/components/ItemGaleria";
import { buscarCandidatos } from "@/services/candidateService";
import { useEffect, useState } from "react";
import { Candidate } from "@/types/Candidate";
import { useSlideInOnView } from "@/hooks/useSlideInOnView";

export default function AdminPage() {
  const [candidatos, setCandidatos] = useState<Candidate[]>([]);
  const [erro, setErro] = useState("");
  const slideInRef = useSlideInOnView("slide-in", { threshold: 0.1 });

  useEffect(() => {
    const fetchCandidatos = async () => {
      try {
        const data: Candidate[] = await buscarCandidatos();
        setCandidatos(data);
      } catch (err: any) {
        setErro("Ops! Houve um problema ao buscar os candidatos inscritos");
      }
    };

    fetchCandidatos();
  }, []);

  return (
    <ProtectedRoute>
      <Header />
      <PainelSection>
        <ContainerTitulo ref={slideInRef} className="slide-in">
          <h1>Painel Admin</h1>
          <h3>Candidatos cadastrados</h3>
        </ContainerTitulo>
        {erro ? (
          <p>Erro: {erro}</p>
        ) : candidatos.length === 0 ? (
          <p>Nenhum candidato inscrito</p>
        ) : (
          <ContainerItensGaleria>
            {candidatos.map((item) => (
              <ItemGaleria
                key={item.id}
                id={item.id}
                nome={item.name}
                imagem={item.image}
                legenda={item.caption}
                cpf={item.cpf}
                dataNascimento={item.dateOfBirth}
                email={item.email}
                onDelete={(id) => {
                  setCandidatos(prev => prev.filter(c => c.id !== id));
                }}
              />
            ))}
          </ContainerItensGaleria>
        )}
      </PainelSection>

      <Footer />
    </ProtectedRoute>
  );
}
