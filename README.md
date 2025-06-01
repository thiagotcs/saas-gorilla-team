# 🥋 Jiu-Jitsu SaaS + RBAC

Este projeto é uma base completa para construir um SaaS multi-tenant com foco em academias de jiu-jitsu. Ele inclui autenticação, autorização por papéis (RBAC), gestão de academias, turmas e faturamento.

---

## ✅ Funcionalidades

### 🔐 Autenticação

- [ ] Autenticação por e-mail e senha;
- [ ] Autenticação via conta do Google;
- [ ] Recuperação de senha por e-mail;
- [ ] Criação de conta (nome, e-mail e senha);

### 🥋 Academias

- [ ] Criar nova academia;
- [ ] Listar academias do usuário;
- [ ] Atualizar dados da academia;
- [ ] Encerrar uma academia;
- [ ] Transferir a propriedade da academia;

### 📩 Convites

- [ ] Convidar novo membro (e-mail e função);
- [ ] Aceitar convite;
- [ ] Revogar convite pendente;

### 👥 Membros

- [ ] Listar membros da academia;
- [ ] Atualizar função de um membro;

### 🏫 Turmas (Classes)

- [ ] Listar turmas da academia;
- [ ] Criar nova turma (nome, horários, instrutor);
- [ ] Atualizar turma;
- [ ] Excluir turma;

### 💳 Faturamento

- [ ] Visualizar dados de cobrança da academia (`R$10 por membro`, exceto função `billing`);
- [ ] Exportar informações de cobrança;

---

## 🔐 RBAC – Papéis e Permissões

### 🎭 Papéis disponíveis

- **Administrador (Owner)** — dono da academia
- **Instrutor** — responsável técnico pelos treinos
- **Recepção (Billing)** — gestão financeira e suporte
- **Aluno** — usuário comum matriculado
- **Responsável** — pais ou responsáveis legais
- **Lead** — interessado ainda não matriculado
- **Anônimo** — visitante não autenticado

---

### 📊 Tabela de Permissões

| Ação                               | Admin | Instrutor | Recepção | Aluno | Responsável | Lead | Anônimo |
| ---------------------------------- | :---: | :-------: | :------: | :---: | :---------: | :--: | :-----: |
| Atualizar dados da academia        |  ✅   |    ❌     |    ❌    |  ❌   |     ❌      |  ❌  |   ❌    |
| Deletar academia                   |  ✅   |    ❌     |    ❌    |  ❌   |     ❌      |  ❌  |   ❌    |
| Convidar membros                   |  ✅   |    ❌     |    ✅    |  ❌   |     ❌      |  ❌  |   ❌    |
| Revogar convite                    |  ✅   |    ❌     |    ✅    |  ❌   |     ❌      |  ❌  |   ❌    |
| Listar membros da academia         |  ✅   |    ✅     |    ✅    |  ⚠️   |     ✅      |  ❌  |   ❌    |
| Transferir propriedade da academia |  ⚠️   |    ❌     |    ❌    |  ❌   |     ❌      |  ❌  |   ❌    |
| Atualizar papel de um membro       |  ✅   |    ❌     |    ✅    |  ❌   |     ❌      |  ❌  |   ❌    |
| Excluir um membro                  |  ✅   |    ⚠️     |    ❌    |  ❌   |     ❌      |  ❌  |   ❌    |
| Listar turmas                      |  ✅   |    ✅     |    ✅    |  ⚠️   |     ✅      |  ❌  |   ❌    |
| Criar turma                        |  ✅   |    ✅     |    ⚠️    |  ❌   |     ❌      |  ❌  |   ❌    |
| Atualizar turma                    |  ✅   |    ✅     |    ⚠️    |  ❌   |     ❌      |  ❌  |   ❌    |
| Excluir turma                      |  ✅   |    ✅     |    ⚠️    |  ❌   |     ❌      |  ❌  |   ❌    |
| Visualizar dados de faturamento    |  ✅   |    ❌     |    ✅    |  ❌   |     ❌      |  ❌  |   ❌    |
| Exportar dados de faturamento      |  ✅   |    ❌     |    ✅    |  ❌   |     ❌      |  ❌  |   ❌    |

> ✅ = permitido  
> ❌ = não permitido  
> ⚠️ = permitido com condições específicas

---

## 📌 Regras Condicionais

- Apenas **administradores** podem transferir a propriedade da academia;
- **Instrutores** só podem editar/excluir turmas das quais são responsáveis;
- **Alunos** e **responsáveis** podem visualizar apenas dados da própria academia;
- **Leads** e **anônimos** não têm acesso ao ambiente interno;

---

## 🛠️ Tecnologias principais

- [Next.js](https://nextjs.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [Prisma ORM](https://www.prisma.io/)
- [NextAuth.js](https://next-auth.js.org/)
- [CASL](https://casl.js.org/) para permissões
- [Stripe](https://stripe.com/) para billing
- [Zod](https://zod.dev/) para validações
- [tRPC](https://trpc.io/) para rotas typesafe (opcional)

---

## 📁 Estrutura multi-tenant

Cada usuário pode pertencer a múltiplas **academias** com diferentes papéis, garantindo isolamento de dados e controle de acesso por RBAC.

---

## 🧪 Testes e deploy

> Em desenvolvimento. Deploy sugerido via Vercel + Railway ou Supabase.

---

## 📄 Licença

MIT © Thiago – Desenvolvido com foco em projetos reais de academias.
