$(document).ready(function () {

var APIKEY = "d67149e00c3ad3b928d7c75156d20ed8"; 

var city;

var queryURL = https://api.openweathermap.org/data/2.5/weather?q={orlando}&appid={d67149e00c3ad3b928d7c75156d20ed8};

fetch("https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/New%20York%20City%2CNY?unitGroup=us&key=YOUR_API_KEY&contentType=json", {
  "method": "GET",
  "headers": {
  }
  })
.then(response => {
  console.log(response);
})
.catch(err => {
  console.error(err);
});

});