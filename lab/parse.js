const sentimentize = require("../lib/sentimentize");
const comments = require("./data.json");

comments.slice(0).map(comment => {
  const { tokens, ...result } = sentimentize(comment);

  console.log({
    comment,
    ...result
  });
});

console.log(comments.length);
