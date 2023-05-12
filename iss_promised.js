const request = require('request-promise-native');

const fetchMyIP = () => {
  return request('https://api.ipify.org?format=json');
};

const fetchCoordsByIP = (body) => {
  const ip = JSON.parse(body).ip;
  return request('http://ipwho.is/?q=${ip}');
};

const fetchFlyoverTimes = (body) => {
  const { latitude, longitude } = JSON.parse(body);
  const url = `https://iss-flyover.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`;
  return request(url);
};

const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchFlyoverTimes)
    .then((data) => {
      const { response } = JSON.parse(data);
      return response;
    });
};



module.exports = {
  nextISSTimesForMyLocation
};