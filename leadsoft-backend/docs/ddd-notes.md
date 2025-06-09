# 📘 Visão DDD – Desafio LeadSoft

Este documento apresenta uma visão simplificada da modelagem de domínio adotada no desafio técnico da LeadSoft, utilizando conceitos práticos de Domain Driven Design (DDD).

---

## 🧠 Linguagem Ubíqua

Todos os nomes de entidades, variáveis e casos de uso foram baseados diretamente na narrativa do desafio, garantindo que o código reflita o negócio real.

| Termo do domínio  | Significado / uso no código |
|-------------------|-----------------------------|
| Candidato         | Pessoa que se cadastra para a missão |
| Legenda           | Texto criativo que acompanha a imagem |
| Galeria pública   | Página onde os candidatos são exibidos |
| Comentário        | Feedback público deixado em uma imagem |
| Painel de administração | Área protegida com autenticação (LeadIA) |

---

## 📦 Entidades e Modelos

- `Candidato`: representa a pessoa inscrita com nome, CPF único, e-mail único, data de nascimento, legenda e imagem.
- `Comentário`: associado a um candidato, pode ser adicionado e removido.
- `Imagem`: armazenada como attachment no RavenDB, associada a um `Candidato`.

---

## ✅ Casos de Uso (Application Layer)

- `CadastrarCandidato`
- `ComentarCandidato`
- `ExcluirCandidato`
- `ListarCandidatos`
- `VisualizarGaleria`
- `LoginLeadIA`

---

## 🧱 Limites de Contexto (Bounded Context)

Neste desafio, todo o sistema gira em torno do contexto único de **Candidatura à Missão**. Portanto, não foi necessário mapear múltiplos contextos.

---

## 💡 Considerações

- A modelagem priorizou a clareza e o alinhamento com o negócio.
- O domínio foi isolado da infraestrutura com base em Arquitetura Hexagonal.
- O reCAPTCHA e a persistência (RavenDB) são tratados como detalhes externos, seguindo os princípios de DDD.

