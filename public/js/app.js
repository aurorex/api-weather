$(document).ready(function() {
  // Variables de ubicación, temperatura y tiempos
  var lat;
  var lon;
  var tempInF;
  var tempInC;
  var timeFormatted;
  function locateYou() {
  // Obtener automáticamente ubicación de usuarios con dirección IP
    var ipApiCall = 'https://ipapi.co/json';
    $.getJSON(ipApiCall, function(ipData) {
      lat = ipData.latitude;
      lon = ipData.longitude;
      // console.log(lat+" "+lon+"ip");
      yourAddress();
      getWeather();
    });

    // Obtener ubicación del navegador
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        lat = position.coords.latitude;
        lon = position.coords.longitude;
        // console.log(lat+" "+lon+"geo");
        yourAddress();
        getWeather();
      });
    }
  }

  // Obtener dirección de Google Map después de obtener latitud y longitud
  function yourAddress() {
    var googleApiCall = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + lon;
    $.getJSON(googleApiCall, function(locationName) {
      $('.locName').html(locationName.results[2].formatted_address);
      // console.log(locationName.results[2].formatted_address); (precisión)
    });
  }

  function getWeather() {
  // Revisar el clima de API Darkskies con la latitud y longitud de usuario
    var weatherApiKey = 'bfb97796a5bb08eff53b85624593a6fa';
    var weatherApiCall = 'https://api.darksky.net/forecast/' + weatherApiKey + '/' + lat + ',' + lon + '?units=si';
    $.ajax({
      url: weatherApiCall,
      type: 'GET',
      dataType: 'jsonp',
      success: function(weatherData) {
      // Obtener toda la info de JSON y añadirla a HTML
        $('.currentTemp').html((weatherData.currently.temperature).toFixed(1));
        $('.weatherCondition').html(weatherData.currently.summary);
        $('.feelsLike').html((weatherData.currently.apparentTemperature).toFixed(1) + ' °C');
        $('.humidity').html((weatherData.currently.humidity * 100).toFixed(0));
        $('.windSpeed').html((weatherData.currently.windSpeed / 0.6213).toFixed(1));

        $('.todaySummary').html(weatherData.hourly.summary);
        $('.tempMin').html((weatherData.daily.data[0].temperatureMin).toFixed(1) + ' °C');
        $('.tempMax').html((weatherData.daily.data[0].temperatureMax).toFixed(1) + ' °C');

        $('.cloudCover').text((weatherData.currently.cloudCover * 100).toFixed(1) + ' %');
        $('.dewPoint').text(weatherData.currently.dewPoint + ' °F');

        // // Converting UNIX time
        // unixToTime(weatherData.daily.data[0].sunriseTime);
        // var sunriseTimeFormatted = timeFormatted + ' AM';
        // $('.sunriseTime').text(sunriseTimeFormatted);
        //
        // unixToTime(weatherData.daily.data[0].sunsetTime);
        // var sunsetTimeFormatted = timeFormatted + ' PM';
        // $('.sunsetTime').text(sunsetTimeFormatted);

        // Cargar info de pronóstico semanal en HTML
        $('.weekDaysSummary').text(weatherData.daily.summary);
        var skycons = new Skycons({'color': 'white'});

        for (i = 1; i < 7; i++) {
          $('.weekDayTempMax' + i).text(weatherData.daily.data[i].temperatureMax);
          $('.weekDayTempMin' + i).text(weatherData.daily.data[i].temperatureMin);
          $('.weekDaySunrise' + i).text(unixToTime(weatherData.daily.data[i].sunriseTime));
          $('.weekDaySunset' + i).text(unixToTime(weatherData.daily.data[i].sunsetTime));
          $('.weekDayName' + i).text(unixToWeekday(weatherData.daily.data[i].time));
          $('.weekDaySummary' + i).text(weatherData.daily.data[i].summary);
          $('.weekDayWind' + i).text((weatherData.daily.data[i].windSpeed / 0.6213).toFixed(2));
          $('.weekDayHumid' + i).text((weatherData.daily.data[i].humidity * 100).toFixed(0));
          $('.weekDayCloud' + i).text((weatherData.daily.data[i].cloudCover * 100).toFixed(0));
          skycons.set('weatherIcon' + i, weatherData.daily.data[i].icon);
        }

        // Íconos de Skycon
        skycons.set('weatherIcon', weatherData.currently.icon);
        skycons.set('expectIcon', weatherData.hourly.icon);
        skycons.play();

        // Covertir entre Celcius y Farenheight
        tempInF = ((weatherData.currently.temperature * 9 / 5) + 32).toFixed(1);
        tempInC = (weatherData.currently.temperature).toFixed(1);
        feelsLikeInC = 	(weatherData.currently.apparentTemperature).toFixed(1);
        feelsLikeInF = ((weatherData.currently.apparentTemperature * 9 / 5) + 32).toFixed(1);
      }
    });
  }
  // Llama de función para ubicar al usuario y obtener data
  locateYou();

  // Función para convertir el tiempo UNIX a tiempo local
  function unixToTime(unix) {
    unix *= 1000;
    var toTime = new Date(unix);
    var hour = ((toTime.getHours() % 12 || 12) < 10 ? '0' : '') + (toTime.getHours() % 12 || 12);
    var minute = (toTime.getMinutes() < 10 ? '0' : '') + toTime.getMinutes();
    timeFormatted = hour + ':' + minute;
    return timeFormatted;
  }

  function unixToWeekday(unix) {
    unix *= 1000;
    var toWeekday = new Date(unix);
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var weekday = days[toWeekday.getDay()];
    return weekday;
  }

  //
  $('.convertToggle').on('click', function() {
    $('.toggleIcon').toggleClass('ion-toggle-filled');
    var tmpNow = $('.currentTemp');
    var unit = $('.unit');
    var feelsLike = $('.feelsLike');

    if (tmpNow.text() == tempInC) {
      tmpNow.text(tempInF);
      unit.text('°F');
      feelsLike.text(feelsLikeInF + ' °F');
    } else {
      tmpNow.text(tempInC);
      unit.text('°C');
      feelsLike.text(feelsLikeInC + ' °C');
    }
  });

  // Búsqueda de ubicación de Google
  function initialize() {
    var input = document.getElementById('locSearchBox');
    var autocomplete = new google.maps.places.Autocomplete(input);
    google.maps.event.addListener(autocomplete, 'place_changed', function() {
      var place = autocomplete.getPlace();
      lat = place.geometry.location.lat();
      lon = place.geometry.location.lng();
      $('.locName').html(place.formatted_address);
      // Llamado de función getWeather para obtener data para el lugar buscado
      getWeather();
    	});
  }
  google.maps.event.addDomListener(window, 'load', initialize);

  // Inicializar wow.js
  new WOW().init();
});
