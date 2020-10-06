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

      var fContainer = $("#food-container").addClass("columns is-multiline is-mobile");
      fContainer.empty();

      for (var i=0; i < 6; i++) {        
        var foodTruckInfo = $("<div id='food-truck' class='column is-half'>");
        var foodTruckImage = $("<div id='food-truck-image' class='column is-half'>");

        var fPrice = response.businesses[i].price;
        if (fPrice == 'undefined' || typeof fPrice == 'undefined'){
          fPrice='';
        };
 
        var fName = $("<h2 class='truck-name'>").text(response.businesses[i].name + " "+fPrice);
        var fDPhone = $("<h2 class='display-phone'>").text(response.businesses[i].display_phone);
        var fRating = $(`<i class="fas fa-star">  ${(response.businesses[i].rating)}</i>`);
        var fURL = $(`<h2 class='url'><a href='${(response.businesses[i].url)}' target="_blank">Look on Yelp</a></h2>`);
        
        var fImage = $("<img class='image-url'>");
        fImage.attr("src",response.businesses[i].image_url);

        foodTruckInfo.append(fName, fDPhone, fRating, fURL, fImage);
        foodTruckImage.append(fImage);

        fContainer.append(foodTruckInfo, foodTruckImage);

      };
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
        var eventInfo = $("<div id='event' class='column is-half'>");
        var eName = $("<h2 class='event-name'>").text(events[i].name);
        var eURL = $(`<p class='url'><a href='${(events[i].url)}' target='_blank'>Event Info</a></h2>`);
        var eVenue = $("<h3 class='event-venue'>").text(events[i]._embedded.venues[0].name);
        var eAddress =$("<h3 class='event-address'>").text(events[i]._embedded.venues[0].address.line1);
        var vURL =  `<p class='url'><a href='${(events[i]._embedded.venues[0].url)}' target='_blank'>Venue Info</a></p>`;
        var eventImage = $("<img id='event-image' class='column is-half'>");
        eventImage.attr("src",events[i].images[0].url);
        eventInfo.append(eName, eURL, eVenue, eAddress, vURL);
        eContainer.append(eventInfo, eventImage);
      };

      var fMoreEvents = $(`<p class='url more-events'><a href='https://www.ticketmaster.com' target="_blank">More Events on ticketmaster</a></p>`);
      eContainer.append(fMoreEvents);
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


