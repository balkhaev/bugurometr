module.exports = (text, replace) => {
  text = text.toLowerCase().replace(/[^a-zа-яё\!\?\.\s]+/g, "");

  if (replace) {
    text = text.replace("ё", "е").replace("й", "и");
  }

  return text.trim();
};
