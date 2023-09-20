const CSVParseError = require("../errors/csv-parse-error");

class CSVParser {
  /**
   * @template {Record<string, unknown>} T
   * @param {string} value
   * @returns {T[]}
   */
  static parse(value) {
    try {
      const [headers, ...values] = value.split("\n");
      const headerProps = headers.split(",");
      const parsedCSV = values.reduce((prev, row) => {
        const rowProps = row.split(",");
        if (rowProps.length !== headerProps.length) {
          return prev;
        }
        const mappedProps = {};

        if (rowProps.some((prop) => !prop)) {
          return prev;
        }
        rowProps.forEach((prop, i) => {
          mappedProps[headerProps[i]] = prop;
        });

        prev.push(mappedProps);
        return prev;
      }, []);
      return parsedCSV;
    } catch (err) {
      throw new CSVParseError(err);
    }
  }
}

module.exports = CSVParser;
