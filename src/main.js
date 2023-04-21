const fs = require('fs');
const Voter = require('./Voter');
const OptionList = require('./OptionList');
const VotingSystem = require('./VotingSystem');

/**
 * Main function to run the voting system.
 * Reads option and vote data from files,
 * creates a schedule based on the voter's votes and option priorities,
 * and outputs the result.
 */
async function main() {
  const optionFile = process.argv[2] || 'options.tsv';
  const voteFile = process.argv[3] || 'votes.tsv';
  const voterName = process.argv[4] || 'Anonymous';
  const randomnessInput = parseInt(process.argv[5], 10);
  const randomness = (randomnessInput >= 0 && randomnessInput <= 50) ? randomnessInput : 25;

  const voter = new Voter(voterName);

  const optionContent = await fs.promises.readFile(optionFile, 'utf-8');
  const options = new OptionList(OptionList.parseOptions(optionContent));

  const voteContent = await fs.promises.readFile(voteFile, 'utf-8');
  const votes = VotingSystem.parseVotes(voteContent, options);

  const votingSystem = new VotingSystem(voter, options.options);
  options.options.forEach((option) => {
    votingSystem.inputVotes(option, votes[option.name] || '');
  });

  const schedule = votingSystem.createSchedule(randomness);
  console.log(`Voter: ${schedule.voter.name}`);
  console.log('Option order:');
  schedule.optionOrder.forEach((option) => {
    console.log(`{index + 1}. ${option.name}`);
  });
}

main().catch((error) => {
  console.error('Error:', error.message);
  process.exit(1);
});
