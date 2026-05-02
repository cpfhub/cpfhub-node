# @cpfhub/sdk: Node.js / TypeScript SDK for CPFHub.io

**Official Node.js / TypeScript SDK for [CPFHub.io](https://cpfhub.io) — Brazilian CPF Lookup API**

> Official Node.js / TypeScript SDK for CPFHub.io. Retrieve identity data from a Brazilian CPF number.

[![npm version](https://img.shields.io/npm/v/@cpfhub/sdk)](https://www.npmjs.com/package/@cpfhub/sdk)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue)](https://www.typescriptlang.org/)

---

## What is CPFHub.io?

CPFHub.io is a REST API that returns name, gender, and date of birth from any Brazilian CPF number — in ~300ms, with 99.9% uptime, and full LGPD compliance.

**10M+ CPFs queried · 1,300+ active companies · 99.9% uptime**

---

## Why use the CPFHub.io Node.js SDK?

This SDK is designed to offer a fluid and efficient integration of the CPFHub.io API into Node.js and TypeScript projects, focusing on Developer Experience (DX) and compatibility with AI Agents.

### 1. Optimized Developer Experience (DX)

*   **Fast Integration**: Easily incorporate CPF lookups into your Node.js applications and systems.
*   **API Abstraction**: Automatically handles headers, JSON parsing, and error handling, allowing you to focus on business logic.

### 2. Native Compatibility with AI Agents

To facilitate integration with AI agents and LLMs, this SDK and the CPFHub.io API offer:

*   **OpenAPI Specification**: The official API specification is available at [cpfhub-openapi](https://github.com/cpfhub/cpfhub-openapi), allowing agents to automatically understand its structure and typed schemas.
*   **Tool Descriptions**: The API is easily representable as "tool descriptions" for LLMs, facilitating invocation in agent frameworks.
*   **Native MCP Server**: CPFHub.io offers an MCP server that exposes the API directly to AI agents (Claude, Cursor, Windsurf), complementing its use in Node.js development environments.

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

Check the `examples/` directory for sample usage:

*   [simple_lookup.js](examples/simple_lookup.js)
*   [real_world_onboarding.js](examples/real_world_onboarding.js)

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

---

## License

MIT © [CPFHub.io](https://cpfhub.io)
