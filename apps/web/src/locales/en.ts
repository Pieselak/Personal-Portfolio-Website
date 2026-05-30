import { GB } from "country-flag-icons/react/1x1";

const en = {
  data: {
    name: "English",
    flag: GB,
  },
  translation: {
    pages: {
      loading: {
        message:
          "The hamsters running in the server wheels need a moment to catch their breath. Patience...",
      },

      serverError: {
        title: "500 Server Error",
        message:
          "Congratulations, you managed to break the server! (Or I just forgot a semicolon in the code). The search for a fire extinguisher is ongoing.",
      },

      notFound: {
        title: "404 Not Found",
        message:
          "Page missing in action. Maybe it was abducted by aliens, or you just mistyped the URL. Either way – there is nothing here.",
      },

      forbidden: {
        title: "403 Forbidden",
        message:
          "Hey, hey, hey! Where do you think you're going with those muddy boots? You have no power here. Turn around slowly and leave this area.",
      },

      maintenance: {
        title: "Maintenance in progress",
        message:
          "We're currently dusting off the cables and watering the database. We'll be back as soon as everything dries up.",
      },

      underConstruction: {
        title: "Under Construction",
        message:
          "Pouring virtual concrete here. We forgot to deliver this page in the last sprint, but we promise we'll finish it someday.",
      },

      selectLanguage: {
        title: "Select language",
        subtitle: "Select the preferred language for this website.",
        noLanguages: "No languages available at the moment.",
      },

      user: {
        home: {
          title: "Welcome to my website!",
          subtitle:
            "I'm glad you're here! I'm Patryk, a technology and programming enthusiast. On this website, you'll find information about me, my projects, and my blood glucose data from my CGM. Feel free to explore and get in touch!",
        },

        aboutme: {
          title: "About me",
          subtitle:
            "Hello! My name is Patryk Znamirowski and I am passionate about technology, programming, and a healthy lifestyle. On this page, you will find information about my career, interests, and the projects I am currently working on. Get to know me better!",
        },

        projects: {
          title: "My projects",
          subtitle:
            "Here you will find a list of my personal and professional projects. Every project is important to me, as it represents my skills, passion, and commitment to technological development. Feel free to check them out and contact me if you have any questions or want to collaborate!",
          noProjects:
            "I don't have any projects to show yet, but I'm working on them!",
          returnToProjects: "Return to projects",
          statuses: {
            completed: "Completed",
            inProgress: "Work in Progress",
            planned: "Planned",
          },
          sourceCode: {
            available: "View source code",
            notAvailable: "Source code not available",
            closed: "Closed source code",
          },
          startedAt: "Started on {{date}}",
          completedAt: "Completed on {{date}}",
        },

        glucose: {
          title: "My Blood Glucose",
          subtitle:
            "Browse blood glucose data from my CGM (continuous glucose monitor) in real-time. View current readings, analyze trends, and monitor time spent in target glucose range. Everything in one place, available for anyone interested.",
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
          current: {},
          summary: {},
          timeInRange: {},
          graph: {},
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
