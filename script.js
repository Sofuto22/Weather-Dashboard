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