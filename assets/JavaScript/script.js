//finding the search valu pull from indx
function getSearchVal() {
  var searchValue = document.querySelector("#search-value").value;
  searchWeather(searchValue);
  makeRow(searchValue);
}
//cretae new row in page in search
function makeRow(searchValue) {
  var liEl = document.createElement("li")
  liEl.classList.add("list-group-item", "list-group-item-action");
  var text = searchValue;
  liEl.textContent = text;
  var historyEl = document.querySelector(".history");
  //console.log(event.target);
  historyEl.onclick = function () {
    //console.log(event.target.tagName);
    if (event.target.tagName == "LI") {
      searchWeather(event.target.textContent)
    }
  };
  historyEl.appendChild(liEl);
}

//API call/key for search
function searchWeather(searchValue) {
  fetch(
    "http://api.openweathermap.org/data/2.5/weather?q=" +
      searchValue +
      "&appid=f9536bc7a9491fe897bd179cb356d42a&units=metric"
  ).then(function (response) {
    return response.json();
  })
  .then(function (data) {
    //content clear
    todayEl = document.querySelector("#today");
    todayEl.textContent = " ";

    //current weather content
    var titleEl = document.createElement("h3")
    titleEl.classList.add("card-title");
    titleEl.textContent =
      data.name + "(" + new Date().toLocaleDateString() + ")";
    var cardEl = document.createElement("div");
    cardEl.classList.add("card");
    var tempEl = document.createElement("p");
    tempEl.classList.add("card-text");
    var windEl = document.createElement("p");
    windEl.classList.add("card-text");
    var humidEl = document.createElement("p");
    humidEl.classList.add("card-text");
    tempEl.textContent = "Temperature: " + data.main.temp + " °C";
    humidEl.textContent = "Humidity: " + data.main.humidity + " %";
    var cardBodyEl = document.createElement("div");
    cardBodyEl.classList.add("card-body");
    var imgEl = document.createElement("img");
    imgEl.setAttribute(
      "src",
      "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png"
    );
    //appending info to cards
    titleEl.appendChild(imgEl)
    cardBodyEl.appendChild(titleEl);
    cardBodyEl.appendChild(tempEl);
    cardBodyEl.appendChild(humidEl);
    cardBodyEl.appendChild(windEl);
    cardEl.appendChild(cardBodyEl);
    todayEl.appendChild(cardEl);

    getForecast(searchValue);
    getUVIndex(data.coord.lat, data.coord.lon);
  })
}

//forecast func
function getForecast(searchValue) {
  fetch(
    "http://api.openweathermap.org/data/2.5/weather?q=" + searchValue + "&appid=f9536bc7a9491fe897bd179cb356d42a&units=metric")
    .then(function (response) {

      return response.json();
    })
    .then(function(data) {
      //console.log(data)
      var forecastEl = document.querySelector("#forecasts");
      forecastEl.innerHTML = "<h4 class=\"mt-3\">5-Day Forecast:</h4>";
      forecastRowEl = document.createElement("div");
      forecastRowEl.className = "\"row\"";

      //loop over all forecasts in xxxx hours

      for (var i = 0; i < data.list.length; i++) {
        
        //forecasts at 3pm

        if (data.list[i].dt_txt.indexOf("15:00:00)") !== -1) {

          //html for card
          var colEl = document.createElement("div");
          colEl.classList.add("col-md-2");
          var cardEl = document.createElement("div");
          cardEl.classList.add("card", "bg-primary", "text-white");
          var windEl = document.createElement("P");
          windEl.classList.add("card-text");
          windEl.textContent =
            " Wind speed: " + data.list[i].wind.speed + "kmph";
          var humidityEl = document.createElement("p");
          humidityEl.classList.add("card-text");
          humidityEl.textContent =
            "Humidity: " + data.list[i].main.humdity + " %";
          var bodyEl = document.createElement("div");
          bodyEl.classList.add("card-body", "p-2");
          var titleEl = document.createElement("h5");
          titleEl.classList.add("card-title");
          titleEl.textContent = new Date(
            data.list[i].dt_txt
          ).toLocaleDateString();
          var imgEl = document.createElement("img");
          imgEl.setAttribute(
            "src",
            "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png"
          );
          var p1El = document.createElement("p");
          p1El.classList.add("card-text");
          p1El.textContent = "Temp: " + data.list[i].main.temp_max + "°C";
          var p2El = document.createElement("p");
          p2El.classList.add("card-text");
          p2El.textContent = "Humidity: " + data.list[i].main.humidity + "%";

          colEl.appendChild(cardEl);
          bodyEl.appendChild(titleEl);
          bodyEl.appendChild(imgEl);
          bodyEl.appendChild(windEl);
          bodyEl.appendChild(humidityEl);
          bodyEl.appendChild(p1El);
          bodyEl.appendChild(p2El);
          cardEl.appendChild(bodyEl);
          forecastEl.appendChild(colEl);
        }
      }
    });
}

function getUVIndex(lat, lon) {
  fetch(
    "http://api.openweathermap.org/data/2.5/weather?lat=" +
      lat +
      "&lon=" +
      lon +
      "&appid=f9536bc7a9491fe897bd179cb356d42a"
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var bodyEl = document.querySelector(".card-body");
      var uvEl = document.createElement("p");
      uvEl.textContent = "UV Index: ";
      var buttonEl = document.createElement("span");
      buttonEl.classList.add("btn", "btn-sm");
      buttonEl.innerHTML = data.value;

      if (data.value < 3) {
        buttonEl.classList.add("btn-success");
      } else if (data.value < 7) {
        buttonEl.classList.add("btn-warning");
      } else {
        buttonEl.classList.add("btn-dange");
      }
      bodyEl.appendChild(uvEl);
      uvEl.appendChild(buttonEl);
    });
}

document
  .querySelector("#search-button")
  .addEventListener("click", getSearchVal);
