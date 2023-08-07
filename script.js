console.log("hello");

const tempField = document.querySelector(".weather h2");
const cityField = document.querySelector(".weather2 p");
const dateField = document.querySelector(".weather2 span");
const imgField = document.querySelector(".weather3 img");
const weatherField = document.querySelector(".weather3 span");
const form = document.querySelector("form");

let target = "jaipur";

const fetchData = async (target) => {
  try {
    const url = `http://api.weatherapi.com/v1/current.json?key=e71c3688b7de4387b85140701232807&q=${target}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    const {
      current: {
        temp_c,
        condition: { text, icon },
      },
      location: { name, localtime },
    } = data;

    weatherApp(temp_c, name, localtime, icon, text);
  } catch (error) {
    alert("location no found")
  }
};

fetchData(target);

const weatherApp = (temprature, name, time, emoji, text) => {
  tempField.innerText = temprature;
  cityField.innerText = name;
  const exactTime = time.split(" ")[1];
  const exactDate = time.split(" ")[0];

  const exactDay = new Date(exactDate).getDay();
  //   console.log(exactDay)

  //   getDayFullName(exactDay)
  dateField.innerText = `${exactTime} - ${getDayFullName(
    exactDay
  )} - ${exactDate}`;

  imgField.src = emoji;
  weatherField.innerText = text;
};

function getDayFullName(num) {
  switch (num) {
    case 0:
      return "Sunday";
    case 1:
      return "Monday";
    case 2:
      return "Tuesday";
    case 3:
      return "Wednesday";
    case 4:
      return "Thursday";
    case 5:
      return "Friday";
    case 6:
      return "Saturday";
    default:
      "dont know ";
      break;
  }
}
const search = (e) => {
  e.preventDefault();
  let input = document.querySelector("input");
  target = input.value;
  fetchData(target);
  input.value = '';
};

form.addEventListener("submit", search);
