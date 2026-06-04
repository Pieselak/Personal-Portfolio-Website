import { DE } from "country-flag-icons/react/1x1";

const de = {
  data: {
    name: "Deutsch",
    flag: DE,
  },
  translation: {
    pages: {
      loading: { message: "Interface wird vorbereitet und Daten werden synchronisiert." },
      serverError: {
        title: "500 Serverfehler",
        message:
          "Der Dienst ist derzeit nicht verfügbar. Bitte versuchen Sie es später erneut.",
      },
      notFound: {
        title: "404 Nicht gefunden",
        message:
          "Die angeforderte Seite ist nicht verfügbar. Prüfen Sie die Adresse oder kehren Sie zum Portfolio zurück.",
      },
      forbidden: {
        title: "403 Kein Zugriff",
        message: "Sie haben keine Berechtigung für diesen Bereich.",
      },
      maintenance: {
        title: "Wartung läuft",
        message:
          "Die Anwendung ist vorübergehend nicht verfügbar, während Wartungsarbeiten abgeschlossen werden.",
      },
      underConstruction: {
        title: "Bereich in Vorbereitung",
        message:
          "Dieser Bereich wird vorbereitet und nach Prüfung verfügbar sein.",
      },
      selectLanguage: {
        eyebrow: "Interface-Sprache",
        title: "Sprache auswählen",
        subtitle:
          "Wählen Sie die Sprache für Navigation, Statusmeldungen und Portfolio-Inhalte.",
        noLanguages: "Derzeit sind keine Sprachen verfügbar.",
      },
      user: {
        home: {
          eyebrow: "Portfolio eines Schülers",
          title:
            "Einfache, klare Projekte mit React und TypeScript.",
          subtitle:
            "Ich bin Schüler und lerne Full-Stack-Entwicklung, indem ich praktische Apps, klare Interfaces und kleine Datentools baue.",
          primaryCta: "Glukose-Projekt ansehen",
          secondaryCta: "Projekte ansehen",
          proofPoints: ["React", "TypeScript", "NestJS"],
          panel: {
            badge: "Aktueller Fokus",
            title: "Ein sauberes Portfolio, das leicht verständlich bleibt.",
            description:
              "Das Interface ist bewusst minimal: lesbare Seiten, wiederverwendbare Komponenten und einfache Navigation.",
          },
          capabilities: {
            cleanInterfaces: {
              title: "Klare Interfaces",
              description:
                "Einfache Layouts mit klarer Hierarchie und leichter Navigation.",
            },
            dataVisualization: {
              title: "Datenvisualisierung",
              description:
                "Diagramme und Kennzahlen für schnelle Interpretation statt Dekoration.",
            },
            secureArchitecture: {
              title: "Zuverlässiger Full-Stack",
              description:
                "React, NestJS und typisierte API-Verträge in einer verständlichen Struktur.",
            },
          },
          sections: {
            aboutme: {
              description:
                "Mehr über Patryk und seinen Ansatz beim Bauen von Projekten.",
            },
            projects: {
              description:
                "Ausgewählte Arbeiten in einer klaren Projektgalerie ansehen.",
            },
            glucose: {
              description:
                "Die Glukose-Datenfunktion und das einfache Dashboard ansehen.",
            },
          },
        },
        aboutme: {
          eyebrow: "Profil",
          title: "Über mich",
          subtitle:
            "Ich bin Patryk Znamirowski, Schüler und lerne Full-Stack-Entwicklung durch echte Projekte.",
          statement:
            "Ich baue gerne nützliche Web-Apps, die lesbar, einfach zu bedienen und gut strukturiert sind.",
          description:
            "Mein aktueller Stack ist React, TypeScript, NestJS, Tailwind und typisierte API-Verträge. Dieses Portfolio zeigt, was ich lerne und wie ich Frontend- und Backend-Code strukturiere.",
          principles: {
            clarity: {
              title: "Klarheit zuerst",
              description:
                "Jeder Screen sollte aktuellen Zustand und nächste Aktion eindeutig zeigen.",
            },
            reliability: {
              title: "Zuverlässige Struktur",
              description:
                "Wiederverwendbare Komponenten, typisierte Daten und konsistente Zustände halten das Frontend skalierbar.",
            },
            data: {
              title: "Daten mit Kontext",
              description:
                "Kennzahlen brauchen Labels, Schwellenwerte, Einheiten und Hierarchie.",
            },
          },
          focus: {
            eyebrow: "Schwerpunkte",
            title: "Die stärksten Bereiche dieses Portfolios",
            items: [
              "Klare Portfolio- und Projektseiten",
              "Full-Stack-Anwendungen mit TypeScript",
              "Lesbare API-getriebene Interfaces",
              "Responsive Seiten und kleine Tools",
            ],
          },
        },
        projects: {
          eyebrow: "Ausgewählte Arbeit",
          title: "Case Studies",
          subtitle:
            "Ein fokussierter Blick auf Projekte mit React, NestJS, API-Integration und Datenpräsentation.",
          noProjects: "Noch keine Case Studies verfügbar.",
          returnToProjects: "Zurück zu den Case Studies",
          caseStudy: "Case Study",
          overview: "Überblick",
          statusLabel: "Status",
          technologies: "Technologien",
          started: "Gestartet",
          team: "Team",
          viewCaseStudy: "Case Study ansehen",
          projectNotFound: "Die ausgewählte Case Study wurde nicht gefunden.",
          statuses: {
            completed: "Abgeschlossen",
            inProgress: "In Arbeit",
            planned: "Geplant",
          },
          sourceCode: {
            available: "Quellcode ansehen",
            notAvailable: "Quellcode nicht verfügbar",
            closed: "Geschlossener Quellcode",
          },
        },
        glucose: {
          eyebrow: "Datenfunktion",
          title: "Glukose-Dashboard",
          subtitle:
            "Ein kleines Dashboard für Glukosedaten, Trends, Zeit im Bereich und Diagrammhistorie.",
          loading: "Glukosedaten werden geladen...",
          subpages: {
            summary: { navigation: "Zusammenfassung", title: "Glukose-Zusammenfassung" },
            timeInRange: {
              navigation: "Zeit im Bereich",
              title: "Zeit im Zielbereich",
            },
            graph: { navigation: "Diagramm", title: "Glukose-Trenddiagramm" },
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
          timeInRange: { period: "Verteilung der letzten {{hours}} Stunden." },
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
              "Das Glukosemodul ist wegen eines internen Fehlers nicht verfügbar.",
            module_disabled:
              "Das Glukosemodul wurde vom Administrator deaktiviert.",
            module_no_provider:
              "Das Glukosemodul ist nicht verfügbar, weil kein Anbieter konfiguriert ist.",
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
            home: "Start",
            aboutme: "Profil",
            projects: "Case Studies",
            glucose: "Glukose",
          },
        },
        footer: {
          positioning:
            "Ein minimales Full-Stack-Portfolio eines Schülers, der React, TypeScript und NestJS lernt.",
          copyright: "© {{year}} Patryk Znamirowski. Alle Rechte vorbehalten.",
          contact: "Profil",
          caseStudies: "Case Studies",
          glucoseData: "Glukosedaten",
        },
      },
      admin: {},
    },
  },
} as const;

export default de;
