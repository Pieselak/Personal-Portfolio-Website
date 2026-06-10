# About Me API

Backend aplikacji portfolio zbudowany w NestJS. Udostępnia REST API dla
projektów, użytkowników, uwierzytelniania, statusu aplikacji oraz danych
glikemicznych pobieranych z LibreView lub Dexcom.

## Funkcje

- rejestracja, logowanie, wylogowanie i pobieranie bieżącego użytkownika,
- autoryzacja JWT oraz unieważnianie tokenów z użyciem Redis,
- role i uprawnienia użytkowników,
- operacje CRUD dla projektów,
- status usługi i tryb konserwacji,
- integracja z LibreView,
- integracja OAuth z Dexcom,
- aktualny pomiar, dane sensora i wykres glikemii,
- średnia, minimum, maksimum, GMI oraz Time in Range,
- walidacja DTO i globalny limit zapytań,
- dokumentacja OpenAPI/Swagger.

## Technologie

- NestJS 11 i TypeScript,
- TypeORM,
- PostgreSQL,
- Redis,
- Passport i JWT,
- Axios,
- Swagger,
- class-validator i class-transformer,
- Jest.

## Wymagania

- Node.js 24,
- pnpm 10,
- PostgreSQL,
- Redis lub `REDIS_REQUIRED=false` podczas pracy lokalnej,
- dane dostępowe do LibreView lub Dexcom, jeżeli moduł glikemii ma być aktywny.

## Konfiguracja

Utwórz `.env` na podstawie `.env.example`:

```env
PORT=2100
CORS_ORIGIN=http://localhost:2000
NODE_ENV=localdevelopment

DATABASE_URL=postgresql://postgres:password@localhost:5432/app_db

JWT_SECRET=replace_with_a_long_random_secret
JWT_EXPIRES_IN=1d

REDIS_URL=redis://localhost:6379
REDIS_REQUIRED=false

LIBRE_API_URL=https://api.libreview.io/llu
LIBRE_VERSION=4.16.0
LIBRE_PRODUCT=llu.android
LIBRE_EMAIL=
LIBRE_PASSWORD=
LIBRE_ACCOUNT_ID=

DEXCOM_API_URL=https://sandbox-api.dexcom.com
DEXCOM_API_VERSION=v3
DEXCOM_CLIENT_ID=
DEXCOM_CLIENT_SECRET=
DEXCOM_REDIRECT_URI=http://localhost:2100/glucose/auth/dexcom/callback
```

Nie umieszczaj prawdziwych sekretów ani danych logowania w repozytorium.

## Uruchomienie

Z katalogu głównego monorepo:

```bash
pnpm install
pnpm --dir apps/api start:dev
```

Lub bezpośrednio z `apps/api`:

```bash
pnpm start:dev
```

API domyślnie działa pod `http://localhost:2100`.

## Dokumentacja API

Po uruchomieniu serwera:

- Swagger UI: `http://localhost:2100/docs`,
- OpenAPI JSON: `http://localhost:2100/docs-json`,
- OpenAPI YAML: `http://localhost:2100/docs-yaml`.

Przy `NODE_ENV=localdevelopment` schemat jest również zapisywany do
`src/swagger/api-schema.json` podczas startu aplikacji.

## Moduły

| Moduł | Zakres |
| --- | --- |
| `auth` | Rejestracja, logowanie, JWT i wylogowanie. |
| `users` | Użytkownicy, role i uprawnienia. |
| `projects` | Lista, szczegóły i zarządzanie projektami. |
| `status` | Stan usługi i tryb konserwacji. |
| `glucose` | Dostawcy, pomiary, wykresy i statystyki glikemii. |

## Główne endpointy

| Prefiks | Przeznaczenie |
| --- | --- |
| `/auth` | Uwierzytelnianie i bieżąca sesja. |
| `/users` | Zarządzanie użytkownikami. |
| `/projects` | Projekty portfolio. |
| `/status` | Status i tryb konserwacji. |
| `/glucose` | Dostępność, pomiary i dane sensora. |
| `/glucose/statistics` | Statystyki glikemii. |
| `/glucose/settings` | Konfiguracja dostawcy. |
| `/glucose/auth` | Autoryzacja Dexcom OAuth. |

Dokładne parametry, odpowiedzi i wymagane uprawnienia są opisane w Swagger UI.

## Struktura

```text
src/
|-- config/       # konfiguracja bazy, JWT, Redis i integracji
|-- constants/    # stałe aplikacji
|-- entities/     # encje współdzielone
|-- modules/      # moduły domenowe
|-- swagger/      # wygenerowany schemat OpenAPI
|-- app.module.ts
`-- main.ts
```

Każdy moduł domenowy może zawierać kontrolery, serwisy, repozytoria, encje oraz
DTO wejściowe i odpowiedzi.

## Skrypty

| Komenda | Działanie |
| --- | --- |
| `pnpm start:dev` | Uruchamia serwer w trybie watch. |
| `pnpm start:debug` | Uruchamia serwer z debuggerem. |
| `pnpm build` | Buduje aplikację do `dist`. |
| `pnpm start:prod` | Uruchamia zbudowaną aplikację. |
| `pnpm lint` | Uruchamia ESLint z automatycznymi poprawkami. |
| `pnpm format` | Formatuje kod Prettierem. |
| `pnpm test` | Uruchamia testy jednostkowe. |
| `pnpm test:e2e` | Uruchamia testy end-to-end. |
| `pnpm test:cov` | Generuje raport pokrycia testami. |

## Baza danych

Aplikacja korzysta z PostgreSQL i TypeORM. Encje są wykrywane automatycznie, a
opcja `synchronize` jest obecnie włączona. W środowisku produkcyjnym zalecane
jest wyłączenie automatycznej synchronizacji i użycie migracji.

## Bezpieczeństwo

- hasła są hashowane przez bcrypt,
- chronione endpointy używają JWT i guardów uprawnień,
- wylogowane tokeny mogą być przechowywane na czarnej liście Redis,
- CORS zezwala na pochodzenie ustawione w `CORS_ORIGIN`,
- globalny throttler ogranicza ruch do 100 żądań na minutę,
- dane wejściowe są walidowane przez `ValidationPipe`.
