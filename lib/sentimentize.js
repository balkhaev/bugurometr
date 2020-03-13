const Sentiment = require("sentiment");

const morphize = require("./morphize");
const tokenize = require("./tokenize");
const { dicts, types } = require("../dicts");

const sentiment = new Sentiment();

sentiment.registerLanguage("ru", {
  labels: dicts[types.EMOTION],
  scoringStrategy: {
    apply: function(tokens, cursor, tokenScore) {
      if (cursor > 0) {
        const prevtoken = tokens[cursor - 1];

        if (prevtoken === "очень") {
          tokenScore = tokenScore > 0 ? tokenScore + 1 : tokenScore;
        }
      }

      return tokenScore;
    }
  }
});

const filterTokens = (token, index, tokens) => {
  // у нулевого не проверяем предыдущий тикет
  if (index === 0) {
    return true;
  }

  // убираем слова у которых предыдущий токен вносит смысловое изменение (не хорошо)
  const prevToken = tokens[index - 1];
  const negatory = morphize(prevToken, types.NEGATORY);

  return negatory === prevToken;
};

module.exports = text => {
  const tokens = tokenize(text); // получем токены текста, без мусорных слов и знаков
  const filtred = tokens.filter(filterTokens); // контекстный просев слов ("вроде хорошо" !== "хорошо")
  const morphed = morphize(filtred, types.EMOTION); // ищем подходящие альтернативы из словарей каждому токену
  const result = sentiment.analyze(morphed, { language: "ru" }); // ну и наконец определяем тон текста

  return {
    morphed,
    ...result
  };
};
