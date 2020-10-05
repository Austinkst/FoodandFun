$(document).ready(function () {
  
  var stateCity = "";
  var dateSelected ="";

  $("#weather-container").hide();

  function yelAPI(zip) {
    var yelpKey= "ohHuWoT7Lxdl4ivpbDqSxQiXNJRz3l3OdZI3TtuoYQo0df5GNf9pR0rLNcQgyxl-2_fShCwRni0jaM5IlAMB26MYEUYymvu1PWU8XP5snst-bWGSQTsb8dK12UdtX3Yx";
    var queryURL = `https://cors-anywhere.herokuapp.com/api.yelp.com/v3/businesses/search?categories=foodTruckInfos&location=${(zip)}`;
    
    // console.log("IN YELP")
    $.ajax({
      url: queryURL,
      headers: {'Authorization': 'Bearer '+yelpKey},
      method: 'GET',
    }).then(function (response) {
      
      // console.log('');
      // console.log('    YELP API RESPONSE    ');
      // console.log(queryURL);
      // console.log(response);
      
      stateCity = `&state=${(response.businesses[0].location.state)}&city=${(response.businesses[0].location.city)}`;
      // console.log(stateCity);

      var fContainer = $("#food-container").addClass("columns is-multiline is-mobile");
      fContainer.empty();

      for (var i=0; i < 6; i++) {
        // console.log("");
        // console.log("Food Truck Name: ", response.businesses[i].name);
        // console.log("Food Truck Display Phone: ", response.businesses[i].display_phone);
        // console.log("Food Truck Price: ", response.businesses[i].price);
        // console.log("Food Truck Rating: ", response.businesses[i].rating);
        // console.log("Food Truck URL: ", response.businesses[i].url);
        // console.log("Food Truck Image: ", response.businesses[i].image_url);
        // console.log("Food Truck City: ", response.businesses[i].location.city);
        // console.log("Food Truck City: ", response.businesses[i].location.state);
        // console.log("");
        
        var foodTruckInfo = $("<div id='food-truck' class='column is-half'>");
        var foodTruckImage = $("<div id='food-truck-image' class='column is-half'>");

        var fPrice = response.businesses[i].price;
        if (fPrice=='undefined'){
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
      console.log("Using default state+city");
    };

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
        var events = response._embedded.events;
    
      // console.log('');
      // console.log("TICKET MASTER");
      // console.log(response);
      // console.log('', response._embedded.events);

      var eContainer = $("#events-container").addClass("columns is-multiline is-mobile");
      eContainer.empty();

      for (var i=0; i<6; i++){
        // console.log("  EVENT  ");
        // console.log("TM Event Name: ", events[i].name);
        // console.log("TM Event URL: ", events[i].url);
        // console.log("TM Event Venue: ", events[i]._embedded.venues[0].name);
        // console.log("TM Event Venue Address: ", events[i]._embedded.venues[0].address.line1);
        // console.log("TM Event Venue URL: ", events[i]._embedded.venues[0].url);
        // console.log("TM Event Image: ", events[i].images[0].url);
        // console.log("");

        var eventInfo = $("<div id='event' class='column is-half'>");
        var eName = $("<h2 class='event-name'>").text(events[i].name);
        var eURL = $(`<p class='url'><a href='${(events[i].url)}' target='_blank'>Event Info</a></h2>`);
        var eVenue = $("<h3 class='event-venue'>").text(events[i]._embedded.venues[0].name);
        var eAddress =$("<h2 class='event-address'>").text(events[i]._embedded.venues[0].address.line1);
        var vURL =  `<p class='url'><a href='${(events[i]._embedded.venues[0].url)}' target='_blank'>Venue Info</a></h2>`;

        var eventImage = $("<img id='event-image' class='column is-half'>");
        eventImage.attr("src",events[i].images[0].url);

        eventInfo.append(eName, eURL, eVenue, eAddress, vURL);
        eContainer.append(eventInfo, eventImage);
      };
    });
  };

  /* Event listener for the zip code search butotn */
  $("#location-button").on("click", function(event){
    event.preventDefault();
    var zipInput = $("#zip-input").val().trim();

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
    $("#weather-container").hide();
    $("#food-container").hide();
    $("#events-container").hide();
  };

  hideTilesInitialLoad();

});


