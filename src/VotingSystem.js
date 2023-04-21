class VotingSystem {
  constructor(voter, options) {
    this.voter = voter;
    this.options = options;
  }

  inputVotes(option, vote) {
    if (vote !== 'Pass') {
      this.voter.votes[option.name] = 'Fail';
      return;
    }
    this.voter.votes[option.name] = vote;
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
  static parseVotes(fileContent, optionList) {
    const votes = fileContent
      .split("\n")
      .filter((line) => line)
      .reduce((acc, line) => {
        const [optionName, vote] = line.replace(/\s+/g, "\t").split("\t");
        if (vote === 'Pass') {
          acc[optionName] = 'Pass';
        } else {
          acc[optionName] = 'Fail';
        }
        return acc;
      }, {});
    return votes;
  }

}

module.exports = VotingSystem;  
