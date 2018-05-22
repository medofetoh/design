 // Mohamed Hassan

var WEATHER = null;
//
function WEATHER_API() {
    $.getJSON("http://api.openweathermap.org/data/2.5/forecast?lon=" + _location.longitude + "&lat=" + _location.latitude + "&APPID=a253fb6a86b5d624033234d44fecd665",
        function (json) {

            WEATHER = json;

            var cityName = WEATHER.city.name;
            document.getElementById('CityName').innerHTML = cityName + ' city';

            for (var i = 0; i < WEATHER.list.length; i++) {
                var weather_date = WEATHER.list[i].dt_txt;
                var temperature = (((Number(WEATHER.list[i].main.temp) - 32) * (5 / 9)) - 100).toString().substring(0, 5) + '°C';

                var tr = document.createElement('tr');

                var td_date = document.createElement('td');
                td_date.classList = 'text-center';
                td_date.innerHTML = weather_date;

                var td_degree = document.createElement('td');
                td_degree.classList = 'text-center';
                td_degree.innerHTML = temperature;

                tr.appendChild(td_date);
                tr.appendChild(td_degree);

                document.getElementById('tblWeatherBody').appendChild(tr);
            }

        });
}