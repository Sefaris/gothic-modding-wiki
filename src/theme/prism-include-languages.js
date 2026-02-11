/**
 * Custom prism-include-languages for Docusaurus.
 * Registers the Daedalus language definition for syntax highlighting.
 */
import siteConfig from "@generated/docusaurus.config";
import defineDaedalus from "./prism-daedalus";

export default function prismIncludeLanguages(PrismObject) {
  const {
    themeConfig: { prism },
  } = siteConfig;

  const { additionalLanguages } = prism;

  // Load built-in additional languages
  globalThis.Prism = PrismObject;
  additionalLanguages.forEach((lang) => {
    require(`prismjs/components/prism-${lang}`);
  });
  delete globalThis.Prism;

  // Register custom Daedalus language
  defineDaedalus(PrismObject);
}
