# About Me Web

Frontend aplikacji portfolio zbudowany jako SPA w React i TypeScript. Prezentuje
profil autora, projekty oraz dane glikemiczne pobierane z backendowego API.

## Funkcje

- responsywna strona główna i sekcja „O mnie”,
- lista projektów z filtrowaniem i widokiem szczegółów,
- wykresy glikemii, Time in Range, GMI i podsumowania,
- rejestracja, logowanie i resetowanie hasła,
- obsługa sesji oraz autoryzowanych zapytań,
- interfejs w języku polskim, angielskim i niemieckim,
- jasny i ciemny motyw,
- animacje oraz nawigacja mobilna,
- polityka prywatności i warunki korzystania,
- widoki błędów, ładowania i trybu konserwacji.

## Technologie

- React 19 i TypeScript,
- Vite 7,
- React Router,
- Tailwind CSS 4,
- TanStack React Query,
- Zustand,
- Axios i klient generowany z OpenAPI,
- i18next,
- Recharts,
- Framer Motion,
- Zod i Lucide React.

## Wymagania

- Node.js 24,
- pnpm 10,
- uruchomione backendowe API.

## Konfiguracja

Utwórz `.env` na podstawie `.env.example`:

```env
VITE_API_URL=http://localhost:2100
VITE_CONTACT_EMAIL=kontakt@example.com
```

| Zmienna | Opis |
| --- | --- |
| `VITE_API_URL` | Bazowy adres backendowego API. |
| `VITE_CONTACT_EMAIL` | Adres wyświetlany w sekcjach kontaktowych. |

Domyślny adres API to `http://localhost:2100/`.

## Uruchomienie

Z katalogu głównego monorepo:

```bash
pnpm install
pnpm --dir apps/web dev
```

Lub bezpośrednio z `apps/web`:

```bash
pnpm dev
```

Aplikacja działa pod `http://localhost:2000`.

## Główne trasy

| Trasa | Widok |
| --- | --- |
| `/home` | Strona główna. |
| `/about` | Informacje o autorze. |
| `/projects` | Lista projektów. |
| `/projects/:projectId` | Szczegóły projektu. |
| `/glucose` | Panel danych glikemicznych. |
| `/language` | Wybór języka. |
| `/login` | Logowanie. |
| `/register` | Rejestracja. |
| `/reset-password` | Resetowanie hasła. |
| `/terms` | Warunki korzystania. |
| `/privacy` | Polityka prywatności. |

## Struktura

```text
src/
|-- app/
|   |-- api/          # klient API, queries i mutations
|   |-- components/   # współdzielone komponenty UI
|   |-- hooks/        # współdzielone hooki
|   |-- layouts/      # układ strony i nawigacja
|   `-- modules/      # moduły funkcjonalne
|-- locales/          # tłumaczenia PL, EN i DE
|-- App.tsx           # routing
|-- i18n.ts           # konfiguracja języków
|-- index.css         # Tailwind i zmienne motywu
`-- main.tsx          # punkt wejścia
```

Importy aplikacji korzystają z aliasu `@`, wskazującego na `src`.

## Zarządzanie stanem

- TanStack React Query obsługuje dane serwerowe, cache i odświeżanie,
- Zustand przechowuje stan sesji i współdzielony stan klienta,
- lokalny stan React służy do stanu pojedynczych komponentów,
- `localStorage` przechowuje wybrany język i preferencje interfejsu.

## Integracja z API

Klient Axios znajduje się w `src/app/api`. Token JWT jest dołączany przez
interceptor, a zapytania są opakowane w queries i mutations React Query.

Po zmianie schematu backendu wygeneruj klienta ponownie:

```bash
pnpm generate:api
```

Źródłem jest `../api/src/swagger/api-schema.json`, a wynikiem
`src/app/api/generated-api.ts`. Nie edytuj wygenerowanego pliku ręcznie.

## Skrypty

| Komenda | Działanie |
| --- | --- |
| `pnpm dev` | Uruchamia Vite na porcie `2000`. |
| `pnpm build` | Sprawdza TypeScript i tworzy build w `dist`. |
| `pnpm lint` | Uruchamia ESLint. |
| `pnpm preview` | Pokazuje lokalny podgląd buildu. |
| `pnpm generate:api` | Generuje typowanego klienta API. |

## Wdrożenie

`vercel.json` definiuje budowanie przez pnpm oraz przekierowanie tras SPA do
`index.html`. Katalogiem wynikowym jest `dist`.
