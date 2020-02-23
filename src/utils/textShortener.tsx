/**
 *
 * @param {string} text - text to be shortened
 * @param {number} minLength - minimum short text length, after minLength it searches for dot (.) and ends sentance there
 * Returns shortened sentance (with dot on end)
 */
function textShortener(text: string, minLength = 100) {
  if (text.length < minLength) return text;
  return (
    text.substring(0, minLength) +
    text.substring(minLength, text.length).split(".")[0] +
    "."
  );
}

export { textShortener };
