function getDataFromApi(searchTerm, callback) {
  var settings = {
    url: 'http://maps.google.com/maps/api/geocode/json',
    data: {
      address: searchTerm,
      sensor: "true"
    },
    dataType: 'json',
    type: 'GET',
    success: callback,
    error: badData
  };
  $.ajax(settings);
}

function badData(err) {
  console.log(err);
}

function displayData(data) {
  var resultElement = '';
  var mapOutput = '';
  console.log(data.results[0])
  var address = data.results[0].formatted_address
  console.log(data.results[0].address_components)
  console.log(data.results[0].geometry.location.lat)
  lat = data.results[0].geometry.location.lat
  lng = data.results[0].geometry.location.lng


  resultElement += `<div class="output">
    <div class="result-label">
      address:
    </div>
    <div class="result-proper">
      ${address}
    </div>
    </div>`;

  resultElement += `<div class="output">
    <div class="result-label">
      latitude:
    </div>
    <div class="result-proper">
      ${lat}
    </div>
    </div>`;
  resultElement += `<div class="output">
    <div class="result-label">
      longitude:
    </div>
    <div class="result-proper">
      ${lng}
    </div>
    </div>`;


  mapOutput += `<iframe width="600" height="500" frameborder="0" scrolling="no" marginheight="0"
  src="https://maps.google.com/maps?q=${address}, &t=&z=14&ie=UTF8&iwloc=&output=embed" marginwidth="0">
  </iframe>`;
  $('.js-search-results').html(resultElement);
  $('#gmap_canvas').html(mapOutput);

}

$(document).on('submit','form', (e)=>{
    e.preventDefault();
    const userInput = $('.js-query').val()
    getDataFromApi(userInput, displayData)
  })
