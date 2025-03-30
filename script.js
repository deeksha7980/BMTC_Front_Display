const buttons = document.querySelectorAll('.location-btn');
const busLocation = document.getElementById('bus-location');

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const location = button.dataset.location;
        busLocation.textContent = location;

        // Send data to the server
        fetch('/update-location', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ location })
        });
    });
});

// Listen for real-time updates
const eventSource = new EventSource('/events');
eventSource.onmessage = function(event) {
    busLocation.textContent = event.data;
};
