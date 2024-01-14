function searchData() {
  let placeName = document.getElementById("search-bar").value;
  let place = document.getElementById('place');
  place.textContent = placeName;
  return placeName;

}

async function fetchGeocode(placeName) {
  const res = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${placeName}&key=AIzaSyBkT8Xulai_tu3DEIaX-xWYXkvsHEyum-4`
  );

  const data = await res.json();

  const latitude = data.results[0].geometry.location.lat;
  const longitude = data.results[0].geometry.location.lng;

  return { latitude, longitude };
}

async function fetchTempData(latitude, longitude) {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=26bb0823f324a9fb0d23f5373a61429a&units=metric`
  );

  const data = await res.json();
  return data;
}

let weatherData;

async function fetchData() {
  try {
    const placeName = searchData();
    const { latitude, longitude } = await fetchGeocode(placeName);
    const weatherData = await fetchTempData(latitude, longitude);
    return weatherData;
  } catch (error) {
    console.error("Error:", error);
  }
}

async function updateData() {
  const currTemp = document.getElementById("curr-temp");
  const currWeather = document.getElementById("curr-weather");
  try {
    const data = await fetchData();
    currTemp.textContent = `${Math.round(data.main.temp)}°C`;
    currWeather.textContent = data.weather[0].description;
  } catch (error) {
    console.log(error);
  }
}
updateData();

const date = new Date();
let dayName = date.toLocaleDateString("en-US", { weekday: "long" });

const currDay = document.getElementById("curr-day");
currDay.textContent = dayName;

console.log(dayName);
