$(document).ready(function () {
  
  var stateCity = "";
  var dateSelected ="";

  function yelAPI(zip) {
    $("#food-container").empty(); 
    var yelpKey= "ohHuWoT7Lxdl4ivpbDqSxQiXNJRz3l3OdZI3TtuoYQo0df5GNf9pR0rLNcQgyxl-2_fShCwRni0jaM5IlAMB26MYEUYymvu1PWU8XP5snst-bWGSQTsb8dK12UdtX3Yx";
    var queryURL = `https://cors-anywhere.herokuapp.com/api.yelp.com/v3/businesses/search?categories=foodTruckInfos&location=${(zip)}`;
    
    $.ajax({
      url: queryURL,
      headers: {'Authorization': 'Bearer '+yelpKey},
      method: 'GET',
    }).then(function (response) {
      stateCity = `&stateCode=${(response.businesses[0].location.state)}&city=${(response.businesses[0].location.city)}`;
      
      for (var i=0; i < 6; i++) {     
        var fPrice = response.businesses[i].price;
        if (fPrice == 'undefined' || typeof fPrice == 'undefined'){
          fPrice='';
        };
        
        $("#food-container").append(`
        <div id='food-truck' class='column is-half'>
          <h2 class='truck-name'>${(response.businesses[i].name + " "+fPrice)}</h2>
          <h2 class='display-phone'>${(response.businesses[i].display_phone)}</h2>
          <i class="fas fa-star">  ${(response.businesses[i].rating)}</i>
          <h2 class='url'><a href='${(response.businesses[i].url)}' target="_blank">Look on Yelp</a></h2>
        </div>

        <div id='food-truck-image' class='column is-half'>
          <img class='image-url' alt='restaurnat${(i)}' src='${(response.businesses[i].image_url)}'>
        </div>
          `);
      };

      $("#food-container").append(`<p class='url more-yelp'><a href='https://www.yelp.com/search?find_desc=&find_loc=${(zipInput)}' target="_blank">More Restaurants on Yelp</a></p>`);
    });
  };


  function ticketMaster (){
    // Default to Richmond, VA is no city state is returned
    if (stateCity==""){
      stateCity = `&state=VA&city=Richmond`;
    };
    
    $("#events-container").empty();

    var tmAPIKey = "AGkOY0wMobADkzojimRidw5t9aAPnU7k";
    var queryURL = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${(tmAPIKey)}&countryCode=US${(stateCity)}`

    // if date is available, add to the query
    if (dateSelected !=""){
      queryURL += "&startDateTime"+dateSelected+"T00:00:00Z";
    };

    // console.log("");
    // console.log("stateCity", stateCity);
    // console.log("startDateTime", dateSelected);
    // console.log("Ticketmaster queryURL", queryURL);

    $.ajax({
      url: queryURL,
      method: 'GET',
    }).then(function (response) {
      
      if (typeof response._embedded == 'undefined'){
        $("#events-container").append(`<p class='url no-events'><a href='https://www.ticketmaster.com' target='_blank'>No events found for 
        the specific ZIP Code entered. Please search on ticketmaster</a></p>`);
        return
      };
      
      var events = response._embedded.events;
      var eContainer = $("#events-container").addClass("columns is-multiline is-mobile");
      
      for (var i=0; i<6; i++){
        $("#events-container").append(`
        <div id='event' class='column is-half'>
          <h2 class='event-name'>${(events[i].name)}</h2>
          <p class='url'><a href='${(events[i].url)}' target='_blank'>Event Info</a></p>
          <h3 class='event-venue'>${(events[i]._embedded.venues[0].name)}</h3>
          <h3 class='event-address'>${(events[i]._embedded.venues[0].address.line1)}</h3>
          <p class='url'><a href='${(events[i]._embedded.venues[0].url)}' target='_blank'>Venue Info</a></p>
        </div>
          
          <img id='event-image' class='column is-half' alt='event${(i)}' src='${(events[i].images[0].url)}'>
        `);
      };

      $("#events-container").append(`<p class='url more-events'><a href='https://www.ticketmaster.com' target="_blank">More Events on ticketmaster</a></p>`);
    });
  };

  /* Event listener for the zip code search butotn */
  $("#location-button").on("click", function(event){
    event.preventDefault();
    var zipInput = $("#zip-input").val().trim();

    $(".date-text").show();
    $(".date-input").show();
    $("#date-input").show();
    $("#date-input").val(null);
    $("#food-container").hide();
    $("#events-container").hide();

    yelAPI(zipInput);
    weatherData()
  });

  /* Event listener for the date picker */
  $("#date-input").on("change", function(event){
    dateSelected= $(this).val();
    ticketMaster();

    $("#weather-container").show();
    $("#food-container").show();
    $("#events-container").show();
  });

  /* Hide tiles on initial page load */
  function hideTilesInitialLoad(){
    $(".date").hide();
    $("#weather-container").hide();
    $("#food-container").hide();
  };

  hideTilesInitialLoad();
});


