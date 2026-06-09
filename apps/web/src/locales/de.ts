import { DE } from "country-flag-icons/react/1x1";

const de = {
  data: {
    name: "Deutsch",
    flag: DE,
  },
  translation: {
    roles: {
      administrator: "Administrator",
      contributor: "Mitwirkender",
      user: "Benutzer",
    },

    pages: {
      loading: {
        title: "Laden",
        message:
          "Wir füttern gerade die Hamster, die unseren Server antreiben. Bitte warten...",
      },

      serverError: {
        title: "500 Serverfehler",
        message:
          "Unser Server hat gerade gekündigt und sich im Badezimmer eingeschlossen. Wir verhandeln noch.",
      },

      notFound: {
        title: "404 Nicht gefunden",
        message:
          "Wir haben überall gesucht. In der Datenbank, unter dem Sofa und in den Taschen unserer Winterjacken. Diese Seite ist nicht hier.",
      },

      forbidden: {
        title: "403 Verboten",
        message:
          "Wir haben die digitalen Wachhunde von der Leine gelassen. Mach keine hastigen Bewegungen und verlasse diese Seite ganz langsam.",
      },

      maintenance: {
        title: "Wartungsarbeiten",
        message:
          "Wir wischen gerade Staub von den Kabeln und gießen die Datenbank. Wir sind zurück, sobald alles getrocknet ist.",
      },

      underConstruction: {
        title: "Im Aufbau",
        message:
          "Die Farbe trocknet noch, und wir versuchen, die IKEA-Anleitung zum Aufbau dieser Seite zu verstehen. Komm später wieder!",
      },

      selectLanguage: {
        title: "Sprache auswählen",
        subtitle: "Wählen Sie die bevorzugte Sprache für diese Seite aus.",
        noLanguages: "Derzeit sind keine Sprachen verfügbar.",
      },

      auth: {
        fields: {
          name: "Vollständiger Name",
          username: "Benutzername",
          identifier: "E-Mail oder Benutzername",
          email: "E-Mail-Adresse",
          password: "Passwort",
          confirmPassword: "Passwort wiederholen",
        },
        placeholders: {
          name: "Max Mustermann",
          username: "max",
          identifier: "max oder max@example.com",
          email: "max@example.com",
          password: "Mindestens 8 Zeichen",
          confirmPassword: "Passwort wiederholen",
        },
        actions: {
          showPassword: "Passwort anzeigen",
          hidePassword: "Passwort ausblenden",
        },
        errors: {
          name: "Gib deinen vollständigen Namen ein.",
          username: "Gib einen Benutzernamen mit mindestens 3 Zeichen ein.",
          identifierRequired:
            "Gib deine E-Mail-Adresse oder deinen Benutzernamen ein.",
          email: "Gib eine gültige E-Mail-Adresse ein.",
          passwordRequired: "Gib dein Passwort ein.",
          passwordLength: "Das Passwort muss mindestens 8 Zeichen haben.",
          passwordMatch: "Die Passwörter müssen übereinstimmen.",
          terms: "Akzeptiere die Nutzungsbedingungen.",
          invalidCredentials: "E-Mail, Benutzername oder Passwort ist falsch.",
          accountExists:
            "Ein Konto mit dieser E-Mail oder diesem Benutzernamen existiert bereits.",
          server:
            "Die Anfrage konnte nicht abgeschlossen werden. Versuche es gleich erneut.",
        },
        login: {
          title: "Anmelden",
          subtitle:
            "Öffne den Nutzerbereich und kehre ohne unnötigen Lärm zu deinen Einstellungen zurück.",
          eyebrow: "Zugang",
          formTitle: "Einloggen",
          description:
            "Ein kurzes, klares Formular im Stil der restlichen App und bereit für die API-Anbindung.",
          remember: "Angemeldet bleiben",
          forgotPassword: "Passwort vergessen?",
          submit: "Einloggen",
          submitting: "Einloggen",
          noAccount: "Noch kein Konto?",
          createAccount: "Konto erstellen",
          apiNotice:
            "Deine Sitzung wird lokal gespeichert und an geschützte API-Anfragen angehängt.",
        },
        register: {
          title: "Registrieren",
          subtitle:
            "Erstelle ein Konto in einem ruhigen, geordneten Formular, das zum Stil der Seite passt.",
          eyebrow: "Neues Konto",
          formTitle: "Konto erstellen",
          description:
            "Die Daten werden im Client validiert und das Formular ist für eine spätere Backend-Integration vorbereitet.",
          accept: "Ich akzeptiere die",
          terms: "Nutzungsbedingungen",
          submit: "Registrieren",
          submitting: "Konto erstellen",
          hasAccount: "Du hast schon ein Konto?",
          signIn: "Zur Anmeldung",
          apiNotice:
            "Das erste erstellte Konto erhält Administratorrechte aus der API.",
        },
        reset: {
          title: "Passwort zurücksetzen",
          subtitle:
            "Gib deine E-Mail-Adresse ein und die Oberfläche führt dich zurück zum Zugriff.",
          eyebrow: "Wiederherstellung",
          formTitle: "Passwort zurücksetzen",
          description:
            "Ein minimales Formular zum Senden eines Reset-Links, bereit für die Integration eines Maildienstes.",
          submit: "Reset-Link senden",
          remembered: "Passwort wieder eingefallen?",
          backToLogin: "Zurück zur Anmeldung",
          createAccount: "Neues Konto erstellen",
          hint: "Nach der API-Integration erhält der Nutzer eine E-Mail mit einem sicheren Link zum Ändern des Passworts.",
          sentTitle: "Link vorbereitet",
          sentMessage:
            "Wenn das Konto existiert, werden Anweisungen zum Zurücksetzen des Passworts an die angegebene Adresse gesendet.",
        },
      },

      user: {
        termsOfService: {
          title: "Nutzungsbedingungen",
          subtitle:
            "Alles, was Sie wissen müssen, bevor Sie unseren Service nutzen.",
          sections: {
            general: {
              title: "Allgemeine Bestimmungen und Definitionen",
              content:
                "Diese Nutzungsbedingungen legen die allgemeinen Bedingungen, Regeln und die Art der Bereitstellung elektronischer Dienste über unsere Website fest. Die Aufnahme der Nutzung des Dienstes ist gleichbedeutend mit der vollständigen Akzeptanz der Bedingungen dieser Nutzungsbedingungen. Der Administrator und Eigentümer des Dienstes ist Patryk Znamirowski. Wir behalten uns das Recht vor, die Nutzungsbedingungen aus wichtigem Grund zu ändern, worüber die Nutzer durch eine entsprechende Mitteilung auf der Website informiert werden.",
            },
            rules: {
              title:
                "Regeln für die Nutzung des Dienstes und Pflichten des Nutzers",
              content:
                "Der Nutzer ist verpflichtet, den Dienst in einer Weise zu nutzen, die im Einklang mit dem geltenden polnischen Recht, den Grundsätzen des gesellschaftlichen Zusammenlebens und den guten Sitten steht. Es ist strengstens untersagt, rechtswidrige Inhalte bereitzustellen, insbesondere Inhalte, die Persönlichkeitsrechte verletzen, Hass propagieren, beleidigend sind, sowie unaufgeforderte kommerzielle Informationen (SPAM) zu versenden. Der Nutzer darf keine Maßnahmen ergreifen, die das ordnungsgemäße Funktionieren der Website stören könnten, einschließlich der Verwendung von Schadsoftware, Bots oder Skripten, die automatisch Daten herunterladen.",
            },
            intellectualProperty: {
              title: "Urheberrechte und geistiges Eigentum",
              content:
                "Alle auf der Website zur Verfügung gestellten Materialien, einschließlich Texte, Fotos, Grafiken, Logos, Quellcodes und die räumliche Gestaltung des Dienstes, sind ausschließliches Eigentum des Administrators oder wurden auf der Grundlage entsprechender Lizenzen verwendet und sind gesetzlich geschützt. Das Kopieren, Ändern, Verbreiten oder Verwenden dieser Inhalte für kommerzielle Zwecke ohne vorherige schriftliche Zustimmung des Administrators ist strengstens untersagt.",
            },
            liability: {
              title: "Ausschluss und Beschränkung der Haftung",
              content:
                "Der Administrator bemüht sich nach Kräften, sicherzustellen, dass die auf der Website enthaltenen Informationen zuverlässig und aktuell sind, jedoch wird der Dienst in der vorliegenden Form ('as is') bereitgestellt. Der Administrator haftet nicht für Schäden, die aus der Nutzung oder der Unmöglichkeit der Nutzung des Dienstes resultieren, sowie für Unterbrechungen im Betrieb der Website, die durch Wartungsarbeiten, Hardware- oder Softwareausfälle, Hackerangriffe oder höhere Gewalt verursacht werden. Der Administrator ist auch nicht verantwortlich für Inhalte, die auf externen Websites veröffentlicht werden, zu denen Links von unserem Dienst führen können.",
            },
            complaints: {
              title: "Beschwerdeverfahren",
              content:
                "Alle Vorbehalte, Anmerkungen und Beschwerden bezüglich des Funktionierens des Dienstes sollten elektronisch an die folgende E-Mail-Adresse gesendet werden: znamirowskipatryk@gmail.com. Die Meldung sollte die Kontaktdaten der meldenden Person sowie eine detaillierte Beschreibung des Problems enthalten. Der Administrator wird innerhalb von 14 Werktagen nach Eingang der Beschwerde Stellung nehmen und die Antwort an die vom Nutzer angegebene E-Mail-Adresse senden.",
            },
            finalProvisions: {
              title: "Schlussbestimmungen",
              content:
                "In Angelegenheiten, die nicht durch diese Nutzungsbedingungen geregelt sind, gelten die allgemein anwendbaren Bestimmungen des polnischen Rechts, insbesondere das Zivilgesetzbuch und das Gesetz über die Erbringung elektronischer Dienstleistungen. Alle Streitigkeiten, die sich aus der Nutzung des Dienstes ergeben, werden durch das zuständige ordentliche Gericht beigelegt. Die Nutzungsbedingungen treten am Tag ihrer Veröffentlichung auf der Website in Kraft.",
            },
          },
        },

        privacyPolicy: {
          title: "Datenschutzerklärung",
          subtitle:
            "Alles, was Sie über die Verarbeitung Ihrer personenbezogenen Daten wissen müssen.",
          sections: {
            controller: {
              title: "Verantwortlicher für personenbezogene Daten",
              content:
                "Gemäß Art. 13 Abs. 1 und 2 der Verordnung (EU) 2016/679 des Europäischen Parlaments und des Rates (DSGVO) informieren wir Sie, dass der Verantwortliche für Ihre personenbezogenen Daten Patryk Znamirowski ist. Sie können den Administrator elektronisch unter folgender E-Mail-Adresse kontaktieren: znamirowskipatryk@gmail.com. Der Administrator sorgt für die Datensicherheit und hält die geltenden Datenschutzbestimmungen ein.",
            },
            dataCollection: {
              title: "Umfang und Zwecke der Datenverarbeitung",
              content:
                "Wir verarbeiten personenbezogene Daten, die vom Nutzer beim Ausfüllen des Kontaktformulars freiwillig angegeben werden (z. B. Name, Vorname, E-Mail-Adresse), sowie Daten, die beim Besuch der Website automatisch erfasst werden (z. B. IP-Adresse, Browsertyp, Besuchszeit). Diese Daten werden verarbeitet, um Korrespondenz zu bearbeiten und Anfragen zu beantworten (Art. 6 Abs. 1 lit. f DSGVO), elektronische Dienstleistungen zu erbringen (Art. 6 Abs. 1 lit. b DSGVO) sowie zu analytischen und statistischen Zwecken und zur Absicherung der Website gegen Angriffe (Art. 6 Abs. 1 lit. f DSGVO).",
            },
            dataSharing: {
              title: "Datenempfänger und Datenübermittlung",
              content:
                "Ihre personenbezogenen Daten können an vertrauenswürdige Dritte (sogenannte Auftragsverarbeiter) weitergegeben werden, mit denen der Administrator zusammenarbeitet, um das ordnungsgemäße Funktionieren des Dienstes sicherzustellen. Dazu gehören Hosting-Anbieter, IT-Dienste, Analysetools (z. B. Google Analytics) und E-Mail-Versandsysteme. Daten werden nicht weiterverkauft oder unbefugten Dritten zugänglich gemacht. Daten können staatlichen Behörden nur auf Grundlage zwingend anwendbarer Rechtsvorschriften zugänglich gemacht werden.",
            },
            retention: {
              title: "Speicherdauer der Daten",
              content:
                "Personenbezogene Daten, die zur Bearbeitung einer Anfrage verarbeitet werden, werden für die Dauer der Korrespondenz und nach deren Abschluss für die Zeit gespeichert, die zur Sicherung potenzieller Ansprüche erforderlich ist. Daten, die aufgrund einer Einwilligung (z. B. für Marketingzwecke) verarbeitet werden, werden bis zu deren Widerruf gespeichert. Zu Analysezwecken erhobene Daten werden gespeichert, bis sie veraltet sind oder der Nutzer wirksam widerspricht.",
            },
            userRights: {
              title: "Rechte der Nutzer nach DSGVO",
              content:
                "Jeder Nutzer hat das Recht, vom Administrator Auskunft über seine personenbezogenen Daten, deren Berichtigung, Löschung (Recht auf Vergessenwerden) oder Einschränkung der Verarbeitung zu verlangen. Sie haben auch das Recht, der Verarbeitung zu widersprechen, das Recht auf Datenübertragbarkeit und das Recht, die Einwilligung jederzeit zu widerrufen (ohne dass die Rechtmäßigkeit der aufgrund der Einwilligung bis zum Widerruf erfolgten Verarbeitung berührt wird). Darüber hinaus haben Sie das Recht, eine Beschwerde bei einer Aufsichtsbehörde einzureichen.",
            },
            cookies: {
              title: "Cookie-Richtlinie",
              content:
                "Die Website verwendet Cookies, also kleine Textinformationen, die auf dem Endgerät des Nutzers gespeichert werden. Wir verwenden unbedingt erforderliche Cookies (für das ordnungsgemäße Funktionieren der Website) und optionale Cookies (Analyse und Marketing), die uns helfen zu verstehen, wie Nutzer den Service nutzen, um ihn verbessern zu können. Beim ersten Besuch der Website kann der Nutzer optionalen Cookies zustimmen. Cookie-Einstellungen können jederzeit über die Optionen des Webbrowsers geändert werden.",
            },
            security: {
              title: "Datensicherheit",
              content:
                "Der Administrator ergreift geeignete technische und organisatorische Maßnahmen, um den Schutz der verarbeiteten personenbezogenen Daten zu gewährleisten, der den Bedrohungen und Kategorien der geschützten Daten angemessen ist. Insbesondere ist der Dienst mit einem SSL-Zertifikat gesichert, das die zwischen dem Browser des Nutzers und dem Server übertragenen Daten verschlüsselt. Nur vom Administrator autorisierte Personen haben Zugang zu personenbezogenen Daten.",
            },
          },
        },

        home: {
          hero: {
            eyebrow: "Full-stack-Entwickler im Aufbau",
            name: "Patryk Znamirowski",
            headline:
              "Ein ambitionierter junger Programmierer, der Ideen mit Leidenschaft in funktionierende Webanwendungen verwandelt.",
            description:
              "Jeden Tag entwickle ich meine Programmierkenntnisse weiter, indem ich schulische Theorie mit praktischem Coding verbinde. Ich erstelle moderne Websites und Anwendungen und experimentiere mit neuen Technologien. Aktiv suche ich nach Möglichkeiten, erste Erfahrungen zu sammeln und in die professionelle IT-Welt einzusteigen.",
            primaryAction: "Meine Projekte ansehen",
            secondaryAction: "Kontakt aufnehmen",
            imageAlt: "Patryk Znamirowski - Profilfoto",
          },
          links: {
            github: "Patryks GitHub-Profil",
            linkedin: "Patryks LinkedIn-Profil",
            email: "Patryk eine E-Mail senden",
          },
          profileCard: {
            eyebrow: "Bielsko-Biala / Technikum",
            title: "Schüler im Bereich Programmierung",
            description:
              "Ich baue eigene Projekte, entwickle meinen React- und NestJS-Stack weiter und suche meine ersten echten Herausforderungen in der IT-Branche.",
          },
          metrics: {
            education: {
              value: "3 Jahre",
              label: "Aktives Lernen am Technikum im Bereich Programmierung.",
            },
            practice: {
              value: "Hunderte Stunden",
              label:
                "Eigenständiges Vertiefen von Programmierwissen nach dem Unterricht.",
            },
            motivation: {
              value: "100%",
              label:
                "Motivation, mich weiterzuentwickeln und erste kommerzielle Erfahrung zu sammeln.",
            },
          },
          focus: {
            title: "Was du auf dieser Seite findest",
            description:
              "Dieses Portfolio zeigt meine Projekte, meinen aktuellen Lernstand und praktische Experimente mit Webanwendungen.",
            items: {
              projects: {
                title: "Webprojekte",
                description:
                  "Reale Anwendungen und Experimente, in denen ich Frontend, Backend und API-Integrationen übe.",
              },
              learning: {
                title: "Entwicklungsweg",
                description:
                  "Eine kurze Geschichte darüber, wie aus Neugier für Roblox-Spiele das Bauen von Webanwendungen wurde.",
              },
              glucose: {
                title: "CGM-Integration",
                description:
                  "Ein Glukosemodul, das zeigt, wie ich das Frontend mit einer realen Datenquelle verbinde.",
              },
            },
          },
        },

        aboutme: {
          title: "Über mich",
          subtitle:
            "Lerne meinen aktuellen Lernstand, meine Arbeitsweise und meine Ziele für die ersten beruflichen Herausforderungen kennen.",
          story: {
            eyebrow: "Geschichte",
            title: "Von Neugier zu eigenen Anwendungen",
            description:
              "Ich sehe Programmieren als Handwerk, das man am besten durch reale Projekte, Dokumentation und konsequente Verbesserung des Codes lernt.",
            start:
              "Hallo! Ich bin 17 Jahre alt und besuche ein Technikum in Bielsko-Biala im Bereich Programmierung. Meine Programmierlaufbahn begann mit einfacher Neugier beim Erstellen von Roblox-Spielen und führt heute zum regelmäßigen Bau eigener, immer anspruchsvollerer Projekte.",
            learning:
              "In meiner Freizeit versuche ich, weit über den Schulstoff hinauszugehen. Ich erkunde selbstständig moderne Frameworks, lerne gute Praktiken für sauberen Code und möchte verstehen, wie man Anwendungen baut, die sowohl performant als auch nutzerfreundlich sind.",
            goal: "Mein aktuelles Hauptziel ist es, meine Fähigkeiten mit der geschäftlichen Realität zu konfrontieren. Sehr gerne würde ich ein Praktikum, eine Trainee-Stelle oder Junior-Aufgaben übernehmen, um von erfahreneren Entwicklern in einer echten Arbeitsumgebung zu lernen.",
          },
          experience: {
            eyebrow: "Aktueller Stand",
            title: "Lernen und erste Praxis",
            items: {
              school: {
                title: "Schüler am Technikum",
                description:
                  "Ich lerne in Bielsko-Biala im Bereich Programmierung und entwickle eigene Projekte außerhalb des Schulprogramms.",
              },
              practice: {
                title: "1 Monat Praxis mit Laravel",
                description:
                  "Ich habe ein Praktikum absolviert, in dem ich mit dem Laravel-Framework gearbeitet und den realistischeren Rhythmus der Anwendungsentwicklung kennengelernt habe.",
              },
            },
          },
          tech: {
            eyebrow: "Stack",
            title: "Technologien, die ich aktuell entwickle",
            description:
              "Mein stärkster Fokus liegt auf Webanwendungen im Ökosystem von React, NestJS und TailwindCSS.",
          },
          strengths: {
            eyebrow: "Stärken",
            title: "Wie ich an Lernen und Probleme herangehe",
            description:
              "Ich stehe am Anfang meines Weges, und genau deshalb setze ich auf Flexibilität, Selbstständigkeit und Konsequenz.",
            items: {
              curiosity: {
                title: "Großer Wissenshunger",
                description:
                  "Ich beschränke mich nicht auf das, was für Schulaufgaben nötig ist. Ich lese Dokumentationen, schaue Tutorials und teste aktuelle Technologien, um nah an den Trends zu bleiben.",
              },
              flexibility: {
                title: "Keine schlechten Gewohnheiten und hohe Flexibilität",
                description:
                  "Ich stehe am Anfang meiner Laufbahn, deshalb nehme ich Wissen schnell auf und passe mich zügig an neue Standards, Werkzeuge und Team-Methoden an.",
              },
              determination: {
                title: "Ausdauer beim Lösen von Problemen",
                description:
                  "Wenn ich auf einen Fehler im Code stoße, gebe ich nicht auf, bis ich seine Ursache verstehe. Ich kann selbstständig nach Lösungen suchen, was meine technische Eigenständigkeit stärkt.",
              },
            },
          },
        },

        projects: {
          title: "Meine Projekte",
          subtitle:
            "Hier findest du eine Liste meiner persönlichen und beruflichen Projekte. Jedes Projekt ist mir wichtig, da es meine Fähigkeiten, meine Leidenschaft und mein Engagement für die technologische Entwicklung repräsentiert. Schau sie dir gerne an und kontaktiere mich, wenn du Fragen hast oder zusammenarbeiten möchtest!",
          loadingProjects: "Projekte werden geladen...",
          loadingProject: "Projekt wird geladen...",
          loadError: "Projekte können zurzeit nicht geladen werden.",
          noProjects:
            "Ich habe noch keine Projekte zum Vorzeigen, aber ich arbeite daran!",
          projectNotFound:
            "Projekt nicht gefunden. Es könnte von Außerirdischen entführt worden sein oder es versteckt sich einfach vor uns.",
          returnToProjects: "Zurück zu den Projekten",
          statuses: {
            completed: "Abgeschlossen",
            inProgress: "In Arbeit",
            onHold: "Pausiert",
            planned: "Geplant",
          },
          sourceCode: {
            available: "Quellcode anzeigen",
            openAction: "Quellcode anzeigen",
            stateOpen: "Offener Quellcode",
            stateClosed: "Geschlossener Quellcode",
            notAvailable: "Quellcode nicht verfügbar",
            closed: "Geschlossener Quellcode",
          },
          startedAt: "Gestartet am",
          completedAt: "Abgeschlossen am",
          status: "Status",
          team: "Team",
          technologies: "Technologien",
          technologyCountOne: "{{count}} Technologie",
          technologyCountMany: "{{count}} Technologien",
          filterLabel: "Projektfilter",
          filters: {
            all: "Alle",
            completed: "Abgeschlossene",
            inProgress: "In Arbeit",
            onHold: "Pausiert",
            planned: "Geplante",
          },
          details: {
            project: "Projekt",
            description: "Beschreibung",
            whatItDoes: "Was dieses Projekt zeigt",
            meta: "Metadaten",
            timeline: "Zeit und VerfĂĽgbarkeit",
            team: "Team",
            view: "Sicht",
            contributors: "Autoren und Rollen",
            noContributors: "Keine Teamdaten.",
          },
        },

        glucose: {
          title: "Mein Blutzucker",
          subtitle:
            "Durchsuchen Sie Blutzuckerdaten von meinem CGM (kontinuierliches Glukosemessgerät) in Echtzeit. Sehen Sie aktuelle Messwerte, analysieren Sie Trends und überwachen Sie die im Zielbereich verbrachte Zeit. Alles an einem Ort, verfügbar für jeden Interessierten.",
          loading: "Glukosedaten werden geladen...",
          availability: {
            eyebrow: "CGM-Modulstatus",
            disabledTitle: "Glukosemodul ist ausgeschaltet",
            disabled:
              "Das Glukosemodul wurde vom Website-Administrator deaktiviert.",
            noProviderTitle: "Kein Anbieter verbunden",
            noProvider:
              "Das Glukosemodul ist aktiviert, aber derzeit ist kein Datenanbieter verfügbar.",
            initializingTitle: "Glukosemodul startet",
            initializing:
              "Das Glukosemodul wird gestartet. Die Daten erscheinen in Kürze hier.",
            unavailableTitle: "Statusprüfung fehlgeschlagen",
            unavailable:
              "Die Verfügbarkeit des Glukosemoduls konnte derzeit nicht geprüft werden.",
          },
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
            title: "Letzter Wert",
            sensor: "Sensor",
            noSensor: "Keine Sensordaten",
            active: "Aktiv",
            inactive: "Inaktiv",
            status: "Messstatus",
            current: "Aktuell",
            stale: "Veraltet",
            outOfRange: "Außerhalb des Geltungsbereichs",
            readAt: "Gemessen um",
            lastUpload: "Letzter Upload",
            activatedAt: "Aktiviert am",
            expiresIn: "Läuft ab in",
            refresh: "Nächste Aktualisierung",
            sensorLife: "Sensorlaufzeit",
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
            gmi: {
              eyebrow: "GMI",
              title: "Glykämie-Management-Indikator",
              insufficient:
                "GMI benötigt mindestens 7 Tage Glukosedaten. Wähle einen längeren Zeitraum, um diese Schätzung anzuzeigen.",
              insufficientDatabase:
                "Der gewählte Zeitraum ist lang genug, aber in der Datenbank gibt es noch nicht genug Glukosedaten, um GMI zu berechnen.",
              context:
                "GMI schätzt einen HbA1c-ähnlichen Trend aus CGM-Daten und ist besonders nützlich zusammen mit der Zeit im Zielbereich.",
            },
          },
          timeRange: {
            label: "Glukose-Zeitraum",
            "1d": "1T",
            "7d": "7T",
            "14d": "14T",
            "30d": "30T",
            "90d": "90T",
            all: "Gesamt",
          },
          timeInRange: {
            period: "Verteilung der letzten {{hours}} Stunden.",
          },
          graph: {
            empty: "Keine Glukosewerte für das Diagramm verfügbar.",
            range: "Zielbereich: {{low}}-{{high}} {{unit}}",
            value: "Glukose",
            targetZone: "Zielbereich",
            inRangeSummary:
              "{{value}}% der sichtbaren Messwerte liegen im Zielbereich.",
            referencePoints: "Referenzpunkte",
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
          mobileNavigation: "Mobile Navigation",
          changeLanguage: "Sprache wechseln",
          changeTheme: "Thema wechseln",
          themes: {
            light: "Hell",
            dark: "Dunkel",
            contrast: "Kontrast",
          },
          pages: {
            home: "Startseite",
            aboutme: "Über mich",
            projects: "Projekte",
            glucose: "Blutzucker",
          },
          account: {
            login: "Einloggen",
            logout: "Ausloggen",
            expand: "Kontomenü öffnen",
            profile: "Profil",
            settings: "Einstellungen",
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
