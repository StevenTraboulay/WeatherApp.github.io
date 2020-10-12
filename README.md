

----------
requirements
-------------
GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
WHEN I view the UV index
THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city
-------
process
-------

1) set up the index file with what i'd need and how i want it structured
2) created index file with triggers and pulls from bootstrap to call into java
3) testing call -failled not using HTTP, retrying keys
4) keys seem okay trying again
5) create forecast loops and hourly checks
6) checking on validiy of cards
7) function for calling 5 day forecast is bugging and not pulling in length, debugging
8) fixed the issue - in the API its not clear which ones to use HOWEVER for UV get the UV API for forecast get the FORECAST API and gen weather get the WEATHER API



---------
keys and info
-------

API key f9536bc7a9491fe897bd179cb356d42a

full fetch API: fetch("api.openweathermap.org/data/2.5/weather?q=" + searchValue + "&appid=f9536bc7a9491fe897bd179cb356d42a&units=metric"


-----
screenshot
-----


![Alt text](/assets/images/weatherscreenshot.png "Screenshot")

