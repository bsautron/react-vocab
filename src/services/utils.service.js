/**
 * Capitalize the first latter of the text
 * @param text the text to capitalize
 */
export function capitalize(text) {
  if (!text || !text.length) return ''
  return text[0].toUpperCase() + text.slice(1)
}

/**
 * Remove all accents of special caracters
 * @param  text the text with special caracter
 */
export function normalize(text) {
  return text.toLowerCase()
  // .trim()
  // .normalize('NFD')
  // .replace(/[\u0300-\u036f]/g, '')
}
