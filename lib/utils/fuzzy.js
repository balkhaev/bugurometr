const Fuse = require("fuse.js");
const { types, dicts } = require("../../dicts");

const items = Object.keys(types).reduce(
  (acc, type) => ({
    ...acc,
    [type]: Object.keys(dicts[type]).map(token => ({ token }))
  }),
  {}
);

const fuses = Object.keys(types).reduce(
  (acc, type) => ({
    ...acc,
    [type]: new Fuse(items[type], {
      keys: ["token"],
      tokenize: true,
      distance: 0,
      threshold: 0.2,
      shouldSort: true,
      includeMatches: true,
      minMatchCharLength: 1,
      maxPatternLength: 32
    })
  }),
  {}
);

module.exports = (search, type) => {
  const fuse = fuses[type];

  if (typeof fuse === "undefined") {
    throw new Error("Fuzzy search type not defined");
  }

  const results = fuse.search(search);

  if (results.length > 0) {
    const {
      item,
      matches: [{ value }]
    } = results.shift();

    const diff = Math.abs(value.length - search.length);

    if (diff <= 1) {
      return item.token;
    }
  }

  return null;
};
