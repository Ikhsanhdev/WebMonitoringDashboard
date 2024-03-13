// Inisialisasi peta
var maps = L.map('maps').setView([-2.81921, 118.707], 5);

// Tambahkan tile layer OSM
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(maps);
