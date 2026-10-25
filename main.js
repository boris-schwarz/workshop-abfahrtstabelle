const API_URL =
  "https://transport.opendata.ch/v1/stationboard?station=Dietikon,%20Wasserburg&limit=4";

const template = document.getElementById("row");
const title = document.getElementById("title");
const clock = document.getElementById("clock");
const board = document.querySelector("#board tbody");

// Clock loop
setInterval(renderClock, 1000);
renderClock();

// Departure table loop
let departureData = await fetchDepartureData();
renderDepartureTable(departureData);
setInterval(async function dataLoop() {
  departureData = await fetchDepartureData();
  renderDepartureTable(departureData);
}, 60000);

// Calculating time
function formatDate(date) {
  return new Date().toLocaleTimeString("de-CH", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

function parseDateTimeString(str) {
  return new Date(str.replace(/([+-]\d{2})(\d{2})$/, "$1:$2"));
}

// Fetching data
async function fetchDepartureData() {
  //const response = await fetch(API_URL);
  const response = await fetch("data.json");
  if (!response.ok)
    throw new Error("API could not be fetched, status " + response.status);
  return response.json();
}

// Displaying data
function renderClock() {
  clock.innerText = formatDate(new Date());
}

function renderDepartureTitle(stationName) {
  const departureTitle = "Nächste Abfahrten ab " + stationName;
  title.textContent = departureTitle;
  document.title = departureTitle;
}

function renderDepartureTable(data) {
  const now = Date.now();

  renderDepartureTitle(data.station.name);

  board.replaceChildren();

  for (let departure of data.stationboard) {
    const row = template.content.cloneNode(true);
    const departureTime = parseDateTimeString(departure.stop.departure);
    let departureDelta = timeDelta(departureTime, now);
    let isDelayed = departure.stop.delay > 0;

    if (isDelayed) {
      row.querySelector("tr").classList.add("delayed");
      departureDelta += "+" + departure.stop.delay;
    }
    row.querySelector(".bus").textContent = departure.number;
    row.querySelector(".to").textContent = departure.to;
    row.querySelector(".departure").textContent = departureDelta;
    board.appendChild(row);
  }
}

function timeDelta(date1, date2) {
  let delta = Math.floor((date1 - date2) / 60000);
  if (delta > 60) {
    delta = "> 60";
  }
  delta += "′";
  return delta;
}
