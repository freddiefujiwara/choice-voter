const Voter = require('../src/Voter');
const { Option, OptionList } = require('../src/Option');
const VotingSystem = require('../src/VotingSystem');

describe('VotingSystem', () => {
    const frontend = new Option('Frontend', 1);
    const backend = new Option('Backend', 2);
    const devops = new Option('DevOps', 3);
    const options = new OptionList([frontend, backend, devops]);
    const voter = new Voter('John Doe');

    test('should input a "Pass" vote for an option', () => {
        const votingSystem = new VotingSystem(voter, options.options);
        votingSystem.inputVotes(frontend, 'Pass');
        votingSystem.inputVotes(devops, 'Fail');
        votingSystem.inputVotes(backend, '');
        expect(voter.votes).toEqual({ Frontend: 'Pass', Backend: 'Fail', DevOps: 'Fail' });
    });

    test('should input a "Fail" vote for an option', () => {
        const votingSystem = new VotingSystem(voter, options.options);
        votingSystem.inputVotes(frontend, 'Fail');
        votingSystem.inputVotes(devops, 'Fail');
        votingSystem.inputVotes(backend, '');
        expect(voter.votes).toEqual({ Frontend: 'Fail', Backend: 'Fail', DevOps: 'Fail' });
    });

    test('should create a schedule based on the voter\'s votes and option priorities', () => {
        const votingSystem = new VotingSystem(voter, options.options);
        votingSystem.inputVotes(frontend, 'Pass');
        votingSystem.inputVotes(backend, 'Pass');
        votingSystem.inputVotes(devops, '');
        const schedule = votingSystem.createSchedule();
        expect(schedule.voter).toBe(voter);
        expect(schedule.optionOrder).toEqual([frontend, backend]);
    });
});
