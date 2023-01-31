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