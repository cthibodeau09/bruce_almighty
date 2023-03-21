$(window).on('load', function () {
  currentLocation();
  checkLocalStorage();
});

// Weather API
var APIKey = "d67149e00c3ad3b928d7c75156d20ed8";


$("#search-button").on("click", function (event) {
  // Preventing the button from trying to submit the form
  event.preventDefault();

  q = $("#city-input").val();
  if (q === '') {
      return alert('Please Enter Valid City Name ! ');
  }
  getWeather(q);

  saveToLocalStorage(q);
});


//converting temperature F to Celsius 
function convertToC(fahrenheit) {
  var fTempVal = fahrenheit;
  var cTempVal = (fTempVal - 32) * (5 / 9);
  var celcius = Math.round(cTempVal * 10) / 10;
  return celcius;
}

//Function to get weather details 
function getWeather(q) {
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + q + "&units=imperial&appid=" + APIKey;
  $.ajax({

      url: queryURL,
      method: "GET",
      error: (err => { 
          alert("Your city was not found. Check your spelling or enter a city code")
          return;
        })
  }).then(function (response) {
      console.log(response)

      var celcius = convertToC(response.main.temp);
      var cityMain1 = $("<div col-12>").append($("<p><h2>" + response.name + ' (' + currentDate + ')' + "</h2><p>"));
      var image = $('<img class="imgsize">').attr('src', 'http://openweathermap.org/img/w/' + response.weather[0].icon + '.png');        
      var degreeMain = $('<p>').text('Temperature : ' + response.main.temp + ' °F (' + celcius + '°C)');
      var humidityMain = $('<p>').text('Humidity : ' + response.main.humidity + '%');
      var windMain = $('<p>').text('Wind Speed : ' + response.wind.speed + 'MPH');       
      var uvIndexcoord = '&lat=' + response.coord.lat + '&lon=' + response.coord.lon;
      var cityId = response.id;

      displayUVindex(uvIndexcoord);
      displayForecast(cityId);

      cityMain1.append(image).append(degreeMain).append(humidityMain).append(windMain);
      $('#cityList').empty();
      $('#cityList').append(cityMain1);
  });
}

//function to Display 5 Day forecast
function displayForecast(c) {
  $.ajax({ 
      url: "https://api.openweathermap.org/data/2.5/forecast?id=" + c + "&units=imperial&APPID=" + APIKey,
      method: "GET",
  }).then(function (response) {

      // Display forecast for next 5 days underneath current conditions
      var arrayList = response.list;
      for (var i = 0; i < arrayList.length; i++) {
          if (arrayList[i].dt_txt.split(' ')[1] === '12:00:00') {
              console.log(arrayList[i]);
              var celcius = convertToC(arrayList[i].main.temp);//converting F to Celsius 
              var cityMain = $('<div>');
              cityMain.addClass('col forecast bg-primary text-white ml-3 mb-3 rounded>');
              var date5 = $("<h5>").text(response.list[i].dt_txt.split(" ")[0]);
              var image = $('<img>').attr('src', 'http://openweathermap.org/img/w/' + arrayList[i].weather[0].icon + '.png');
              var degreeMain = $('<p>').text('Temp : ' + arrayList[i].main.temp + ' °F ('+ celcius + '°C)');               
              var humidityMain = $('<p>').text('Humidity : ' + arrayList[i].main.humidity + '%');
              var windMain = $('<p>').text('Wind Speed : ' + arrayList[i].wind.speed + 'MPH');                
              cityMain.append(date5).append(image).append(degreeMain).append(humidityMain).append(windMain);
              $('#days').append(cityMain);
          }
      }
  });
};


// Function to get data store in Locaal Storage 
function checkLocalStorage() {
  var storedData = localStorage.getItem('queries');
  var dataArray = [];
  if (!storedData) {
      console.log("no data stored");
  } else {
      storedData.trim();
      dataArray = storedData.split(',');
      for (var i = 0; i < dataArray.length; i++) {
          createRecentSearchBtn(dataArray[i]);
      }
  }
};
// Function to Set data in Local storage
function saveToLocalStorage(q) {
  var data = localStorage.getItem('queries');
  if (data) {
      console.log(data, q)

  } else {
      data = q;
      localStorage.setItem('queries', data);
  }
  if (data.indexOf(q) === -1) {
      data = data + ',' + q;
      localStorage.setItem('queries', data);
      createRecentSearchBtn(q);
  }
}
//added clear histor fuction to clear searched city list
$("#clear-history").on("click", function (event) {
  $("#historyList").empty();
});