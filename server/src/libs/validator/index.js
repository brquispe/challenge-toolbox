class Validator {
  /**
   *
   * @param {string} value
   * @returns {boolean}
   */
  static tryParseToNumber(value) {
    const number = Number(value);
    return !Number.isNaN(number);
  }

  /**
   * @param {string} value
   * @returns {boolean}
   */
  static isStringHex(value) {
    const hexRegex = /^[a-fA-F0-9]+$/;
    return hexRegex.test(value);
  }

  /**
   * @template {Record<string, unknown>} T
   * @param {T} obj
   * @param {Record<keyof T, { type: 'string' | 'number' | 'hex', length?: number }>} type
   * @returns {boolean}
   */
  static isObjectParseable(obj, type) {
    return Object.keys(type).every((key) => {
      if (
        type[key].length &&
        obj[key].toString().trim().length !== type[key].length
      ) {
        return false;
      }
      switch (type[key].type) {
        case "string":
          return typeof obj[key] === "string";
        case "number":
          return this.tryParseToNumber(obj[key]);
        case "hex":
          return this.isStringHex(obj[key]);
        default:
          throw new Error("Not a valid type: ", type[key]);
      }
    });
  }
}

module.exports = Validator;
