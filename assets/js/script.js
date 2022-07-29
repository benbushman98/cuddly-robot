

$('#cancel').click(function () {
    location.reload()
})




// Button click after values are added
$('#getit').click(function() {
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
            // console.log(data)
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
            console.log(data.results);
            $('#cardcontainer').empty();
            var number = ($('#number-of-stops').val());
            // console.log(number)

            var randomNumber = [];
            for (var a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19], i = a.length; i--; ) {
                var random = a.splice(Math.floor(Math.random() * (i + 1)), 1)[0];
                console.log(random);
                randomNumber[i] = random
            }

                for (var j = 0; j < number; j++){
               
                if (data.results[randomNumber[j]].business_status !== 'OPERATIONAL') {
                    number++

                } else {
                    var cardTitle = (data.results[randomNumber[j]].name);
                    var cardPrice = (data.results[randomNumber[j]].price_level);
                    var photoRef = (data.results[randomNumber[j]].photos[0].photo_reference);
                    var photoEl = $('<img />',
                        {
                            id: "img",
                            src: "https://maps.googleapis.com/maps/api/place/photo?maxwidth=300&photoreference=" + photoRef + "&key=AIzaSyA8I6EN5t_ORE9DYQpOo6-LVpXfAeCp3SE",
                            maxheight: 300
                        });
                    var cardRating = (data.results[randomNumber[j]].rating);
                    var cardAddress = (data.results[randomNumber[j]].vicinity + ", " + $('#state').val());
                    var cardStatus = (data.results[randomNumber[j]]?.opening_hours?.open_now);
                    if (cardPrice === undefined) {
                        cardPrice = ""
                    } else if(cardPrice === 1) {
                        cardPrice = " - $"
                    } else if (cardPrice === 2) {
                        cardPrice = " - $$"
                    } else if (cardPrice === 3) {
                        cardPrice = " - $$$"
                    } else if (cardPrice === 4) {
                        cardPrice = " - $$$$"
                    }

                    if(cardRating <= 1.4) {
                        cardRating = "⭐"
                    } else if (cardRating <= 2.4) {
                        cardRating = "⭐⭐"
                    } else if (cardRating <= 3.9) {
                        cardRating = "⭐⭐⭐"
                    } else if (cardRating <= 4.7) {
                        cardRating = "⭐⭐⭐⭐"
                    } else if (cardRating >= 4.8) {
                        cardRating = "⭐⭐⭐⭐⭐"
                    }

                    if(cardStatus === undefined) {
                        cardStatus = "Hours Unknown"
                    } else if (cardStatus === true) {
                        cardStatus = "Open"
                    } else if (cardStatus === false) {
                        cardStatus = "Closed"
                    }

                    var card = $('<card />');

                    $('#mainpage').hide()
                    $('#startover').show()
                    $('#startover').click(function () {
                        location.reload()
                    })
                    card.attr("class", "card");
                    $('#cardcontainer').append(card);

                    $(card).append('<div id="cardTitle">' + cardTitle + cardPrice + '</div>');
                    $(card).append('<div id="cardRating">' + "Rating: " + cardRating + '</div>');
                    $(card).append(photoEl);
                    $(card).append('<div id="cardAddress">' + cardAddress + '</div>');
                    $(card).append('<div id="cardStatus">' + "Status: " + cardStatus + '</div>');
                    
                }
                }
            })
        }

// End Google Maps function for getting restaurants in the area

