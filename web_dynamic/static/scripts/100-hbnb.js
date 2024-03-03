$(document).ready(function () {
  let checkedAmenities = {};
  let checkedStates = {};
  let checkedCities = {};
  let checkedLocations = {};

  $(document).on('change', ".amenities > .popover > li > input[type='checkbox']", function () {
    if (this.checked) {
      checkedAmenities[$(this).data('id')] = $(this).data('name');
    } else {
      delete checkedAmenities[$(this).data('id')];
    }
    updateFilterDisplay('amenities', checkedAmenities);
  });

  $(document).on('change', ".locations > .popover > li > input[type='checkbox']", function () {
    if (this.checked) {
      checkedStates[$(this).data('id')] = $(this).data('name');
      checkedLocations[$(this).data('id')] = $(this).data('name');
    } else {
      delete checkedStates[$(this).data('id')];
      delete checkedLocations[$(this).data('id')];
    }
    updateFilterDisplay('locations', checkedLocations);
  });

  $(document).on('change', ".locations > .popover > li > ul > li > input[type='checkbox']", function () {
    if (this.checked) {
      checkedCities[$(this).data('id')] = $(this).data('name');
      checkedLocations[$(this).data('id')] = $(this).data('name');
    } else {
      delete checkedCities[$(this).data('id')];
      delete checkedLocations[$(this).data('id')];
    }
    updateFilterDisplay('locations', checkedLocations);
  });

  function updateFilterDisplay(filterType, checkedItems) {
    let itemList = Object.values(checkedItems);
    if (itemList.length > 0) {
      $(`div.${filterType} > h4`).text(itemList.join(', '));
    } else {
      $(`div.${filterType} > h4`).html('&nbsp;');
    }
  }

  $.get('http://0.0.0.0:5001/api/v1/status/', function (data, textStatus) {
    if (textStatus === 'success') {
      if (data.status === 'OK') {
        $('#api_status').addClass('available');
      } else {
        $('#api_status').removeClass('available');
      }
    }
  });

  $.ajax({
    type: 'POST',
    url: 'http://0.0.0.0:5001/api/v1/places_search',
    data: JSON.stringify({}),
    dataType: 'json',
    contentType: 'application/json',
    success: function (data) {
      updatePlaces(data);
    }
  });

  $('.filters > button').click(function () {
    $('.places > article').remove();
    $.ajax({
      type: 'POST',
      url: 'http://0.0.0.0:5001/api/v1/places_search',
      data: JSON.stringify({'amenities': Object.keys(checkedAmenities), 'states': Object.keys(checkedStates), 'cities': Object.keys(checkedCities)}),
      dataType: 'json',
      contentType: 'application/json',
      success: function (data) {
        updatePlaces(data);
      }
    });
  });

  function updatePlaces(data) {
    for (let i = 0; i < data.length; i++) {
      let place = data[i];
      $('.places').append(
	      `<article>
	      <h2>${place.name}</h2>
	      <div class="price_by_night">
	      <p>$${place.price_by_night}</p>
	      </div>
		   <div class="information">
		     <div class="max_guest">
		      <div class="guest_image">
	      </div>
		<p>${place.max_guest}</p>
	      </div><div class="number_rooms">
	      <div class="bed_image">
	      </div>
	      <p>${place.number_rooms}</p>
	      </div><div class="number_bathrooms">
	      <div class="bath_image">
	      </div>
	      <p>${place.number_bathrooms}</p>
	      </div></div><div class="description">
	      <p>${place.description}</p>
	      </div>
	      </article>`);
    }
  }
});

