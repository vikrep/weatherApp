var APPID = "33fb7454eb75c6a062a86f7f0ee2695a";
var temp;
var loc;
var icon;
var humidity;
var wind;
var description;
var minTemp;
var maxTemp;
var dateTime;


function update(weather) {
    icon.src = "imgs/codes/" + weather.code + ".png"
    humidity.innerHTML = weather.humidity;
    wind.innerHTML = weather.wind
    description.innerHTML = weather.description
    loc.innerHTML = weather.location;
    temp.innerHTML = weather.temp;
    dateTime.innerHTML = weather.dateTime;
};

window.onload = function () {
    temp = document.getElementById("temperature");
    loc = document.getElementById("location");
    icon = document.getElementById("icon");
    humidity = document.getElementById("humidity");
    wind = document.getElementById("wind")
    description = document.getElementById("description");
    dateTime = document.getElementById("dateTime")
    var name = window.prompt(" Enter the city name: ");
    updateByName(name);
};

function updateByName(name) {
    var url = "https://api.openweathermap.org/data/2.5/weather?" + "q=" + name + "&units=metric" +
        "&APPID=" + APPID;         
        //add &units=metric
    sendRequest(url);
};


function sendRequest(url) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var data = JSON.parse(xmlhttp.responseText);
            var weather = {};
            weather.code = data.weather[0].id;
            weather.humidity = data.main.humidity;
            weather.wind = data.wind.speed;
            weather.description = data.weather[0].description;
            /* NEW */
            weather.location = data.name;
            /* NEW */
            weather.temp = Math.round(data.main.temp);
            weather.dateTime = unixToUtc(data.dt);
            update(weather);
        };
    };

    xmlhttp.open("GET", url, true);
    xmlhttp.send();
};

// function K2C(k) {
//     return Math.round(k - 273.15);
// };
function unixToUtc(t) {
    return new Date(t * 1000).toString()
};
