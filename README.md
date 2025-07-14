# NLW Agents

Versão: 1.0.0
Nome do Projeto: NLW Agents Server

Projeto desenvolvido durante um evento da **Rocketseat** utilizando tecnologias modernas para criar uma API robusta e eficiente.

## 🚀 Tecnologias

* **Node.js** com TypeScript nativo (experimental strip types)
* **Fastify** - Framework web rápido e eficiente
* **PostgreSQL** com extensão **pgvector** para vetores
* **Drizzle ORM** - Operações type-safe com banco de dados
* **Zod** - Validação de schemas
* **Docker** - Containerização do banco de dados
* **Biome** - Linting e formatação de código

## 🏗️ Arquitetura

O projeto segue uma arquitetura modular com:

* **Separação de responsabilidades** entre rotas, schemas e conexão com banco
* **Tratamento de erros centralizado** para respostas consistentes
* **Organização modular de rotas** para melhor manutenção
* **Validação de schemas** com Zod para type safety
* **ORM type-safe** com Drizzle para operações de banco de dados
* **Validação de variáveis de ambiente** centralizada

## ⚙️ Configuração e Setup

### Requisitos

* Node.js (versão com suporte a `--experimental-strip-types`)
* Docker e Docker Compose

### 1. Clone o repositório

```bash
git clone https://github.com/ericrocha97/nlw-agents-server.git
cd nlw-agents-server
```

### 2. Configure o banco de dados

```bash
docker-compose up -d
```

### 3. Configure as variáveis de ambiente

Copie o arquivo de exemplo para criar seu arquivo de variáveis de ambiente:

```bash
cp .env.example .env
```

Depois, ajuste os valores conforme necessário no arquivo `.env` na raiz do projeto.

### 4. Instale as dependências

> **Importante:** Verifique se você está utilizando a versão correta do Node.js. Se você usa [nvm](https://github.com/nvm-sh/nvm), execute:

```bash
nvm use
```

Recomendação: utilize [pnpm](https://pnpm.io/) para instalar as dependências, pois o projeto foi configurado para funcionar melhor com ele.

```bash
pnpm install
```

Se preferir, você pode usar `npm install`, mas o suporte principal é para pnpm.

### 5. Rode as migrações do banco de dados

```bash
pnpm run db:migrate
```

### 6. (Opcional) Popule o banco de dados com dados de exemplo

```bash
pnpm run db:seed
```

### 7. Rode o projeto

**Desenvolvimento:**

```bash
pnpm run dev
```

**Produção:**

```bash
pnpm start
```

## 📚 Scripts Disponíveis

* `pnpm start` - Executa o servidor em modo produção
* `pnpm run dev` - Executa o servidor em modo desenvolvimento com hot reload
* `pnpm run db:seed` - Popula o banco de dados com dados de exemplo
* `pnpm run db:generate` - Gera arquivos de migração a partir do schema
* `pnpm run db:migrate` - Executa migrações pendentes do banco de dados
* `pnpm run lint` - Roda a verificação de código com Ultracite
* `pnpm run format` - Formata o código com Ultracite

## 🌐 Endpoints

A API estará disponível em `http://localhost:3333`

### Health Check

* `GET /health` - Verifica o status da aplicação

### Rooms (Salas)

* `GET /rooms` - Lista todas as salas disponíveis
* `POST /rooms` - Cria uma nova sala

  * Body: `createRoomBodySchema` (definido em `src/http/schemas/room-schemas.ts`)

    * Exemplo: `{ "name": "Minha Nova Sala", "description": "Uma sala para discussões" }`

### Questions (Perguntas)

* `GET /rooms/:roomId/questions` - Lista todas as perguntas de uma sala

  * Params: `roomIdParamsSchema` (definido em `src/http/schemas/common-schemas.ts`)
* `POST /rooms/:roomId/questions` - Cria uma nova pergunta em uma sala

  * Params: `roomIdParamsSchema` (definido em `src/http/schemas/common-schemas.ts`)
  * Body: `createQuestionBodySchema` (definido em `src/http/schemas/question-schemas.ts`)

    * Exemplo: `{ "question": "Qual o sentido da vida?" }`

### Upload de Áudio

* `POST /rooms/:roomId/audio` - Faz upload de um arquivo de áudio para uma sala

  * Params: `roomIdParamsSchema` (definido em `src/http/schemas/common-schemas.ts`)
  * Body: `multipart/form-data` contendo o arquivo de áudio.

---

Desenvolvido com ❤️ durante o NLW da Rocketseat
