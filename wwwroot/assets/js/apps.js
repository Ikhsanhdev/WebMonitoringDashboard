var maps = L.map('map').setView([-6.89921, 107.711404], 13);

// Tambahkan tile layer OSM
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(maps);