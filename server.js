const express = require("express");

const { types } = require("./dicts");
const tokenize = require("./lib/tokenize");
const morphize = require("./lib/morphize");
const sentimentize = require("./lib/sentimentize");

const PORT = process.env.PORT || 4000;

const textError = {
  status: false,
  error: "Text not provided",
  hint: `Send text with get parameter ?text={text} or post json { text: 'text' }`
};

const app = express();

app.use(express.json());
app.use(express.static("public"));

app.all("/emotion", (req, res) => {
  const text = req.body.text || req.query.text;

  if (!text) {
    return res.json(textError);
  }

  res.json(sentimentize(text));
});

app.all("/tokenize", (req, res) => {
  const text = req.body.text || req.query.text;

  if (!text) {
    return res.json(textError);
  }

  res.json(tokenize(text));
});

app.all("/morphize", (req, res) => {
  const text = req.body.text || req.query.text;

  if (!text) {
    return res.json(textError);
  }

  res.json(morphize(text, types.EMOTION));
});

app.all("/analyze", (req, res) => {
  const text = req.body.text || req.query.text;

  if (!text) {
    return res.json(textError);
  }

  const tokens = tokenize(text);
  const morphed = morphize(tokens, types.EMOTION);
  const emotion = sentimentize(text);
  const lemmas = tokens.reduce(
    (acc, token) => ({ ...acc, [token]: morphize.lemmatize(token) }),
    {}
  );

  res.json({
    text,
    morphed,
    lemmas,
    emotion
  });
});

app.listen(PORT, () => {
  console.log(`App at http://localhost:${PORT}`);
});
