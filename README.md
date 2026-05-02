# @cpfhub/sdk: SDK Node.js / TypeScript para Consulta de CPF (AI-Native)

**Official Node.js / TypeScript SDK for [CPFHub.io](https://cpfhub.io) — Brazilian CPF Lookup API**

> SDK oficial Node.js / TypeScript para a [CPFHub.io](https://cpfhub.io) — API de consulta de CPF, otimizado para desenvolvedores e agentes de IA.

[![npm version](https://img.shields.io/npm/v/@cpfhub/sdk)](https://www.npmjs.com/package/@cpfhub/sdk)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue)](https://www.typescriptlang.org/)

---

## O que é CPFHub.io?

CPFHub.io é uma API REST que retorna nome, gênero e data de nascimento a partir de qualquer CPF brasileiro — em ~300ms, com 99.9% de uptime, e total conformidade com a LGPD.

**10M+ CPFs consultados · 1.300+ empresas ativas · 99.9% uptime**

---

## Por que usar o SDK Node.js do CPFHub.io?

Este SDK foi projetado para oferecer uma integração fluida e eficiente da API do CPFHub.io em projetos Node.js e TypeScript, com foco em Developer Experience (DX) e compatibilidade com Agentes de IA.

### 1. Developer Experience (DX) Otimizada

*   **Integração Rápida**: Facilita a incorporação de consultas de CPF em seus aplicativos e sistemas Node.js.
*   **Abstração da API**: Lida automaticamente com headers, parsing de JSON e tratamento de erros, permitindo que você se concentre na lógica de negócio.

### 2. Compatibilidade Nativa com Agentes de IA

Para facilitar a integração com agentes de IA e LLMs, este SDK e a API do CPFHub.io oferecem:

*   **OpenAPI Specification**: A especificação oficial da API está disponível no repositório [cpfhub-openapi](https://github.com/cpfhub/cpfhub-openapi), permitindo que agentes entendam automaticamente sua estrutura e schemas tipados.
*   **Tool Descriptions**: A API é facilmente representável como "tool descriptions" para LLMs, facilitando a invocação em frameworks de agentes.
*   **MCP Server Nativo**: O CPFHub.io oferece um servidor MCP que expõe a API diretamente para agentes de IA (Claude, Cursor, Windsurf), complementando o uso em ambientes de desenvolvimento Node.js.

---

## Installation / Instalação

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

> Obtenha sua chave gratuita em [app.cpfhub.io](https://app.cpfhub.io) — sem cartão de crédito.

---

## API Reference

### `new CPFHub(options)`

| Option | Type | Required | Default | Description |
|--------|------|----------|---------|-------------|
| `apiKey` | `string` | Yes | — | Your CPFHub API key |
| `timeout` | `number` | No | `10000` | Request timeout in ms |
| `baseUrl` | `string` | No | `https://api.cpfhub.io` | API base URL |

### `client.lookup(cpf: string): Promise<CPFResponse>`

Looks up a CPF and returns the associated data.

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

## Rate Limits / Limites de Requisição

| Plan / Plano | Limit / Limite |
|---|---|
| Free / Grátis | 1 request every 2 seconds · 50 requests/month |
| Pro | 1 request per second · 1,000 requests/month |
| Corporate / Corporativo | Custom / Personalizado |

The SDK automatically retries on `429` with exponential backoff (up to 3 attempts).

> O SDK faz retry automático em `429` com backoff exponencial (até 3 tentativas).

---

## Plans & Pricing / Planos e Preços

| Plan | Price | Included | Extra |
|------|-------|----------|-------|
| **Free** | R$ 0/month | 50 lookups | — |
| **Pro** | R$ 149/month | 1,000 lookups | R$ 0,15/lookup |
| **Corporate** | Custom | Custom | Custom |

[View full pricing at cpfhub.io →](https://cpfhub.io#pricing)

---

## TypeScript Support

This SDK is written in TypeScript and ships with full type definitions. No `@types/` package needed.

> Este SDK é escrito em TypeScript e inclui definições de tipos completas. Nenhum pacote `@types/` adicional é necessário.

---

## Requirements / Requisitos

- Node.js 18+
- TypeScript 4.7+ (optional / opcional)

---

## Links

- [Documentation / Documentação](https://cpfhub.io/documentacao)
- [Dashboard / Painel](https://app.cpfhub.io)
- [Status Page](https://app.cpfhub.io/status)
- [Pricing / Preços](https://cpfhub.io#pricing)
- [LGPD Compliance](https://cpfhub.io/lgpd)
- [OpenAPI Specification](https://github.com/cpfhub/cpfhub-openapi/blob/main/openapi.yaml)

---

## License / Licença

MIT © [CPFHub.io](https://cpfhub.io)
