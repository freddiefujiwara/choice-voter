const parseVotes = require('../src/parseVotes');
const { Option, OptionList } = require('../src/Option');

describe('parseVotes', () => {
    const frontend = new Option('Frontend', 1);
    const backend = new Option('Backend', 2);
    const devops = new Option('DevOps', 3);
    const options = new OptionList([frontend, backend, devops]);

    test('should parse votes from file content with Pass and Fail votes', () => {
        const fileContent = 'Frontend\tPass\nBackend\tFail\nDevOps\tPass\n';
        const votes = parseVotes(fileContent, options);
        expect(votes).toEqual({ Frontend: 'Pass', Backend: 'Fail', DevOps: 'Pass' });
    });

    test('should parse votes from file content with Pass, Fail, and blank votes', () => {
        const fileContent = 'Frontend\tPass\nBackend\t\nDevOps\tFail\n';
        const votes = parseVotes(fileContent, options);
        expect(votes).toEqual({ Frontend: 'Pass', Backend: 'Fail', DevOps: 'Fail' });
    });
});
