/**
 * Option class represents a voting option with a name and a priority.
 */
class Option {
  /**
     * Create a new Option instance.
     * @param {string} name - The name of the option.
     * @param {number} priority - The priority of the option.
     */
  constructor(name, priority) {
    this.name = name;
    this.priority = priority;
  }
}

module.exports = Option;
