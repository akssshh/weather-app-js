async function fetchGeocode() {
  const res = await fetch(
    "https://maps.googleapis.com/maps/api/geocode/json?address=melamora&key=AIzaSyBkT8Xulai_tu3DEIaX-xWYXkvsHEyum-4"
  );

  const data = await res.json();

  const latitude = data.results[0].geometry.location.lat;
  const longitude = data.results[0].geometry.location.lng;

  return { latitude, longitude }
}

async function fetchTempData(latitude, longitude) {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=26bb0823f324a9fb0d23f5373a61429a&units=metric`
  );

  const data = await res.json();
  return data;
}

async function logData() {
  try {
    const { latitude, longitude } = await fetchGeocode();
    const weatherData = await fetchTempData(latitude, longitude);
    console.log(Math.round(weatherData.main.temp));
  } catch (error) {
    console.error("Error:", error);
  }
}

logData();

// async function updateData() {
//   const currData = document.getElementById("temp-data")
//   try {
//     const data = await fetchData();
//     // currData.textContent = data.main.temp;
//   } catch (error) {
//     console.log(error);
//   }
// }

// updateData();
