# AGENTS.md - monorepo

## Zakres

Instrukcje dotyczą całego repozytorium. Pliki `apps/web/AGENTS.md` i
`apps/api/AGENTS.md` zawierają bardziej szczegółowe reguły dla aplikacji.

## Architektura

- `apps/web`: frontend React + Vite, port `2000`.
- `apps/api`: backend NestJS, port `2100`.
- pnpm workspaces zarządza zależnościami.
- Turborepo koordynuje zadania między pakietami.
- Kontrakt OpenAPI łączy backend z generowanym klientem frontendu.

## Dokumentacja bibliotek

Gdy zadanie dotyczy biblioteki, frameworka, SDK, API, CLI lub usługi chmurowej,
zawsze użyj Context7 MCP:

1. Wywołaj `resolve-library-id`, chyba że podano identyfikator `/org/project`.
2. Wybierz najlepiej dopasowaną oficjalną dokumentację.
3. Wywołaj `query-docs` z pełnym pytaniem użytkownika.
4. Oprzyj implementację na pobranej dokumentacji.

Nie używaj Context7 do refaktoryzacji, logiki biznesowej, code review ani
ogólnych zagadnień programistycznych.

## Zasady pracy

- Przed edycją przeczytaj README i AGENTS.md właściwej aplikacji.
- Zachowuj zmiany użytkownika obecne w brudnym worktree.
- Nie mieszaj zmian frontendu i backendu bez potrzeby.
- Nie zapisuj sekretów, tokenów ani prawdziwych danych logowania.
- Po zmianie kontrolerów lub DTO sprawdź schemat OpenAPI.
- Po zmianie kontraktu API wygeneruj klienta frontendu.
- Preferuj istniejące wzorce i strukturę modułów.
- Używaj pnpm, nie npm ani yarn.

## Komendy

```bash
pnpm install
pnpm build
pnpm lint
pnpm format
```

Frontend:

```bash
pnpm --dir apps/web dev
pnpm --dir apps/web build
pnpm --dir apps/web lint
```

Backend:

```bash
pnpm --dir apps/api start:dev
pnpm --dir apps/api build
pnpm --dir apps/api test
```

## Weryfikacja

- Zmiany tylko w dokumentacji nie wymagają pełnego buildu.
- Zmiany frontendowe: uruchom co najmniej `build` i `lint`.
- Zmiany backendowe: uruchom `build`, `lint` i właściwe testy.
- Zmiany przekrojowe: sprawdź obie aplikacje i regenerację API.
