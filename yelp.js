$(document).ready(function () {
  
    function yelAPI(zip) {
      var zip = zip;
    var yelpKey= "ohHuWoT7Lxdl4ivpbDqSxQiXNJRz3l3OdZI3TtuoYQo0df5GNf9pR0rLNcQgyxl-2_fShCwRni0jaM5IlAMB26MYEUYymvu1PWU8XP5snst-bWGSQTsb8dK12UdtX3Yx";


    var queryURL = `https://cors-anywhere.herokuapp.com/api.yelp.com/v3/businesses/search?categories=foodtrucks&location=${(zip)}`;
    // var queryURL = 'https://cors-anywhere.herokuapp.com/api.yelp.com/v3/businesses/search?categories=foodtrucks&locale=23237';
    // var queryURL = 'https://cors-anywhere.herokuapp.com/api.yelp.com/v3/businesses/search?categories=foodtrucks&latitude=37.569796&longitude=-77.473891';
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

      for (var i=0; i < 5; i++) {
        console.log("");
        console.log("Food Truck Name: ", response.businesses[i].name);
        console.log("Food Truck Display Phone: ", response.businesses[i].display_phone);
        // console.log("Food Truck Phone: ", response.businesses[i].phone);
        console.log("Food Truck Price: ", response.businesses[i].price);
        console.log("Food Truck Rating: ", response.businesses[i].rating);
        console.log("Food Truck URL: ", response.businesses[i].url);
        console.log("Food Truck Image: ", response.businesses[i].image_url);
        console.log("");
        
        var foodTruck = $("<div id='food-truck' class='column is-half'>");


        var fName = $("<h2 class='truck-name'>").text(response.businesses[i].name);
        var fDPhone = $("<h2 class='display-phone'>").text(response.businesses[i].display_phone);
        // var fPhone = $("<h2 class='phone'>").text(response.businesses[i].phone);
        var fPrice = $("<h2 class='price'>").text(response.businesses[i].price);
        var fRating = $("<h2 class='rating'>").text(response.businesses[i].rating);
        var fURL = $(`<h2 class='url'><a href='${(response.businesses[i].url)}'>Look on Yelp</a></h2>`);
        var fImage = $("<img class='image-url'>");
        fImage.attr("src",response.businesses[i].image_url);

        foodTruck.append(fName, fDPhone, fPrice, fRating, fURL, fImage);
        fContainer.append(foodTruck);



        // $("#food-container").append(fName, fDPhone, fPrice, fRating, fImage, fURL);

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


