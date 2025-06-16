"use client";
import {
  Botao,
  ContainerBotao,
  ContainerTitulo,
  Card,
  Formulario,
  Input,
  FormSection,
  ContainerColuna,
} from "@/styles/ReusableStyle";
import styled from "styled-components";
import { RiLockFill } from "react-icons/ri";
import { useSlideInOnView } from "@/hooks/useSlideInOnView";
import { login } from "@/services/loginService";
import { CampoFormulario } from "./CampoFormulario";
import { useState } from "react";

export const PainelSection = styled(FormSection)`
  flex-direction: column;
`;

export default function PainelAdmin() {
  const slideInRef = useSlideInOnView("slide-in", { threshold: 0.1 });
  const slideInRef2 = useSlideInOnView("slide-out", { threshold: 0.1 });

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ user?: string; password?: string }>(
    {}
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    if (!user || !password) {
      setErrors({
        user: !user ? "Usuário é obrigatório" : undefined,
        password: !password ? "Senha é obrigatória" : undefined,
      });
      return;
    }

    try {
      setIsSubmitting(true);
      const result = await login({ user, password });

      alert("Login realizado com sucesso!");
      // Armazene o token ou redirecione
      // localStorage.setItem("token", result.token);
      // router.push("/dashboard"); <-- se usar next/navigation
    } catch (error: any) {
      // Erro retornado do backend: { field: "user", message: "Usuário inválido" }
      if (error.field && error.message) {
        setErrors((prev) => ({ ...prev, [error.field]: error.message }));
      } else {
        alert(error.message || "Erro desconhecido.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PainelSection id="admin">
      <ContainerTitulo ref={slideInRef} className="slide-in">
        <h2>Painel Admin </h2>
        <ContainerColuna>
          <h3>Acesso restrito </h3>
          <RiLockFill color={"var(--primary-color2)"} aria-hidden />
        </ContainerColuna>
      </ContainerTitulo>
      <Card ref={slideInRef2} className="slide-out">
        <Formulario onSubmit={handleSubmit}>
          <h3>Login</h3>

          <CampoFormulario
            id="user"
            label="Usuário:"
            type="text"
            value={user}
            error={errors.user}
            required
            onChange={(e) => setUser(e.target.value)}
          />

          <CampoFormulario
            id="password"
            label="Senha:"
            type="password"
            value={password}
            error={errors.password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />

          <ContainerBotao>
            <Botao
              type="submit"
              disabled={isSubmitting}
              aria-busy={isSubmitting}
            >
              {isSubmitting ? "Enviando..." : "Entrar"}
            </Botao>
            <Botao
              type="reset"
              onClick={() => {
                setUser("");
                setPassword("");
                setErrors({});
              }}
            >
              Cancelar
            </Botao>
          </ContainerBotao>
        </Formulario>
      </Card>
    </PainelSection>
  );
}
