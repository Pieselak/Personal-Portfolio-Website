import { GB } from "country-flag-icons/react/1x1";

const en = {
  data: {
    name: "English",
    flag: GB,
  },
  translation: {
    pages: {
      loading: {
        message: "Preparing the interface and synchronizing data.",
      },
      serverError: {
        title: "500 Server Error",
        message:
          "The service is currently unavailable. Please try again in a moment.",
      },
      notFound: {
        title: "404 Not Found",
        message:
          "The requested page is not available. Check the address or return to the portfolio.",
      },
      forbidden: {
        title: "403 Forbidden",
        message: "You do not have permission to access this section.",
      },
      maintenance: {
        title: "Maintenance in progress",
        message:
          "The application is temporarily unavailable while essential maintenance is completed.",
      },
      underConstruction: {
        title: "Section in preparation",
        message:
          "This section is being prepared and will be available after review.",
      },
      selectLanguage: {
        eyebrow: "Interface language",
        title: "Select language",
        subtitle:
          "Choose the language used for navigation, status messages, and portfolio content.",
        noLanguages: "No languages are available at the moment.",
      },
      user: {
        home: {
          eyebrow: "Student developer portfolio",
          title: "Simple, clear projects built with React and TypeScript.",
          subtitle:
            "I am a high school student learning full-stack development by building practical apps, clean interfaces, and small data tools.",
          primaryCta: "View glucose project",
          secondaryCta: "See projects",
          proofPoints: ["React", "TypeScript", "NestJS"],
          panel: {
            badge: "Current focus",
            title: "A clean portfolio that stays easy to understand.",
            description:
              "The interface is intentionally minimal: readable pages, reusable components, and clear paths to the work.",
          },
          capabilities: {
            cleanInterfaces: {
              title: "Clean interfaces",
              description:
                "Simple layouts with clear hierarchy and easy navigation.",
            },
            dataVisualization: {
              title: "Data visualization",
              description:
                "Charts and metric panels designed for fast interpretation, not decoration.",
            },
            secureArchitecture: {
              title: "Full-stack reliability",
              description:
                "Typed React and NestJS foundations that stay understandable as the project grows.",
            },
          },
          sections: {
            aboutme: {
              description:
                "Learn more about Patryk and how he approaches building projects.",
            },
            projects: {
              description:
                "Review selected work in a clean project gallery.",
            },
            glucose: {
              description:
                "Inspect the glucose data feature and its dashboard patterns.",
            },
          },
        },
        aboutme: {
          eyebrow: "Profile",
          title: "About me",
          subtitle:
            "I am Patryk Znamirowski, a high school student learning full-stack development through real projects.",
          statement:
            "I like building useful web apps that are easy to read, easy to use, and simple to maintain.",
          description:
            "My current stack is React, TypeScript, NestJS, Tailwind, and typed API contracts. This portfolio is a place to show what I am learning and how I structure frontend and backend code.",
          principles: {
            clarity: {
              title: "Clarity first",
              description:
                "Every screen should make the next action and the current state obvious.",
            },
            reliability: {
              title: "Reliable structure",
              description:
                "Reusable components, typed data, and consistent states keep the frontend scalable.",
            },
            data: {
              title: "Data with context",
              description:
                "Metrics need labels, thresholds, units, and hierarchy to be useful.",
            },
          },
          focus: {
            eyebrow: "Focus areas",
            title: "Where this portfolio is strongest",
            items: [
              "Clean portfolio and project pages",
              "Full-stack TypeScript applications",
              "Readable API-driven interfaces",
              "Responsive pages and small tools",
            ],
          },
        },
        projects: {
          eyebrow: "Selected work",
          title: "Case studies",
          subtitle:
            "A focused view of projects involving React, NestJS, API integration, and data presentation.",
          noProjects: "No case studies are available yet.",
          returnToProjects: "Return to case studies",
          caseStudy: "Case study",
          overview: "Overview",
          statusLabel: "Status",
          technologies: "Technologies",
          started: "Started",
          team: "Team",
          viewCaseStudy: "View case study",
          projectNotFound: "The selected case study could not be found.",
          statuses: {
            completed: "Completed",
            inProgress: "In progress",
            planned: "Planned",
          },
          sourceCode: {
            available: "View source code",
            notAvailable: "Source code not available",
            closed: "Closed source",
          },
        },
        glucose: {
          eyebrow: "Data feature",
          title: "Glucose dashboard",
          subtitle:
            "A small dashboard for reading glucose data, trends, time in range, and chart history.",
          loading: "Loading glucose data...",
          subpages: {
            summary: {
              navigation: "Summary",
              title: "Glucose summary",
            },
            timeInRange: {
              navigation: "Time in range",
              title: "Time in target range",
            },
            graph: {
              navigation: "Graph",
              title: "Glucose trend graph",
            },
          },
          current: {
            title: "Current reading",
            sensor: "Sensor",
            noSensor: "No sensor data",
            active: "Active",
            inactive: "Inactive",
            status: "Reading status",
            current: "Current",
            stale: "Stale",
            readAt: "Read at",
            lastUpload: "Last upload",
            expiresIn: "Expires in",
            refresh: "Next refresh",
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
          },
          timeInRange: {
            period: "Distribution from the last {{hours}} hours.",
          },
          graph: {
            empty: "No glucose readings are available for the graph.",
            range: "Target range: {{low}}-{{high}} {{unit}}",
            value: "Glucose",
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
              "The glucose module is unavailable because of an internal error.",
            module_disabled:
              "The glucose module has been disabled by the site administrator.",
            module_no_provider:
              "The glucose module is unavailable because no provider is configured.",
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
          changeLanguage: "Change language",
          changeTheme: "Change theme",
          pages: {
            home: "Home",
            aboutme: "Profile",
            projects: "Case studies",
            glucose: "Glucose",
          },
        },
        footer: {
          positioning:
            "A minimal full-stack portfolio by a high school student learning React, TypeScript, and NestJS.",
          copyright: "© {{year}} Patryk Znamirowski. All rights reserved.",
          contact: "Profile",
          caseStudies: "Case studies",
          glucoseData: "Glucose data",
        },
      },
      admin: {},
    },
  },
} as const;

export default en;
