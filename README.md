<<<<<<< HEAD
<div align="center">

# 📚 Biblioteca API — NP2  
### Backend REST de uma Biblioteca Virtual Pública para NP2 
Construído com **NestJS + Prisma + PostgreSQL**

### ✨ Desenvolvido por Victtoria Correia, João Vitor Lima e ...
<img src="https://img.shields.io/badge/NestJS-v11-red?style=for-the-badge" />
<img src="https://img.shields.io/badge/Prisma-v6-blue?style=for-the-badge" />
<img src="https://img.shields.io/badge/PostgreSQL-16+-blue?style=for-the-badge" />
<img src="https://img.shields.io/badge/Status-Em%20Desenvolvimento-success?style=for-the-badge" />

</div>

---

## 🧰 Tecnologias Utilizadas

| Categoria | Tecnologias |
|------------|--------------|
| **Backend** | [NestJS](https://nestjs.com/), TypeScript |
| **Banco de Dados** | [PostgreSQL](https://www.postgresql.org/), [Prisma ORM](https://www.prisma.io/) |
| **Documentação** | Swagger (OpenAPI 3.0) |
| **Controle de Versão** | Git + GitHub |

---

## 🚀 Como Rodar o Projeto

### 1️⃣ Clonar o repositório

git clone https://github.com/Victtoriacorreia01/biblioteca-api-np2.git
cd biblioteca-api-np2

### 2️⃣ Instalar dependências
npm install

3️⃣ Criar e configurar .env

Crie um arquivo .env na raiz com o conteúdo corretamente!

4️⃣ Rodar migrations >
npx prisma migrate dev

5️⃣ Subir o servidor >
npm run start:dev

6️⃣ Acessar documentação >

📘 Swagger: http://localhost:3000/docs

### 🧩 Funcionalidades

# ✅ Parte A — Victtoria Correia

Inicialização completa do projeto (Nest, Prisma, Swagger)

CRUD de Autores (Authors)

CRUD de Categorias (Categories)

# 🧠 Parte B — Colega 1

CRUD de Livros (Books)

Endpoints de Relatórios (Reports) (não-CRUD)

# 👤 Parte C — Colega 2

CRUD de Membros (Members)

CRUD de Empréstimos (Loans) (com regras e multas automáticas)


### 📦 Scripts Úteis
Comando	Descrição
npm run start:dev	Inicia a API em modo dev
npx prisma migrate dev	Executa migrations
npx prisma studio	Abre painel visual do banco
npx prisma db seed	Popula dados iniciais


### 👥 Equipe
Nome	Função	Parte
Victtoria Correia	Backend Base + CRUDs iniciais	Parte A
Colega 1	Livros + Relatórios	Parte B
Colega 2	Membros + Empréstimos	Parte C


### 🧱 Resumo das entidades:


# Author:
Representa os autores dos livros >	name, country, birthYear, bio

# Category:
Classificação dos livros >	name, description, createdAt, updatedAt

# Book:
Livros cadastrados no sistema >	title, isbn, publishedYear, totalCopies, availableCopies

# Member:
Usuários que pegam livros emprestados >	fullName, email, phone, registeredAt, isActive

# Loan: 
Empréstimos de livros >	memberId, bookId, loanDate, dueDate, returnDate, status, fineCents

### ✨ Funcionalidade Extra (além do CRUD)

Foi adicionada uma rota personalizada em AuthorsController:

GET /authors/by-country/:country

Retorna todos os autores cujo campo country contém o termo informado, ignorando maiúsculas e minúsculas.
=======
# 📚 Biblioteca API — NP2 (Backend REST)

API REST para **Biblioteca Virtual Pública** (NP2) com **NestJS + Prisma + PostgreSQL**.
Documentação disponível em **Swagger**.

## 🧰 Stack
- **Node.js 20+**, **NestJS**, **TypeScript**
- **Prisma ORM** (migrations)
- **PostgreSQL**
- **Swagger** (OpenAPI) em `/docs`

---

## ✅ Requisitos
- Node 20+ (`node -v`)
- npm 10+ (`npm -v`)
- PostgreSQL 16+ (local) **ou** Docker
- Git

---

## 🔐 Configuração de ambiente
Crie um arquivo **`.env`** na raiz (use o exemplo abaixo).
> Nunca comitar senhas no repositório.

```env
# .env (exemplo) — ajuste se necessário
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/biblioteca?schema=public"
PORT=3000

Como rodar (Passo a passo)
# 1) Instalar dependências
npm i

# 2) Gerar/atualizar o banco (migrations)
npx prisma migrate dev

# (opcional) Popular dados de exemplo
# npx prisma db seed

# 3) Subir a API em desenvolvimento
npm run start:dev

Acesse o Swagger: http://localhost:3000/docs

>>>>>>> 7da3090 (feat: nova funcionalide de filtragem)
