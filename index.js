/* Global Variables */

let currentTemperature;

/* OpenWeather */
const key = "e398da5248ec44f334fb31e5e0ed1abb";

/* DOM */
const output = document.getElementById("output");
const input = document.getElementById("input");
const checkButton = document.getElementById("check-button");

function setLocation() {
  /* Set location variable */
  let location = input.value;
  /* Fix capitalize */
  const transformString = location.split(" ");
  for (let i = 0; i < transformString.length; i++) {
    transformString[i] =
      transformString[i].charAt(0).toUpperCase() +
      transformString[i].slice(1).toLowerCase();
  }
  return (location = transformString.join(" "));
}

async function getCoordinates(location) {
  /* Define coordinates endpoint */
  const coordinatesEndpoint =
    "http://api.openweathermap.org/geo/1.0/direct?q=" +
    location +
    "&limit=1&appid=" +
    key;

  /* Get coordinates for the location */
  const getCoordinatesData = await fetch(coordinatesEndpoint);
  const coordinates = await getCoordinatesData.json();
  console.log(coordinates);
  let latitude = coordinates[0].lat;
  let longitude = coordinates[0].lon;
  return [latitude, longitude];
}

async function getTemperature(latitude, longitude) {
  /* Define weather endpoint */
  const weatherEndpoint =
    "https://api.openweathermap.org/data/2.5/weather?lat=" +
    latitude +
    "&lon=" +
    longitude +
    "&appid=" +
    key +
    "&units=metric";

  /* Get current weather */
  const getCurrentWeather = await fetch(weatherEndpoint);
  const currentWeatherData = await getCurrentWeather.json();
  console.log(currentWeatherData);
  return (currentTemperature = currentWeatherData.main.temp);
}

/* Check current weather for a location */
async function checkWeather() {
  try {
    let location = await setLocation();

    let coordinatesData = await getCoordinates(location);
    let latitude = coordinatesData[0];
    let longitude = coordinatesData[1];

    let currentTemperature = await getTemperature(latitude, longitude);

    /* Output the result */
    document.body.style.setProperty(
      "background",
      currentTemperature > 25
        ? "linear-gradient(90deg, rgb(255 248 235) 0%, rgb(255 224 118) 35%, rgb(255 253 253) 100%)"
        : "linear-gradient(90deg, rgb(255 255 255) 0%, rgb(178 233 255) 35%, rgb(223 244 255) 100%)"
    );
    output.innerText = `It's currently ${currentTemperature} degrees in ${location}`;
  } catch (error) {
    console.log(error);
  }
}

checkButton.addEventListener("click", checkWeather);
