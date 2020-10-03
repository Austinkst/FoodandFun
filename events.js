
// function ticketMaster (zipInput){
//     // http://production.shippingapis.com/ShippingAPI.dll?API=CityStateLookup&XML=<CityStateLookupRequest USERID="xxxxxxx"><ZipCode ID= "0"><Zip5>90210</Zip5></ZipCode></CityStateLookupRequest>


//     var zipCode = 23219;
//     var tmAPIKey = "AGkOY0wMobADkzojimRidw5t9aAPnU7k";
//     var queryURL = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${(tmAPIKey)}&size=5&postalCode=${(zipCode)}`; // search all
//     // var queryURL = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=AGkOY0wMobADkzojimRidw5t9aAPnU7k&size=5&countryCode=US&zipcode=${(zipCode)}`;
//     // https://app.ticketmaster.com/discovery/v2/events.json?apikey=AGkOY0wMobADkzojimRidw5t9aAPnU7k&size=5&countryCode=US&city=Richmond&state=VA
//     var queryURLZip = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${(tmAPIKey)}&postalCode=${(zipCode)}`; // doesn't work

  
//     console.log(queryURL);
//     $.ajax({
//       url: queryURL,
//       method: 'GET',
//     }).then(function (response) {
//         var events = response;
    
//       console.log("");
//       console.log("TICKET MASTER");
//       console.log(events);

//       console.log("");

//     });


//   };