var latitude;
var longitude;
var queryURL = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=AIzaSyA8I6EN5t_ORE9DYQpOo6-LVpXfAeCp3SE&location=' + latitude + ',' + longitude + '&radius=10000&type=restaurants';




function success(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    console.log(latitude)
    console.log(longitude)
    runMapsApi(latitude, longitude);
}
// need to add prompt for user to input location and find an API or method to search the user's input
function error() {
      const status = document.querySelector('#status');
    status.textContent = 'Unable to retrieve your location';
  }

  if(!navigator.geolocation) {
    status.textContent = 'Geolocation is not supported by your browser';
  } else {
    status.textContent = 'Locating…';
    navigator.geolocation.getCurrentPosition(success, error);
  }


function runMapsApi (latitude, longitude) {
    
    queryURLPlace = 'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=AIzaSyA8I6EN5t_ORE9DYQpOo6-LVpXfAeCp3SE&location=' + latitude + ',' + longitude + '&radius=10000&type=restaurants';


// fetch(queryURLPlace).then(data => {
//     return data.json()
// }).then(jsonData => {
//     console.log(jsonData.results)
// }).catch(error => {
//     console.log(error);
// })
fetch(queryURLPlace, {headers : {'mode': 'no-cors', 'Access-Control-Allow-Origin' : '*'}})
.then(function (response) {
    // console.log (response);
    return response.json();
})
.then(function (data) {
    console.log(data.results)


var photoRef = data.results[1].photos[0].photo_reference;
console.log(photoRef)
var photoURL = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=" + photoRef + "&key=AIzaSyA8I6EN5t_ORE9DYQpOo6-LVpXfAeCp3SE";

fetch(photoURL)
.then(function (response) {
    // console.log (response);
    return response.json();
})
.then(function (data) {
    console.log(data.results)
});

})
}

// spinner function for the number of restaurants
$(function() {
  $( "#spinner-1" ).spinner({min:1, max:10});
});


