$(document).ready(function() {
  $('#btn-searchCity').click(weatherToday);
  $('#btn-searchCity').click(forecastSevenDays);
  $('#searchedList').click(weatherToday);
  $('#searchedList').click(forecastSevenDays);

  var userInput;
  var time = moment().format('LL');
  var myKey = '77876012ad238b72189989cbc66caa6a';

  $('.figure').css('display', 'none');
  $('.ulCon').css('display', 'none');

  function weatherToday(event) {
    event.preventDefault();

    if ($(this).attr('id') === 'searchedList') {
      var x = event.target;
      userInput = $(x).text();
      console.log(userInput);
    } else {
      userInput = $(this)
        .prev()
        .val();
    }
    $('.figure').empty();
    $('#search-container').animate({ left: '10px' }, 600);
    $('.ulCon').css('display', 'flex');

    var queryURL =
      'https://api.openweathermap.org/data/2.5/weather?q=' +
      userInput +
      '&APPID=' +
      myKey;

    $.ajax({
      url: queryURL,
      method: 'GET'
    }).then(function(response) {
      // console.log(response);
      $('.figure').css('display', 'block');

      var city = 'Richmond,us';
      var city = $('<h1>')
        .addClass('cityName')
        .text(`City: ${response.name}, ${response.sys.country}`);
      var date = $('<h3>')
        .addClass('date')
        .text(`Date: ${time}`);
      var iconImage = $('<img>')
        .addClass('icon-image')
        .attr(
          'src',
          'https://openweathermap.org/img/w/' +
            response.weather[0].icon +
            '.png'
        );

      var tempF = parseInt((response.main.temp - 273.15) * 1.8 + 32);
      var temperature = $('<h4>')
        .addClass('current-temp')
        .text(`Current Temperature: ${tempF} F°`);
      var humidity = $('<h4>')
        .addClass('humidity')
        .text(`Humidity: ${response.main.humidity}%`);
      var windSpeed = $('<h4>')
        .addClass('wind-speed')
        .text(`Wind Speed ${response.wind.speed} mph`);

      var uvIdx = $('<h4>').addClass('uvIdx');

      /** */
      var latitude = response.coord.lat;
      var lon = response.coord.lon;
      function getUVidx() {
        var uvIdxUrl =
          'https://api.openweathermap.org/data/2.5/uvi?appid=' +
          myKey +
          '&lat=' +
          latitude +
          '&lon=' +
          lon;
        $.ajax({
          url: uvIdxUrl,
          method: 'GET'
        }).then(function(response) {
          // console.log(response.value);
          $('.uvIdx').text(' UV Index: ' + response.value);
        });
      }
      getUVidx();

      $('.figure').append(
        city,
        iconImage,
        date,
        temperature,
        humidity,
        windSpeed,
        uvIdx
      );
    });
  }

  function forecastFiveDays() {
    if ($(this).attr('id') === 'searchedList') {
      var x = event.target;
      userInput = $(x).text();
      console.log(userInput);
    } else {
      userInput = $(this)
        .prev()
        .val();
    }
    var dispDay = 1;
    var fiveDayCall =
      'https://api.openweathermap.org/data/2.5/forecast?q=' +
      userInput +
      '&APPID=' +
      myKey;

    // API Call
    $.ajax({
      url: sevenDayCall,
      method: 'GET'
    }).then(function(response) {
      var listArray = response.list;
      listArray.forEach(element => {
        var yearDateTime = element.dt_txt;

        var currentDate = yearDateTime.split(' ')[0];
        var currentTime = yearDateTime.split(' ')[1];

        if (currentTime === '15:00:00') {
          var day = currentDate.split('-')[2];
          var month = currentDate.split('-')[1];
          var year = currentDate.split('-')[0];
          $('#day-' + dispDay)
            .children('.displayDate')
            .html(`${month}/${day}/${year}`);
          $('#day-' + dispDay)
            .children('#iconDaily')
            .attr(
              'src',
              'http://openweathermap.org/img/w/' +
                element.weather[0].icon +
                '.png'
            );
          $('#day-' + dispDay)
            .children('#tempDaily')
            .html(
              `Temperature: ${parseInt(
                (element.main.temp - 273.15) * 1.8 + 32
              )}°F`
            );
          $('#day-' + dispDay)
            .children('#humid-5days')
            .html(`Humidity: ${element.main.humidity}% `);
          dispDay++;
        }
      });
    });
  }

  var ul = $('#searchedList');
  var itemsArray = localStorage.getItem('items')
    ? JSON.parse(localStorage.getItem('items'))
    : [];
  var data = JSON.parse(localStorage.getItem('items'));

  let liMaker = text => {
    let li = $('<li>').addClass('createdCity btn btn-light');
    li.text(text);
    ul.prepend(li);
  };

  $('#btn-searchCity').click(function() {
    itemsArray.push(userInput);
    localStorage.setItem('items', JSON.stringify(itemsArray));
    liMaker(userInput);
  });

  data.forEach(item => {
    liMaker(item);
    // console.log(item);
  });

  $('.btn-clear').on('click', function() {
    $('.createdCity').remove();
    localStorage.clear();
    $('input').empty();
  });
});

