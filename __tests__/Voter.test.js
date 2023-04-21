const Voter = require('../src/Voter');

describe('Voter', () => {
    test('should create a new voter with a name and empty votes object', () => {
        const voter = new Voter('John Doe');
        expect(voter.name).toBe('John Doe');
        expect(voter.votes).toEqual({});
    });
});
