$('.filters button').click(function () {
    var amenities = [];
    document.querySelectorAll('.amenities input:checked').forEach(function (checkbox) {
        amenities.push(checkbox.dataset.id);
    });

    fetch('http://0.0.0.0:5001/api/v1/places_search/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ amenities: amenities })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        const placesSection = document.querySelector('section.places');
        placesSection.innerHTML = '<h1>Places</h1>';

        data.forEach(place => {
            const template = `<article>
                <div class="title">
                    <h2>${place.name}</h2>
                    <div class="price_by_night">
                        $${place.price_by_night}
                    </div>
                </div>
                <div class="information">
                    <div class="max_guest">
                        <i class="fa fa-users fa-3x" aria-hidden="true"></i>
                        <br />
                        ${place.max_guest} Guests
                    </div>
                    <div class="number_rooms">
                        <i class="fa fa-bed fa-3x" aria-hidden="true"></i>
                        <br />
                        ${place.number_rooms} Bedrooms
                    </div>
                    <div class="number_bathrooms">
                        <i class="fa fa-bath fa-3x" aria-hidden="true"></i>
                        <br />
                        ${place.number_bathrooms} Bathroom
                    </div>
                </div>
                <div class="description">
                    ${place.description}
                </div>
            </article>`;
            placesSection.insertAdjacentHTML('beforeend', template);
        });
    })
    .catch(error => {
        console.error('Error fetching places:', error);
    });
});

