# choice-voter
A simple and flexible voting system for JavaScript that can be used for a wide variety of applications, from selecting candidates for an election to prioritizing tasks in a project.

## Features
Reads options and their priorities from a TSV file.
Reads voter preferences from another TSV file.
Supports "Pass" and "Fail" votes for each option.
Generates a prioritized schedule based on the input votes and option priorities.
Allows for varying degrees of randomness in the schedule creation.

## Installation
Clone this repository:
```bash
git clone https://github.com/freddiefujiwara/choice-voter
```

Change to the cloned directory:

```bash
cd choice-voter
```

Install the required dependencies:
```bash
npm install
```

## Usage
Prepare your options.tsv file with the list of options and their priorities. The format is as follows:

```plaintext
Option1   1
Option2   2
Option3   3
```

Prepare your votes.tsv file with the voter's preferences for each option. The format is as follows:
```plaintext
Option1   Pass
Option2   Fail
Option3   Pass
```

Run the voting system using the following command:
```bash
node main.js [options.tsv] [votes.tsv] [VoterName] [randomness(0-50)]
```

Replace [options.tsv], [votes.tsv], and [VoterName] with your own file paths and voter name, if necessary. If not specified, the default file paths are options.tsv and votes.tsv, and the default voter name is "Anonymous".

The generated schedule will be displayed in the following format:
```plaintext
Voter: John Doe
Option order:
1. Option1
2. Option3
```

## Testing
To run the tests for the voting system, execute the following command:
```bash
npm test
```

This will run the test suite, which includes tests for the Voter, Option, OptionList, and VotingSystem classes, as well as the parseVotes function.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

- [Codecoverage](https://freddiefujiwara.github.io/choice-voter/coverage)
- [JSDoc](https://freddiefujiwara.github.io/choice-voter)

## License
MIT