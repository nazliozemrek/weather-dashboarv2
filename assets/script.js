function getWeather() {
  $("#searchbtn").click(function () {
    
    var city = $("#search").val();
    $(".list-cities").append('<li class="list-group-item bg-secondary " id="list-group-item">' + city + '</li>');
    $("#main").append(city);
    localStorage.setItem("city",city)
   

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
          var day2_icon = data.daily[0].weather[0].icon;
          var day3_icon = data.daily[1].weather[0].icon;
          var day4_icon = data.daily[2].weather[0].icon;
          var day5_icon = data.daily[3].weather[0].icon;
          var day6_icon = data.daily[4].weather[0].icon;
          var iconUrl = "http://openweathermap.org/img/w/" + weather_current_icon + ".png";
          var iconurl1 = "http://openweathermap.org/img/w/" + day2_icon + ".png";
          var iconurl2 = "http://openweathermap.org/img/w/" + day3_icon + ".png";
          var iconurl3 = "http://openweathermap.org/img/w/" + day4_icon + ".png";
          var iconurl4 = "http://openweathermap.org/img/w/" + day5_icon + ".png";
          var iconurl5 = "http://openweathermap.org/img/w/" + day6_icon + ".png";
          
          var i;
          
          var new_day = [];
          var new_temp = [];
          var new_humid = [];
          var new_wind =[];
            
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
            new_day.push(days);
            new_temp.push(nextTemp);
            new_humid.push(nextHumid);
            new_wind.push(nextWind);   
          }
          
          
 
          $("#temp").append(temp_current + " °F");
          $("#wind").append(wind_current + " MPH");
          $("#humidity").append(humidty_current + ' %');
          $("#uvi").append(uvi_current);
          $("#name_city").append(city);
          $("#wicon").attr('src',iconUrl);
          $("#wicon1").attr('src',iconurl1);
          $("#wicon2").attr('src',iconurl2);
          $("#wicon3").attr('src',iconurl3);
          $("#wicon4").attr('src',iconurl4);
          $("#wicon5").attr('src',iconurl5);

          $("#day1").append(new_day[0]);
          $("#day2").append(new_day[1]);
          $("#day3").append(new_day[2]);
          $("#day4").append(new_day[3]);
          $("#day5").append(new_day[4]);
          $("#day6").append(new_day[5]);
          $("#t1").append(new_temp[1]+ " °F");
          $("#h1").append(new_humid[1]+"MPH");
          $("#w1").append(new_wind[1]+ ' %');
          $("#t2").append(new_temp[2]+ " °F");
          $("#h2").append(new_humid[2]+"MPH");
          $("#w2").append(new_wind[2]+ ' %');
          $("#t3").append(new_temp[3]+ " °F");
          $("#h3").append(new_humid[3]+"MPH");
          $("#w3").append(new_wind[3]+ ' %');
          $("#t4").append(new_temp[4]+ " °F");
          $("#h4").append(new_humid[4]+"MPH");
          $("#w4").append(new_wind[4]+ ' %');
          $("#t5").append(new_temp[5]+ " °F");
          $("#h5").append(new_humid[5]+"MPH");
          $("#w5").append(new_wind[5]+ ' %');
         

        })
      })
  })

}



getWeather();
