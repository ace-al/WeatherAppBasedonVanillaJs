function getWeatherData(city) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      parseWeather(this.responseXML);
    } else if (this.readyState == 4 && this.status == 404) {
      alert(
        "Error with Request, Please Enter a Valid City"
      );
    }
  };
  xhttp.open(
    "GET",
      'http://api.openweathermap.org/data/2.5/forecast?q='+city+'&mode=xml&units=metric&appid=e8634d1d07ae42cd0d64f21bee74922a',
      true
  );
  xhttp.send();
}

function parseWeather(xml) {

  let allTimes = xml.getElementsByTagName("time");
  document.getElementById("5dayForecast").innerHTML = "";
  for (let i = 0; i < allTimes.length; i += 8) {
    let time = new Date(allTimes[i].attributes[0].nodeValue);
    let foreType = allTimes[i].children[0].attributes[1].nodeValue;
    let foreDayNight = allTimes[i].children[0].attributes[2].nodeValue;

    let forecaseObj =
      '<div class="for-5-obj">' +
      (i == 0 ? "Today" : time.toDateString().split(" ")[0]) +
      "<br>" +
      time.toDateString().split(" ")[1] +
      " " +
      time.toDateString().split(" ")[2] +
      "<br>" +
      '<img src="http://openweathermap.org/img/w/'+ allTimes[i].children[0].attributes[2].nodeValue + '.png" width="50%" height="50%"/>'+
      "<br />" +
      foreType +
      "</div>";
    document.getElementById("5dayForecast").innerHTML += forecaseObj;
  }

  document.getElementsByClassName("card-normal")[0].style.display = "block";
  GetChartData(xml);
}

function GetChartData(xml) {
  let allTimes = xml.getElementsByTagName("time");
  let labels = [];
  let mins = [];
  let maxs = [];
  for (let i = 0; i < allTimes.length; i++) {
    let period = allTimes[i];
    let time = new Date(allTimes[i].attributes[0].nodeValue);
    labels.push(
      time.toUTCString().split(" ")[1] +
        " " +
        time.toUTCString().split(" ")[2] +
        " " +
        time
          .toUTCString()
          .split(" ")[4]
          .split(":")[0] +
        ":" +
        time
          .toUTCString()
          .split(" ")[4]
          .split(":")[1]
    );

    mins.push(parseFloat(allTimes[i].children[4].attributes[2].nodeValue));
    maxs.push(parseFloat(allTimes[i].children[4].attributes[3].nodeValue));
  }
  generateGraph(labels, mins, maxs);
}

function getWeatherFromUser() {
  getWeatherData(document.getElementById("cityInp").value);
}
