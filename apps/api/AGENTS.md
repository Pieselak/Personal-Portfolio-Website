# AGENTS.md - backend

## Zakres

Instrukcje dotyczą `apps/api`. Jest to REST API w NestJS 11, TypeScript i
TypeORM.

## Dokumentacja bibliotek

Każde pytanie lub zmiana dotycząca NestJS, TypeORM, Swagger, Passport, Redis,
Jest albo innej biblioteki wymaga użycia Context7 MCP:

1. `resolve-library-id` dla nazwy biblioteki.
2. Wybór najlepszego oficjalnego źródła.
3. `query-docs` z pełnym pytaniem.
4. Implementacja zgodna z aktualną dokumentacją.

Context7 nie jest potrzebny do logiki biznesowej, refaktoryzacji i code review.

## Architektura

- `src/config`: walidowana konfiguracja usług.
- `src/modules`: moduły domenowe.
- `controllers`: transport HTTP i dekoratory Swagger.
- `services`: logika biznesowa.
- `repositories`: dostęp do danych.
- `entities`: modele TypeORM.
- `dto/input`: walidowane dane wejściowe.
- `dto/response`: kontrakty odpowiedzi.
- `src/swagger/api-schema.json`: schemat używany przez frontend.

## Konwencje

- Zachowuj granice modułów NestJS i dependency injection.
- Kontrolery powinny być cienkie; logikę umieszczaj w serwisach.
- Dostęp do bazy prowadź przez istniejące repozytoria.
- Dla danych wejściowych twórz DTO z walidacją.
- Dokumentuj endpointy i modele dekoratorami Swagger.
- Chronione trasy zabezpieczaj istniejącymi guardami i uprawnieniami.
- Nie używaj `any` bez uzasadnienia.
- Nie loguj sekretów, tokenów, haseł ani danych medycznych.
- Nie edytuj wygenerowanych klientów zewnętrznych bez sprawdzenia źródła.
- Nowe zmienne środowiskowe dodawaj do `.env.example` bez prawdziwych wartości.

## Baza i konfiguracja

- Backend korzysta z PostgreSQL przez TypeORM.
- Redis obsługuje blacklistę tokenów JWT.
- Integracje glikemiczne obsługują LibreView i Dexcom.
- `synchronize: true` jest ryzykowne produkcyjnie; nie rozszerzaj jego użycia.
- Sekrety są dostarczane wyłącznie przez zmienne środowiskowe.

## Kontrakt API

Po zmianie endpointu, DTO lub modelu odpowiedzi:

1. Uruchom API z `NODE_ENV=localdevelopment`.
2. Sprawdź `src/swagger/api-schema.json`.
3. Wygeneruj klienta: `pnpm --dir ../web generate:api`.
4. Zweryfikuj kompilację frontendu.

Nie edytuj schematu OpenAPI ręcznie, jeśli może zostać wygenerowany z kodu.

## Komendy

```bash
pnpm start:dev
pnpm build
pnpm lint
pnpm test
pnpm test:e2e
pnpm test:cov
```

## Weryfikacja

- Dla małej zmiany uruchom testy najbliższego modułu oraz `pnpm build`.
- Dla zmian auth, uprawnień lub konfiguracji uruchom szerszy zestaw testów.
- Dla zmian API sprawdź Swagger i zgodność klienta frontendowego.
- Jeżeli brak odpowiednich testów, dodaj test proporcjonalny do ryzyka.
