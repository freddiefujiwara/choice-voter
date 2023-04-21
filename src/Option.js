class Option {
    constructor(name, priority) {
        this.name = name;
        this.priority = priority;
    }
}

class OptionList {
    constructor(options) {
        this.options = options;
    }

    getOptionByName(name) {
        return this.options.find(option => option.name === name);
    }

    static parseOptions(fileContent) {
        const options = fileContent
            .split("\n")
            .filter((line) => line)
            .map((line) => {
                const [name, priorityStr] = line.split("\t");
                return new Option(name, parseInt(priorityStr, 10));
            });
        return options;
    }
}

module.exports = {
    Option,
    OptionList,
};
