import type { ReactNode } from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";
import Translate, { translate } from "@docusaurus/Translate";

import styles from "./index.module.css";

type FeatureItem = {
  title: ReactNode;
  icon: string;
  description: ReactNode;
  link: string;
};

function Feature({ title, icon, description, link }: FeatureItem) {
  return (
    <div className={clsx("col col--4")}>
      <Link to={link} className={styles.featureCard}>
        <div className={styles.featureIcon}>{icon}</div>
        <Heading as="h3" className={styles.featureTitle}>
          {title}
        </Heading>
        <p className={styles.featureDescription}>{description}</p>
      </Link>
    </div>
  );
}

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx("hero", styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className={styles.heroTitle}>
          {siteConfig.title}
        </Heading>
        <p className={styles.heroSubtitle}>
          <Translate id="homepage.tagline">
            Complete Gothic modding documentation — from first steps to
            advanced techniques.
          </Translate>
        </p>
        <div className={styles.buttons}>
          <Link
            className={clsx("button button--lg", styles.heroBtnPrimary)}
            to="/docs/getting-started/download-game"
          >
            <Translate id="homepage.cta.start">Get Started</Translate>
          </Link>
          <Link
            className={clsx("button button--lg", styles.heroBtnSecondary)}
            to="/docs/modding-basics-daedalus/script-structure"
          >
            <Translate id="homepage.cta.guides">Guides</Translate>
          </Link>
        </div>
      </div>
    </header>
  );
}

function HomepageFeatures() {
  const features: FeatureItem[] = [
    {
      title: (
        <Translate id="homepage.feature.start.title">Getting Started</Translate>
      ),
      icon: "🚀",
      description: (
        <Translate id="homepage.feature.start.description">
          Download the game, install tools, and set up your Gothic modding
          environment step by step.
        </Translate>
      ),
      link: "/docs/getting-started/download-game",
    },
    {
      title: (
        <Translate id="homepage.feature.daedalus.title">
          Daedalus Scripts
        </Translate>
      ),
      icon: "📜",
      description: (
        <Translate id="homepage.feature.daedalus.description">
          Create NPCs, items, and quests. Learn the scripting language built
          into the Gothic engine.
        </Translate>
      ),
      link: "/docs/modding-basics-daedalus/script-structure",
    },
    {
      title: (
        <Translate id="homepage.feature.union.title">Union Plugins</Translate>
      ),
      icon: "⚙️",
      description: (
        <Translate id="homepage.feature.union.description">
          Extend the Gothic engine capabilities with C++ plugins using the
          Union framework.
        </Translate>
      ),
      link: "/docs/modding-basics-union/getting-started",
    },
  ];

  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {features.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}

function HomepageCommunity() {
  return (
    <section className={styles.community}>
      <div className="container">
        <Heading as="h2" className={styles.sectionTitle}>
          <Translate id="homepage.community.title">
            Join the community
          </Translate>
        </Heading>
        <p className={styles.sectionSubtitle}>
          <Translate id="homepage.community.description">
            Have questions? Need help? Join our Discord or check the source code
            on GitHub.
          </Translate>
        </p>
        <div className={styles.communityLinks}>
          <Link
            className={clsx("button button--lg", styles.discordBtn)}
            href="https://discord.gg/9EVFJv5Uyf"
          >
            Discord
          </Link>
          <Link
            className={clsx("button button--lg", styles.githubBtn)}
            href="https://github.com/sefaris/gothic-modding-wiki"
          >
            GitHub
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  return (
    <Layout
      title={translate({
        id: "homepage.title",
        message: "Home",
      })}
      description={translate({
        id: "homepage.metaDescription",
        message:
          "Gothic modding documentation — guides, tools, and community.",
      })}
    >
      <HomepageHeader />
      <main>
        <HomepageFeatures />
        <HomepageCommunity />
      </main>
    </Layout>
  );
}
