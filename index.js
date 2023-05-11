const { fetchFlyoverTimes } = require('./iss');

// fetchIP((error, ip) => {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log(ip);
//   }
// });

// fetchCoordsByIP('100000', (error, coordinates) => {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log(coordinates);
//   }
// });

const coordinates = { latitude: 43.653226, longitude: -79.3831843 };

fetchFlyoverTimes(coordinates, (error, flyoverTimes) => {
  if (error) {
    console.log(error);
  } else {
    console.log(flyoverTimes);
  }
});