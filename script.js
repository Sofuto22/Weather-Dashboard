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

    var respone = await fetch(apiUrl);
    if (respone.ok) {
        var data = await respone.json();
        var nameValue = data.name;
        var tempValue = data.main.temp;
        var humidityValue = data.main.humidity;
        var windValue = data.wind.speed;
        console.log(data);
        var lat = data.coord.lon;
        var lon = data.coord.lat;
        await uvIndex(data.coord.lat, data.coord.lon);
        var icon = data.weather[0].icon;
        var weatherUrl = `https://openweathermap.org/img/wn/${icon}.png`;
        var icon = `<img src="${weatherURL}"/>`;

        cityDateIcon.innerHTML =
        nameValue = currentDate.format("MM/DD/YYYY") + icon;
        temp.innerHTML = "Temperature: " + tempValue + " °F";
        humidity.innerHTML = "Humidity: " + humidityValue + " %";
        wind.innerHTML = "Wind Speed: " + windValue + " MPH";
            topContainer.classList.remove("hide");
            console.log(icon);

        
    }
}