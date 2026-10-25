const API_URL =
  "https://transport.opendata.ch/v1/stationboard?station=Dietikon,%20Wasserburg&limit=4";

const template = document.getElementById("row");
const title = document.getElementById("title");
const board = document.querySelector("#board tbody");

let time = getCurrentTime();
console.log(time);

let departureData = await fetchDepartureData();
renderDepartureTable(departureData);

// Calculating time
function getCurrentTime() {
  return new Date().toLocaleTimeString("de-CH", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

// Fetching data
async function fetchDepartureData() {
  const response = await fetch("data.json");
  if (!response.ok)
    throw new Error(
      "data.json could not be fetched, status " + response.status,
    );
  return response.json();
}

// Displaying data
function renderDepartureTable(departureData) {
  const station = "Nächste Abfahrten ab " + departureData.station.name;
  title.textContent = station;
  document.title = station;
  console.log(departureData);
  for (let departure of departureData.stationboard) {
    const row = template.content.cloneNode(true);
    row.querySelector(".bus").textContent = departure.number;
    row.querySelector(".to").textContent = departure.to;
    row.querySelector(".departure").textContent = departure.stop.departure;
    board.appendChild(row);
  }
}
