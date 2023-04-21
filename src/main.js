const fs = require('fs');
const { Voter } = require('./Voter');
const { Option, OptionList } = require('./Option');
const VotingSystem = require('./VotingSystem');
const parseVotes = require('./parseVotes');

async function main() {
    const optionFile = process.argv[2] || 'options.tsv';
    const voteFile = process.argv[3] || 'votes.tsv';
    const voterName = process.argv[4] || 'Anonymous';

    const voter = new Voter(voterName);

    const optionContent = await fs.promises.readFile(optionFile, 'utf-8');
    const options = new OptionList(OptionList.parseOptions(optionContent));

    const voteContent = await fs.promises.readFile(voteFile, 'utf-8');
    const votes = parseVotes(voteContent, options);

    const votingSystem = new VotingSystem(voter, options.options);
    for (const option of options.options) {
        votingSystem.inputVotes(option, votes[option.name] || '');
    }

    const schedule = votingSystem.createSchedule();
    console.log(`Voter: ${schedule.voter.name}`);
    console.log('Option order:');
    schedule.optionOrder.forEach((option, index) => {
        console.log(`${index + 1}. ${option.name}`);
    });
}

main().catch((error) => {
    console.error('Error:', error.message);
    process.exit(1);
});
