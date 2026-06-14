import { GB } from "country-flag-icons/react/1x1";

const en = {
  data: {
    name: "English",
    flag: GB,
  },
  translation: {
    roles: {
      administrator: "Administrator",
      contributor: "Contributor",
      user: "User",
    },

    pages: {
      loading: {
        title: "Loading",
        message: "Feeding the hamsters that power our server. Please wait...",
      },

      serverError: {
        title: "500 Server Error",
        message:
          "Our server just threw its hands up and locked itself in the bathroom. We're negotiating.",
      },

      notFound: {
        title: "404 Not Found",
        message:
          "We looked everywhere. In the database, under the couch, and in our winter coat pockets. It's just not here.",
        returnHome: "Return to home page",
      },

      forbidden: {
        title: "403 Forbidden",
        message:
          "We've unleashed the digital guard dogs. Make no sudden movements and slowly back away from this page.",
        returnHome: "Return to home page",
      },

      maintenance: {
        title: "Maintenance in progress",
        message:
          "We're currently dusting off the cables and watering the database. We'll be back as soon as everything dries up.",
      },

      underConstruction: {
        title: "Under Construction",
        message:
          "The paint is still drying, and we're trying to figure out the IKEA manual on how to assemble this site. Come back later!",
        returnHome: "Return to home page",
      },

      selectLanguage: {
        title: "Select language",
        subtitle: "Select the preferred language for this website.",
        noLanguages: "No languages available at the moment.",
      },

      auth: {
        fields: {
          name: "Full name",
          username: "Username",
          identifier: "Email or username",
          email: "Email address",
          password: "Password",
          confirmPassword: "Confirm password",
        },
        placeholders: {
          name: "Jane Doe",
          username: "jane",
          identifier: "jane or jane@example.com",
          email: "jane@example.com",
          password: "At least 8 characters",
          confirmPassword: "Repeat password",
        },
        actions: {
          showPassword: "Show password",
          hidePassword: "Hide password",
        },
        errors: {
          name: "Enter your full name.",
          username: "Enter a username with at least 3 characters.",
          identifierRequired: "Enter your email address or username.",
          email: "Enter a valid email address.",
          passwordRequired: "Enter your password.",
          passwordLength: "Password must be at least 8 characters.",
          passwordMatch: "Passwords must match.",
          terms: "Accept the terms of service.",
          invalidCredentials: "Email, username, or password is incorrect.",
          accountExists:
            "An account with this email or username already exists.",
          server: "The request could not be completed. Try again in a moment.",
        },
        login: {
          title: "Login",
          subtitle:
            "Enter the user panel and return to your settings without unnecessary noise.",
          eyebrow: "Access",
          formTitle: "Sign in",
          description:
            "A short, readable form aligned with the rest of the app and ready for API wiring.",
          remember: "Remember me",
          forgotPassword: "Forgot password?",
          submit: "Sign in",
          submitting: "Signing in",
          noAccount: "Do not have an account yet?",
          createAccount: "Create account",
          apiNotice:
            "Your session will be stored locally and attached to protected API requests.",
        },
        register: {
          title: "Register",
          subtitle:
            "Create an account in a calm, structured form that matches the site style.",
          eyebrow: "New account",
          formTitle: "Create account",
          description:
            "Data is validated on the client and the form is prepared for later backend integration.",
          accept: "I accept the",
          terms: "terms of service",
          submit: "Register",
          submitting: "Creating account",
          hasAccount: "Already have an account?",
          signIn: "Go to login",
          apiNotice:
            "The first created account receives administrator permissions from the API.",
        },
        reset: {
          title: "Reset password",
          subtitle:
            "Enter your email address and the interface will guide you back to access.",
          eyebrow: "Recovery",
          formTitle: "Reset your password",
          description:
            "A minimal form for sending a reset link, ready for email service integration.",
          submit: "Send reset link",
          remembered: "Password came back?",
          backToLogin: "Back to login",
          createAccount: "Create a new account",
          hint: "After API integration, the user will receive an email with a secure password reset link.",
          sentTitle: "Link prepared",
          sentMessage:
            "If the account exists, password reset instructions will be sent to the provided address.",
        },
      },

      user: {
        game: {
          title: "Glycemia Guardians",
          subtitle: "Defeat a knowledge boss alone or with up to two allies.",
          eyebrow: "Educational boss fight",
          hero: "Knowledge is your strongest attack.",
          intro:
            "Choose a topic, gather a team and turn verified diabetes knowledge into damage against the boss.",
          setupEyebrow: "Game setup",
          setupTitle: "Prepare the fight",
          setupDescription: "Enter your name and choose how you want to play.",
          modeLabel: "Game mode",
          create: "Create room",
          join: "Join room",
          nickname: "Player nickname",
          roomCode: "Room code",
          selectBoss: "Choose a knowledge boss",
          loadingBosses: "Loading bosses...",
          bossesError: "The available bosses could not be loaded.",
          roundsLabel: "rounds",
          questionsLabel: "questions",
          connected: "Connected to game server",
          connecting: "Connecting to game server...",
          createAction: "Create fight",
          joinAction: "Join fight",
          disclaimerTitle: "Educational content",
          disclaimer:
            "The game does not replace medical advice. In an emergency, contact local emergency services.",
          features: {
            knowledge: "Verified knowledge",
            players: "1-3 players online",
            help: "First aid scenarios",
          },
          lobby: {
            title: "Team lobby",
            subtitle: "Share the code, ready up and start the fight.",
            roomCode: "Room code",
            host: "Host",
            ready: "Ready",
            waiting: "Waiting",
            instructions:
              "Every player receives the same question and has 25 seconds.",
            copyCode: "Copy room code",
            players: "Players",
            readyCount: "Ready",
            player: "Player",
            status: "Session status",
            preparation: "Prepare the team",
            answerTime: "Time for each answer",
            readyAction: "I am ready",
            notReadyAction: "Cancel readiness",
            start: "Start fight",
          },
          battle: {
            boss: "Knowledge boss",
            bossHealth: "Boss health",
            time: "Time",
            teamScore: "Team score",
            seconds: "seconds",
            round: "Round {{current}} of {{total}}",
            match: "Matching key",
            waiting: "Answer sent",
            answer: "Submit answer",
            chooseAnswer: "Choose an answer to continue",
            waitingForPlayers: "Answer sent. Waiting for the team.",
            correct: "Correct answer",
            incorrect: "Incorrect answer",
            correctDescription:
              "Your answer was correct and weakened the boss.",
            incorrectDescription:
              "Your answer was incorrect. Review the explanation before the next round.",
            explanation: "Explanation",
            reviewReady:
              "The explanation stays visible until the host continues.",
            waitForHost: "The host will continue when the team is ready.",
            nextRound: "Next question",
            startFinal: "Start final strike",
          },
          final: {
            title: "Final strike",
            subtitle:
              "Knowledge weakened the boss. Coordination and precision will finish the fight.",
            eyebrow: "Reflex challenge",
            instruction: "Hit every active target before time runs out.",
            time: "Time left",
            weakness: "Boss weakness",
            hits: "Team hits",
            arena: "Target zone",
            teamHint: "Each player can hit every target once",
            target: "Hit the active target",
            difficulty:
              "The weakened boss requires {{hits}} hits. Each target remains active for {{lifetime}} seconds.",
          },
          result: {
            victory: "Boss defeated",
            defeat: "The boss survived",
            description:
              "Review the team contribution and try the topic again.",
            playAgain: "Play again",
            completed: "Completed",
            tryAgain: "Try again",
            topScore: "Top score",
            points: "points",
            correctAnswers: "{{correct}} of {{total}} correct",
          },
        },

        termsOfService: {
          title: "Terms of Service",
          subtitle:
            "Everything you need to know before starting to use our service.",
          sections: {
            general: {
              title: "General provisions and definitions",
              content:
                "These Terms of Service define the general conditions, rules, and method of providing electronic services via our website. Starting to use the service is equivalent to full acceptance of the conditions of these Terms of Service. The administrator and owner of the service is Patryk Znamirowski. We reserve the right to make changes to the Terms of Service for important reasons, about which users will be informed via an appropriate announcement on the website.",
            },
            rules: {
              title: "Rules for using the service and user obligations",
              content:
                "The user is obliged to use the service in a manner consistent with applicable Polish law, principles of social coexistence, and good manners. It is strictly forbidden to provide unlawful content, in particular content that violates personal rights, propagates hatred, is offensive, as well as sending unsolicited commercial information (SPAM). The user may not take actions that could disrupt the proper functioning of the website, including using malicious software, bots, or scripts that automatically download data.",
            },
            intellectualProperty: {
              title: "Copyright and intellectual property",
              content:
                "All materials made available on the website, including texts, photos, graphics, logos, source codes, and the spatial layout of the service, are the exclusive property of the Administrator or have been used on the basis of appropriate licenses and are legally protected. Copying, modifying, distributing, or using this content for commercial purposes without the prior written consent of the Administrator is strictly prohibited.",
            },
            liability: {
              title: "Exclusion and limitation of liability",
              content:
                "The Administrator makes every effort to ensure that the information contained on the website is reliable and up-to-date, however, the service is provided on an 'as is' basis. The Administrator is not liable for any damages resulting from the use or inability to use the service, interruptions in the operation of the website caused by maintenance work, hardware or software failures, hacker attacks, or force majeure. The Administrator is also not responsible for the content posted on external websites to which links from our service may lead.",
            },
            complaints: {
              title: "Complaint procedure",
              content:
                "Any reservations, comments, and complaints regarding the functioning of the service should be submitted electronically to the e-mail address: znamirowskipatryk@gmail.com. The notification should contain the contact details of the reporting person and a detailed description of the problem. The Administrator will respond to the complaint within 14 working days from the date of its delivery, sending the response to the e-mail address provided by the user.",
            },
            finalProvisions: {
              title: "Final provisions",
              content:
                "In matters not covered by these Terms of Service, the generally applicable provisions of Polish law apply, in particular the Civil Code and the Act on Providing Services by Electronic Means. Any disputes arising from the use of the service will be resolved by the competent common court. The Terms of Service enter into force on the day of their publication on the website.",
            },
          },
        },

        privacyPolicy: {
          title: "Privacy Policy",
          subtitle:
            "Everything you need to know about the processing of your personal data.",
          sections: {
            controller: {
              title: "Personal Data Administrator",
              content:
                "In accordance with Art. 13 sec. 1 and 2 of the Regulation (EU) 2016/679 of the European Parliament and of the Council (GDPR), we inform you that the Administrator of your personal data is Patryk Znamirowski. You can contact the Administrator electronically at the e-mail address: znamirowskipatryk@gmail.com. The Administrator ensures data security and complies with applicable data protection regulations.",
            },
            dataCollection: {
              title: "Scope and purposes of data processing",
              content:
                "We process personal data provided voluntarily by the user (e.g., name, surname, e-mail address) filling out the contact form, as well as data collected automatically during a visit to the website (e.g., IP address, browser type, time of visit). This data is processed in order to handle correspondence and answer inquiries (Art. 6 sec. 1 lit. f GDPR), provide electronic services (Art. 6 sec. 1 lit. b GDPR), and for analytical and statistical purposes, as well as securing the website against attacks (Art. 6 sec. 1 lit. f GDPR).",
            },
            dataSharing: {
              title: "Data recipients and data transfer",
              content:
                "Your personal data may be transferred to trusted third parties (so-called processors) with whom the Administrator cooperates to ensure the proper functioning of the service. This includes hosting service providers, IT services, analytical tools (e.g., Google Analytics), and email delivery systems. Data is not resold or made available to unauthorized entities. Data may be made available to state authorities only on the basis of absolutely applicable provisions of law.",
            },
            retention: {
              title: "Data retention period",
              content:
                "Personal data processed to handle an inquiry will be stored for the duration of the correspondence, and after its conclusion, for the time necessary to secure potential claims. Data processed on the basis of consent (e.g., for marketing purposes) is stored until its withdrawal. Data collected for analytical purposes is stored until it becomes outdated or until the user submits an effective objection.",
            },
            userRights: {
              title: "User rights in accordance with GDPR",
              content:
                "Every user has the right to request from the Administrator access to their personal data, its rectification, erasure (the right to be forgotten), or restriction of processing. You also have the right to object to processing, the right to data portability, and the right to withdraw consent at any time (without affecting the lawfulness of processing based on consent before its withdrawal). Furthermore, you have the right to lodge a complaint with a supervisory authority.",
            },
            cookies: {
              title: "Cookies Policy",
              content:
                "The website uses cookies, which are small text information stored on the user's end device. We use essential cookies (for the proper functioning of the website) and optional cookies (analytical and marketing), which help us understand how users use the service so we can improve it. During the first visit to the website, the user can consent to optional cookies. Cookie settings can be changed at any time using the web browser options.",
            },
            security: {
              title: "Data Security",
              content:
                "The Administrator uses appropriate technical and organizational measures to ensure the protection of processed personal data appropriate to the threats and categories of data protected. In particular, the service is secured with an SSL certificate, which encrypts data transmitted between the user's browser and the server. Only persons authorized by the Administrator have access to personal data.",
            },
          },
        },

        home: {
          hero: {
            eyebrow: "Full-stack developer in progress",
            name: "Patryk Znamirowski",
            headline:
              "An ambitious young programmer who turns ideas into working web applications with passion.",
            description:
              "Every day I develop my programming skills by combining school theory with practical coding. I create modern websites and applications while experimenting with new technologies. I am actively looking for opportunities to gain my first experience and enter the professional IT world.",
            primaryAction: "View my projects",
            secondaryAction: "Contact me",
            imageAlt: "Patryk Znamirowski - profile photo",
          },
          links: {
            github: "Patryk's GitHub profile",
            linkedin: "Patryk's LinkedIn profile",
            email: "Send Patryk an email",
          },
          profileCard: {
            eyebrow: "Bielsko-Biala / technical school",
            title: "Programming technician student",
            description:
              "I build personal projects, grow my React and NestJS stack, and look for my first real challenges in the IT industry.",
          },
          metrics: {
            education: {
              value: "3 years",
              label:
                "Of active learning at technical school in the programming technician track.",
            },
            practice: {
              value: "Hundreds of hours",
              label: "Spent independently exploring code after school.",
            },
            motivation: {
              value: "100%",
              label:
                "Motivation to grow and gain my first commercial experience.",
            },
          },
          focus: {
            title: "What you will find here",
            description:
              "This portfolio presents my projects, current learning stage, and practical experiments with web applications.",
            items: {
              projects: {
                title: "Web projects",
                description:
                  "Real applications and experiments where I practice frontend, backend, and API integrations.",
              },
              learning: {
                title: "Learning path",
                description:
                  "A short story of how curiosity about Roblox games led me toward building web applications.",
              },
              glucose: {
                title: "CGM integration",
                description:
                  "A glucose data module showing how I connect the frontend to a real data source.",
              },
            },
          },
        },

        aboutme: {
          title: "About me",
          subtitle:
            "Get to know my learning stage, working style, and what I am looking for in my first professional challenges.",
          story: {
            eyebrow: "Story",
            title: "From curiosity to my own applications",
            description:
              "I treat programming as a craft best learned through real projects, documentation, and consistent code improvement.",
            start:
              "Hi! I am 17 and I study at a technical school in Bielsko-Biala in the programming technician track. My programming journey started with simple curiosity through creating Roblox games, and today it has grown into regularly building my own, increasingly advanced projects.",
            learning:
              "In my free time, I try to go far beyond the school curriculum. I independently explore modern frameworks, learn good practices for writing clean code, and try to understand how to build applications that are both efficient and user-friendly.",
            goal: "My main goal now is to test my skills against business reality. I would gladly take on an internship, traineeship, or junior-level challenge to learn from more experienced developers in a real working environment.",
          },
          experience: {
            eyebrow: "Current stage",
            title: "Learning and first practice",
            items: {
              school: {
                title: "Technical school student",
                description:
                  "I study in Bielsko-Biala in the programming technician track and develop my own projects beyond the school curriculum.",
              },
              practice: {
                title: "1 month of Laravel practice",
                description:
                  "I completed practical training where I worked with the Laravel framework and learned a more realistic rhythm of application development.",
              },
            },
          },
          tech: {
            eyebrow: "Stack",
            title: "Technologies I am developing now",
            description:
              "My strongest focus is building web applications in the React, NestJS, and TailwindCSS ecosystem.",
          },
          strengths: {
            eyebrow: "Strengths",
            title: "How I approach learning and problems",
            description:
              "I am at the beginning of my path, and that is exactly why I value flexibility, independence, and consistency.",
            items: {
              curiosity: {
                title: "A strong hunger for knowledge",
                description:
                  "I do not limit myself to what I need for school assignments. I read documentation, watch tutorials, and test current market technologies to stay close to trends.",
              },
              flexibility: {
                title: "No bad habits and high flexibility",
                description:
                  "I am at the beginning of my journey, which means I absorb knowledge quickly and adapt fast to new standards, tools, and team methodologies.",
              },
              determination: {
                title: "Determination in solving problems",
                description:
                  "When I encounter a bug, I do not give up until I understand its cause. I can search for solutions independently, which strengthens my technical independence.",
              },
            },
          },
        },

        projects: {
          title: "My projects",
          subtitle:
            "Here you will find a list of my personal and professional projects. Every project is important to me, as it represents my skills, passion, and commitment to technological development. Feel free to check them out and contact me if you have any questions or want to collaborate!",
          loadingProjects: "Loading projects...",
          loadingProject: "Loading project...",
          loadError: "Projects could not be loaded right now.",
          noProjects:
            "I don't have any projects to show yet, but I'm working on them!",
          projectNotFound:
            "Project not found. It might have been abducted by aliens, or it's just hiding from us.",
          returnToProjects: "Return to projects",
          statuses: {
            completed: "Completed",
            inProgress: "Work in Progress",
            onHold: "On hold",
            planned: "Planned",
          },
          sourceCode: {
            available: "View source code",
            openAction: "View source code",
            stateOpen: "Open source code",
            stateClosed: "Closed source code",
            notAvailable: "Source code not available",
            closed: "Closed source code",
          },
          startedAt: "Started on",
          completedAt: "Completed on",
          status: "Status",
          team: "Team",
          technologies: "Technologies",
          technologyCountOne: "{{count}} technology",
          technologyCountMany: "{{count}} technologies",
          filterLabel: "Project filter",
          filters: {
            all: "All",
            completed: "Completed",
            inProgress: "In progress",
            onHold: "On hold",
            planned: "Planned",
          },
          details: {
            project: "Project",
            description: "Description",
            whatItDoes: "What this project shows",
            meta: "Metadata",
            timeline: "Time and availability",
            team: "Team",
            view: "View",
            contributors: "Authors and roles",
            noContributors: "No team data.",
          },
        },

        glucose: {
          title: "My Blood Glucose",
          subtitle:
            "Browse blood glucose data from my CGM (continuous glucose monitor) in real-time. View current readings, analyze trends, and monitor time spent in target glucose range. Everything in one place, available for anyone interested.",
          loading: "Loading glucose data...",
          availability: {
            eyebrow: "CGM module status",
            disabledTitle: "Glucose module is off",
            disabled:
              "The glucose module is currently disabled by the site administrator.",
            noProviderTitle: "No provider connected",
            noProvider:
              "The glucose module is enabled, but no glucose data provider is available right now.",
            initializingTitle: "Glucose module is starting",
            initializing:
              "The glucose module is starting up. Data will appear here shortly.",
            unavailableTitle: "Status check failed",
            unavailable:
              "The glucose module availability could not be checked right now.",
          },
          subpages: {
            summary: {
              navigation: "Summary",
              title: "Summary of glucose readings",
            },
            timeInRange: {
              navigation: "Time in Range",
              title: "Time spent in target blood glucose range",
            },
            graph: {
              navigation: "Graph",
              title: "Visualization of glucose readings",
            },
          },
          current: {
            title: "Last reading",
            sensor: "Sensor",
            noSensor: "No sensor data",
            active: "Active",
            inactive: "Inactive",
            status: "Reading status",
            current: "Current",
            stale: "Stale",
            outOfRange: "Out of range",
            readAt: "Read at",
            lastUpload: "Last upload",
            activatedAt: "Activated at",
            expiresIn: "Expires in",
            refresh: "Next refresh",
            sensorLife: "Sensor life",
            trends: {
              none: "No trend available",
              risingFast: "Rising fast",
              rising: "Rising",
              risingSlow: "Rising slowly",
              stable: "Stable",
              fallingSlow: "Falling slowly",
              falling: "Falling",
              fallingFast: "Falling fast",
            },
          },
          summary: {
            period: "Statistics from the last {{duration}}.",
            periodAll: "Statistics from all available data.",
            average: "Average",
            highest: "Highest",
            lowest: "Lowest",
            timeInRange: "Time in range",
            gmi: {
              eyebrow: "GMI",
              title: "Glycemic Management Indicator",
              insufficient:
                "GMI needs at least 7 days of glucose data. Choose a longer range to show this estimate.",
              insufficientDatabase:
                "The selected range is long enough, but there is not enough glucose data in the database to calculate GMI yet.",
              context:
                "GMI estimates the A1C-like trend from continuous glucose data and is most useful when interpreted together with time in range.",
            },
          },
          timeRange: {
            label: "Glucose time range",
            "1d": "1d",
            "7d": "7d",
            "14d": "14d",
            "30d": "30d",
            "90d": "90d",
            all: "All time",
          },
          timeInRange: {
            period: "Distribution from the last {{duration}}.",
            periodAll: "Distribution from all available data.",
          },
          graph: {
            empty: "No glucose readings available for the graph.",
            range: "Target range: {{low}}-{{high}} {{unit}}",
            value: "Glucose",
            targetZone: "Target zone",
            inRangeSummary:
              "{{value}}% of visible readings are inside the target zone.",
            referencePoints: "Reference points",
          },
          ranges: {
            high: "Critically high",
            aboveRange: "Above range",
            inRange: "In range",
            belowRange: "Below range",
            low: "Critically low",
            critical: "Critical threshold",
          },
          errors: {
            current: "Current glucose data could not be loaded.",
            graph: "Graph data could not be loaded.",
            timeInRange: "Time in range data could not be loaded.",
            summary: "Glucose summary could not be loaded.",
            insufficientData:
              "There is not enough data to calculate a reliable result yet.",
            module_unavailable:
              "Moduł glukozy jest niedostępny z powodu wystąpienia błędu.",
            module_disabled:
              "Moduł glukozy zotał wyłączony przez administratora strony.",
            module_no_provider:
              "Moduł glukozy jest niedostępny ze względu na brak dostawcy danych glukozy.",
          },
        },
      },

      admin: {
        common: {
          title: "Title",
          description: "Description",
          status: "Status",
          actions: "Actions",
          edit: "Edit",
          delete: "Delete",
          save: "Save",
          cancel: "Cancel",
          publish: "Publish",
          unpublish: "Unpublish",
          published: "Published",
          draft: "Draft",
          yes: "Yes",
          no: "No",
          empty: "No data available.",
        },
        errors: {
          title: "The operation could not be completed",
          loading: "Loading data...",
          retry: "Try again",
          dismiss: "Dismiss error",
          network:
            "The server could not be reached. Check the connection and try again.",
          unauthorized: "Your session has expired. Sign in again.",
          forbidden: "You do not have permission to perform this action.",
          notFound: "The requested resource no longer exists.",
          conflict:
            "The operation conflicts with the current state of the data.",
          validation: "Some submitted values are invalid.",
          rateLimit:
            "Too many requests were sent. Wait a moment and try again.",
          server: "The server encountered an error. Try again later.",
          unexpected: "An unexpected error occurred.",
        },
        nav: {
          dashboard: "Dashboard",
          game: "Game content",
          projects: "Projects",
          announcements: "Announcements",
          settings: "Settings",
          users: "Users",
          roles: "Roles",
        },
        dashboard: {
          title: "Administration",
          description: "Manage content, users and operational settings.",
          cards: {
            game: "Bosses, questions and educational sources.",
            projects: "Multilingual portfolio projects and publication.",
            announcements:
              "Global information banner displayed above navigation.",
            roles: "Role definitions and granular permission assignments.",
          },
        },
        announcements: {
          title: "Information banner",
          description: "Create drafts and publish one global announcement.",
          new: "New announcement",
          variant: "Variant",
          content: "Content",
          actionUrl: "Action URL",
          actionLabel: "Action label",
          dismissible: "Users may dismiss the announcement",
        },
        projects: {
          title: "Project management",
          description: "Edit translations, project metadata and publication.",
          new: "New project",
          projectStatus: "Project status",
          tags: "Tags",
          shortDescription: "Short description",
          detailedDescription: "Detailed description",
          markdownHelp:
            "Supports Markdown: headings, bold, italics, lists, links, quotes, tables, and code blocks.",
          developers: "Developers",
          developerName: "Name",
          developerRole: "Project role",
          developerProfileUrl: "Profile URL",
          addDeveloper: "Add developer",
          removeDeveloper: "Remove",
          noDevelopers: "No developers have been assigned to this project.",
          timeline: "Project timeline",
          startDate: "Start date",
          completeDate: "Completion date",
          dateOrderError:
            "The completion date cannot be earlier than the start date.",
          imageUrl: "Image URL",
          sourceUrl: "Source URL",
          sourceOpen: "Source code is public",
        },
        game: {
          title: "Educational game content",
          description: "Manage bosses and verified multilingual questions.",
          bosses: "Bosses",
          questions: "Questions",
          newBoss: "New boss",
          bossSlug: "Technical identifier (slug)",
          bossSlugHelp:
            "A unique, language-independent identifier used by the API and imports. Use lowercase letters, numbers and hyphens, for example hypoglycemia.",
          newQuestion: "New question",
          rounds: "Maximum rounds",
          questionType: "Question type",
          category: "Category",
          question: "Question",
          explanation: "Explanation",
          source: "Official source",
          verifiedAt: "Verified at",
          difficulty: "Difficulty",
          answers: "Answers",
          answer: "Answer",
          correct: "Correct",
          matchKey: "Matching key",
          addAnswer: "Add answer",
          importJson: "Import JSON",
          importTitle: "Import bosses with questions",
          importDescription:
            "Select a JSON file in schema version 1. The import is atomic: if any boss or question is invalid, no data will be saved.",
          importExampleDescription:
            "Download a valid example with one boss and every supported question type.",
          downloadImportExample: "Download example JSON",
          importFile: "JSON file (maximum 2 MB)",
          importReady: "{{file}} is ready. Bosses in file: {{count}}.",
          importError: "The file cannot be imported",
          importInvalidJson: "The selected file is not valid JSON.",
          importInvalidStructure:
            "The file must contain version 1 and a bosses array.",
          importTooLarge: "The selected file exceeds the 2 MB limit.",
          importAction: "Import content",
          importing: "Importing...",
          importSuccess: "Import completed",
          importSuccessDescription:
            "Imported {{bosses}} bosses and {{questions}} questions.",
        },
        settings: {
          title: "Operational settings",
          description: "Control service availability and external providers.",
          game: "Game module",
          gameDescription: "Allow or block new educational game sessions.",
          maintenance: "Maintenance mode",
          maintenanceDescription:
            "Temporarily place the public service in maintenance.",
          glucose: "Glucose provider",
          glucoseDescription: "Select the active glucose data source.",
          enable: "Enable",
          disable: "Disable",
          currentStatus: "Current status",
          operational: "Operational",
          maintenanceActive: "Maintenance active",
          statusLoading: "Checking...",
          statusError: "Status unavailable",
          statusUpdating: "Updating...",
          statusUpdateError: "The status could not be updated. Try again.",
          gameEnabled: "Game enabled",
          gameDisabled: "Game disabled",
          activePlayers: "Active players",
          playersUnavailable: "Unavailable",
          gameUpdateError: "The game status could not be updated. Try again.",
          enableGame: "Enable game",
          disableGame: "Disable game",
          enableMaintenance: "Enable maintenance",
          disableMaintenance: "Disable maintenance",
        },
        users: {
          title: "Users",
          description: "Assign roles and control account availability.",
          user: "User",
          email: "Email",
          role: "Role",
          active: "Active",
          inactive: "Inactive",
          activate: "Activate",
          deactivate: "Deactivate",
          blocked: "Blocked",
          blockedUntil: "Until: {{date}}",
          block: "Block temporarily",
          unblock: "Unblock",
          blockTitle: "Block account: {{user}}",
          blockDescription:
            "The user will not be able to sign in or use an active session until the selected time.",
          blockedUntilLabel: "Blocked until",
          blockReason: "Block reason",
          confirmBlock: "Block account",
          deleteConfirm:
            "Are you sure you want to permanently delete {{user}}'s account?",
        },
        roles: {
          title: "Roles and permissions",
          description:
            "Build custom roles from the available permission catalog.",
          new: "New role",
          role: "Role",
          permissions: "Permissions",
          system: "System",
          code: "Code",
          label: "Label",
          deleteTitle: "Delete role: {{role}}",
          deleteDescription:
            "Users with this role will be moved to the selected replacement role.",
          replacementRole: "Replacement role",
          confirmDelete: "Delete role",
        },
        brand: "Control room",
        backToSite: "Back to site",
      },
    },

    layouts: {
      user: {
        nav: {
          openMenu: "Open navigation menu",
          closeMenu: "Close navigation menu",
          mobileNavigation: "Mobile navigation",
          changeLanguage: "Change language",
          changeTheme: "Change theme",
          themes: {
            light: "Light",
            dark: "Dark",
            contrast: "Contrast",
          },
          pages: {
            home: "Home",
            aboutme: "About me",
            projects: "Projects",
            glucose: "Blood sugar",
            game: "Game",
          },
          account: {
            login: "Sign in",
            logout: "Log out",
            expand: "Open account menu",
            profile: "Profile",
            settings: "Settings",
            admin: "Admin panel",
          },
        },
        footer: {
          copyright: "© {{year}} Patryk Znamirowski. All rights reserved.",
          contact: "Contact me",
          termsOfService: "Terms of Service",
          privacyPolicy: "Privacy Policy",
        },
      },

      admin: {},
    },
  },
} as const;

export default en;
