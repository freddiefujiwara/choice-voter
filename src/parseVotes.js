function parseVotes(fileContent, optionList) {
  const votes = fileContent
    .split("\n")
    .filter((line) => line)
    .reduce((acc, line) => {
      const [optionName, vote] = line.split("\t");
      if (vote === 'Pass') {
        acc[optionName] = 'Pass';
      } else {
        acc[optionName] = 'Fail';
      }
      return acc;
    }, {});
  return votes;
}

module.exports = parseVotes;
