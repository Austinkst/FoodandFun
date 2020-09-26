$(document).ready(function () {
  
    function yelAPI() {

    var yAPI= "ohHuWoT7Lxdl4ivpbDqSxQiXNJRz3l3OdZI3TtuoYQo0df5GNf9pR0rLNcQgyxl-2_fShCwRni0jaM5IlAMB26MYEUYymvu1PWU8XP5snst-bWGSQTsb8dK12UdtX3Yx";



    var queryURL = 'https://cors-anywhere.herokuapp.com/api.yelp.com/v3/businesses/search?categories=foodtrucks&latitude=37.569796&longitude=-77.473891';    
    // 37.569796, -77.473891
    // Food Trucks (foodtrucks, [AR, AT, AU, BE, BR, CA, CH, CL, CZ, DE, DK, ES, FI, FR, GB, HK, IE, IT, JP, MX, MY, NL, NO, NZ, PH, PL, PT, SE, TR, TW, US])
    // https://api.yelp.com/v3/autocomplete?text=del&latitude=37.786882&longitude=-122.399972
    
    
    $.ajax({
      url: queryURL,
      headers: {'Authorization': 'Bearer '+yAPI},
      method: 'GET',
    }).then(function (response) {

        
        var fName = '';
        var price = '';
        var rating = '';
      console.log('');
      console.log('    YELP API RESPONSE    ');
      console.log(response);
      console.log('');
      console.log('');
    });
  };







  yelAPI();
});


