const Option = require('../src/Option');
const OptionList = require('../src/OptionList');

describe('Option', () => {
  test('should create a new option with a name and priority', () => {
    const option = new Option('Frontend', 1);
    expect(option.name).toBe('Frontend');
    expect(option.priority).toBe(1);
  });
});

describe('OptionList', () => {
  test('should create a new option list with the given options', () => {
    const frontend = new Option('Frontend', 1);
    const backend = new Option('Backend', 2);
    const devops = new Option('DevOps', 3);
    const options = new OptionList([frontend, backend, devops]);
    expect(options.options).toEqual([frontend, backend, devops]);
  });

  test('should get an option by name', () => {
    const frontend = new Option('Frontend', 1);
    const backend = new Option('Backend', 2);
    const devops = new Option('DevOps', 3);
    const options = new OptionList([frontend, backend, devops]);
    const foundOption = options.getOptionByName('Backend');
    expect(foundOption).toBe(backend);
  });

  test('should parse options from a file content string', () => {
    const fileContent = 'Frontend\t1\nBackend\t2\nDevOps\t3\n';
    const options = OptionList.parseOptions(fileContent);
    expect(options).toEqual([
      new Option('Frontend', 1),
      new Option('Backend', 2),
      new Option('DevOps', 3),
    ]);
  });
});
