module.exports = (...args) => {
  process.env.IS_DEBUG && console.log(...args);
};
