
function weatherData() {

  $("#weather-container").show();

  var zipCode = $("#zip-input").val();
  var apiKey = '77876012ad238b72189989cbc66caa6a';
  var queryURL = `https://api.openweathermap.org/data/2.5/forecast?zip=${zipCode},us&units=imperial&appid=${apiKey}`;
  console.log(zipCode);

  $.ajax({
      url: queryURL,
      method: "GET"
  }).then(function(response){

    console.log(response);

    $("#temp-high").text(response.list[0].main.temp_max);
    $("#temp-low").text(response.list[0].main.temp_min);

    $("#weather-icon").attr("src", `https://openweathermap.org/img/wn/${response.list[0].weather[0].icon}@2x.png`)
    $("#rain-chance").text(response.list[0].weather[0].description);

    $("#hum-chance").text(response.list[0].main.humidity);

  })
}
        

   


