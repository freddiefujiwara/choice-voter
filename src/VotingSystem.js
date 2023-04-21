/**
 * VotingSystem class represents a voting system that allows inputting votes for
 * options and creating a schedule based on the voter's votes and option priorities.
 */
class VotingSystem {
	/**
	 * Create a new VotingSystem instance.
	 * @param {Voter} voter - The voter object.
	 * @param {Option[]} options - The list of option objects.
	 */
	constructor(voter, options) {
		this.voter = voter;
		this.options = options;
	}

	/**
	 * Input votes for an option.
	 * @param {Option} option - The option object.
	 * @param {string} vote - The vote value, either 'Pass', 'Fail', or empty string.
	 */
	inputVotes(option, vote) {
		this.voter.votes[option.name] = vote === 'Pass' ? 'Pass' : 'Fail';
	}

	/**
	 * Create a schedule based on the voter's votes and option priorities.
	 * @param {number} [randomness=25] - The percentage of randomness to be applied when creating the schedule (0-50).
	 * @param {number} [maxRandomness=50] - The maximum percentage of randomness allowed (0-50).
	 * @returns {{voter: Voter, optionOrder: Option[]}} - An object containing the voter and the ordered list of options.
	 */
	createSchedule(randomness = 25, maxRandomness = 50) {
		randomness = Math.min(randomness, maxRandomness);
		const passOptions = this.options.filter((option) => this.voter.votes[option.name] === "Pass").sort((a, b) => a.priority - b.priority);
		const randomFactor = randomness / 100;

		for (let i = 0; i < passOptions.length - 1; i++) {
			if (Math.random() < randomFactor) {
				const j = i + Math.floor(Math.random() * (passOptions.length - i));
				[passOptions[i], passOptions[j]] = [passOptions[j], passOptions[i]];
			}
		}

		return { voter: this.voter, optionOrder: passOptions };
	}

	/**
	 * Parse votes from a file content string.
	 * @param {string} fileContent - The file content string.
	 * @returns {Object<string, string>} - An object containing option names as keys and vote values ('Pass' or 'Fail') as values.
	 */
	static parseVotes(fileContent) {
		return fileContent.split("\n").filter(line => line).reduce((acc, line) => {
			const [optionName, vote] = line.replace(/\s+/g, "\t").split("\t");
			acc[optionName] = vote === 'Pass' ? 'Pass' : 'Fail';
			return acc;
		}, {});
	}
}

module.exports = VotingSystem;