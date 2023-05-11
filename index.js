const { fetchFlyoverTimes } = require('./iss');

const coordinates = { latitude: 43.653226, longitude: -79.3831843 };

fetchFlyoverTimes(coordinates, (error, flyoverTimes) => {
  if (error) {
    console.log(error);
  } else {
    console.log(flyoverTimes);
  }
});