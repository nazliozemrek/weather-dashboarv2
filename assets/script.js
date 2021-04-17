function getWeather() {
  $("#searchbtn").click(function () {

    var city = $("#search").val();
    $(".list-cities").append('<li class="list-group-item bg-secondary " id="list-group-item">' + city + '</li>');
    

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=5eb2283c45fd1aa94d90b63b098aac2b`
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (response) {
        var lon = response.coord.lon;
        var lat = response.coord.lat;
        return fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=5eb2283c45fd1aa94d90b63b098aac2b`)
      }).then(function (response) {
        response.json().then(function (data) {
          console.log(data)
          var temp_current = data.current.temp;
          console.log(temp_current)
          var wind_current = data.current.wind_speed;
          console.log(wind_current)
          var humidty_current = data.current.humidity;
          console.log(humidty_current)
          var uvi_current = data.current.uvi;
          console.log(uvi_current)
          var weather_current_icon = data.current.weather[0].icon;
          var iconUrl = "http://openweathermap.org/img/w/" + weather_current_icon + ".png";
          console.log(weather_current_icon);  
          var i;
          
          var new_day = [];
          var new_temp = [];
          var new_humid = [];
          var new_wind =[];
          var new_icon =[];
            
          for ( i=0; i < 6 ; i ++) {
            var nextDat = (data.daily[i].dt) * 1000 ;
            
            var nextDay = new Date(nextDat)
            var dd = nextDay.getDate();
            var mm = nextDay.getMonth()+1;
            var yy = nextDay.getFullYear();
            var days = "(" + mm + "/" + dd + "/" + yy +")";
            var nextTemp = data.daily[i].temp.max;
            var nextHumid = data.daily[i].humidity;
            var nextWind = data.daily[i].wind_speed;
            var nextIcon = data.daily.weather[i].icon;
            new_day.push(days);
            new_temp.push(nextTemp);
            new_humid.push(nextHumid);
            new_wind.push(nextWind);    
          }
 
          $("#temp").append(temp_current + "°");
          $("#wind").append(wind_current);
          $("#humidity").append(humidty_current + '%');
          $("#uvi").append(uvi_current);
          $("#name_city").append(city);
          $("#wicon").attr('src',iconUrl);
          $("#day1").append(new_day[0]);
          $("#day2").append(new_day[1]);
          $("#day3").append(new_day[2]);
          $("#day4").append(new_day[3]);
          $("#day5").append(new_day[4]);
          $("#day6").append(new_day[5]);
          $("#t1").append(new_temp[1]);
          $("#h1").append(new_humid[1]);
          $("#w1").append(new_wind[1]);
          $("#t2").append(new_temp[2]);
          $("#h2").append(new_humid[2]);
          $("#w2").append(new_wind[2]);
          $("#t3").append(new_temp[3]);
          $("#h3").append(new_humid[3]);
          $("#w3").append(new_wind[3]);
          $("#t4").append(new_temp[4]);
          $("#h4").append(new_humid[4]);
          $("#w4").append(new_wind[4]);
          $("#t5").append(new_temp[5]);
          $("#h5").append(new_humid[5]);
          $("#w5").append(new_wind[5]);
         

        })
      })
  })

}


getWeather();
