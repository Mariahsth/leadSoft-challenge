# 🚀 Desafio Full Stack – LeadSoft

Este repositório contém a solução para o desafio técnico full stack proposto pela LeadSoft.

## 🧩 Estrutura

- `leadsoft-frontend/` – Aplicação Next.js (Landing Page + Galeria)
- `leadsoft-backend/` – API Node.js com DDD + Arquitetura Hexagonal + RavenDB

## 🛠️ Tecnologias utilizadas

### Front-end
- Next.js
- React
- Styled Components
- TypeScript

### Back-end
- Node.js
- Express
- RavenDB
- DDD + Arquitetura Hexagonal
- reCAPTCHA v3

## ▶️ Como rodar o projeto localmente

(em contrução)

## 🧠 Modelagem de Domínio (DDD)

O back-end do projeto foi estruturado com base nos princípios de Domain Driven Design (DDD), com foco em refletir o domínio da missão LeadIA.

- Linguagem ubíqua alinhada ao enunciado (ex: `Candidato`, `Legenda`, `Galeria`, `Painel`)
- Casos de uso bem definidos na camada de aplicação
- Separação clara entre domínio, infraestrutura e adapters (Arquitetura Hexagonal)
- Estilo de código voltado à clareza e compreensão do problema

Mais detalhes sobre as decisões de modelagem estão no arquivo [`leadsoft-backend/docs/ddd-notes.md`](./leadsoft-backend/docs/ddd-notes.md)
