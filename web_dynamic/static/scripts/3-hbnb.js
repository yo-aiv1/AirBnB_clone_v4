document.addEventListener('DOMContentLoaded', function () {
    // Send POST request to API
    fetch('http://0.0.0.0:5001/api/v1/places_search/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
    })
    .then(response => response.json())
    .then(data => {
        // Loop through places data and create article tags
        const placesSection = document.querySelector('.places');
        data.forEach(place => {
            const article = document.createElement('article');
            article.innerHTML = `
                <div class="title_box">
                    <h2>${place.name}</h2>
                    <div class="price_by_night">$${place.price_by_night}</div>
                </div>
                <div class="information">
                    <div class="max_guest">${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}</div>
                    <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}</div>
                    <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}</div>
                </div>
                <div class="description">
                    ${place.description}
                </div>
            `;
            placesSection.appendChild(article);
        });
    })
    .catch(error => {
        console.error('Error fetching places:', error);
    });
});
