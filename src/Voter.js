/**
 * Voter class represents a voter with a name and a record of votes.
 */
class Voter {
    /**
     * Create a new Voter instance.
     * @param {string} name - The name of the voter.
     */
    constructor(name) {
        this.name = name;
        this.votes = {};
    }
}

module.exports = Voter;
