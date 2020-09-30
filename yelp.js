$(document).ready(function () {
  
    function yelAPI() {

    var yAPI= "ohHuWoT7Lxdl4ivpbDqSxQiXNJRz3l3OdZI3TtuoYQo0df5GNf9pR0rLNcQgyxl-2_fShCwRni0jaM5IlAMB26MYEUYymvu1PWU8XP5snst-bWGSQTsb8dK12UdtX3Yx";



    var queryURL = 'https://cors-anywhere.herokuapp.com/api.yelp.com/v3/businesses/search?categories=foodtrucks&latitude=37.569796&longitude=-77.473891';    
    // 37.569796, -77.473891
    // Request URL: https://www.yelp.com/search/snippet?find_desc=food%20trucks&find_loc=23234&parent_request_id=2272938463bdcc9b&request_origin=user

    // https://api.yelp.com/v3/autocomplete?text=del&latitude=37.786882&longitude=-122.399972
    
    
    $.ajax({
      url: queryURL,
      headers: {'Authorization': 'Bearer '+yAPI},
      method: 'GET',
    }).then(function (response) {

        
      console.log('');
      console.log('    YELP API RESPONSE    ');
      console.log(response);

      
      console.log('response.businesses.length:  ', response.businesses.length);

      for (var i=0; i < 5; i++) {
        console.log("");
        console.log("Food Truck Name: ", response.businesses[i].name);
        console.log("Food Truck Display Phone: ", response.businesses[i].display_phone);
        console.log("Food Truck Phone: ", response.businesses[i].phone);
        console.log("Food Truck Price: ", response.businesses[i].price);
        console.log("Food Truck Rating: ", response.businesses[i].rating);
        console.log("Food Truck URL: ", response.businesses[i].url);
        console.log("Food Truck Image: ", response.businesses[i].image_url);
        console.log("");
         
        var fName = $("<h2 class='truck-name'>").text(response.businesses[i].name);
        var fDPhone = $("<h2 class='display-phone'>").text(response.businesses[i].display_phone);
        var fPhone = $("<h2 class='phone'>").text(response.businesses[i].phone);
        var fPrice = $("<h2 class='price'>").text(response.businesses[i].price);
        var fRating = $("<h2 class='rating'>").text(response.businesses[i].rating);
        var fURL = $(`<h2 class='url'><a href='${(response.businesses[i].url)}'>${(response.businesses[i].name)} on Yelp</a></h2>`);
        var fImage = $("<img class='image-url'>");
        fImage.attr("src",response.businesses[i].image_url);




        $("#food-container").append(fName, fDPhone, fPhone, fPrice, fRating, fImage, fURL,$("<hr>"));

      };
    });
  };

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

  ticketMaster();

  yelAPI();
});


