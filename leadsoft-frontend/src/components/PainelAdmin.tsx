"use client";
import {
  Botao,
  ContainerBotao,
  ContainerTitulo,
  Card,
  Formulario,
  FormSection,
  ContainerColuna,
} from "@/styles/ReusableStyle";
import styled from "styled-components";
import { RiLockFill } from "react-icons/ri";
import { useSlideInOnView } from "@/hooks/useSlideInOnView";
import { login } from "@/services/loginService";
import { CampoFormulario } from "./CampoFormulario";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

export const PainelSection = styled(FormSection)`
  flex-direction: column;
`;

export default function PainelAdmin() {
  const slideInRef = useSlideInOnView("slide-in", { threshold: 0.1 });
  const slideInRef2 = useSlideInOnView("slide-out", { threshold: 0.1 });
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [errors, setErrors] = useState<{ user?: string; password?: string }>(
    {}
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { executeRecaptcha } = useGoogleReCaptcha();

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
    const token = await executeRecaptcha?.("login");
    if (!token) {
      alert("reCAPTCHA não verificado. Tente novamente.");
      return;
    }

    try {
      setIsSubmitting(true);
      const result = await login({ user, password, recaptchaToken: token });

      alert("Login realizado com sucesso!");
      // Armazene o token ou redirecione
      Cookies.set("token", result.token, { expires: 1, secure: true, sameSite: "strict" });
      router.push("/admin");
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

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

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

        {isAuthenticated ? 
        (
          <ContainerColuna style={{ gap: "1rem", textAlign: "center" }}>
            <p>Você já está logado!</p>
            <Botao style={{ width: "100%"}} onClick={() => router.push("/admin")}>Acessar Painel</Botao>
          </ContainerColuna>
        )
        :
        (
          
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
        )
        }
      </Card>
    </PainelSection>
  );
}
