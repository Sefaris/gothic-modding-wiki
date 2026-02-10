import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: "Gothic Modding Wiki",
  tagline: "Dokumentacja moddingu gry Gothic",
  favicon: "img/favicon.ico",

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: "https://modding.sefaris.eu",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "sefaris", // Usually your GitHub org/user name.
  projectName: "gothic-modding-wiki", // Usually your repo name.
  trailingSlash: false,

  onBrokenLinks: "throw",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "pl",
    locales: ["pl", "en"],
    localeConfigs: {
      en: {
        label: "English",
      },
      pl: {
        label: "Polski",
      },
    },
  },

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          editUrl: "https://github.com/sefaris/gothic-modding-wiki/tree/main/",
        },
        blog: false,
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: "img/docusaurus-social-card.jpg",
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: "Gothic Modding Wiki",
      logo: {
        alt: "Gothic Modding Wiki Logo",
        src: "img/logo.svg",
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "tutorialSidebar",
          position: "left",
          label: "Dokumentacja",
        },
        {
          href: "https://github.com/sefaris/gothic-modding-wiki",
          label: "GitHub",
          position: "right",
        },
        {
          type: "localeDropdown",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Dokumentacja",
          items: [
            {
              label: "Jak zacząć?",
              to: "/docs/getting-started/download-game",
            },
            {
              label: "Podstawy moddingu",
              to: "/docs/modding-basics-daedalus/script-structure",
            },
          ],
        },
        {
          title: "Społeczność",
          items: [
            {
              label: "GitHub",
              href: "https://github.com/sefaris/gothic-modding-wiki",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Gothic Modding Wiki. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
