import { PL } from "country-flag-icons/react/1x1";

const pl = {
  data: {
    name: "Polski",
    flag: PL,
  },
  translation: {
    roles: {
      administrator: "Administrator",
      contributor: "Współpracownik",
      user: "Użytkownik",
    },

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
        returnHome: "Wróć do strony głównej",
      },

      forbidden: {
        title: "403 Brak dostępu",
        message:
          "Spuściliśmy z łańcucha cyfrowe psy obronne. Nie wykonuj gwałtownych ruchów i powoli wycofaj się z tej strony.",
        returnHome: "Wróć do strony głównej",
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
        returnHome: "Wróć do strony głównej",
      },

      selectLanguage: {
        title: "Wybierz język",
        subtitle: "Wybierz preferowany język dla zawartości strony.",
        noLanguages: "Obecnie brak dostępnych języków.",
      },

      auth: {
        fields: {
          name: "Imię i nazwisko",
          username: "Nazwa użytkownika",
          identifier: "E-mail lub login",
          email: "Adres e-mail",
          password: "Hasło",
          confirmPassword: "Powtórz hasło",
        },
        placeholders: {
          name: "Jan Kowalski",
          username: "jan",
          identifier: "jan lub jan@example.com",
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
          username: "Podaj nazwę użytkownika z minimum 3 znakami.",
          identifierRequired: "Podaj e-mail lub nazwę użytkownika.",
          email: "Podaj poprawny adres e-mail.",
          passwordRequired: "Podaj hasło.",
          passwordLength: "Hasło musi mieć co najmniej 8 znaków.",
          passwordMatch: "Hasła muszą być takie same.",
          terms: "Zaakceptuj zasady korzystania.",
          invalidCredentials: "E-mail, login lub hasło są niepoprawne.",
          accountExists: "Konto z tym e-mailem lub loginem już istnieje.",
          server:
            "Nie udało się wykonać zapytania. Spróbuj ponownie za chwilę.",
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
          submitting: "Logowanie",
          noAccount: "Nie masz jeszcze konta?",
          createAccount: "Utwórz konto",
          apiNotice:
            "Sesja zostanie zapisana lokalnie i dołączona do chronionych zapytań API.",
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
          submitting: "Tworzenie konta",
          hasAccount: "Masz już konto?",
          signIn: "Przejdź do logowania",
          apiNotice:
            "Pierwsze utworzone konto otrzyma uprawnienia administratora z API.",
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
        game: {
          title: "Straznicy glikemii",
          subtitle:
            "Pokonaj bossa wiedzy samodzielnie lub z dwojka sojusznikow.",
          eyebrow: "Edukacyjna walka z bossem",
          hero: "Wiedza jest twoim najsilniejszym atakiem.",
          intro:
            "Wybierz temat, zbierz druzyne i zamien sprawdzona wiedze o cukrzycy w obrazenia zadawane bossowi.",
          setupEyebrow: "Konfiguracja gry",
          setupTitle: "Przygotuj walke",
          setupDescription: "Podaj nazwe gracza i wybierz sposob rozgrywki.",
          modeLabel: "Tryb gry",
          create: "Utworz pokoj",
          join: "Dolacz do pokoju",
          nickname: "Pseudonim gracza",
          roomCode: "Kod pokoju",
          selectBoss: "Wybierz bossa wiedzy",
          loadingBosses: "Ladowanie bossow...",
          bossesError: "Nie udalo sie pobrac dostepnych bossow.",
          roundsLabel: "rund",
          questionsLabel: "pytan",
          connected: "Polaczono z serwerem gry",
          connecting: "Laczenie z serwerem gry...",
          createAction: "Utworz walke",
          joinAction: "Dolacz do walki",
          disclaimerTitle: "Tresci edukacyjne",
          disclaimer:
            "Gra nie zastepuje porady medycznej. W naglym zagrozeniu skontaktuj sie z numerem alarmowym.",
          features: {
            knowledge: "Zweryfikowana wiedza",
            players: "1-3 graczy online",
            help: "Scenariusze pierwszej pomocy",
          },
          lobby: {
            title: "Poczekalnia druzyny",
            subtitle: "Udostepnij kod, potwierdz gotowosc i rozpocznij walke.",
            roomCode: "Kod pokoju",
            host: "Gospodarz",
            ready: "Gotowy",
            waiting: "Oczekuje",
            instructions:
              "Kazdy gracz otrzymuje to samo pytanie i ma 25 sekund na odpowiedz.",
            copyCode: "Kopiuj kod pokoju",
            players: "Gracze",
            readyCount: "Gotowi",
            player: "Gracz",
            status: "Status sesji",
            preparation: "Przygotuj druzyne",
            answerTime: "Czas na kazda odpowiedz",
            readyAction: "Jestem gotowy",
            notReadyAction: "Cofnij gotowosc",
            start: "Rozpocznij walke",
          },
          battle: {
            boss: "Boss wiedzy",
            bossHealth: "Zdrowie bossa",
            time: "Czas",
            teamScore: "Wynik druzyny",
            seconds: "sekund",
            round: "Runda {{current}} z {{total}}",
            match: "Klucz dopasowania",
            waiting: "Odpowiedz wyslana",
            answer: "Przeslij odpowiedz",
            chooseAnswer: "Wybierz odpowiedz, aby kontynuowac",
            waitingForPlayers: "Odpowiedz wyslana. Oczekiwanie na druzyne.",
            correct: "Poprawna odpowiedz",
            incorrect: "Niepoprawna odpowiedz",
            correctDescription:
              "Twoja odpowiedz byla poprawna i oslabila bossa.",
            incorrectDescription:
              "Twoja odpowiedz byla niepoprawna. Przeczytaj wyjasnienie przed kolejna runda.",
            explanation: "Wyjasnienie",
            reviewReady:
              "Wyjasnienie pozostanie widoczne, dopoki gospodarz nie przejdzie dalej.",
            waitForHost:
              "Gospodarz przejdzie dalej, gdy cala druzyna bedzie gotowa.",
            nextRound: "Nastepne pytanie",
            startFinal: "Rozpocznij finalowy atak",
          },
          final: {
            title: "Finalowy atak",
            subtitle:
              "Wiedza oslabila bossa. Teraz pokonajcie go koordynacja i refleksem.",
            eyebrow: "Proba refleksu",
            instruction: "Trafiaj aktywne cele, zanim skonczy sie czas.",
            time: "Pozostaly czas",
            weakness: "Oslabienie bossa",
            hits: "Trafienia druzyny",
            arena: "Strefa celu",
            teamHint: "Kazdy gracz moze trafic kazdy cel jeden raz",
            target: "Traf aktywny cel",
            difficulty:
              "Oslabiony boss wymaga {{hits}} trafien. Kazdy cel jest aktywny przez {{lifetime}} s.",
          },
          result: {
            victory: "Boss pokonany",
            defeat: "Boss przetrwal",
            description: "Sprawdz wklad druzyny i sprobuj ponownie.",
            playAgain: "Zagraj ponownie",
            completed: "Ukonczono",
            tryAgain: "Sprobuj ponownie",
            topScore: "Najlepszy wynik",
            points: "punktow",
            correctAnswers: "{{correct}} z {{total}} poprawnych",
          },
        },

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

        home: {
          hero: {
            eyebrow: "Full-stack developer w rozwoju",
            name: "Patryk Znamirowski",
            headline:
              "Ambitny młody programista, który z pasją zamienia pomysły w działające aplikacje webowe.",
            description:
              "Każdego dnia rozwijam swoje kompetencje programistyczne, łącząc szkolną teorię z praktycznym pisaniem kodu. Tworzę nowoczesne strony i aplikacje, eksperymentując z nowymi technologiami. Aktywnie szukam możliwości zdobycia pierwszego doświadczenia i wejścia w świat profesjonalnego IT.",
            primaryAction: "Zobacz moje projekty",
            secondaryAction: "Skontaktuj się ze mną",
            imageAlt: "Patryk Znamirowski - zdjęcie profilowe",
          },
          links: {
            github: "Profil GitHub Patryka",
            linkedin: "Profil LinkedIn Patryka",
            email: "Napisz e-mail do Patryka",
          },
          profileCard: {
            eyebrow: "Bielsko-Biała / technikum",
            title: "Uczeń kierunku technik programista",
            description:
              "Buduję własne projekty, rozwijam stack React i NestJS oraz szukam pierwszych realnych wyzwań w branży IT.",
          },
          metrics: {
            education: {
              value: "3 lata",
              label:
                "Aktywnej nauki w technikum na kierunku technik programista.",
            },
            practice: {
              value: "Setki godzin",
              label: "Samodzielnego zgłębiania tajników kodu po lekcjach.",
            },
            motivation: {
              value: "100%",
              label:
                "Motywacji do rozwoju i zdobycia pierwszego doświadczenia komercyjnego.",
            },
          },
          focus: {
            title: "Co znajdziesz na tej stronie",
            description:
              "To portfolio pokazuje moje projekty, aktualny etap nauki oraz praktyczne eksperymenty z aplikacjami webowymi.",
            items: {
              projects: {
                title: "Projekty webowe",
                description:
                  "Realne aplikacje i eksperymenty, w których ćwiczę frontend, backend i integracje API.",
              },
              learning: {
                title: "Droga rozwoju",
                description:
                  "Krótka historia tego, jak od ciekawości do gier w Roblox przeszedłem do tworzenia aplikacji webowych.",
              },
              glucose: {
                title: "Integracja CGM",
                description:
                  "Moduł z danymi glukozy pokazujący, jak łączę frontend z realnym źródłem danych.",
              },
            },
          },
        },

        aboutme: {
          title: "O mnie",
          subtitle:
            "Poznaj mój etap nauki, sposób pracy i to, czego szukam w pierwszych zawodowych wyzwaniach.",
          story: {
            eyebrow: "Historia",
            title: "Od ciekawości do własnych aplikacji",
            description:
              "Programowanie traktuję jak rzemiosło, którego najlepiej uczyć się przez realne projekty, dokumentację i konsekwentne poprawianie kodu.",
            start:
              "Cześć! Mam 17 lat i uczę się w technikum w Bielsku-Białej na kierunku technik programista. Moja kariera programistyczna zaczęła się od prostej ciekawości w postaci tworzenia gier w Roblox, a dziś przekłada się na regularne tworzenie własnych, coraz bardziej zaawansowanych projektów.",
            learning:
              "W swoim wolnym czasie staram się wychodzić daleko poza szkolny program. Samodzielnie zgłębiam nowoczesne frameworki, uczę się dobrych praktyk pisania czystego kodu i staram się zrozumieć, jak budować aplikacje, które są zarówno wydajne, jak i przyjazne dla użytkownika.",
            goal: "Obecnie moim głównym celem jest zderzenie moich umiejętności z rzeczywistością biznesową. Bardzo chętnie podejmę się stażu, praktyk lub juniorskich wyzwań, aby móc uczyć się od bardziej doświadczonych programistów w prawdziwym środowisku pracy.",
          },
          experience: {
            eyebrow: "Aktualny etap",
            title: "Nauka i pierwsza praktyka",
            items: {
              school: {
                title: "Uczeń technikum",
                description:
                  "Uczę się w technikum w Bielsku-Białej na kierunku technik programista i rozwijam własne projekty poza szkolnym programem.",
              },
              practice: {
                title: "1 miesiąc praktyk z Laravelem",
                description:
                  "Mam za sobą praktyki, podczas których pracowałem z frameworkiem Laravel i poznawałem realniejszy rytm tworzenia aplikacji.",
              },
            },
          },
          tech: {
            eyebrow: "Stack",
            title: "Technologie, które teraz rozwijam",
            description:
              "Najmocniej skupiam się na budowaniu aplikacji webowych w ekosystemie React, NestJS i TailwindCSS.",
          },
          strengths: {
            eyebrow: "Wyróżniki",
            title: "Jak podchodzę do nauki i problemów",
            description:
              "Jestem na początku drogi, ale właśnie dlatego stawiam na elastyczność, samodzielność i konsekwencję.",
            items: {
              curiosity: {
                title: "Ogromny głód wiedzy",
                description:
                  "Nie ograniczam się do tego, co muszę zrobić na zaliczenie. Samodzielnie czytam dokumentacje, oglądam tutoriale i testuję najnowsze technologie rynkowe, aby być na bieżąco z trendami.",
              },
              flexibility: {
                title: "Brak złych nawyków i duża elastyczność",
                description:
                  "Jestem na początku swojej drogi, co oznacza, że chłonę wiedzę i szybko adaptuję się do nowych standardów, narzędzi oraz metodologii pracy w zespole.",
              },
              determination: {
                title: "Determinacja w rozwiązywaniu problemów",
                description:
                  "Jeśli napotykam błąd w kodzie, nie poddaję się, dopóki nie zrozumiem jego przyczyny. Potrafię samodzielnie szukać rozwiązań, co wzmacnia moją samodzielność techniczną.",
              },
            },
          },
        },

        projects: {
          title: "Moje projekty",
          subtitle:
            "Tutaj znajdziesz listę moich projektów osobistych i zawodowych. Każdy projekt jest dla mnie ważny, ponieważ reprezentuje moje umiejętności, pasję i zaangażowanie w rozwój technologii. Zapraszam do zapoznania się z moimi projektami i kontaktu, jeśli masz pytania lub chcesz współpracować!",
          loadingProjects: "Wczytywanie projektów...",
          loadingProject: "Wczytywanie projektu...",
          loadError: "Nie udało się teraz wczytać projektów.",
          noProjects:
            "Nie mam jeszcze żadnych projektów do pokazania, ale pracuję nad nimi!",
          projectNotFound:
            "Nie znaleziono projektu. Mógł zostać porwany przez kosmitów albo po prostu się przed nami ukrywa.",
          returnToProjects: "Powrót do listy projektów",
          statuses: {
            completed: "Ukończony",
            inProgress: "W trakcie realizacji",
            onHold: "Wstrzymany",
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
            onHold: "Zawieszone",
            planned: "Zaplanowane",
          },
          details: {
            project: "Projekt",
            description: "Opis",
            whatItDoes: "Co pokazuje ten projekt",
            meta: "Metadane",
            timeline: "Czas i dostępność",
            team: "Zespół",
            view: "Wyświetl",
            contributors: "Autorzy i role",
            noContributors: "Brak danych o zespole.",
          },
        },

        glucose: {
          title: "Moja glukoza we krwi",
          subtitle:
            "Przeglądaj dane dotyczące glukozy we krwi z mojego CGM (sensora glukozy we krwi) w czasie rzeczywistym. Przeglądaj aktualne odczyty, analizuj trendy i monitoruj czas spędzony w docelowym zakresie glukozy we krwi. Wszystko to w jednym miejscu, dostępne dla każdego zainteresowanego.",
          loading: "Wczytywanie danych glukozy...",
          availability: {
            eyebrow: "Status modułu CGM",
            disabledTitle: "Moduł glukozy jest wyłączony",
            disabled:
              "Moduł glukozy jest obecnie wyłączony przez administratora strony.",
            noProviderTitle: "Brak podłączonego providera",
            noProvider:
              "Moduł glukozy jest włączony, ale żaden dostawca danych nie jest teraz dostępny.",
            initializingTitle: "Moduł glukozy się uruchamia",
            initializing:
              "Moduł glukozy właśnie się uruchamia. Dane pojawią się tutaj za chwilę.",
            unavailableTitle: "Nie udało się sprawdzić statusu",
            unavailable:
              "Nie udało się teraz sprawdzić dostępności modułu glukozy.",
          },
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
            outOfRange: "Poza zakresem",
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
            period: "Statystyki z ostatnich {{duration}}.",
            periodAll: "Statystyki z wszystkich dostępnych danych",
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
            period: "Rozkład z ostatnich {{duration}}.",
            periodAll: "Rozkład z wszystkich dostępnych danych.",
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

      admin: {
        common: {
          title: "Tytul",
          description: "Opis",
          status: "Status",
          actions: "Akcje",
          edit: "Edytuj",
          delete: "Usun",
          save: "Zapisz",
          cancel: "Anuluj",
          publish: "Opublikuj",
          unpublish: "Cofnij publikacje",
          published: "Opublikowano",
          draft: "Wersja robocza",
          yes: "Tak",
          no: "Nie",
          empty: "Brak danych do wyswietlenia.",
        },
        errors: {
          title: "Nie udalo sie wykonac operacji",
          loading: "Wczytywanie danych...",
          retry: "Sprobuj ponownie",
          dismiss: "Zamknij blad",
          network:
            "Nie mozna polaczyc sie z serwerem. Sprawdz polaczenie i sprobuj ponownie.",
          unauthorized: "Sesja wygasla. Zaloguj sie ponownie.",
          forbidden: "Nie masz uprawnien do wykonania tej operacji.",
          notFound: "Wybrany zasob juz nie istnieje.",
          conflict: "Operacja jest sprzeczna z aktualnym stanem danych.",
          validation: "Czesc przeslanych danych jest nieprawidlowa.",
          rateLimit:
            "Wyslano zbyt wiele zapytan. Poczekaj chwile i sprobuj ponownie.",
          server: "Wystapil blad serwera. Sprobuj ponownie pozniej.",
          unexpected: "Wystapil nieoczekiwany blad.",
        },
        nav: {
          dashboard: "Pulpit",
          game: "Tresci gry",
          projects: "Projekty",
          announcements: "Ogloszenia",
          settings: "Ustawienia",
          users: "Uzytkownicy",
          roles: "Role",
        },
        dashboard: {
          title: "Panel administracyjny",
          description: "Zarzadzaj tresciami, uzytkownikami i ustawieniami.",
          cards: {
            game: "Bossowie, pytania i edukacyjne zrodla wiedzy.",
            projects: "Wielojezyczne projekty portfolio i ich publikacja.",
            announcements:
              "Globalny baner informacyjny wyswietlany nad nawigacja.",
            roles: "Definicje rol i szczegolowe przypisywanie uprawnien.",
          },
        },
        announcements: {
          title: "Baner informacyjny",
          description: "Tworz szkice i publikuj jedno globalne ogloszenie.",
          new: "Nowe ogloszenie",
          variant: "Wariant",
          content: "Tresc",
          actionUrl: "Adres URL akcji",
          actionLabel: "Etykieta akcji",
          dismissible: "Uzytkownicy moga zamknac ogloszenie",
        },
        projects: {
          title: "Zarzadzanie projektami",
          description: "Edytuj tlumaczenia, metadane i publikacje projektow.",
          new: "Nowy projekt",
          projectStatus: "Status projektu",
          tags: "Tags",
          shortDescription: "Krotki opis",
          detailedDescription: "Szczegolowy opis",
          markdownHelp:
            "Obsluguje Markdown: naglowki, pogrubienie, kursywe, listy, linki, cytaty, tabele i bloki kodu.",
          developers: "Deweloperzy",
          developerName: "Nazwa lub imie",
          developerRole: "Rola w projekcie",
          developerProfileUrl: "Adres profilu",
          addDeveloper: "Dodaj dewelopera",
          removeDeveloper: "Usun",
          noDevelopers: "Do projektu nie przypisano jeszcze deweloperow.",
          timeline: "Czas realizacji",
          startDate: "Data rozpoczecia",
          completeDate: "Data zakonczenia",
          dateOrderError:
            "Data zakonczenia nie moze byc wczesniejsza niz data rozpoczecia.",
          imageUrl: "Adres URL obrazu",
          sourceUrl: "Adres URL kodu zrodlowego",
          sourceOpen: "Kod zrodlowy jest publiczny",
        },
        game: {
          title: "Tresci gry edukacyjnej",
          description:
            "Zarzadzaj bossami i zweryfikowanymi pytaniami w wielu jezykach.",
          bosses: "Bossowie",
          questions: "Pytania",
          newBoss: "Nowy boss",
          bossSlug: "Identyfikator techniczny (slug)",
          bossSlugHelp:
            "Unikalny identyfikator niezalezny od jezyka, uzywany przez API i import. Uzyj malych liter, cyfr i myslnikow, np. hipoglikemia.",
          newQuestion: "Nowe pytanie",
          rounds: "Maksymalna liczba rund",
          questionType: "Typ pytania",
          category: "Kategoria",
          question: "Pytanie",
          explanation: "Wyjasnienie",
          source: "Oficjalne zrodlo",
          verifiedAt: "Data weryfikacji",
          difficulty: "Poziom trudnosci",
          answers: "Odpowiedzi",
          answer: "Odpowiedz",
          correct: "Poprawna",
          matchKey: "Klucz dopasowania",
          addAnswer: "Dodaj odpowiedz",
          importJson: "Importuj JSON",
          importTitle: "Import bossow wraz z pytaniami",
          importDescription:
            "Wybierz plik JSON w wersji schematu 1. Import jest atomowy: jesli boss lub pytanie sa nieprawidlowe, zadne dane nie zostana zapisane.",
          importExampleDescription:
            "Pobierz poprawny przyklad z jednym bossem i kazdym obslugiwanym typem pytania.",
          downloadImportExample: "Pobierz przykladowy JSON",
          importFile: "Plik JSON (maksymalnie 2 MB)",
          importReady: "{{file}} jest gotowy. Bossowie w pliku: {{count}}.",
          importError: "Nie mozna zaimportowac pliku",
          importInvalidJson:
            "Wybrany plik nie jest prawidlowym dokumentem JSON.",
          importInvalidStructure:
            "Plik musi zawierac wersje 1 oraz tablice bosses.",
          importTooLarge: "Wybrany plik przekracza limit 2 MB.",
          importAction: "Importuj tresci",
          importing: "Importowanie...",
          importSuccess: "Import zakonczony",
          importSuccessDescription:
            "Zaimportowano bossow: {{bosses}}, pytan: {{questions}}.",
        },
        settings: {
          title: "Ustawienia operacyjne",
          description:
            "Kontroluj dostepnosc serwisu i zewnetrzne zrodla danych.",
          game: "Modul gry",
          gameDescription: "Zezwalaj lub blokuj nowe sesje gry edukacyjnej.",
          maintenance: "Tryb konserwacji",
          maintenanceDescription:
            "Tymczasowo wylacz publiczna czesc serwisu na czas prac.",
          glucose: "Dostawca glukozy",
          glucoseDescription: "Wybierz aktywne zrodlo danych glikemii.",
          enable: "Wlacz",
          disable: "Wylacz",
          currentStatus: "Biezacy status",
          operational: "Serwis dziala",
          maintenanceActive: "Konserwacja aktywna",
          statusLoading: "Sprawdzanie...",
          statusError: "Status niedostepny",
          statusUpdating: "Aktualizowanie...",
          statusUpdateError: "Nie udalo sie zmienic statusu. Sprobuj ponownie.",
          gameEnabled: "Gra wlaczona",
          gameDisabled: "Gra wylaczona",
          activePlayers: "Aktywni gracze",
          playersUnavailable: "Niedostepne",
          gameUpdateError:
            "Nie udalo sie zmienic statusu gry. Sprobuj ponownie.",
          enableGame: "Wlacz gre",
          disableGame: "Wylacz gre",
          enableMaintenance: "Wlacz tryb konserwacji",
          disableMaintenance: "Wylacz tryb konserwacji",
        },
        users: {
          title: "Uzytkownicy",
          description: "Przypisuj role i kontroluj dostepnosc kont.",
          user: "Uzytkownik",
          email: "E-mail",
          role: "Rola",
          active: "Aktywny",
          inactive: "Nieaktywny",
          activate: "Aktywuj",
          deactivate: "Dezaktywuj",
          blocked: "Zablokowany",
          blockedUntil: "Do: {{date}}",
          block: "Zablokuj czasowo",
          unblock: "Odblokuj",
          blockTitle: "Zablokuj konto: {{user}}",
          blockDescription:
            "Uzytkownik nie bedzie mogl sie logowac ani korzystac z aktywnej sesji do wskazanego terminu.",
          blockedUntilLabel: "Blokada do",
          blockReason: "Powod blokady",
          confirmBlock: "Zablokuj konto",
          deleteConfirm:
            "Czy na pewno chcesz trwale usunac konto uzytkownika {{user}}?",
        },
        roles: {
          title: "Role i uprawnienia",
          description: "Tworz wlasne role z dostepnego katalogu uprawnien.",
          new: "Nowa rola",
          role: "Rola",
          permissions: "Uprawnienia",
          system: "Systemowa",
          code: "Kod",
          label: "Nazwa",
          deleteTitle: "Usun role: {{role}}",
          deleteDescription:
            "Uzytkownicy z ta rola zostana przeniesieni do wybranej roli zastepczej.",
          replacementRole: "Rola zastepcza",
          confirmDelete: "Usun role",
        },
        brand: "Centrum sterowania",
        backToSite: "Powrot do strony",
      },
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
            game: "Gra",
          },
          account: {
            login: "Zaloguj",
            logout: "Wyloguj",
            expand: "Otwórz menu konta",
            profile: "Profil",
            settings: "Ustawienia",
            admin: "Panel administratora",
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
