const { nextISSTimesForMyLocation } = require('./iss_promised');

const printPassTimes = (flyoverTimes) => {
  const passes = flyoverTimes.map((pass) => {
    const date = new Date(pass.risetime * 1000);
    const duration = pass.duration;
    return `Next pass at ${date} for ${duration} seconds!`;
  });
  const outputString = `The next flyover times are:\n${passes.join('\n')}`;
  return outputString;
};

nextISSTimesForMyLocation()
  .then((passTimes) => {
    return printPassTimes(passTimes);
  })
  .then((outputString) => {
    console.log(outputString);
  })
  .catch((error) => {
    console.log("It didn't work: ", error.message);
  });

