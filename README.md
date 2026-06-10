# About Me - full-stack portfolio

Pełnostosowa aplikacja portfolio z modułem projektów, uwierzytelnianiem
użytkowników oraz prezentacją danych glikemicznych. Repozytorium jest monorepo
zarządzanym przez pnpm i Turborepo.

## Aplikacje

| Aplikacja | Technologia | Port | Dokumentacja |
| --- | --- | --- | --- |
| Frontend | React, TypeScript, Vite | `2000` | [apps/web/README.md](apps/web/README.md) |
| Backend | NestJS, TypeORM, PostgreSQL | `2100` | [apps/api/README.md](apps/api/README.md) |

## Najważniejsze funkcje

- responsywne i wielojęzyczne portfolio,
- prezentacja oraz filtrowanie projektów,
- rejestracja, logowanie i autoryzacja JWT,
- role i uprawnienia użytkowników,
- integracja z LibreView oraz Dexcom,
- wykresy glikemii i statystyki Time in Range,
- dokumentacja API generowana przez Swagger,
- jasny i ciemny motyw,
- obsługa trybu konserwacji i statusu usług.

## Stos technologiczny

**Frontend:** React 19, TypeScript, Vite, Tailwind CSS, React Router, TanStack
React Query, Zustand, Axios, i18next, Recharts i Framer Motion.

**Backend:** NestJS 11, TypeScript, TypeORM, PostgreSQL, Redis, Passport JWT,
Swagger, class-validator i Jest.

**Monorepo:** pnpm workspaces, Turborepo i Prettier.

## Struktura repozytorium

```text
.
|-- apps/
|   |-- api/          # REST API w NestJS
|   `-- web/          # aplikacja SPA w React
|-- package.json      # wspólne skrypty monorepo
|-- pnpm-workspace.yaml
`-- turbo.json
```

## Wymagania

- Node.js 24,
- pnpm 10,
- PostgreSQL,
- Redis, wymagany w środowisku produkcyjnym i opcjonalny lokalnie.

## Instalacja

Z katalogu głównego repozytorium:

```bash
pnpm install
```

Następnie utwórz pliki środowiskowe:

```text
apps/web/.env
apps/api/.env
```

Wzorcowe wartości znajdują się w plikach `.env.example` obu aplikacji.

## Uruchomienie lokalne

Frontend:

```bash
pnpm --dir apps/web dev
```

Backend:

```bash
pnpm --dir apps/api start:dev
```

Po uruchomieniu dostępne są:

- frontend: `http://localhost:2000`,
- API: `http://localhost:2100`,
- Swagger UI: `http://localhost:2100/docs`,
- OpenAPI JSON: `http://localhost:2100/docs-json`.

## Skrypty monorepo

| Komenda | Działanie |
| --- | --- |
| `pnpm build` | Buduje aplikacje przez Turborepo. |
| `pnpm lint` | Uruchamia lintowanie pakietów. |
| `pnpm format` | Formatuje pliki TypeScript, TSX i Markdown. |
| `pnpm dev` | Uruchamia zadania `dev` dostępne w pakietach. |

Szczegółowe komendy i konfiguracja znajdują się w README poszczególnych
aplikacji.

## Przepływ OpenAPI

Backend udostępnia schemat Swagger w `apps/api/src/swagger/api-schema.json`.
Frontend generuje na jego podstawie typowany klient Axios:

```bash
pnpm --dir apps/web generate:api
```

Klienta należy wygenerować ponownie po zmianach w kontrakcie API.

## Budowanie

Całe monorepo:

```bash
pnpm build
```

Osobne aplikacje:

```bash
pnpm --dir apps/api build
pnpm --dir apps/web build
```
