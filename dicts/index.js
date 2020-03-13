/**
 * Типы словарей
 */
const types = {
  NEGATORY: "NEGATORY",
  EMOTION: "EMOTION"
};

/**
 * Словари
 */
const dicts = {
  [types.NEGATORY]: require("./negatory.json"),
  [types.EMOTION]: {
    ...require("./negative.json"),
    ...require("./positive.json")
  }
};

module.exports = { types, dicts };
