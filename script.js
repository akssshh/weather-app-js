async function fetchGeocode(name) {
  const res = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${name}&key=AIzaSyBkT8Xulai_tu3DEIaX-xWYXkvsHEyum-4`
  );

  const data = await res.json();

  const latitude = data.results[0].geometry.location.lat;
  const longitude = data.results[0].geometry.location.lng;

  console.log(latitude, longitude);

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
  return { name, place: place.textContent };
}

async function updateData() {
  const currTemp = document.getElementById("curr-temp");
  const currWeather = document.getElementById("curr-weather");

  const { name, place } = searchData();

  const data = await fetchTempData(name);
  console.log(Math.round(data.main.temp));
  currTemp.textContent = `${Math.round(data.main.temp)}°C`;
  currWeather.textContent = data.weather[0].description;

  setWeatherIcon(data.weather[0].description);


}

const date = new Date();
let dayName = date.toLocaleDateString("en-US", { weekday: "long" });

const currDay = document.getElementById("curr-day");
currDay.textContent = dayName;

const weatherConditions = {
  'clear sky': '/icons/sunny.png',
  'few clouds': '/icons/cloudy.png',
  'scattered clouds': '/icons/cloudy.png',
  'broken clouds': '/icons/cloudy.png',
  'shower rain': '/icons/rainy.png',
  'rain': '/icons/rainy.png',
  'snowy': '/icons/snowy.png',
  'thunderstorm': '/icons/thunderstorms.png',
  'snow': '/icons/snowy.png',
  'mist': '/icons/mist.png'
};


function setWeatherIcon(description) {

  const currIcon = document.getElementById('curr-icon')
  const iconPath = weatherConditions[description.toLowerCase()];

  if (iconPath) {
    currIcon.style.backgroundImage = `url('${iconPath}')`;
  } else {
    console.error(`Invalid weather description: ${description}`);
  }
}


