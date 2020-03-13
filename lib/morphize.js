const Morphy = require("phpmorphy");

const fuzzy = require("./utils/fuzzy");
const { dicts, types } = require("../dicts");

const morphy = new Morphy("ru", {
  storage: Morphy.STORAGE_MEM,
  predict_by_suffix: false,
  predict_by_db: true,
  graminfo_as_text: true,
  use_ancodes_cache: false,
  resolve_ancodes: Morphy.RESOLVE_ANCODES_AS_TEXT
});

const morphToken = (token, morphType) => {
  // Проверяем прямое вхождение в словаре
  const tokenLowered = token.toLowerCase();

  if (tokenLowered in dicts[morphType]) {
    return tokenLowered.toUpperCase();
  }

  // Приводим токен к словарной форме
  const tokenLemmes = morphy.lemmatize(tokenLowered);

  if (tokenLemmes === false || tokenLemmes.length === 0) {
    return token;
  }

  // Ищем словарную форму в словаре
  const tokenLemme = tokenLemmes.find(lemme => lemme in dicts[morphType]);

  if (tokenLemme) {
    return tokenLemme.toUpperCase();
  }

  // Проверяем неточным поиском орфографические ошибки
  const tokenFuzzy = fuzzy(token, morphType);

  // Проверяем что словарная форма найденного токена совпадает с словарной формой исходного (иначе "давно" превратится в "гавно")
  if (tokenFuzzy) {
    // const lemmesFuzzy = morphy.lemmatize(tokenFuzzy);
    // const correctFuzzy = lemmesFuzzy.some(fuzzyLemme => tokenLemmes.includes(fuzzyLemme));

    // if (correctFuzzy) {
    return tokenFuzzy.toUpperCase();
    // }
  }

  // Печаль :(
  return token;
};

function morphize(tokens, morphType) {
  if (typeof types[morphType] === "undefined") {
    throw new Error("Morph type not defined!");
  }

  if (typeof tokens === "string") {
    return morphToken(tokens, morphType);
  }

  return tokens.map(token => morphToken(token, morphType)).join(" ");
}

morphize.lemmatize = token => morphy.lemmatize(token);

module.exports = morphize;
