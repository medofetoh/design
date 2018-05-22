 // Mohamed Hassan



var _location = {
    latitude: null,
    longitude: null,
    city: null,
    country: null,
    map: null,
};


//date time -----------------
const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
$(function () {
    var date = new Date();
    document.getElementById('dvdateTime').innerHTML = dayNames[date.getDay()] + ', ' + date.getDate() + ' ' + monthNames[date.getMonth()]  + ', ' + date.getFullYear();
});


//location ----------------
$(function () {
    //localStorage.clear('_location');
    if (/*localStorage.getItem('_location') == null*/true) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                _location.latitude = position.coords.latitude;
                _location.longitude = position.coords.longitude;
                _location.map = "https://maps.googleapis.com/maps/api/staticmap?center=" + _location.latitude + "," + _location.longitude + "&zoom=14&size=400x300&key=AIzaSyBu-916DdpKAjTmJNIgngS6HL_kDIKU0aU";

                //set data to location html
                document.getElementById("location_map").innerHTML = "<img src='" + _location.map + "' class='location-map'>";

                //set location data to local storage
                localStorage.setItem('_location', JSON.stringify(_location));

                //call weather api
                WEATHER_API();
            });
        } else {
            document.getElementById('location').innerHTML = "Geolocation is not supported by this browser.";
        }
    } else {
        //get location data from local storage :)
        _location = JSON.parse(localStorage.getItem('_location'));

        //set data to location html
        //document.getElementById('latitude').innerHTML = _location.latitude;
        //document.getElementById('longitude').innerHTML = _location.longitude;
        document.getElementById("location_map").innerHTML = "<img src='" + _location.map + "' class='location-map'>";

         //call weather api
         WEATHER_API();
    }

});