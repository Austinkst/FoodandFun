
function weatherData() {

  $("#weather-container").empty();
  $("#weather-container").show();
  $(".date").show();

  var zipCode = $("#zip-input").val();
  var apiKey = '77876012ad238b72189989cbc66caa6a';
  var queryURL = `https://api.openweathermap.org/data/2.5/forecast?zip=${zipCode},us&units=imperial&appid=${apiKey}`;

  $.ajax({
      url: queryURL,
      method: "GET"
  }).then(function(response){

    console.log(response);

    var lat = response.city.coord.lat;
    var lon = response.city.coord.lon;

    var dailyURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&units=imperial&appid=${apiKey}`

    $.ajax({
      url: dailyURL,
      method: "GET"
    }).then(function(forecast){

      console.log(forecast);
      // WEEK'S FORECAST
      for (i=0; i < 7; i++) {

        $("#weather-container").append(`
        <div class="card">
          <div class="card-image">
            <figure class="image is-4by3">
              <img class="weather-icon" src="https://openweathermap.org/img/wn/${forecast.daily[i].weather[0].icon}@2x.png" alt="Placeholder image">
            </figure>
          </div>
          <br>
          <div class="card-content">
            <p class="bd-notification is-primary"><strong>${moment().add(i, 'days').format('MMM Do')}</strong></p>
            <p class="weather-copy bd-notification is-primary"><em>${forecast.daily[i].weather[0].description}</em></p>
            <p class="weather-copy bd-notification is-primary"><strong>High</strong> ${Math.round(forecast.daily[i].temp.max)}ºF</p>
            <p class="weather-copy bd-notification is-primary"><strong>Low</strong> ${Math.round(forecast.daily[i].temp.min)}ºF</p>            
          </div>
        </div>`);

      }

    })
  })
}
        

   


