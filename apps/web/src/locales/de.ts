import { DE } from "country-flag-icons/react/1x1";

const de = {
  data: {
    name: "Deutsch",
    flag: DE,
  },
  translation: {
    pages: {
      loading: {
        message:
          "Die Hamster in den Server-Laufrädern brauchen einen Moment, um zu verschnaufen. Geduld...",
      },

      serverError: {
        title: "500 Serverfehler",
        message:
          "Herzlichen Glückwunsch, du hast den Server kaputt gemacht! (Oder ich habe ein Semikolon im Code vergessen). Die Suche nach einem Feuerlöscher läuft.",
      },

      notFound: {
        title: "404 Nicht gefunden",
        message:
          "Seite im Einsatz vermisst. Vielleicht wurde sie von Aliens entführt, oder du hast dich einfach vertippt. Wie auch immer – hier gibt es nichts.",
      },

      forbidden: {
        title: "403 Verboten",
        message:
          "Hey, hey, hey! Wo willst du mit diesen dreckigen Schuhen hin? Du hast hier keine Berechtigung. Dreh dich langsam um und verlasse diesen Bereich.",
      },

      maintenance: {
        title: "Wartungsarbeiten",
        message:
          "Wir wischen gerade Staub von den Kabeln und gießen die Datenbank. Wir sind zurück, sobald alles getrocknet ist.",
      },

      underConstruction: {
        title: "Im Aufbau",
        message:
          "Wir gießen hier virtuellen Beton. Wir haben vergessen, diese Seite im letzten Sprint zu liefern, aber wir versprechen, sie irgendwann fertigzustellen.",
      },

      selectLanguage: {
        title: "Sprache auswählen",
        subtitle: "Wählen Sie die bevorzugte Sprache für diese Seite aus.",
        noLanguages: "Derzeit sind keine Sprachen verfügbar.",
      },

      user: {
        home: {
          title: "Willkommen auf meiner Website!",
          subtitle:
            "Ich freue mich, dass du hier bist! Ich bin Patryk, ein Technologie- und Programmier-Enthusiast. Auf dieser Website findest du Informationen über mich, meine Projekte und meine Blutzuckerdaten aus meinem CGM. Viel Spaß beim Entdecken und melde dich gerne bei mir!",
          sections: {
            aboutme: {
              description: "Erfahre mehr über meinen Hintergrund, meine Erfahrung und meine Interessen.",
            },
            projects: {
              description: "Erkunde mein Portfolio mit persönlichen und beruflichen Projekten.",
            },
            glucose: {
              description: "Schau dir meine Echtzeit-Blutzuckerdaten von meinem CGM-Gerät an.",
            },
          },
          welcome: "Willkommen! 👋",
          welcomeDescription:
            "Ich bin leidenschaftlich an der Entwicklung innovativer digitaler Lösungen und einem gesunden Lebensstil interessiert. Diese Website zeigt meine Reise durch Technologie und Datentransparenz.",
          skills: ["React & TypeScript", "Full-stack Development", "Datenvisualisierung"],
          explore: "Entdecken",
        },

        aboutme: {
          title: "Über mich",
          subtitle:
            "Hallo! Mein Name ist Patryk Znamirowski und ich begeistere mich für Technologie, Programmierung und einen gesunden Lebensstil. Auf dieser Seite findest du Informationen zu meiner Karriere, meinen Interessen und den Projekten, an denen ich arbeite. Lerne mich besser kennen!",
        },

        projects: {
          title: "Meine Projekte",
          subtitle:
            "Hier findest du eine Liste meiner persönlichen und beruflichen Projekte. Jedes Projekt ist mir wichtig, da es meine Fähigkeiten, meine Leidenschaft und mein Engagement für die technologische Entwicklung repräsentiert. Schau sie dir gerne an und kontaktiere mich, wenn du Fragen hast oder zusammenarbeiten möchtest!",
          noProjects:
            "Ich habe noch keine Projekte zum Vorzeigen, aber ich arbeite daran!",
          returnToProjects: "Zurück zu den Projekten",
          statuses: {
            completed: "Abgeschlossen",
            inProgress: "In Arbeit",
            planned: "Geplant",
          },
          sourceCode: {
            available: "Quellcode anzeigen",
            notAvailable: "Quellcode nicht verfügbar",
            closed: "Geschlossener Quellcode",
          },
          startedAt: "Gestartet am {{date}}",
          completedAt: "Abgeschlossen am {{date}}",
        },

        glucose: {
          title: "Mein Blutzucker",
          subtitle:
            "Durchsuchen Sie Blutzuckerdaten von meinem CGM (kontinuierliches Glukosemessgerät) in Echtzeit. Sehen Sie aktuelle Messwerte, analysieren Sie Trends und überwachen Sie die im Zielbereich verbrachte Zeit. Alles an einem Ort, verfügbar für jeden Interessierten.",
          loading: "Glukosedaten werden geladen...",
          subpages: {
            summary: {
              navigation: "Zusammenfassung",
              title: "Zusammenfassung der Blutzuckermesswerte",
            },
            timeInRange: {
              navigation: "Zeit im Bereich",
              title: "Zeit im Zielbereich des Blutzuckers",
            },
            graph: {
              navigation: "Diagramm",
              title: "Visualisierung der Blutzuckermesswerte",
            },
          },
          current: {
            title: "Aktueller Wert",
            sensor: "Sensor",
            noSensor: "Keine Sensordaten",
            active: "Aktiv",
            inactive: "Inaktiv",
            status: "Messstatus",
            current: "Aktuell",
            stale: "Veraltet",
            readAt: "Gemessen um",
            lastUpload: "Letzter Upload",
            expiresIn: "Läuft ab in",
            refresh: "Nächste Aktualisierung",
            trends: {
              none: "Kein Trend verfügbar",
              risingFast: "Steigt schnell",
              rising: "Steigt",
              risingSlow: "Steigt langsam",
              stable: "Stabil",
              fallingSlow: "Fällt langsam",
              falling: "Fällt",
              fallingFast: "Fällt schnell",
            },
          },
          summary: {
            period: "Statistiken der letzten {{hours}} Stunden.",
            average: "Durchschnitt",
            highest: "Höchster Wert",
            lowest: "Niedrigster Wert",
            timeInRange: "Zeit im Bereich",
          },
          timeInRange: {
            period: "Verteilung der letzten {{hours}} Stunden.",
          },
          graph: {
            empty: "Keine Glukosewerte für das Diagramm verfügbar.",
            range: "Zielbereich: {{low}}-{{high}} {{unit}}",
            value: "Glukose",
          },
          ranges: {
            high: "Kritisch hoch",
            aboveRange: "Über Bereich",
            inRange: "Im Bereich",
            belowRange: "Unter Bereich",
            low: "Kritisch niedrig",
            critical: "Kritischer Grenzwert",
          },
          errors: {
            current: "Aktuelle Glukosedaten konnten nicht geladen werden.",
            graph: "Diagrammdaten konnten nicht geladen werden.",
            timeInRange: "Zeit-im-Bereich-Daten konnten nicht geladen werden.",
            summary: "Glukosezusammenfassung konnte nicht geladen werden.",
            insufficientData:
              "Es gibt noch nicht genug Daten für eine zuverlässige Berechnung.",
            module_unavailable:
              "Moduł glukozy jest niedostępny z powodu wystąpienia błędu.",
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
          openMenu: "Navigationsmenü öffnen",
          closeMenu: "Navigationsmenü schließen",
          changeLanguage: "Sprache wechseln",
          changeTheme: "Thema wechseln",
          pages: {
            home: "Startseite",
            aboutme: "Über mich",
            projects: "Projekte",
            glucose: "Blutzucker",
          },
        },
        footer: {
          copyright: "© {{year}} Patryk Znamirowski. Alle Rechte vorbehalten.",
          contact: "Kontaktiere mich",
          termsOfService: "Nutzungsbedingungen",
          privacyPolicy: "Datenschutzrichtlinie",
        },
      },

      admin: {},
    },
  },
} as const;

export default de;
