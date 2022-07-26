var latitude;
var longitude;
var type = "restaurants"
var queryURL = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=AIzaSyA8I6EN5t_ORE9DYQpOo6-LVpXfAeCp3SE&location=' + latitude + ',' + longitude + '&radius=10000&type=' + type + '';




function success(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    console.log(latitude)
    console.log(longitude)
    runMapsApi(latitude, longitude);
}

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
    
    queryURL = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=AIzaSyA8I6EN5t_ORE9DYQpOo6-LVpXfAeCp3SE&location=' + latitude + ',' + longitude + '&radius=10000&type=' + type + '';


fetch(queryURL).then(data => {
    return data.json()
}).then(jsonData => {
    console.log(jsonData.results)
}).catch(error => {
    console.log(error);
})

}