// Inisialisasi peta
// var maps = L.map('maps').setView([-1.558, 118.707], 5);

// Tambahkan tile layer OSM
// L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
//   attribution: '&copy; <a href="http://higertech.com">Higertech</a>',
// }).addTo(maps);

//new google map api


function initMap() {
  console.log('adasdasd');
  var initialLocation = { lat: -1.558, lng: 118.707 };
  var map = new google.maps.Map(document.getElementById('maps'), {
    zoom: 5,
    center: initialLocation,
  });

  // Menambahkan marker awal
  var marker = new google.maps.Marker({
    position: initialLocation,
    map: map,
  });

  
  // Panggil fungsi untuk mendapatkan data stasiun dan menambahkan marker
  GetDataStation(map);
}

async function GetDataStation(map) {
  try {
    const response = await fetch('/Api/GetStationByOrgCode?orgCode=ORG021');

    console.log(response);
    if (response.ok) {
      const listStation = await response.json();  
      var datas = JSON.parse ( listStation);

      let stations = datas.data;  

      
      // Loop melalui data stasiun untuk menambahkan marker ke peta
      stations.forEach(station => {
        var position = { lat: station.latitude, lng: station.longitude };
        var marker = new google.maps.Marker({
          position: position,
          map: map,
          title: station.name, // Memberi nama pada marker
        });

        // Optional: Tambahkan InfoWindow untuk menampilkan informasi lebih lanjut saat marker diklik
        var infoWindow = new google.maps.InfoWindow({
          content: `<h3>${station.name}</h3><p>${station.description}</p>`,
        });

        marker.addListener('click', function() {
          infoWindow.open(map, marker);
        });
      });

    } else {
    console.log("asuuu");

      console.error(`Error: ${response.status} - ${response.statusText}`);
    }
  } catch (error) {
    console.error('Error: ', error);
  }
}

// Tambahkan legend di sini
var legendDiv = document.createElement('div');
legendDiv.innerHTML = `
  <div style="background-color: white; padding: 10px;">
    <div style="display: flex; align-items: center;">
      <img src="/assets/img/duga.png" style="width: 20px; height: 25px; margin-right: 5px; border-radius: 50%;">
      <div style="font-weight: bold;">Pos Duga Air (PDA/AWLR)</div>
    </div>
    <div style="display: flex; align-items: center;">
      <img src="/assets/img/curah.png" style="width: 20px; height: 25px; margin-right: 5px; border-radius: 50%;">
      <div style="font-weight: bold;">Pos Curah Hujan (PCH/ARR)</div>
    </div>
    <div style="display: flex; align-items: center;">
      <img src="/assets/img/awlr.png" style="width: 20px; height: 25px; margin-right: 5px; border-radius: 50%;">
      <div style="font-weight: bold;">Pos PDA & PCH</div>
    </div>
    <div style="display: flex; align-items: center;">
      <img src="/assets/img/klimatologi.png" style="width: 20px; height: 25px; margin-right: 5px; border-radius: 50%;">
      <div style="font-weight: bold;">Pos Klimatologi (AWS)</div>
    </div>
  </div>
`;

map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(legendDiv);
