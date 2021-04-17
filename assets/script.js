function getWeather () {
  $("#searchbtn").click(function(){
    
    var city = $("#search").val();
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    
    today = '(' + mm + '/' + dd + '/' + yyyy + ')';
    console.log(today);

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=5eb2283c45fd1aa94d90b63b098aac2b`
)
     .then(function(response) {
      return response.json();
    })
    .then(function(response) {
      var lon = response.coord.lon;
      var lat = response.coord.lat;
      console.log(lat)
      console.log(lon)
      var weather =response.weather[0].main;
      console.log(weather);
    return fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=5eb2283c45fd1aa94d90b63b098aac2b`)
    }).then(function(response){
      response.json().then(function(data){
        console.log(data)
        var temp_current = data.current.temp;
        console.log(temp_current)
        var wind_current = data.current.wind_speed;
        console.log(wind_current)
        var humidty_current = data.current.humidity;
        console.log(humidty_current)
        var uvi_current = data.current.uvi;
        console.log(uvi_current)
        $("#temp").append(temp_current);
        $("#wind").append(wind_current);
        $("#humidity").append(humidty_current);
        $("#uvi").append(uvi_current);
        $("#name_city").append(city);
        $("#date").append(today);

        
      })
    })
})

}

  
getWeather();