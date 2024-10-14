function createDetailPanel(reading) {
  var photo = '/images/favicon.png';
  console.log('reading:', reading); // Log reading untuk debugging

  // Default status OFFLINE
  var statusOffline = '<small class="mdi mdi-checkbox-blank-circle text-danger"></small> OFFLINE';

  // Cek status dari setiap jenis pembacaan
  if (reading.arrLastReading && reading.arrLastReading.deviceStatus.toLowerCase() === 'online') {
    statusOffline = '<small class="mdi mdi-checkbox-blank-circle text-success"></small> ONLINE';
    console.log('Status from ARR is online');
  } else if (reading.awlrLastReading && reading.awlrLastReading.deviceStatus.toLowerCase() === 'online') {
    statusOffline = '<small class="mdi mdi-checkbox-blank-circle text-success"></small> ONLINE';
    console.log('Status from AWLR is online');
  } else if (reading.awsLastReading && reading.awsLastReading.deviceStatus.toLowerCase() === 'online') {
    statusOffline = '<small class="mdi mdi-checkbox-blank-circle text-success"></small> ONLINE';
    console.log('Status from AWS is online');
  } else if (reading.awlrArrLastReading && reading.awlrArrLastReading.deviceStatus.toLowerCase() === 'online') {
    statusOffline = '<small class="mdi mdi-checkbox-blank-circle text-success"></small> ONLINE';
    console.log('Status from AWLR ARR is online');
  } else {
    console.log('All statuses are offline');
  }

  var panelContent = '<table class="table mb-2 font-12"><tbody>';
  panelContent += '<tr>';
  panelContent += `<td class="px-0 py-2" colspan="3">
        <div class="d-flex align-items-start">
            <img class="me-2 rounded-3" src="/assets/img/pupr.jpg" width="45" height="45" alt="${reading.deviceId}">
            <div class="w-100">
                <h5 class="mt-0 mb-1 fw-semibold font-12">${reading.name}</h5>
                ${statusOffline}
            </div>
        </div>
    </td>`;
  panelContent += '</tr>';

  panelContent += '<tr>';
  panelContent += `<td class="py-1 px-0">Tipe POS</td>`;
  panelContent += `<td class="py-1 px-2">:</td>`;
  panelContent += `<td class="py-1 px-0">${reading.stationType}</td>`;
  panelContent += '</tr>';
  
  panelContent += '<tr>';
  panelContent += `<td class="py-1 px-0">Longitude</td>`;
  panelContent += `<td class="py-1 px-2">:</td>`;
  panelContent += `<td class="py-1 px-0">${reading.longitude}</td>`;
  panelContent += '</tr>';

  panelContent += '<tr>';
  panelContent += `<td class="py-1 px-0">Latitude</td>`;
  panelContent += `<td class="py-1 px-2">:</td>`;
  panelContent += `<td class="py-1 px-0">${reading.latitude}</td>`;
  panelContent += '</tr>';

  panelContent += '</tbody></table>';
  panelContent += `<div class="text-end"><a href="/Home/Detail?code=${reading.code}" target="_blank">Lihat Detail <i class="mdi mdi-arrow-right"></i></a></div>`;

  return panelContent;
}

function initMap() {
  var initialLocation = { lat: -1.558, lng: 118.707 };
  var map = new google.maps.Map(document.getElementById('maps'), {
    zoom: 5,
    center: initialLocation,
    gestureHandling: 'greedy', // Mengizinkan zoom menggunakan scroll
    mapTypeId: google.maps.MapTypeId.SATELLITE,
    mapTypeControlOptions: {
      style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
      position: google.maps.ControlPosition.BOTTOM_LEFT // Pindahkan ke bawah kiri
  }

  });

  const customMapTypeControl = new CustomMapTypeControl(map);
  // Panggil fungsi untuk mendapatkan data stasiun dan menambahkan marker
  GetDataStation(map);

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
}

let currentInfoWindow = null;

async function GetDataStation(map) {
  try {
    const response = await fetch('/Api/GetStationAll');
    if (response.ok) {
      const listStation = await response.json();
      var datas = JSON.parse(listStation);
      let stations = datas.data;

      console.log('List of Stations:', stations); // Log untuk memeriksa isi data

      // Loop melalui data stasiun untuk menambahkan marker ke peta
      stations.forEach(station => {
        // Pastikan latitude dan longitude ada
        if (!station.latitude || !station.longitude) {
          console.warn(`Station ${station.slug} is missing latitude or longitude`);
          return; // Skip marker creation
        }

        var position = { lat: station.latitude, lng: station.longitude };
        
        // Marker sesuai gambar
        var iconUrl = '';
        switch (station.stationType) {
          case 'ARR':
            iconUrl = '/assets/img/curah.png'; // Ganti dengan URL ikon PCH/ARR
            break;
          case 'AWLR':
            iconUrl = '/assets/img/duga.png'; // Ganti dengan URL ikon PDA/AWLR
            break;
          case 'AWS':
            iconUrl = '/assets/img/klimatologi.png'; // Ganti dengan URL ikon AWS
            break;
          case 'AWLR_ARR':
            iconUrl = '/assets/img/awlr.png'; // Ganti dengan URL ikon PDA & PCH
            break;
          default:
            iconUrl = '/assets/img/default.png'; // Ikon default jika tipe tidak dikenali
            break;
        }
        
        console.log('Icon URL:', iconUrl); // Log untuk memeriksa URL ikon

        var marker = new google.maps.Marker({
          position: position,
          map: map,
          icon: {
            url: iconUrl,
            scaledSize: new google.maps.Size(30, 35),
          },
          title: station.slug, // Memberi nama pada marker
        });

        // Buat infoWindow menggunakan createDetailPanel
        var infoWindow = new google.maps.InfoWindow({
          content: createDetailPanel(station),
        });

        marker.addListener('click', function() {
          // Tutup InfoWindow sebelumnya jika ada 
          if (currentInfoWindow) {
            currentInfoWindow.close();
          }
          infoWindow.open(map, marker);
          currentInfoWindow = infoWindow;
        });
      });
    } else {
      console.error(`Error: ${response.status} - ${response.statusText}`);
    }
  } catch (error) {
    console.error('Error: ', error);
  }
}

function CustomMapTypeControl(map) {
  const controlDiv = document.createElement('div');
  controlDiv.style.padding = '10px';

  const controlUI = document.createElement('div');
  controlUI.style.backgroundColor = '#fff';
  controlUI.style.borderRadius = '2px';
  controlUI.style.boxShadow = '0 1px 4px -1px rgba(0,0,0,.3)';
  controlUI.style.cursor = 'pointer';
  controlUI.style.marginBottom = '22px';
  controlUI.style.marginTop = '750px';
  controlUI.style.textAlign = 'center';
  controlUI.style.height = '40px';
  controlUI.style.width = '250px';
  controlDiv.appendChild(controlUI);

  const mapButton = document.createElement('div');
  mapButton.style.float = 'left';
  mapButton.style.height = '100%';
  mapButton.style.width = '50%';
  mapButton.style.padding = '11px 0';
  mapButton.style.borderRight = '1px solid #e6e6e6';
  mapButton.innerHTML = 'Map';
  mapButton.style.fontSize = '16px';
  mapButton.style.color = '#999';
  controlUI.appendChild(mapButton);

  const satelliteButton = document.createElement('div');
  satelliteButton.style.float = 'left';
  satelliteButton.style.height = '100%';
  satelliteButton.style.width = '50%';
  satelliteButton.style.padding = '11px 0';
  satelliteButton.innerHTML = 'Satellite';
  satelliteButton.style.fontSize = '16px';
  satelliteButton.style.color = '#000';
  controlUI.appendChild(satelliteButton);

  function updateButtons(mapTypeId) {
      mapButton.style.color = mapTypeId === 'roadmap' ? '#000' : '#999';
      satelliteButton.style.color = mapTypeId === 'satellite' ? '#000' : '#999';
  }

  mapButton.addEventListener('click', () => {
      map.setMapTypeId('roadmap');
      updateButtons('roadmap');
  });

  satelliteButton.addEventListener('click', () => {
      map.setMapTypeId('satellite');
      updateButtons('satellite');
  });

  return controlDiv;
}