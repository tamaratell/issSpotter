const { nextISSFlyoverTimesforMyLocation } = require('./iss');

nextISSFlyoverTimesforMyLocation((error, result) => {
  if (error) {
    console.error(error);
  } else {
    console.log(result);
  }
});