const { WordTokenizer } = require("natural");
const stopword = require("stopword");

const normalizeText = require("./utils/normalizeText");

const tokenizer = new WordTokenizer();

module.exports = text => {
  const textNormalized = normalizeText(text, true); // оставляем только русские слова, второй аргумент заменяет "ё" на "е" и "й" на "и"
  const textTokens = tokenizer.tokenize(textNormalized); // разбиваем текст на массив токенов
  const cleanTokens = stopword.removeStopwords(textTokens, stopword.ru); // убираем мусорные токены (на, если, с и т.д.)

  return cleanTokens;
};
