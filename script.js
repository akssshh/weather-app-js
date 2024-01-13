
async function fetchData() {
  const res = await fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=khumtai&appid=26bb0823f324a9fb0d23f5373a61429a&units=metric"
  );

  const data = await res.json();
     console.log(Math.round(data.main.temp))
  return data;
}

fetchData();

async function updateData() {
  const currData = document.getElementById("temp-data")
  try {
    const data = await fetchData();
    currData.textContent = data.main.temp;
  } catch (error) {
    console.log(error);
  }
}

updateData();
