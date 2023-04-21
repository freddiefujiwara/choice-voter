const Option = require('./Option');
/**
 * OptionList class represents a list of voting options.
 */
class OptionList {
  /**
       * Create a new OptionList instance.
       * @param {Option[]} options - The list of option objects.
       */
  constructor(options) {
    this.options = options;
  }

  /**
       * Get an option by its name.
       * @param {string} name - The name of the option.
       * @returns {Option} - The option object with the given name, or undefined if not found.
       */
  getOptionByName(name) {
    return this.options.find((option) => option.name === name);
  }

  /**
       * Parse a list of options from a file content string.
       * @param {string} fileContent - The file content string.
       * @returns {Option[]} - The list of option objects.
       */
  static parseOptions(fileContent) {
    return fileContent
      .split('\n')
      .filter((line) => line)
      .map((line) => {
        const [name, priorityStr] = line.replace(/\s+/g, '\t').split('\t');
        return new Option(name, parseInt(priorityStr, 10));
      });
  }
}

module.exports = OptionList;
