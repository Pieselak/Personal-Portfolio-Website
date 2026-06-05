import { PL } from "country-flag-icons/react/1x1";

const pl = {
  data: {
    name: "Polski",
    flag: PL,
  },
  translation: {
    pages: {
      loading: {
        title: "Ładowanie",
        message:
          "Karmimy chomiki, które napędzają nasz serwer. Proszę czekać...",
      },

      serverError: {
        title: "500 Błąd serwera",
        message:
          "Nasz serwer właśnie rzucił papierami i zamknął się w łazience. Próbujemy z nim negocjować.",
      },

      notFound: {
        title: "404 Nie znaleziono",
        message:
          "Szukaliśmy wszędzie. W bazie danych, pod kanapą i w kieszeniach zimowej kurtki. Tej strony tu nie ma.",
      },

      forbidden: {
        title: "403 Brak dostępu",
        message:
          "Spuściliśmy z łańcucha cyfrowe psy obronne. Nie wykonuj gwałtownych ruchów i powoli wycofaj się z tej strony.",
      },

      maintenance: {
        title: "W trakcie konserwacji",
        message:
          "Właśnie przecieramy kable z kurzu i podlewamy bazę danych. Wrócimy, jak tylko wszystko wyschnie.",
      },

      underConstruction: {
        title: "W trakcie budowy",
        message:
          "Farba jeszcze schnie, a my próbujemy zrozumieć instrukcję z IKEA, jak złożyć tę stronę. Wróć później!",
      },

      selectLanguage: {
        title: "Wybierz język",
        subtitle: "Wybierz preferowany język dla zawartości strony.",
        noLanguages: "Obecnie brak dostępnych języków.",
      },

      auth: {
        fields: {
          name: "Imię i nazwisko",
          email: "Adres e-mail",
          password: "Hasło",
          confirmPassword: "Powtórz hasło",
        },
        placeholders: {
          name: "Jan Kowalski",
          email: "jan@example.com",
          password: "Minimum 8 znaków",
          confirmPassword: "Powtórz hasło",
        },
        actions: {
          showPassword: "Pokaż hasło",
          hidePassword: "Ukryj hasło",
        },
        errors: {
          name: "Podaj imię i nazwisko.",
          email: "Podaj poprawny adres e-mail.",
          passwordRequired: "Podaj hasło.",
          passwordLength: "Hasło musi mieć co najmniej 8 znaków.",
          passwordMatch: "Hasła muszą być takie same.",
          terms: "Zaakceptuj zasady korzystania.",
        },
        login: {
          title: "Logowanie",
          subtitle:
            "Wejdź do panelu użytkownika i wróć do swoich ustawień bez zbędnego hałasu.",
          eyebrow: "Dostęp",
          formTitle: "Zaloguj się",
          description:
            "Krótki, czytelny formularz zgodny z resztą aplikacji i gotowy do podpięcia pod API.",
          remember: "Zapamiętaj mnie",
          forgotPassword: "Nie pamiętasz hasła?",
          submit: "Zaloguj",
          noAccount: "Nie masz jeszcze konta?",
          createAccount: "Utwórz konto",
          demoNotice:
            "To widok frontendowy. Po poprawnej walidacji ustawia lokalny stan zalogowania.",
        },
        register: {
          title: "Rejestracja",
          subtitle:
            "Utwórz konto w spokojnym, uporządkowanym formularzu dopasowanym do stylu strony.",
          eyebrow: "Nowe konto",
          formTitle: "Utwórz konto",
          description:
            "Dane są walidowane po stronie klienta, a formularz jest przygotowany pod późniejszą integrację z backendem.",
          accept: "Akceptuję",
          terms: "zasady korzystania",
          submit: "Zarejestruj",
          hasAccount: "Masz już konto?",
          signIn: "Przejdź do logowania",
          demoNotice:
            "Rejestracja korzysta teraz z lokalnego stanu aplikacji, dopóki endpoint API nie zostanie podłączony.",
        },
        reset: {
          title: "Resetowanie hasła",
          subtitle:
            "Podaj adres e-mail, a interfejs przeprowadzi Cię przez odzyskanie dostępu.",
          eyebrow: "Odzyskiwanie",
          formTitle: "Przypomnij hasło",
          description:
            "Minimalny formularz do wysyłki linku resetującego, gotowy na integrację z usługą poczty.",
          submit: "Wyślij link resetujący",
          remembered: "Hasło jednak wróciło?",
          backToLogin: "Wróć do logowania",
          createAccount: "Utwórz nowe konto",
          hint: "Po integracji z API użytkownik otrzyma wiadomość z bezpiecznym linkiem do zmiany hasła.",
          sentTitle: "Link przygotowany",
          sentMessage:
            "Jeśli konto istnieje, instrukcje resetowania hasła zostaną wysłane na podany adres.",
        },
      },


      user: {

        termsOfService: {
          title: "Zasady korzystania z usługi",
          subtitle:
            "Wszystko, co powinieneś wiedzieć przed rozpoczęciem używania naszego serwisu.",
          sections: {
            general: {
              title: "Postanowienia ogólne i definicje",
              content:
                "Niniejszy Regulamin określa ogólne warunki, zasady oraz sposób świadczenia usług drogą elektroniczną za pośrednictwem naszej strony internetowej. Rozpoczęcie korzystania z serwisu jest równoznaczne z pełną akceptacją warunków niniejszego Regulaminu. Administratorem i właścicielem serwisu jest Patryk Znamirowski. Zastrzegamy sobie prawo do dokonywania zmian w Regulaminie z ważnych przyczyn, o czym użytkownicy będą informowani poprzez odpowiedni komunikat na stronie.",
            },
            rules: {
              title: "Zasady korzystania z serwisu i obowiązki użytkownika",
              content:
                "Użytkownik zobowiązany jest do korzystania z serwisu w sposób zgodny z obowiązującymi przepisami prawa polskiego, zasadami współżycia społecznego oraz dobrymi obyczajami. Niedozwolone jest dostarczanie treści o charakterze bezprawnym, w szczególności treści naruszających dobra osobiste, propagujących nienawiść, obraźliwych, a także rozsyłanie niezamówionej informacji handlowej (SPAM). Użytkownik nie może podejmować działań mogących zakłócić prawidłowe funkcjonowanie strony, w tym używać złośliwego oprogramowania, botów czy skryptów automatycznie pobierających dane.",
            },
            intellectualProperty: {
              title: "Prawa autorskie i własność intelektualna",
              content:
                "Wszelkie materiały udostępniane na stronie internetowej, w tym teksty, zdjęcia, grafiki, logotypy, kody źródłowe oraz układ przestrzenny serwisu, stanowią wyłączną własność Administratora lub zostały użyte na podstawie odpowiednich licencji i podlegają ochronie prawnej. Kopiowanie, modyfikowanie, dystrybucja lub wykorzystywanie tych treści w celach komercyjnych bez uprzedniej, pisemnej zgody Administratora jest surowo zabronione.",
            },
            liability: {
              title: "Wyłączenie i ograniczenie odpowiedzialności",
              content:
                "Administrator dokłada należytej staranności, aby informacje zawarte na stronie były rzetelne i aktualne, jednak serwis udostępniany jest w stanie „takim, jakim jest” (as is). Administrator nie ponosi odpowiedzialności za ewentualne szkody wynikłe z korzystania lub braku możliwości korzystania z serwisu, przerwy w działaniu strony spowodowane pracami konserwacyjnymi, awariami sprzętu, oprogramowania, atakami hakerskimi czy działaniem siły wyższej. Administrator nie odpowiada również za treści zamieszczone na stronach zewnętrznych, do których mogą prowadzić linki z naszego serwisu.",
            },
            complaints: {
              title: "Postępowanie reklamacyjne",
              content:
                "Wszelkie zastrzeżenia, uwagi i reklamacje dotyczące funkcjonowania serwisu należy zgłaszać drogą elektroniczną na adres e-mail: znamirowskipatryk@gmail.com. Zgłoszenie powinno zawierać dane kontaktowe osoby zgłaszającej oraz szczegółowy opis problemu. Administrator ustosunkuje się do reklamacji w terminie do 14 dni roboczych od daty jej doręczenia, przesyłając odpowiedź na wskazany przez użytkownika adres e-mail.",
            },
            finalProvisions: {
              title: "Postanowienia końcowe",
              content:
                "W sprawach nieuregulowanych niniejszym Regulaminem mają zastosowanie powszechnie obowiązujące przepisy prawa polskiego, w szczególności Kodeksu cywilnego oraz ustawy o świadczeniu usług drogą elektroniczną. Wszelkie spory wynikłe na tle korzystania z serwisu będą rozstrzygane przez właściwy sąd powszechny. Regulamin wchodzi w życie z dniem jego publikacji na stronie internetowej.",
            },
          },
        },

        privacyPolicy: {
          title: "Polityka Prywatności",
          subtitle:
            "Wszystko, co powinieneś wiedzieć o przetwarzaniu Twoich danych osobowych.",
          sections: {
            controller: {
              title: "Administrator Danych Osobowych",
              content:
                "Zgodnie z art. 13 ust. 1 i 2 Rozporządzenia Parlamentu Europejskiego i Rady (UE) 2016/679 (RODO) informujemy, że Administratorem Twoich danych osobowych jest Patryk Znamirowski. Z Administratorem można skontaktować się drogą elektroniczną pod adresem e-mail: znamirowskipatryk@gmail.com. Administrator dba o bezpieczeństwo danych i przestrzega obowiązujących przepisów o ochronie danych osobowych.",
            },
            dataCollection: {
              title: "Zakres i cele przetwarzania danych",
              content:
                "Przetwarzamy dane osobowe podane dobrowolnie przez użytkownika (np. imię, nazwisko, adres e-mail) wypełniającego formularz kontaktowy, a także dane zbierane automatycznie podczas wizyty na stronie (np. adres IP, typ przeglądarki, czas wizyty). Dane te są przetwarzane w celu obsługi korespondencji i odpowiedzi na zapytania (art. 6 ust. 1 lit. f RODO), świadczenia usług drogą elektroniczną (art. 6 ust. 1 lit. b RODO) oraz w celach analitycznych, statystycznych i zabezpieczenia strony przed atakami (art. 6 ust. 1 lit. f RODO).",
            },
            dataSharing: {
              title: "Odbiorcy danych i przekazywanie danych",
              content:
                "Twoje dane osobowe mogą być przekazywane zaufanym podmiotom trzecim (tzw. procesorom), z którymi Administrator współpracuje w celu prawidłowego funkcjonowania serwisu. Obejmuje to dostawców usług hostingowych, usług IT, narzędzi analitycznych (np. Google Analytics) oraz systemów do wysyłki e-maili. Dane nie są odsprzedawane ani udostępniane podmiotom nieuprawnionym. Dane mogą być udostępnione organom państwowym wyłącznie na podstawie bezwzględnie obowiązujących przepisów prawa.",
            },
            retention: {
              title: "Okres przechowywania danych",
              content:
                "Dane osobowe przetwarzane w celu obsługi zapytania będą przechowywane przez okres trwania korespondencji, a po jej zakończeniu przez czas niezbędny do zabezpieczenia ewentualnych roszczeń. Dane przetwarzane na podstawie zgody (np. w celach marketingowych) przechowujemy do momentu jej wycofania. Dane zbierane w celach analitycznych są przechowywane do czasu zdezaktualizowania się lub zgłoszenia skutecznego sprzeciwu przez użytkownika.",
            },
            userRights: {
              title: "Prawa użytkowników zgodnie z RODO",
              content:
                "Każdy użytkownik ma prawo do żądania od Administratora dostępu do swoich danych osobowych, ich sprostowania, usunięcia (prawo do bycia zapomnianym) lub ograniczenia przetwarzania. Przysługuje Ci również prawo do wniesienia sprzeciwu wobec przetwarzania, prawo do przenoszenia danych oraz prawo do cofnięcia zgody w dowolnym momencie (bez wpływu na zgodność z prawem przetwarzania przed jej cofnięciem). Ponadto masz prawo wniesienia skargi do organu nadzorczego – Prezesa Urzędu Ochrony Danych Osobowych (PUODO).",
            },
            cookies: {
              title: "Polityka plików Cookies",
              content:
                "Serwis wykorzystuje pliki cookies (ciasteczka), czyli niewielkie informacje tekstowe przechowywane na urządzeniu końcowym użytkownika. Stosujemy cookies niezbędne (do prawidłowego działania strony) oraz opcjonalne (analityczne i marketingowe), które pomagają nam zrozumieć, jak użytkownicy korzystają z serwisu, by móc go ulepszać. Przy pierwszej wizycie na stronie użytkownik może wyrazić zgodę na cookies opcjonalne. Ustawienia plików cookies można w każdej chwili zmienić za pomocą opcji przeglądarki internetowej.",
            },
            security: {
              title: "Bezpieczeństwo danych",
              content:
                "Administrator stosuje odpowiednie środki techniczne i organizacyjne zapewniające ochronę przetwarzanych danych osobowych odpowiednią do zagrożeń oraz kategorii danych objętych ochroną. W szczególności serwis zabezpieczony jest certyfikatem SSL, który szyfruje dane przesyłane pomiędzy przeglądarką użytkownika a serwerem. Dostęp do danych osobowych mają jedynie osoby upoważnione przez Administratora.",
            },
          },
        },

        home: {},

        aboutme: {},

        projects: {
          title: "Moje projekty",
          subtitle:
            "Tutaj znajdziesz listę moich projektów osobistych i zawodowych. Każdy projekt jest dla mnie ważny, ponieważ reprezentuje moje umiejętności, pasję i zaangażowanie w rozwój technologii. Zapraszam do zapoznania się z moimi projektami i kontaktu, jeśli masz pytania lub chcesz współpracować!",
          noProjects:
            "Nie mam jeszcze żadnych projektów do pokazania, ale pracuję nad nimi!",
          projectNotFound:
            "Nie znaleziono projektu. Mógł zostać porwany przez kosmitów albo po prostu się przed nami ukrywa.",
          returnToProjects: "Powrót do listy projektów",
          statuses: {
            completed: "Ukończony",
            inProgress: "W trakcie realizacji",
            planned: "Zaplanowany",
          },
          sourceCode: {
            available: "Zobacz kod źródłowy",
            openAction: "Zobacz kod źródłowy",
            stateOpen: "Otwarty kod źródłowy",
            stateClosed: "Zamknięty kod źródłowy",
            notAvailable: "Kod źródłowy niedostępny",
            closed: "Zamknięty kod źródłowy",
          },
          startedAt: "Rozpoczęto",
          completedAt: "Zakończono",
          status: "Status",
          team: "Zespół",
          technologies: "Technologie",
          technologyCountOne: "{{count}} technologia",
          technologyCountMany: "{{count}} technologii",
          filterLabel: "Filtr projektów",
          filters: {
            all: "Wszystkie",
            completed: "Ukończone",
            inProgress: "W trakcie",
            planned: "Zaplanowane",
          },
          details: {
            project: "Projekt",
            description: "Opis",
            whatItDoes: "Co pokazuje ten projekt",
            meta: "Metadane",
            timeline: "Czas i dostępność",
            team: "Zespół",
            contributors: "Autorzy i role",
            noContributors: "Brak danych o zespole.",
          },
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
            title: "Ostatni odczyt",
            sensor: "Sensor",
            noSensor: "Brak danych sensora",
            active: "Aktywny",
            inactive: "Nieaktywny",
            status: "Status odczytu",
            current: "Aktualny",
            stale: "Nieaktualny",
            readAt: "Odczytano",
            lastUpload: "Ostatni odczyt",
            activatedAt: "Aktywowany",
            expiresIn: "Wygasa za",
            refresh: "Następne odświeżenie",
            sensorLife: "Życie sensora",
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
            gmi: {
              eyebrow: "GMI",
              title: "Wskaźnik zarządzania glikemią",
              insufficient:
                "GMI wymaga co najmniej 7 dni danych glikemii. Wybierz dłuższy zakres, aby pokazać szacunek.",
              insufficientDatabase:
                "Wybrany zakres jest wystarczająco długi, ale w bazie danych nie ma jeszcze dość odczytów glukozy do obliczenia GMI.",
              context:
                "GMI szacuje trend podobny do HbA1c na podstawie danych CGM i najlepiej interpretować go razem z czasem w zakresie.",
            },
          },
          timeRange: {
            label: "Zakres czasu glikemii",
            "1d": "1d",
            "7d": "7d",
            "14d": "14d",
            "30d": "30d",
            "90d": "90d",
            all: "Całość",
          },
          timeInRange: {
            period: "Rozkład z ostatnich {{hours}} godzin.",
          },
          graph: {
            empty: "Brak odczytów glukozy do wyświetlenia na wykresie.",
            range: "Zakres docelowy: {{low}}-{{high}} {{unit}}",
            value: "Glukoza",
            targetZone: "Zakres docelowy",
            inRangeSummary:
              "{{value}}% widocznych odczytów mieści się w zakresie.",
            referencePoints: "Punkty odniesienia",
          },
          ranges: {
            high: "Bardzo wysoki poziom",
            aboveRange: "Wysoki poziom",
            inRange: "W zakresie",
            belowRange: "Niski poziom",
            low: "Bardzo niski poziom",
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
          mobileNavigation: "Nawigacja mobilna",
          changeLanguage: "Zmień język",
          changeTheme: "Zmień motyw",
          themes: {
            light: "Jasny",
            dark: "Ciemny",
            contrast: "Kontrast",
          },
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
