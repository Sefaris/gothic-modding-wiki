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
            Kompletna dokumentacja moddingu gry Gothic — od pierwszych kroków po
            zaawansowane techniki.
          </Translate>
        </p>
        <div className={styles.buttons}>
          <Link
            className={clsx("button button--lg", styles.heroBtnPrimary)}
            to="/docs/getting-started/download-game"
          >
            <Translate id="homepage.cta.start">Zacznij tutaj</Translate>
          </Link>
          <Link
            className={clsx("button button--lg", styles.heroBtnSecondary)}
            to="/docs/modding-basics-daedalus/script-structure"
          >
            <Translate id="homepage.cta.guides">Poradniki</Translate>
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
        <Translate id="homepage.feature.start.title">Jak zacząć?</Translate>
      ),
      icon: "🚀",
      description: (
        <Translate id="homepage.feature.start.description">
          Pobierz grę, zainstaluj narzędzia i skonfiguruj środowisko do moddingu
          Gothic krok po kroku.
        </Translate>
      ),
      link: "/docs/getting-started/download-game",
    },
    {
      title: (
        <Translate id="homepage.feature.daedalus.title">
          Skrypty Daedalus
        </Translate>
      ),
      icon: "📜",
      description: (
        <Translate id="homepage.feature.daedalus.description">
          Twórz NPC, przedmioty i zadania. Naucz się języka skryptowego
          wbudowanego w silnik Gothic.
        </Translate>
      ),
      link: "/docs/modding-basics-daedalus/script-structure",
    },
    {
      title: (
        <Translate id="homepage.feature.union.title">Pluginy Union</Translate>
      ),
      icon: "⚙️",
      description: (
        <Translate id="homepage.feature.union.description">
          Rozszerzaj możliwości silnika Gothic za pomocą pluginów C++ z
          frameworka Union.
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
            Dołącz do społeczności
          </Translate>
        </Heading>
        <p className={styles.sectionSubtitle}>
          <Translate id="homepage.community.description">
            Masz pytania? Potrzebujesz pomocy? Dołącz do naszego Discorda lub
            sprawdź kod źródłowy na GitHubie.
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
        message: "Strona główna",
      })}
      description={translate({
        id: "homepage.metaDescription",
        message:
          "Dokumentacja moddingu gry Gothic — poradniki, narzędzia i społeczność.",
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
