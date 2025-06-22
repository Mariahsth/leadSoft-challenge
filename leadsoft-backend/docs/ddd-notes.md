# 📘 Visão DDD – Desafio LeadSoft

Este documento apresenta uma visão simplificada da modelagem de domínio adotada no desafio técnico da LeadSoft, utilizando conceitos práticos de Domain Driven Design (DDD).

---

## 🧠 Linguagem Ubíqua

Todos os nomes de entidades, variáveis e casos de uso foram baseados diretamente na narrativa do desafio, garantindo que o código reflita o negócio real.

| Termo do domínio  | Significado / uso no código |
|-------------------|-----------------------------|
| Candidato/Candidate         | Pessoa que se cadastra para a missão |
| Legenda/Caption           | Texto criativo que acompanha a imagem |
| Galeria/Gallery    | Página onde os candidatos são exibidos |
| Comentário/Comment        | Feedback público deixado em uma imagem |
| Painel admin | Área protegida com autenticação (LeadIA) |
| Usuário/User | Pessoa com autenticação de administradora que acessa o painel admin|

---

## 📦 Entidades e Modelos

- `Candidate`: Representa a inscrição de uma pessoa na missão. Contém regras como:
  - CPF e e-mail únicos
  - Validação de caracteres de CPF, email, nome
  - Validação de formato de data e idade (mínima e máxima)
  - Validação de números máximos de caracteres de legenda
  - Validação de formato e tamanho de imagem
- `Comment`: Representa um comentário público associado a um candidato. Pode ser criado livremente e removido apenas por um `User`.
- `User`: Representa um administrador autenticado. Pode realizar login e tem permissões exclusivas (ex: deletar candidatos/comentários).
> Todas essas entidades estão desacopladas da infraestrutura (como banco de dados ou Express), permitindo testabilidade e reuso.
---

## ✅ Casos de Uso (Application Layer)
Orquestram a lógica entre entidades, serviços e repositórios:

- `RegisterCandidate`: cadastra um novo candidato após validações de domínio.
- `DeleteCandidate`: remove um candidato e seus dados relacionados.
- `CommentOnCandidate`: permite ao público comentar uma inscrição de um candidato.
- `LoginUser`: autentica um administrador e gera um JWT.


---

## 🧱 Limites de Contexto (Bounded Context)

Neste desafio, todo o sistema está centrado em um único contexto: **Candidatura à Missão Espacial**.

Por isso, a modelagem segue um único domínio coeso. Caso o projeto evoluísse (ex: ranking, seleção, entrevistas), novos contextos poderiam ser mapeados e isolados.

---
## ♻️ Arquitetura Hexagonal

O projeto adota uma separação clara entre:

- **Domínio** (regras puras)
- **Aplicação** (coordenação e casos de uso)
- **Infraestrutura** (detalhes como RavenDB, Recaptcha, JWT, Express)
- **Adaptadores** (entrada/saída: rotas, controllers, middlewares)

Essa abordagem permite trocar implementações (ex: banco de dados) sem impactar o núcleo do domínio.

---


## 💡 Considerações finais

- A modelagem priorizou clareza, separação de responsabilidades e alinhamento com o problema real.
- Todos os nomes, regras e comportamentos foram inspirados no enunciado da missão LeadIA.
- A estrutura permite escalar, testar e evoluir o sistema com segurança.

