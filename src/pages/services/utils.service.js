export class Utils {
  /**
   * Capitalize the first latter of the text
   * @param text the text to capitalize
   */
  capitalize(text) {
    return text[0].toUpperCase() + text.slice(1)
  }

  /**
   * Remove all accents of special caracters
   * @param  text the text with special caracter
   */
  normalize(text) {
    return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  }
}
