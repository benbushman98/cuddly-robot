

// Button click after values are added
$('#getit').click(function showMyLocation() {
    var city = $('#city').val();
    var state = $('#state').val();
    if (city === "" || state === "") {
        alert("Needs City and State");
    } else {
        cityUrlFunc();
    }
})
// End Button click after values are added

// Function for getting lat and lon
function cityUrlFunc() {
    var city = $('#city').val();
    var state = $('#state').val();
    var cityURL = 'https://api.openweathermap.org/geo/1.0/direct?q=' + city + ',' + state + ',usa&limit=1&appid=9c2f191921ea4a448012e7d41b8872c0';

    fetch(cityURL)
        .then(function (response) {
            // console.log (response);
            return response.json();
        })
        .then(function (data) {
            console.log(data)
            var latitude = (data[0].lat);
            var longitude = (data[0].lon);
            runMapsApi(latitude, longitude);
        })
}
// End Function for getting lat and lon

// Google Maps function for getting restaurants in the area
function runMapsApi(latitude, longitude) {

    var queryURLPlace = 'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=AIzaSyA8I6EN5t_ORE9DYQpOo6-LVpXfAeCp3SE&location=' + latitude + ',' + longitude + '&radius=10000&type=restaurant';

    fetch(queryURLPlace)
        .then(function (response) {
            // console.log (response);
            return response.json();
        })
        .then(function (data) {
            // console.log(data.results);
            $('#cardcontainer').empty();
            var number = ($('#spinner-1').val());
            // console.log(number)
            for (var i = 0; i < number; i++) {
                if (data.results[i].business_status !== 'OPERATIONAL') {
                    number++
                } else {
                    var cardTitle = (data.results[i].name);
                    var cardPrice = (data.results[i].price_level);
                    var photoRef = (data.results[i].photos[0].photo_reference);
                    var photoEl = $('<img />',
                        {
                            id: "img",
                            src: "https://maps.googleapis.com/maps/api/place/photo?maxwidth=300&photoreference=" + photoRef + "&key=AIzaSyA8I6EN5t_ORE9DYQpOo6-LVpXfAeCp3SE",
                            maxheight: 300
                        });
                    var cardRating = (data.results[i].rating);
                    var cardAddress = (data.results[i].vicinity + ", " + $('#state').val());
                    var cardStatus = (data.results[i]?.opening_hours?.open_now);



                    var card = $('<card />');

                    card.attr("class", "card");
                    $('#cardcontainer').append(card);

                    $(card).append('<div id="cardTitle">' + cardTitle + '</div>');
                    $(card).append('<div id="cardPrice">' + cardPrice + '</div>');
                    $(card).append('<div id="cardRating">' + cardRating + '</div>');
                    $(card).append(photoEl);
                    $(card).append('<div id="cardAddress">' + cardAddress + '</div>');
                    $(card).append('<div id="cardStatus">' + cardStatus + '</div>');

                }
            }
        })
}
// End Google Maps function for getting restaurants in the area



// Spinner function for the number of restaurants
$(function () {
    $("#spinner-1").spinner({ min: 1, max: 10 });
})
// End Spinner function for the number of restaurants

