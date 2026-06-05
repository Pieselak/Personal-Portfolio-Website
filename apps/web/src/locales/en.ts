import { GB } from "country-flag-icons/react/1x1";

const en = {
  data: {
    name: "English",
    flag: GB,
  },
  translation: {
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
      },

      forbidden: {
        title: "403 Forbidden",
        message:
          "We've unleashed the digital guard dogs. Make no sudden movements and slowly back away from this page.",
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
      },

      selectLanguage: {
        title: "Select language",
        subtitle: "Select the preferred language for this website.",
        noLanguages: "No languages available at the moment.",
      },

      auth: {
        fields: {
          name: "Full name",
          email: "Email address",
          password: "Password",
          confirmPassword: "Confirm password",
        },
        placeholders: {
          name: "Jane Doe",
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
          email: "Enter a valid email address.",
          passwordRequired: "Enter your password.",
          passwordLength: "Password must be at least 8 characters.",
          passwordMatch: "Passwords must match.",
          terms: "Accept the terms of service.",
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
          noAccount: "Do not have an account yet?",
          createAccount: "Create account",
          demoNotice:
            "This is a frontend view. After valid input, it sets the local logged-in state.",
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
          hasAccount: "Already have an account?",
          signIn: "Go to login",
          demoNotice:
            "Registration currently uses local app state until the API endpoint is connected.",
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

        home: {},

        aboutme: {},

        projects: {
          title: "My projects",
          subtitle:
            "Here you will find a list of my personal and professional projects. Every project is important to me, as it represents my skills, passion, and commitment to technological development. Feel free to check them out and contact me if you have any questions or want to collaborate!",
          noProjects:
            "I don't have any projects to show yet, but I'm working on them!",
          projectNotFound:
            "Project not found. It might have been abducted by aliens or is just hiding from us.",
          returnToProjects: "Return to projects",
          statuses: {
            completed: "Completed",
            inProgress: "Work in Progress",
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
            planned: "Planned",
          },
          details: {
            project: "Project",
            description: "Description",
            whatItDoes: "What this project shows",
            meta: "Metadata",
            timeline: "Time and availability",
            team: "Team",
            contributors: "Authors and roles",
            noContributors: "No team data.",
          },
        },

        glucose: {
          title: "My Blood Glucose",
          subtitle:
            "Browse blood glucose data from my CGM (continuous glucose monitor) in real-time. View current readings, analyze trends, and monitor time spent in target glucose range. Everything in one place, available for anyone interested.",
          loading: "Loading glucose data...",
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
            period: "Statistics from the last {{hours}} hours.",
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
            period: "Distribution from the last {{hours}} hours.",
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

      admin: {},
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
