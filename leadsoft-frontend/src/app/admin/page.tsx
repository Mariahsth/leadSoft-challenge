"use client"
import ProtectedRoute from "@/components/ProtectedRoute";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { ContainerTitulo } from "@/styles/ReusableStyle";
import { PainelSection } from "@/components/PainelAdmin";

export default function AdminPage() {



  return (
    <ProtectedRoute>
      <Header/>
      <PainelSection>
        <ContainerTitulo>
          <h1>Painel Admin</h1>
          <h3>Bem-vindo </h3>

        </ContainerTitulo>

      </PainelSection>

      <Footer/>
    </ProtectedRoute>
  );
}