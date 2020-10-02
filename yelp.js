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
        // console.log("");
        
        var foodTruckInfo = $("<div id='food-truck' class='column is-half'>");
        var foodTruckImage = $("<div id='food-truck-image' class='column is-half'>");

        var fPrice = response.businesses[i].price;
        if (fPrice=='undefined'){
          fPrice='';
        };
 
        var fName = $("<h2 class='truck-name'>").text(response.businesses[i].name + " "+fPrice);
        var fDPhone = $("<h2 class='display-phone'>").text(response.businesses[i].display_phone);
        var fRating = $(`<i class="fas fa-star">${(response.businesses[i].rating)}</i>`);
        var fURL = $(`<h2 class='url'><a href='${(response.businesses[i].url)}' target="_blank">Look on Yelp</a></h2>`);
        
        
        var fImage = $("<img class='image-url'>");
        fImage.attr("src",response.businesses[i].image_url);

        console.log("fImage:   ", fImage);

        foodTruckInfo.append(fName, fDPhone, fRating, fURL);
        foodTruckImage.append(fImage);

        fContainer.append(foodTruckInfo, foodTruckImage);
      };
    });
  };

  //// Event listener for the zip code search butotn \\\\
  $("#location-button").on("click", function(event){
    event.preventDefault();

    var zipInput = $("#zip-input").val().trim();

    console.log("  Search Click Event ")
    
    yelAPI(zipInput);
    
    document.getElementById("zip-input").value = "";


  });





  function ticketMaster (){
    var zipCode = "23230";
    var tmAPIKey = "AGkOY0wMobADkzojimRidw5t9aAPnU7k";
    var queryURL = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${(tmAPIKey)}`; // search all
    var queryURL = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${(tmAPIKey)}&postalCode=${(zipCode)}`; // doesn't work

  
    console.log(queryURL);
    $.ajax({
      url: queryURL,
      method: 'GET',
    }).then(function (response) {

      console.log("");
      console.log(response);
      console.log("");

    });

  };

  // ticketMaster();

  // yelAPI();
});


