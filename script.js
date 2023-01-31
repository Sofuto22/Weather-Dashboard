var searchInput = document.querySelector(".inputValue");
var searchBtn = document.querySelector(".searchBtn");
var currentDate = moment();
var cityDateIcon = document.querySelector(".city-date-icon");
var topContainer = document.querySelector(".current-weather");
var temperature = document.querySelector(".temperature");
var humidity = document.querySelector(".humidity");
var wind = document.querySelector(".wind");
var uv = document.querySelector(".uv");
var recentSearch = JSON.parse(localStorage.getItem("recents")|| "[]");
var recentContainer = $("#recent");
var inputValue = $("#inputValue");
var clear = $("#clearHistory");

renderRecent();

function renderRecent() {
    recentContainer.empty();


for (let i = 0; i < recentSearch.length; i++) {
    var recentInput = $("<input>");
    recentInput.attr("type, text");
    recentInput.attr("readonly", true);
    recentInput.attr("class", "form-control-lg text-black");
    recentInput.attr("value", recentSearch[i]);
    recentInput.on("click", function()
    {
        getWeather($(this).atrr("value"));
    });
    recentContainer.append(recentInput);
    }
}

var searchSubmit = function (event) {
    event.preventDefault;

    var city = searchInput.value.trim();

    if (city) {
        getCityWeather(city);

        searchInput.value="";
    } else if (userInput == "") {
        alert("Please enter city");
    }
};

async function getWeather(city) {
    var apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&units=imperial&appid=fc300879c67e261854f3d0a54db41390";

    var response = await fetch(apiUrl);
    if (response.ok) {
      var data = await response.json();
      var nameValue = data.name;
      var tempValue = data.main.temp;
      var humidityValue = data.main.humidity;
      var windValue = data.wind.speed;
      console.log(data);
      var lat = data.coord.lon;
      var lon = data.coord.lat;
      await uvIndex(data.coord.lat, data.coord.lon);
      var icon = data.weather[0].icon;
      
      var weatherURL = `https://openweathermap.org/img/wn/${icon}.png`;
      var icon = `<img src="${weatherURL}"/>`;
  
      cityDateIcon.innerHTML =
        nameValue + currentDate.format(" (M/DD/YYYY) ") + icon;
      temp.innerHTML = "Temperature: " + tempValue + " °F";
      humidity.innerHTML = "Humidity: " + humidityValue + "%";
      wind.innerHTML = "Wind Speed: " + windValue + " MPH";
        topContainer.classList.remove("hide");
      console.log(icon);

      let newWeatherItem = city;
      const newSearch = recentSearch.filter((search) => {
          if (search.city === newWeatherItem.city) {
              return false;
          } else {
              return true;
          }
      }
      );

    } else {
      alert("Error: " + response.statusText);
    }
  };

    function setLocalStorage(city) {
        if(recentSearch.index(city) === -1) {
            recentSearch.push(city);
            localStorage.setItem("recents", JSON.stringify(recentSearch));
        }
    }

    searchBtn.addEventListener("click", ()=> {
        var userInput = inputValue.val().trim();
        if (userInput !== "") {
            getWeather(searchInput.value);
            setLocalStorage(searchInput.value);
        renderRecent();
            inputValue.val("");
        } else if (userInput == "") {
            alert("Enter a city!");
        }
    });

    clear.on("click", function() {
        localStorage.removeItem("recents");
        recentSearch.length = 0;
        renderRecent;
    });

    async function uvIndex(lat, lon) {
        var uvUrl = 
        "https://api.openweathermap.org/data/2.5/onecall?lat=" +
        lat +
        "&lon=" +
        lon +
        "&units=imperial&appid=9795009f60d5d1c3afe4e6df6002c319";
      var response = await fetch(uvUrl);

      if (response.ok) {
        console.log(response);
        var data = await response.json();
        console.log(data);
        var uviValue = data.current.uvi;
        var fiveDayData = data.daily;
        console.log(fiveDayData);
        var uviLine = document.querySelector(".uviValue")
        uviLine.textContent = uviValue;  
    }

    }