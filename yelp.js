$(document).ready(function () {
  

  function yelAPI(zip) {
    var zip = zip;
    var yelpKey= "ohHuWoT7Lxdl4ivpbDqSxQiXNJRz3l3OdZI3TtuoYQo0df5GNf9pR0rLNcQgyxl-2_fShCwRni0jaM5IlAMB26MYEUYymvu1PWU8XP5snst-bWGSQTsb8dK12UdtX3Yx";
    
    
    var queryURL = `https://cors-anywhere.herokuapp.com/api.yelp.com/v3/businesses/search?categories=foodTruckInfos&location=${(zip)}`;
    // var queryURL = 'https://cors-anywhere.herokuapp.com/api.yelp.com/v3/businesses/search?categories=foodTruckInfos&locale=23237';
    // var queryURL = 'https://cors-anywhere.herokuapp.com/api.yelp.com/v3/businesses/search?categories=foodTruckInfos&latitude=37.569796&longitude=-77.473891';
    //https://www.yelp.com/search/snippet?find_desc=&find_loc=23237&parent_request_id=044f2ddc24430a7d&request_origin=user 
    
    $.ajax({
      url: queryURL,
      headers: {'Authorization': 'Bearer '+yelpKey},
      method: 'GET',
    }).then(function (response) {
      
      console.log('');
      console.log('    YELP API RESPONSE    ');
      console.log(response);
      
      var stateCity = `&state=${(response.businesses[0].location.state)}&city=${(response.businesses[0].location.city)}`;

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
        foodTruckInfo.append(fName, fDPhone, fRating, fURL);
        foodTruckImage.append(fImage);

        fContainer.append(foodTruckInfo, foodTruckImage);

      };
      ticketMaster(stateCity);
    });


  };


  function ticketMaster (stateCity){
    // http://production.shippingapis.com/ShippingAPI.dll?API=CityStateLookup&XML=<CityStateLookupRequest USERID="xxxxxxx"><ZipCode ID= "0"><Zip5>90210</Zip5></ZipCode></CityStateLookupRequest>


    var stateCity = stateCity;
    var tmAPIKey = "AGkOY0wMobADkzojimRidw5t9aAPnU7k";
    var queryURL = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${(tmAPIKey)}&countryCode=US${(stateCity)}`

  
    console.log("stateCity", stateCity);
    console.log("Ticketmaster queryURL", queryURL);

    $.ajax({
      url: queryURL,
      method: 'GET',
    }).then(function (response) {
        var events = response._embedded.events;
    
      console.log('');
      console.log("TICKET MASTER");
      console.log(response);
      console.log('', response._embedded.events);

      var eContainer = $("#events-container").addClass("columns is-multiline is-mobile");
      eContainer.empty();

      for (var i=0; i<6; i++){
        console.log("  EVENT  ");
        console.log("TM Event Name: ", events[i].name);
        console.log("TM Event URL: ", events[i].url);
        console.log("TM Event Venue: ", events[i]._embedded.venues[0].name);
        console.log("TM Event Venue Address: ", events[i]._embedded.venues[0].address.line1);
        console.log("TM Event Venue URL: ", events[i]._embedded.venues[0].url);
        console.log("");
        console.log('');

        var eventInfo = $("<div id='event' class='column is-half'>");
        var eventImage = $("<div id='event-image' class='column is-half'>");

        var eName = $("<h2 class='event-name").text(events[i].name);


        eventInfo.append(eName);


        eContainer.append(eventInfo);



      };

    });


  };














  //// Event listener for the zip code search butotn \\\\
  $("#location-button").on("click", function(event){
    event.preventDefault();

    var zipInput = $("#zip-input").val().trim();
    
    yelAPI(zipInput);
    
  });


});


