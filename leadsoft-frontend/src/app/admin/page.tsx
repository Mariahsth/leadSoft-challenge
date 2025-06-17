"use client"
import ProtectedRoute from "@/components/ProtectedRoute";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { ContainerItensGaleria, ContainerTitulo } from "@/styles/ReusableStyle";
import { PainelSection } from "@/components/PainelAdmin";
import ItemGaleria from "@/components/ItemGaleria";
import { buscarCandidatos } from "@/services/galeriaService";
import { useEffect, useState } from "react";
import { Candidate } from "@/types/Candidate";

export default function AdminPage() {
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
    <ProtectedRoute>
      <Header/>
      <PainelSection>
        <ContainerTitulo>
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
                      nome={item.name}
                      imagem={item.image}
                      legenda={item.caption}
                      cpf={item.cpf}
                      dataNascimento={item.dateOfBirth}
                      email={item.email}
                    />
                  ))}
                </ContainerItensGaleria>
              )}

      </PainelSection>

      <Footer/>
    </ProtectedRoute>
  );
}