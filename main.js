const API_URL =
  "https://transport.opendata.ch/v1/stationboard?station=Dietikon,%20Wasserburg&limit=4";

let time = getCurrentTime();
console.log(time);

// Calculating time
function getCurrentTime() {
  return new Date().toLocaleTimeString("de-CH", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

// Fetching data
// TODO

// Displaying data
// TODO
