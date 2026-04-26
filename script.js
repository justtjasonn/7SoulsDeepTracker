// 1. Initialize the Map
const map = L.map('map').setView([22.2863, 114.1481], 16);

// Add touch support for mobile
map.touchZoom.enable();
map.doubleClickZoom.enable();
map.scrollWheelZoom.enable();

// Disable dragging on mobile for better scrolling experience
if (L.Browser.mobile) {
    map.dragging.disable();
}

// 2. Add Minimal Map Tiles (No Labels)
L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png', {
    attribution: '© CARTO'
}).addTo(map);

// 3. Your Curated List of Spots
const graffitiSpots = [
    {
        name: "Queen's Road West Soul",
        lat: 22.2863,
        lng: 114.1481,
        imageUrl: "images/soul1.png", // Replace with your actual image path
        googleMapsUrl: "https://www.google.com/maps/place/115-119+Queen's+Road+W,+Sheung+Wan,+Hong+Kong",
        description: "Located near 115-119 Queen's Road W."
    },
    {
        name: "Golden Dragon tag",
        lat: 22.276056,
        lng: 114.180389,
        imageUrl: "images/soul2.PNG", // Replace with your actual image path
        googleMapsUrl: "https://www.google.com/maps/place/22%C2%B016'33.8%22N+114%C2%B010'49.4%22E/@22.2760401,114.1800784,20z/data=!4m4!3m3!8m2!3d22.276058!4d114.180382?entry=ttu&g_ep=EgoyMDI2MDQyMi4wIKXMDSoASAFQAw%3D%3D",
        description: "A tag near the golden dragon statue in causeway bay."
    }
];

// 4. Loop through the spots and add markers
graffitiSpots.forEach(spot => {
    const marker = L.marker([spot.lat, spot.lng]).addTo(map);
    
    // Create the content for the popup
    const content = `
        <div class="popup-content">
            <h3 class="popup_title">${spot.name}</h3>
            <img src="${spot.imageUrl}" alt="Graffiti" class="popup_image">
            <p class="popup_description">${spot.description}</p>
            <a href="${spot.googleMapsUrl}" target="_blank" rel="noopener noreferrer" style="color: #007bff;">
                <svg class="map_icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z"/>
                </svg>
            </a>
        </div>
    `;
    
    marker.bindPopup(content);
});

function copyEmail() {
    const email = "leej70@kgv.hk";
    
    // Copy to clipboard
    navigator.clipboard.writeText(email).then(() => {
        const tooltip = document.getElementById("email_tooltip");
        
        // Show tooltip
        tooltip.classList.add("show");
        
        // Hide it after 2 seconds
        setTimeout(() => {
            tooltip.classList.remove("show");
        }, 2000);
    }).catch(err => {
        // Fallback for older browsers or when clipboard API fails
        console.error('Failed to copy email:', err);
        alert('Email: ' + email);
    });
}

const infoButton = document.getElementById('info');
if (infoButton) {
    // Handle click events
    infoButton.addEventListener('click', (event) => {
        event.stopPropagation();
        infoButton.classList.toggle('open');
    });

    // Handle touch events for better mobile support
    infoButton.addEventListener('touchend', (event) => {
        event.preventDefault();
        event.stopPropagation();
        infoButton.classList.toggle('open');
    });

    // Close when clicking elsewhere
    document.addEventListener('click', () => {
        infoButton.classList.remove('open');
    });

    document.addEventListener('touchend', () => {
        infoButton.classList.remove('open');
    });
}
