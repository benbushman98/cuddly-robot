var queryURL = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=AIzaSyA8I6EN5t_ORE9DYQpOo6-LVpXfAeCp3SE&location=40.391617,-111.850769&radius=10000&type=restaurant';

fetch(queryURL).then(data=> {
  return data.json()
}).then(jsonData => {
 console.log(jsonData.results)
}).catch(error=> {
  console.log(error);
}) 

