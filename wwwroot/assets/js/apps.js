// Inisialisasi peta
var maps = L.map('maps').setView([-1.399, 118.707], 5);

// Tambahkan tile layer OSM
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://higertech.com">Higertech</a>',
}).addTo(maps);
