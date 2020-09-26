$(document).ready(function () {
  
    function yelAPI() {

    var queryURL = 'https://api.yelp.com/v3/businesses/search';    
    console.log("TEST")
    
    // Food Trucks (foodtrucks, [AR, AT, AU, BE, BR, CA, CH, CL, CZ, DE, DK, ES, FI, FR, GB, HK, IE, IT, JP, MX, MY, NL, NO, NZ, PH, PL, PT, SE, TR, TW, US])

    
    $.ajax({
      url: queryURL,
      method: 'GET',
    }).then(function (response) {
      console.log('')
      console.log('    YELP API RESPONSE    ')
      console.log(respones)
      console.log('')
    });
  };







  yelAPI();
});


