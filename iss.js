const request = require('request');

const fetchIP = (cb) => {
  request.get('https://api64.ipify.org?format=json', (error, response, body) => {
    try {
      if (response.statusCode !== 200) {
        const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
        cb(Error(msg), null);
        return;
      }
      const ip = JSON.parse(body).ip;
      return cb(null, ip);
    }
    catch (error) {
      cb("Could not fetch IP", null);
    }
  });
};

const fetchCoordsByIP = (cb) => {
  fetchIP((error, ip) => {
    if (error) {
      return cb(error, null);
    }
    request.get(`http://ipwho.is/?q=${ip}`, (error, response, body) => {
      try {
        const geodata = JSON.parse(body);
        if (geodata.success === false) {
          const msg = `Success status was ${geodata.success} when fetching coordinates. Server message says: ${geodata.message} when fetching for IP ${geodata.ip}`;
          cb(Error(msg), null);
          return;
        }
        const coordinates = { latitude: geodata.latitude, longitude: geodata.longitude };
        return cb(null, coordinates);
      }
      catch (error) {
        cb("Could not fetch coordinates", null);
      }
    });
  });
};

const fetchFlyoverTimes = (cb) => {
  fetchCoordsByIP((error, coordinates) => {
    if (error) {
      return cb(error, null);
    }
    request.get(`https://iss-flyover.herokuapp.com/json/?lat=${coordinates.latitude}&lon=${coordinates.longitude}`, (error, response, body) => {
      try {
        const flyoverTimes = JSON.parse(body).response;
        return cb(null, flyoverTimes);
      }
      catch (error) {
        if (JSON.parse(body).message === false) {
          const msg = `Success status was ${JSON.parse(body).success} when fetching request ${JSON.parse(body).request}`;
          cb(Error(msg), null);
          return;
        }
        cb("Could not fetch flyover times", null);
      }
    });
  });
};

const nextISSFlyoverTimesforMyLocation = (cb) => {
  fetchFlyoverTimes((error, flyoverTimes) => {
    if (error) {
      return cb(error, null);
    }
    const passes = flyoverTimes.map((pass) => {
      const date = new Date(pass.risetime * 1000);
      const duration = pass.duration;
      return `Next pass at ${date} for ${duration} seconds!`;
    });
    const outputString = `The passes are:\n${passes.join('\n')}`;
    cb(null, outputString);
  });
};

module.exports = {
  nextISSFlyoverTimesforMyLocation
};
