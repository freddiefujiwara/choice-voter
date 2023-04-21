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
	createSchedule(randomness = 25, maxRandomness = 50) {
		if (randomness > maxRandomness) {
			randomness = maxRandomness;
		}

		const passOptions = this.options
			.filter((option) => this.voter.votes[option.name] === "Pass")
			.sort((a, b) => a.priority - b.priority);

		const randomFactor = randomness / 100;

		for (let i = 0; i < passOptions.length - 1; i++) {
			if (Math.random() < randomFactor) {
				const j = i + Math.floor(Math.random() * (passOptions.length - i));
				[passOptions[i], passOptions[j]] = [passOptions[j], passOptions[i]];
			}
		}

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
