async function fetchGeocode(name) {
  const res = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${name}&key=AIzaSyBkT8Xulai_tu3DEIaX-xWYXkvsHEyum-4`
  );

  const data = await res.json();

  const latitude = data.results[0].geometry.location.lat;
  const longitude = data.results[0].geometry.location.lng;

  return { latitude, longitude };
}

async function fetchTempData(name) {
  // const name = searchData();
  const { latitude, longitude } = await fetchGeocode(name);
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=26bb0823f324a9fb0d23f5373a61429a&units=metric`
  );
  const data = await res.json();
  return data;
}

function searchData() {
  let name = document.getElementById("search-bar").value;

  let place = document.getElementById("place");
  place.textContent = name;
  clearSearchBar();
  return { name, place: place.textContent };
}

function clearSearchBar() {
  var searchBar = document.getElementById("search-bar");
  searchBar.value = "";
}

function closeModal() {
  document.getElementById("myModal").style.display = "none";
  document.getElementById("overlay").style.display = "none";
}

function openModal() {
  document.getElementById("myModal").style.display = "block";
  document.getElementById("overlay").style.display = "block";
}

async function updateData() {
  const currTemp = document.getElementById("curr-temp");
  const currWeather = document.getElementById("curr-weather");
  const currLogo = document.getElementById("main-logo");
  const currSpeed = document.getElementById("curr-speed");
  const currHumidity = document.getElementById("curr-humidity");

  const { name, place } = searchData();

  if (!name) {
    openModal();
    return;
  } else {
    closeModal();
  }

  const data = await fetchTempData(name);
  currTemp.textContent = `${Math.round(data.main.temp)}°C`;
  currWeather.textContent = data.weather[0].description;
  currSpeed.textContent = `Wind Speed: ${data.wind.speed}km/h`;
  currHumidity.textContent = `Humidity: ${data.main.humidity}%`;

  // if (
  //   data.weather[0].description == "few clouds" ||
  //   data.weather[0].description == "scattered clouds" ||
  //   data.weather[0].description == "broken clouds" ||
  //   data.weather[0].description == "overcast clouds"
  // ) {
  //   currLogo.src = "./icons/cloudy.png";
  // } else if (data.weather[0].description == "light rain") {
  //   currLogo.src = "./icons/showers.png";
  // } else if (data.weather[0].description == "rain") {
  //   currLogo.src = "./icons/rainy.png";
  // } else if (data.weather[0].description == "thunderstorm") {
  //   currLogo.src = "./icons/thunderstorms.png";
  // } else if (data.weather[0].description == "snow") {
  //   currLogo.src = "./icons/snowy.png";
  // } else if (data.weather[0].description == "mist") {
  //   currLogo.src = "./icons/mist.png";
  // } else if (data.weather[0].description == "clear sky") {
  //   currLogo.src = "./icons/sunny.png";
  // }
}

// Current Day
const day = new Date();
let dayName = day.toLocaleDateString("en-US", { weekday: "long" });

const currDay = document.getElementById("curr-day");
currDay.textContent = dayName;

// Current Date
const currDate = new Date();

const date = currDate.getDate();
const monthInd = currDate.getMonth();
const year = currDate.getFullYear();

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const month = months[monthInd];
document.getElementById("curr-date").innerHTML =
  date + " " + month + " " + year;

// Current Time

const currTime = new Date();

const hours = currTime.getHours();
const minutes = currTime.getMinutes();

const timeStr = currTime.toLocaleTimeString("en-US", {
  hour: "numeric",
  minute: "numeric",
  hour12: true,
});

document.getElementById("curr-time").innerHTML = timeStr;
