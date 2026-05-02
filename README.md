# @cpfhub/sdk: Node.js / TypeScript SDK for CPFHub.io

🇺🇸 **English** | [🇧🇷 Português](#português)

**Official Node.js / TypeScript SDK for [CPFHub.io](https://cpfhub.io) — Brazilian CPF Lookup API**

[![npm version](https://img.shields.io/npm/v/@cpfhub/sdk)](https://www.npmjs.com/package/@cpfhub/sdk)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue)](https://www.typescriptlang.org/)

---

## What is CPFHub.io?

CPFHub.io is a REST API that returns name, gender, and date of birth from any Brazilian CPF number — in ~300ms, with 99.9% uptime, and full LGPD compliance.

**10M+ CPFs queried · 1,300+ active companies · 99.9% uptime**

---

## Installation

```bash
npm install @cpfhub/sdk
# or
yarn add @cpfhub/sdk
# or
pnpm add @cpfhub/sdk
```

---

## Quick Start

```typescript
import { CPFHub } from '@cpfhub/sdk';

const client = new CPFHub({ apiKey: process.env.CPFHUB_API_KEY });

const result = await client.lookup('00000000000');

console.log(result.data.name);      // "Fulano de Tal"
console.log(result.data.gender);    // "M"
console.log(result.data.birthDate); // "15/06/1990"
```

Get your free API key at [app.cpfhub.io](https://app.cpfhub.io) — no credit card required.

---

## curl Example

```bash
curl -X GET "https://api.cpfhub.io/cpf/12345678909" \
  -H "x-api-key: YOUR_API_KEY"
```

**Response:**

```json
{
  "success": true,
  "data": {
    "cpf": "12345678909",
    "name": "Fulano de Tal",
    "nameUpper": "FULANO DE TAL",
    "gender": "M",
    "birthDate": "15/06/1990",
    "day": 15,
    "month": 6,
    "year": 1990
  }
}
```

---

## API Reference

### `new CPFHub(options)`

| Option | Type | Required | Default | Description |
|--------|------|----------|---------|-------------|
| `apiKey` | `string` | Yes | — | Your CPFHub API key |
| `timeout` | `number` | No | `10000` | Request timeout in ms |
| `baseUrl` | `string` | No | `https://api.cpfhub.io` | API base URL |

### `client.lookup(cpf: string): Promise<CPFResponse>`

Looks up a CPF and returns the associated identity data.

| Parameter | Type | Description |
|-----------|------|-------------|
| `cpf` | `string` | CPF number — with or without formatting (`000.000.000-00` or `00000000000`) |

#### Response type

```typescript
interface CPFResponse {
  success: boolean;
  data: {
    cpf: string;       // CPF number (digits only)
    name: string;      // Full name — "Fulano de Tal"
    nameUpper: string; // Full name in uppercase — "FULANO DE TAL"
    gender: 'M' | 'F'; // Gender
    birthDate: string; // Date of birth — "DD/MM/YYYY"
    day: number;       // Birth day
    month: number;     // Birth month
    year: number;      // Birth year
  };
}
```

---

## Error Handling

```typescript
import { CPFHub, CPFHubError } from '@cpfhub/sdk';

const client = new CPFHub({ apiKey: process.env.CPFHUB_API_KEY });

try {
  const result = await client.lookup('00000000000');
  console.log(result.data.name);
} catch (error) {
  if (error instanceof CPFHubError) {
    console.error(`CPFHub error ${error.statusCode}: ${error.message}`);
    // 400 — Invalid CPF format
    // 401 — Invalid or missing API key
    // 404 — CPF not found
    // 429 — Rate limit exceeded
    // 500 — Server error
    // 503 — Service temporarily unavailable
  }
}
```

---

## Examples

Check the `examples/` directory for sample usage:

- [simple_lookup.js](examples/simple_lookup.js)
- [real_world_onboarding.js](examples/real_world_onboarding.js)

### Node.js

```typescript
import { CPFHub } from '@cpfhub/sdk';

const client = new CPFHub({
  apiKey: process.env.CPFHUB_API_KEY,
  timeout: 5000,
});

const result = await client.lookup('00000000000');
console.log(result.data);
```

### Next.js (App Router)

```typescript
// app/api/cpf/[cpf]/route.ts
import { CPFHub } from '@cpfhub/sdk';
import { NextResponse } from 'next/server';

const client = new CPFHub({ apiKey: process.env.CPFHUB_API_KEY });

export async function GET(
  request: Request,
  { params }: { params: { cpf: string } }
) {
  const result = await client.lookup(params.cpf);
  return NextResponse.json(result.data);
}
```

### Express

```typescript
import express from 'express';
import { CPFHub } from '@cpfhub/sdk';

const app = express();
const client = new CPFHub({ apiKey: process.env.CPFHUB_API_KEY });

app.get('/cpf/:cpf', async (req, res) => {
  const result = await client.lookup(req.params.cpf);
  res.json(result.data);
});

app.listen(3000);
```

### Deno

```typescript
import { CPFHub } from 'npm:@cpfhub/sdk';

const client = new CPFHub({ apiKey: Deno.env.get('CPFHUB_API_KEY') });

const result = await client.lookup('00000000000');
console.log(result.data.name);
```

---

## Rate Limits

| Plan | Limit |
|---|---|
| Free | 1 request every 2 seconds · 50 requests/month |
| Pro | 1 request per second · 1,000 requests/month |
| Corporate | Custom |

The SDK automatically retries on `429` with exponential backoff (up to 3 attempts).

---

## Plans & Pricing

| Plan | Price | Included | Extra |
|------|-------|----------|-------|
| **Free** | R$ 0/month | 50 lookups | — |
| **Pro** | R$ 149/month | 1,000 lookups | R$ 0,15/lookup |
| **Corporate** | Custom | Custom | Custom |

[View full pricing at cpfhub.io →](https://cpfhub.io#pricing)

---

## TypeScript Support

This SDK is written in TypeScript and ships with full type definitions. No `@types/` package needed.

---

## Requirements

- Node.js 18+
- TypeScript 4.7+ (optional)

---

## Links

- [Documentation](https://cpfhub.io/documentacao)
- [Dashboard](https://app.cpfhub.io)
- [Status Page](https://app.cpfhub.io/status)
- [Pricing](https://cpfhub.io#pricing)
- [LGPD Compliance](https://cpfhub.io/lgpd)
- [OpenAPI Specification](https://github.com/cpfhub/cpfhub-openapi/blob/main/openapi.yaml)
- [MCP Server (AI Agents)](https://github.com/cpfhub/cpfhub-mcp)

---

## License

MIT © [CPFHub.io](https://cpfhub.io)

---

# Português

[🇺🇸 English](#cpfhubsdk-nodejs--typescript-sdk-for-cpfhubio) | 🇧🇷 **Português**

**SDK oficial Node.js / TypeScript para [CPFHub.io](https://cpfhub.io) — API de Consulta de CPF Brasileiro**

---

## O que é o CPFHub.io?

O CPFHub.io é uma API REST que retorna nome, gênero e data de nascimento de qualquer CPF brasileiro — em ~300ms, com 99,9% de uptime e total conformidade com a LGPD.

**10M+ CPFs consultados · 1.300+ empresas ativas · 99,9% uptime**

---

## Instalação

```bash
npm install @cpfhub/sdk
# ou
yarn add @cpfhub/sdk
# ou
pnpm add @cpfhub/sdk
```

---

## Início Rápido

```typescript
import { CPFHub } from '@cpfhub/sdk';

const client = new CPFHub({ apiKey: process.env.CPFHUB_API_KEY });

const result = await client.lookup('00000000000');

console.log(result.data.name);      // "Fulano de Tal"
console.log(result.data.gender);    // "M"
console.log(result.data.birthDate); // "15/06/1990"
```

Obtenha sua chave de API gratuita em [app.cpfhub.io](https://app.cpfhub.io) — sem cartão de crédito.

---

## Exemplo curl

```bash
curl -X GET "https://api.cpfhub.io/cpf/12345678909" \
  -H "x-api-key: SUA_CHAVE_DE_API"
```

**Resposta:**

```json
{
  "success": true,
  "data": {
    "cpf": "12345678909",
    "name": "Fulano de Tal",
    "nameUpper": "FULANO DE TAL",
    "gender": "M",
    "birthDate": "15/06/1990",
    "day": 15,
    "month": 6,
    "year": 1990
  }
}
```

---

## Referência da API

### `new CPFHub(options)`

| Opção | Tipo | Obrigatório | Padrão | Descrição |
|-------|------|-------------|--------|-----------|
| `apiKey` | `string` | Sim | — | Sua chave de API do CPFHub |
| `timeout` | `number` | Não | `10000` | Timeout da requisição em ms |
| `baseUrl` | `string` | Não | `https://api.cpfhub.io` | URL base da API |

### `client.lookup(cpf: string): Promise<CPFResponse>`

Consulta um CPF e retorna os dados de identidade associados.

| Parâmetro | Tipo | Descrição |
|-----------|------|-----------|
| `cpf` | `string` | Número do CPF — com ou sem formatação (`000.000.000-00` ou `00000000000`) |

#### Tipo de resposta

```typescript
interface CPFResponse {
  success: boolean;
  data: {
    cpf: string;       // CPF (apenas dígitos)
    name: string;      // Nome completo — "Fulano de Tal"
    nameUpper: string; // Nome completo em maiúsculas — "FULANO DE TAL"
    gender: 'M' | 'F'; // Gênero
    birthDate: string; // Data de nascimento — "DD/MM/YYYY"
    day: number;       // Dia de nascimento
    month: number;     // Mês de nascimento
    year: number;      // Ano de nascimento
  };
}
```

---

## Tratamento de Erros

```typescript
import { CPFHub, CPFHubError } from '@cpfhub/sdk';

const client = new CPFHub({ apiKey: process.env.CPFHUB_API_KEY });

try {
  const result = await client.lookup('00000000000');
  console.log(result.data.name);
} catch (error) {
  if (error instanceof CPFHubError) {
    console.error(`Erro CPFHub ${error.statusCode}: ${error.message}`);
    // 400 — Formato de CPF inválido
    // 401 — Chave de API inválida ou ausente
    // 404 — CPF não encontrado
    // 429 — Limite de requisições excedido
    // 500 — Erro no servidor
    // 503 — Serviço temporariamente indisponível
  }
}
```

---

## Exemplos

Veja o diretório `examples/` para exemplos de uso:

- [simple_lookup.js](examples/simple_lookup.js)
- [real_world_onboarding.js](examples/real_world_onboarding.js)

### Node.js

```typescript
import { CPFHub } from '@cpfhub/sdk';

const client = new CPFHub({
  apiKey: process.env.CPFHUB_API_KEY,
  timeout: 5000,
});

const result = await client.lookup('00000000000');
console.log(result.data);
```

### Next.js (App Router)

```typescript
// app/api/cpf/[cpf]/route.ts
import { CPFHub } from '@cpfhub/sdk';
import { NextResponse } from 'next/server';

const client = new CPFHub({ apiKey: process.env.CPFHUB_API_KEY });

export async function GET(
  request: Request,
  { params }: { params: { cpf: string } }
) {
  const result = await client.lookup(params.cpf);
  return NextResponse.json(result.data);
}
```

### Express

```typescript
import express from 'express';
import { CPFHub } from '@cpfhub/sdk';

const app = express();
const client = new CPFHub({ apiKey: process.env.CPFHUB_API_KEY });

app.get('/cpf/:cpf', async (req, res) => {
  const result = await client.lookup(req.params.cpf);
  res.json(result.data);
});

app.listen(3000);
```

### Deno

```typescript
import { CPFHub } from 'npm:@cpfhub/sdk';

const client = new CPFHub({ apiKey: Deno.env.get('CPFHUB_API_KEY') });

const result = await client.lookup('00000000000');
console.log(result.data.name);
```

---

## Limites de Requisição

| Plano | Limite |
|---|---|
| Gratuito | 1 requisição a cada 2 segundos · 50 requisições/mês |
| Pro | 1 requisição por segundo · 1.000 requisições/mês |
| Corporativo | Personalizado |

O SDK faz retry automático no erro `429` com backoff exponencial (até 3 tentativas).

---

## Planos e Preços

| Plano | Preço | Incluído | Extra |
|-------|-------|----------|-------|
| **Gratuito** | R$ 0/mês | 50 consultas | — |
| **Pro** | R$ 149/mês | 1.000 consultas | R$ 0,15/consulta |
| **Corporativo** | Personalizado | Personalizado | Personalizado |

[Ver preços completos em cpfhub.io →](https://cpfhub.io#pricing)

---

## Suporte a TypeScript

Este SDK é escrito em TypeScript e já inclui as definições de tipo. Não é necessário instalar nenhum pacote `@types/`.

---

## Requisitos

- Node.js 18+
- TypeScript 4.7+ (opcional)

---

## Links

- [Documentação](https://cpfhub.io/documentacao)
- [Dashboard](https://app.cpfhub.io)
- [Página de Status](https://app.cpfhub.io/status)
- [Preços](https://cpfhub.io#pricing)
- [Conformidade LGPD](https://cpfhub.io/lgpd)
- [Especificação OpenAPI](https://github.com/cpfhub/cpfhub-openapi/blob/main/openapi.yaml)
- [Servidor MCP (Agentes de IA)](https://github.com/cpfhub/cpfhub-mcp)

---

## Licença

MIT © [CPFHub.io](https://cpfhub.io)
