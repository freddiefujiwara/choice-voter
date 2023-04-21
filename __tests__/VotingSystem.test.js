const Voter = require('../src/Voter');
const Option = require('../src/Option');
const OptionList = require('../src/OptionList');
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

  test('should create a schedule with varying degrees of randomness', () => {
    const votingSystem = new VotingSystem(voter, options.options);
    votingSystem.inputVotes(frontend, 'Pass');
    votingSystem.inputVotes(backend, 'Pass');
    votingSystem.inputVotes(devops, '');

    const scheduleNoRandom = votingSystem.createSchedule(0);
    expect(scheduleNoRandom.voter).toBe(voter);
    expect(scheduleNoRandom.optionOrder).toEqual([frontend, backend]);

    const scheduleWithRandom = votingSystem.createSchedule(25);
    expect(scheduleWithRandom.voter).toBe(voter);

    const scheduleMaxRandom = votingSystem.createSchedule(50);
    expect(scheduleMaxRandom.voter).toBe(voter);

    const scheduleOverMaxRandom = votingSystem.createSchedule(75);
    expect(scheduleOverMaxRandom.voter).toBe(voter);
    expect(scheduleOverMaxRandom.optionOrder.length).toBe(2);
  });
});

describe('parseVotes', () => {
  const frontend = new Option('Frontend', 1);
  const backend = new Option('Backend', 2);
  const devops = new Option('DevOps', 3);
  const options = new OptionList([frontend, backend, devops]);

  test('should parse votes from file content with Pass and Fail votes', () => {
    const fileContent = 'Frontend\tPass\nBackend\tFail\nDevOps\tPass\n';
    const votes = VotingSystem.parseVotes(fileContent, options);
    expect(votes).toEqual({ Frontend: 'Pass', Backend: 'Fail', DevOps: 'Pass' });
  });

  test('should parse votes from file content with Pass, Fail, and blank votes', () => {
    const fileContent = 'Frontend\tPass\nBackend\t\nDevOps\tFail\n';
    const votes = VotingSystem.parseVotes(fileContent, options);
    expect(votes).toEqual({ Frontend: 'Pass', Backend: 'Fail', DevOps: 'Fail' });
  });
});
