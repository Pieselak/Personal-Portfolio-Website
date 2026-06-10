# AGENTS.md - frontend

## Zakres

Instrukcje dotyczą `apps/web`. Jest to SPA w React 19, TypeScript, Vite 7 i
Tailwind CSS 4.

## Dokumentacja bibliotek

Każde pytanie lub zmiana dotycząca React, React Router, TanStack Query, Zustand,
Tailwind CSS, Vite, i18next albo innej biblioteki wymaga użycia Context7 MCP:

1. `resolve-library-id` dla nazwy biblioteki.
2. Wybór najlepszego oficjalnego źródła.
3. `query-docs` z pełnym pytaniem.
4. Implementacja zgodna z aktualną dokumentacją.

Context7 nie jest potrzebny do logiki biznesowej, refaktoryzacji i code review.

## Architektura

- `src/app/api`: klient Axios, React Query queries i mutations.
- `src/app/components`: współdzielone komponenty UI i motion.
- `src/app/hooks`: współdzielone hooki.
- `src/app/layouts`: layout, nawigacja i stopka.
- `src/app/modules`: moduły funkcjonalne i strony.
- `src/locales`: tłumaczenia polskie, angielskie i niemieckie.
- `src/App.tsx`: routing aplikacji.
- `src/index.css`: Tailwind, tokeny kolorów i motywy.

## Konwencje

- Używaj aliasu `@` dla importów z `src`.
- Twórz komponenty funkcyjne i hooki.
- Dane serwerowe obsługuj przez TanStack React Query.
- Zustand stosuj wyłącznie dla współdzielonego stanu klienta.
- Stan lokalny komponentu pozostaw w React.
- Korzystaj z istniejących komponentów `src/app/components/ui`.
- Style zapisuj klasami Tailwind i istniejącymi zmiennymi motywu.
- Zachowuj semantyczny HTML, obsługę klawiatury i etykiety ARIA.
- Teksty widoczne dla użytkownika dodawaj do wszystkich plików locale.
- Obsługuj loading, error i empty state dla danych asynchronicznych.
- Nie używaj `any` bez uzasadnienia.

## API

- Używaj `ApiClient` oraz istniejących queries i mutations.
- Nie edytuj ręcznie `src/app/api/generated-api.ts`.
- Po zmianie backendowego Swaggera uruchom `pnpm generate:api`.
- Adres API pobieraj z `VITE_API_URL`.
- Nie umieszczaj sekretów w zmiennych `VITE_*`, ponieważ trafiają do przeglądarki.

## Routing i i18n

- Trasy definiuj zgodnie z istniejącą strukturą w `App.tsx`.
- Do nawigacji używaj API React Router.
- Nowe klucze tłumaczeń dodawaj równolegle do `pl.ts`, `en.ts` i `de.ts`.
- Nie zapisuj tekstów interfejsu bezpośrednio w komponentach, jeśli powinny być
  tłumaczone.

## Komendy

```bash
pnpm dev
pnpm build
pnpm lint
pnpm preview
pnpm generate:api
```

## Weryfikacja

- Po zmianach uruchom `pnpm build` i `pnpm lint`.
- Sprawdź widoki mobilne i desktopowe dla zmian wizualnych.
- Sprawdź jasny oraz ciemny motyw.
- Dla zmian tekstów zweryfikuj wszystkie trzy języki.
- Dla zmian API sprawdź loading, error, empty i success state.
- Dla istotnych zmian UI uruchom aplikację i sprawdź ją w przeglądarce.
