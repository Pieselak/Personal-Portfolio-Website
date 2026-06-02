import { PL } from "country-flag-icons/react/1x1";

const pl = {
  data: {
    name: "Polski",
    flag: PL,
  },
  translation: {
    pages: {
      loading: {
        message:
          "Chomiki biegające w kołowrotkach serwera potrzebują chwili na złapanie oddechu. Cierpliwości...",
      },

      serverError: {
        title: "500 Błąd serwera",
        message:
          "Gratulacje, udało Ci się zepsuć serwer! (Albo to ja zapomniałem średnika w kodzie). Trwają poszukiwania gaśnicy.",
      },

      notFound: {
        title: "404 Nie znaleziono",
        message:
          "Strona zaginęła w akcji. Może porwali ją obcy, a może po prostu źle wpisałeś adres. Tak czy siak – tutaj nic nie ma.",
      },

      forbidden: {
        title: "403 Brak dostępu",
        message:
          "Hej, hej, hej! Gdzie z tymi brudnymi buciorami? Nie masz tu uprawnień. Odwróć się powoli i opuść ten obszar.",
      },

      maintenance: {
        title: "W trakcie konserwacji",
        message:
          "Właśnie przecieramy z kurzu kable i podlewamy bazę danych. Wrócimy, jak tylko wszystko wyschnie.",
      },

      underConstruction: {
        title: "W trakcie budowy",
        message:
          "Lejemy tu wirtualny beton. Zapomnieliśmy dowieźć tę stronę w ostatnim sprincie, ale obiecujemy, że kiedyś ją skończymy.",
      },

      selectLanguage: {
        title: "Wybierz język",
        subtitle: "Wybierz preferowany język dla zawartości strony.",
        noLanguages: "Obecnie brak dostępnych języków.",
      },

      user: {
        home: {
          title: "Witaj na mojej stronie!",
          subtitle:
            "Cieszę się, że tu jesteś! Jestem Patryk, pasjonat technologii i programowania. Na tej stronie znajdziesz informacje o mnie, moich projektach oraz moje dane dotyczące glukozy we krwi z mojego CGM. Zapraszam do eksploracji i kontaktu!",
          sections: {
            aboutme: {
              description:
                "Poznaj moje doświadczenie, umiejętności i zainteresowania.",
            },
            projects: {
              description:
                "Przeglądaj moje portfolio projektów osobistych i zawodowych.",
            },
            glucose: {
              description:
                "Przeglądaj moje dane glukozy we krwi w czasie rzeczywistym.",
            },
          },
          welcome: "Witaj! 👋",
          welcomeDescription:
            "Pasjonuję się tworzeniem innowacyjnych rozwiązań cyfrowych i utrzymywaniem zdrowego stylu życia. Ta strona prezentuje moją podróż przez technologię i przejrzystość danych osobistych.",
          skills: [
            "React & TypeScript",
            "Full-stack Development",
            "Wizualizacja danych",
          ],
          explore: "Odkryj",
        },

        aboutme: {
          title: "O mnie",
          subtitle:
            "Cześć! Nazywam się Patryk Znamirowski i jestem pasjonatem technologii, programowania oraz zdrowego stylu życia. Na tej stronie znajdziesz informacje o mojej karierze, zainteresowaniach oraz projektach, nad którymi pracuję. Zapraszam do poznania mnie bliżej!",
        },

        projects: {
          title: "Moje projekty",
          subtitle:
            "Tutaj znajdziesz listę moich projektów osobistych i zawodowych. Każdy projekt jest dla mnie ważny, ponieważ reprezentuje moje umiejętności, pasję i zaangażowanie w rozwój technologii. Zapraszam do zapoznania się z moimi projektami i kontaktu, jeśli masz pytania lub chcesz współpracować!",
          noProjects:
            "Nie mam jeszcze żadnych projektów do pokazania, ale pracuję nad nimi!",
          returnToProjects: "Powrót do listy projektów",
          statuses: {
            completed: "Ukończony",
            inProgress: "W trakcie realizacji",
            planned: "Zaplanowany",
          },
          sourceCode: {
            available: "Zobacz kod źródłowy",
            notAvailable: "Kod źródłowy niedostępny",
            closed: "Zamknięty kod źródłowy",
          },
          startedAt: "Rozpoczęto {{date}}",
          completedAt: "Zakończono {{date}}",
        },

        glucose: {
          title: "Moja glukoza we krwi",
          subtitle:
            "Przeglądaj dane dotyczące glukozy we krwi z mojego CGM (sensora glukozy we krwi) w czasie rzeczywistym. Przeglądaj aktualne odczyty, analizuj trendy i monitoruj czas spędzony w docelowym zakresie glukozy we krwi. Wszystko to w jednym miejscu, dostępne dla każdego zainteresowanego.",
          loading: "Wczytywanie danych glukozy...",
          subpages: {
            summary: {
              navigation: "Podsumowanie",
              title: "Podsumowanie danych z odczytów",
            },
            timeInRange: {
              navigation: "Czas w zakresie",
              title: "Czas spędzony w docelowym zakresie glukozy we krwi",
            },
            graph: {
              navigation: "Wykres",
              title: "Wizualizacja danych z odczytów",
            },
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
              none: "Brak informacji o trendzie",
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
              "Nie ma jeszcze wystarczającej ilości danych do wiarygodnego obliczenia.",
            module_unavailable:
              "Moduł glukozy jest niedostępny z powodu wystąpienia wewnętrznego błędu.",
            module_disabled:
              "Moduł glukozy zotał wyłączony przez administratora strony.",
            module_no_provider:
              "Moduł glukozy jest niedostępny ze względu na brak dostawcy danych glukozy.",
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
            home: "Strona główna",
            aboutme: "O mnie",
            projects: "Projekty",
            glucose: "Cukier we krwi",
          },
        },
        footer: {
          copyright:
            "© {{year}} Patryk Znamirowski. Wszelkie prawa zastrzeżone.",
          contact: "Skontaktuj się ze mną",
          termsOfService: "Zasady korzystania",
          privacyPolicy: "Polityka prywatności",
        },
      },

      admin: {},
    },
  },
} as const;

export default pl;
