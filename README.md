
# NLW Agents

Versão: 1.0.0  
Nome do projeto: Nlw Agents Server

Projeto desenvolvido durante um evento da **Rocketseat** utilizando tecnologias modernas para criação de uma API robusta e eficiente.

## 🚀 Tecnologias

- **Node.js** com TypeScript nativo (experimental strip types)
- **Fastify** - Framework web rápido e eficiente
- **PostgreSQL** com extensão **pgvector** para vetores
- **Drizzle ORM** - Type-safe database operations
- **Zod** - Schema validation
- **Docker** - Containerização do banco de dados
- **Biome** - Linting e formatação de código

## 🏗️ Arquitetura

O projeto segue uma arquitetura modular com:

- **Separação de responsabilidades** entre rotas, schemas e conexão com banco
- **Validação de schemas** com Zod para type safety
- **ORM type-safe** com Drizzle para operações de banco de dados
- **Validação de variáveis de ambiente** centralizadas

## ⚙️ Setup e Configuração

### Pré-requisitos

- Node.js (versão com suporte a `--experimental-strip-types`)
- Docker e Docker Compose

### 1. Clone o repositório

```bash
git clone <url-do-repositorio>
cd server
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

> **Importante:** Certifique-se de estar usando a versão correta do Node.js. Se você utiliza o [nvm](https://github.com/nvm-sh/nvm), execute:

```bash
nvm use
```

Recomendado: utilize o [pnpm](https://pnpm.io/) para instalar as dependências, pois o projeto foi configurado para funcionar melhor com ele.

```bash
pnpm install
```

Se preferir, você pode usar `npm install`, mas o suporte principal é para pnpm.

### 5. Execute as migrações do banco

```bash
pnpm drizzle-kit migrate
```

### 6. (Opcional) Popule o banco com dados de exemplo

```bash
pnpm run db:seed
```

### 7. Execute o projeto

**Desenvolvimento:**

```bash
pnpm run dev
```

**Produção:**

```bash
pnpm start
```

## 📚 Scripts Disponíveis

- `pnpm start` - Executa o servidor em modo de produção
- `pnpm run dev` - Executa o servidor em modo de desenvolvimento com hot reload
- `pnpm run db:seed` - Popula o banco de dados com dados de exemplo
- `pnpm run db:generate` - Gera os arquivos de migração do banco de dados baseado no schema
- `pnpm run db:migrate` - Executa as migrações pendentes do banco de dados
- `pnpm run lint` - Executa a verificação de código com o Ultracite
- `pnpm run format` - Formata o código com o Ultracite

## 🌐 Endpoints

A API estará disponível em `http://localhost:3333`

### Health Check

- `GET /health` - Verifica o status da aplicação

### Salas

- `GET /rooms` - Lista todas as salas disponíveis
- `POST /rooms` - Cria uma nova sala
  - Body: `{ "name": string, "description": string? }`

### Perguntas

- `GET /rooms/:roomId/questions` - Lista todas as perguntas de uma sala
- `POST /rooms/:roomId/questions` - Cria uma nova pergunta em uma sala
  - Body: `{ "question": string }`

---

Desenvolvido com ❤️ durante o NLW da Rocketseat
