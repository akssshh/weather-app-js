async function fetchGeocode(name) {
  try {
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${name}&key=AIzaSyBkT8Xulai_tu3DEIaX-xWYXkvsHEyum-4`
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch geocode data. Status: ${res.status}`);
    }

    const data = await res.json();

    if (data.results.length === 0) {
      throw new Error(`No data found for the provided address: ${name}`);
    }

    const latitude = data.results[0].geometry.location.lat;
    const longitude = data.results[0].geometry.location.lng;

    return { latitude, longitude };
  } catch (error) {
    openModal(error.message);
  }
}

async function fetchTempData(name) {
  try {
    const { latitude, longitude } = await fetchGeocode(name);
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=26bb0823f324a9fb0d23f5373a61429a&units=metric`
    );
    const data = await res.json();
    return data;
  } catch (error) {
    openModal(error.message);
  }
}

function searchData() {
  let name = document.getElementById("search-bar").value;

  let place = document.getElementById("place");
  place.textContent = name;
  clearSearchBar();
  return { name };
}

function clearSearchBar() {
  var searchBar = document.getElementById("search-bar");
  searchBar.value = "";
}

function closeModal() {
  document.getElementById("myModal").style.display = "none";
  document.getElementById("overlay").style.display = "none";
}

function openModal(error) {
  document.getElementById("myModal").style.display = "block";
  document.getElementById("overlay").style.display = "block";
  document.getElementById("error-handle").textContent = `${error}`;
}

async function updateData() {
  const currTemp = document.getElementById("curr-temp");
  const currWeather = document.getElementById("curr-weather");
  const currLogo = document.getElementById("main-logo");
  const currSpeed = document.getElementById("curr-speed");
  const currHumidity = document.getElementById("curr-humidity");
  const mainLogo = document.getElementById("main-logo");

  const { name, place } = searchData();

  if (!name) {
    openModal("Please enter a location");
    return;
  }

  const data = await fetchTempData(name);
  currTemp.textContent = `${Math.round(data.main.temp)}°C`;
  currWeather.textContent = data.weather[0].description;
  currSpeed.textContent = `Wind Speed: ${data.wind.speed}km/h`;
  currHumidity.textContent = `Humidity: ${data.main.humidity}%`;

  const iconUrl = `icons/${data.weather[0].icon}@2x.png`
  console.log(iconUrl)
  console.log(data.weather[0].icon)
  mainLogo.src = iconUrl;

}

// Current Day
const day = new Date();
let dayName = day.toLocaleDateString("en-US", { weekday: "long" });

const currDay = document.getElementById("curr-day");
currDay.textContent = dayName;

// Current Date
const currDate = new Date();
const formattedDate = currDate.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });

document.getElementById("curr-date").innerHTML = formattedDate;


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
