/**
 * Prism.js language definition for Daedalus (Gothic scripting language).
 *
 * Daedalus is case-insensitive and C-like in syntax, with unique constructs
 * like `instance`, `prototype`, and mandatory semicolons after closing braces.
 *
 * @see https://gothic-modding-wiki.github.io/
 */
module.exports = function defineDaedalus(Prism) {
  Prism.languages.daedalus = {
    comment: [
      {
        pattern: /\/\*[\s\S]*?\*\//,
        greedy: true,
      },
      {
        pattern: /\/\/.*/,
        greedy: true,
      },
    ],
    string: {
      pattern: /"(?:[^"\\]|\\.)*"/,
      greedy: true,
    },
    keyword:
      /\b(?:var|const|func|class|prototype|instance|return|if|else|void|int|float|string|while|repeat|end)\b/i,
    builtin: /\b(?:self|other|hero|victim|item|NULL|TRUE|FALSE|EMPTY)\b/i,
    "class-name":
      /\b(?:C_NPC|C_Item|C_INFO|C_Spell|C_Mission|C_Focus|C_FightAI|C_SFX|C_ParticleFX|C_Menu|C_Menu_Item|C_SVM|C_GilValues)\b/i,
    function: {
      pattern: /\b[a-z_]\w*(?=\s*\()/i,
      greedy: false,
    },
    number: /\b(?:0x[\da-f]+|\d+(?:\.\d+)?)\b/i,
    operator: /<<|>>|&&|\|\||[+\-*/%]=?|[!=<>]=?|[&|^~!]/,
    punctuation: /[{}[\];(),.:]/,
  };
};
