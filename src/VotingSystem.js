class VotingSystem {
    constructor(voter, options) {
        this.voter = voter;
        this.options = options;
    }

    inputVotes(option, vote) {
        if (vote !== 'Pass') {
            this.voter.votes[option.name] = 'Fail';
        } else {
            this.voter.votes[option.name] = 'Pass';
        }
    }

    createSchedule() {
        const passOptions = this.options
            .filter((option) => this.voter.votes[option.name] === "Pass")
            .sort(() => Math.random() - 0.5)
            .sort((a, b) => a.priority - b.priority);

        return {
            voter: this.voter,
            optionOrder: passOptions,
        };
    }
}

module.exports = VotingSystem;  