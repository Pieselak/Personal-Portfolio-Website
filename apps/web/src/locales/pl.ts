import { PL } from "country-flag-icons/react/1x1";

const pl = {
  data: {
    name: "Polski",
    flag: PL,
  },
  translation: {
    pages: {
      loading: {
        message: "Przygotowywanie interfejsu i synchronizacja danych.",
      },
      serverError: {
        title: "500 Błąd serwera",
        message:
          "Usługa jest chwilowo niedostępna. Spróbuj ponownie za moment.",
      },
      notFound: {
        title: "404 Nie znaleziono",
        message:
          "Żądana strona nie jest dostępna. Sprawdź adres lub wróć do portfolio.",
      },
      forbidden: {
        title: "403 Brak dostępu",
        message: "Nie masz uprawnień do tej sekcji.",
      },
      maintenance: {
        title: "Trwa konserwacja",
        message:
          "Aplikacja jest tymczasowo niedostępna z powodu prac utrzymaniowych.",
      },
      underConstruction: {
        title: "Sekcja w przygotowaniu",
        message:
          "Ta sekcja jest przygotowywana i będzie dostępna po weryfikacji.",
      },
      selectLanguage: {
        eyebrow: "Język interfejsu",
        title: "Wybierz język",
        subtitle:
          "Wybierz język używany w nawigacji, komunikatach i treści portfolio.",
        noLanguages: "Obecnie brak dostępnych języków.",
      },
      user: {
        home: {
          eyebrow: "Portfolio ucznia programisty",
          title:
            "Proste, czytelne projekty tworzone w React i TypeScript.",
          subtitle:
            "Jestem uczniem szkoły średniej i uczę się full-stack developmentu, budując praktyczne aplikacje, czyste interfejsy i małe narzędzia do danych.",
          primaryCta: "Zobacz projekt glukozy",
          secondaryCta: "Zobacz projekty",
          proofPoints: ["React", "TypeScript", "NestJS"],
          panel: {
            badge: "Aktualny kierunek",
            title: "Czyste portfolio, które łatwo zrozumieć.",
            description:
              "Interfejs jest celowo minimalistyczny: czytelne strony, komponenty wielokrotnego użytku i prosta nawigacja.",
          },
          capabilities: {
            cleanInterfaces: {
              title: "Czyste interfejsy",
              description:
                "Proste układy z czytelną hierarchią i łatwą nawigacją.",
            },
            dataVisualization: {
              title: "Wizualizacja danych",
              description:
                "Wykresy i metryki zaprojektowane do szybkiej interpretacji.",
            },
            secureArchitecture: {
              title: "Niezawodny full-stack",
              description:
                "React, NestJS i typowane kontrakty API utrzymywane w zrozumiałej strukturze.",
            },
          },
          sections: {
            aboutme: {
              description: "Poznaj Patryka i jego podejście do budowania projektów.",
            },
            projects: {
              description: "Przejrzyj wybrane prace w czystej galerii projektów.",
            },
            glucose: {
              description:
                "Zobacz funkcję danych glukozy i prosty dashboard.",
            },
          },
        },
        aboutme: {
          eyebrow: "Profil",
          title: "O mnie",
          subtitle:
            "Jestem Patryk Znamirowski, uczeń szkoły średniej uczący się full-stack developmentu przez realne projekty.",
          statement:
            "Lubię budować przydatne aplikacje webowe, które są czytelne, proste w użyciu i łatwe w utrzymaniu.",
          description:
            "Mój aktualny stack to React, TypeScript, NestJS, Tailwind i typowane kontrakty API. To portfolio pokazuje, czego się uczę i jak układam kod frontendowy oraz backendowy.",
          principles: {
            clarity: {
              title: "Najpierw czytelność",
              description:
                "Każdy ekran powinien jasno pokazywać aktualny stan i następne działanie.",
            },
            reliability: {
              title: "Niezawodna struktura",
              description:
                "Komponenty wielokrotnego użytku, typowane dane i spójne stany zwiększają skalowalność.",
            },
            data: {
              title: "Dane z kontekstem",
              description:
                "Metryki potrzebują etykiet, progów, jednostek i hierarchii.",
            },
          },
          focus: {
            eyebrow: "Obszary specjalizacji",
            title: "Najmocniejsze elementy portfolio",
            items: [
              "Czyste strony portfolio i projektów",
              "Aplikacje full-stack w TypeScript",
              "Czytelne interfejsy oparte o API",
              "Responsywne strony i małe narzędzia",
            ],
          },
        },
        projects: {
          eyebrow: "Wybrane realizacje",
          title: "Case studies",
          subtitle:
            "Skoncentrowany przegląd projektów z React, NestJS, integracją API i prezentacją danych.",
          noProjects: "Brak dostępnych case studies.",
          returnToProjects: "Wróć do case studies",
          caseStudy: "Case study",
          overview: "Opis",
          statusLabel: "Status",
          technologies: "Technologie",
          started: "Rozpoczęto",
          team: "Zespół",
          viewCaseStudy: "Zobacz case study",
          projectNotFound: "Nie znaleziono wybranego case study.",
          statuses: {
            completed: "Ukończony",
            inProgress: "W trakcie",
            planned: "Planowany",
          },
          sourceCode: {
            available: "Zobacz kod źródłowy",
            notAvailable: "Kod źródłowy niedostępny",
            closed: "Kod zamknięty",
          },
        },
        glucose: {
          eyebrow: "Funkcja danych",
          title: "Dashboard glukozy",
          subtitle:
            "Mały dashboard do odczytu danych glukozy, trendu, czasu w zakresie i historii na wykresie.",
          loading: "Wczytywanie danych glukozy...",
          subpages: {
            summary: { navigation: "Podsumowanie", title: "Podsumowanie glukozy" },
            timeInRange: {
              navigation: "Czas w zakresie",
              title: "Czas w zakresie docelowym",
            },
            graph: { navigation: "Wykres", title: "Wykres trendu glukozy" },
          },
          current: {
            title: "Aktualny odczyt",
            sensor: "Sensor",
            noSensor: "Brak danych sensora",
            active: "Aktywny",
            inactive: "Nieaktywny",
            status: "Status odczytu",
            current: "Aktualny",
            stale: "Nieaktualny",
            readAt: "Odczytano",
            lastUpload: "Ostatni upload",
            expiresIn: "Wygasa za",
            refresh: "Następne odświeżenie",
            trends: {
              none: "Brak trendu",
              risingFast: "Szybko rośnie",
              rising: "Rośnie",
              risingSlow: "Powoli rośnie",
              stable: "Stabilnie",
              fallingSlow: "Powoli spada",
              falling: "Spada",
              fallingFast: "Szybko spada",
            },
          },
          summary: {
            period: "Statystyki z ostatnich {{hours}} godzin.",
            average: "Średnia",
            highest: "Najwyższa",
            lowest: "Najniższa",
            timeInRange: "Czas w zakresie",
          },
          timeInRange: {
            period: "Rozkład z ostatnich {{hours}} godzin.",
          },
          graph: {
            empty: "Brak odczytów glukozy do wyświetlenia na wykresie.",
            range: "Zakres docelowy: {{low}}-{{high}} {{unit}}",
            value: "Glukoza",
          },
          ranges: {
            high: "Krytycznie wysoko",
            aboveRange: "Powyżej zakresu",
            inRange: "W zakresie",
            belowRange: "Poniżej zakresu",
            low: "Krytycznie nisko",
            critical: "Próg krytyczny",
          },
          errors: {
            current: "Nie udało się wczytać aktualnych danych glukozy.",
            graph: "Nie udało się wczytać danych wykresu.",
            timeInRange: "Nie udało się wczytać czasu w zakresie.",
            summary: "Nie udało się wczytać podsumowania glukozy.",
            insufficientData:
              "Nie ma jeszcze wystarczającej ilości danych do wiarygodnego wyniku.",
            module_unavailable:
              "Moduł glukozy jest niedostępny z powodu błędu wewnętrznego.",
            module_disabled:
              "Moduł glukozy został wyłączony przez administratora strony.",
            module_no_provider:
              "Moduł glukozy jest niedostępny, ponieważ nie skonfigurowano dostawcy danych.",
          },
        },
      },
      admin: {},
    },
    layouts: {
      user: {
        nav: {
          openMenu: "Otwórz menu nawigacyjne",
          closeMenu: "Zamknij menu nawigacyjne",
          changeLanguage: "Zmień język",
          changeTheme: "Zmień motyw",
          pages: {
            home: "Start",
            aboutme: "Profil",
            projects: "Case studies",
            glucose: "Glukoza",
          },
        },
        footer: {
          positioning:
            "Minimalistyczne portfolio full-stack ucznia szkoły średniej uczącego się React, TypeScript i NestJS.",
          copyright:
            "© {{year}} Patryk Znamirowski. Wszelkie prawa zastrzeżone.",
          contact: "Profil",
          caseStudies: "Case studies",
          glucoseData: "Dane glukozy",
        },
      },
      admin: {},
    },
  },
} as const;

export default pl;
