const socket = io();

// Receive updated stop name
socket.on('displayStop', (stopName) => {
    document.getElementById('stopName').textContent = stopName;
});

// Send update when a button is clicked
function sendUpdate(stopName) {
    socket.emit('updateStop', stopName);
}

function sendUpdate(stopName) {
    document.getElementById('stopName').innerText = stopName;
}
