// Inisialisasi peta
// var maps = L.map('maps').setView([-1.558, 118.707], 5);

// Tambahkan tile layer OSM
// L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
//   attribution: '&copy; <a href="http://higertech.com">Higertech</a>',
// }).addTo(maps);

//new google map api
function initMap() {
  var initialLocation = { lat: -1.558, lng: 118.707 };
  var map = new google.maps.Map(document.getElementById('maps'), {
    zoom: 5,
    center: initialLocation,
  });

  var marker = new google.maps.Marker({
    position: initialLocation,
    map: map,
  });

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

  map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(legendDiv);

  //{{ POS DUGA AIR }}
  //BWS Sumatera IV
  var dugaSEIBALOI = new google.maps.Marker({
    position: { lat: 1.122535, lng: 104.017628 },
    map: map,
    icon: {
      url: '/assets/img/duga.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  dugaSEIBALOI.addListener('click', function () {
    var infoWindow = new google.maps.InfoWindow({
      content: '<b>AWLR SEI BALOI</b>',
    });
    infoWindow.open(map, dugaSEIBALOI);
  });
  var dugaWADUKJAGO = new google.maps.Marker({
    position: { lat: 1.079686, lng: 104.253733 },
    map: map,
    icon: {
      url: '/assets/img/duga.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  dugaWADUKJAGO.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>AWLR WADUK JAGO</b>',
    });
    infowindow.open(map, dugaWADUKJAGO);
  });

  var dugaSEIJERAM = new google.maps.Marker({
    position: { lat: 1.072273, lng: 104.286197 },
    map: map,
    icon: {
      url: '/assets/img/duga.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  dugaSEIJERAM.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>AWLR SEI JERAM</b>',
    });
    infowindow.open(map, dugaSEIJERAM);
  });

  var dugaSEIGESEK = new google.maps.Marker({
    position: { lat: 0.975699, lng: 104.557781 },
    map: map,
    icon: {
      url: '/assets/img/duga.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  dugaSEIGESEK.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>AWLR SEI GESEK</b>',
    });
    infowindow.open(map, dugaSEIGESEK);
  });

  var dugaKOLONGENAM = new google.maps.Marker({
    position: { lat: 0.850264, lng: 104.591368 },
    map: map,
    icon: {
      url: '/assets/img/duga.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  dugaKOLONGENAM.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>AWLR KOLONG ENAM</b>',
    });
    infowindow.open(map, dugaKOLONGENAM);
  });

  //Kerandin
  var dugaJembatanGantungKerandin = new google.maps.Marker({
    position: { lat: -0.2293477, lng: 104.7468405 },
    map: map,
    icon: {
      url: '/assets/img/duga.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  dugaJembatanGantungKerandin.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>AWLR Jembatan Gantung Kerandin</b>',
    });
    infowindow.open(map, dugaJembatanGantungKerandin);
  });

  //BWS Bangka Belitung
  var dugaAIRDAENG = new google.maps.Marker({
    position: { lat: -2.0327841053780658, lng: 105.17041498348578 },
    map: map,
    icon: {
      url: '/assets/img/duga.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  dugaAIRDAENG.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>AWLR AIR DAENG</b>',
    });
    infowindow.open(map, dugaAIRDAENG);
  });

  var dugaSUNGAIAIRRAYA = new google.maps.Marker({
    position: { lat: -2.0647249248334734, lng: 105.17781777446504 },
    map: map,
    icon: {
      url: '/assets/img/duga.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  dugaSUNGAIAIRRAYA.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>AWLR SUNGAI AIR RAYA</b>',
    });
    infowindow.open(map, dugaSUNGAIAIRRAYA);
  });

  var dugaPEDINDANG = new google.maps.Marker({
    position: { lat: -2.151084, lng: 106.102157 },
    map: map,
    icon: {
      url: '/assets/img/duga.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  dugaPEDINDANG.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>AWLR PEDINDANG</b>',
    });
    infowindow.open(map, dugaPEDINDANG);
  });

  var dugaKELUBI = new google.maps.Marker({
    position: { lat: -2.83606938, lng: 108.14638889 },
    map: map,
    icon: {
      url: '/assets/img/duga.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  dugaKELUBI.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>AWLR KELUBI</b>',
    });
    infowindow.open(map, dugaKELUBI);
  });

  //BWS Kalimantan I
  var dugaKEMBAYAN = new google.maps.Marker({
    position: { lat: 0.547503, lng: 110.415179 },
    map: map,
    icon: {
      url: '/assets/img/duga.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  dugaKEMBAYAN.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>AWLR KEMBAYAN</b>',
    });
    infowindow.open(map, dugaKEMBAYAN);
  });

  var dugaMANGGU = new google.maps.Marker({
    position: { lat: 0.44497, lng: 109.943254 },
    map: map,
    icon: {
      url: '/assets/img/duga.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  dugaMANGGU.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>AWLR MANGGU (LANDAK)</b>',
    });
    infowindow.open(map, dugaMANGGU);
  });

  var dugaSINTANG = new google.maps.Marker({
    position: { lat: 0.380786, lng: 109.724477 },
    map: map,
    icon: {
      url: '/assets/img/duga.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  dugaSINTANG.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>AWLR SINTANG (KRANJI)</b>',
    });
    infowindow.open(map, dugaSINTANG);
  });

  var dugaTAYAN = new google.maps.Marker({
    position: { lat: -0.037938, lng: 110.121328 },
    map: map,
    icon: {
      url: '/assets/img/duga.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  dugaTAYAN.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>AWLR TAYAN</b>',
    });
    infowindow.open(map, dugaTAYAN);
  });

  //Dinas PUPR Kotawaringin
  var dugaKOTAWARINGIN = new google.maps.Marker({
    position: { lat: -2.6755341, lng: 111.6471538 },
    map: map,
    icon: {
      url: '/assets/img/duga.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  dugaKOTAWARINGIN.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>AWLR KOTAWARINGIN</b>',
    });
    infowindow.open(map, dugaKOTAWARINGIN);
  });

  //BWS Kalimantan IV
  var dugaLONGIRAM = new google.maps.Marker({
    position: { lat: -0.01725, lng: 115.6255 },
    map: map,
    icon: {
      url: '/assets/img/duga.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  dugaLONGIRAM.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>AWLR LONG IRAM</b>',
    });
    infowindow.open(map, dugaLONGIRAM);
  });

  var dugaJONGGON = new google.maps.Marker({
    position: { lat: -0.623161, lng: 116.760109 },
    map: map,
    icon: {
      url: '/assets/img/duga.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  dugaJONGGON.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>AWLR JONGGON</b>',
    });
    infowindow.open(map, dugaJONGGON);
  });

  var dugaSELAMYULOKDAM = new google.maps.Marker({
    position: { lat: -0.891416, lng: 116.769326 },
    map: map,
    icon: {
      url: '/assets/img/duga.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  dugaSELAMYULOKDAM.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>AWLR SELAMYU LOK DAM</b>',
    });
    infowindow.open(map, dugaSELAMYULOKDAM);
  });

  var dugaSESULU = new google.maps.Marker({
    position: { lat: -1.399028, lng: 116.610389 },
    map: map,
    icon: {
      url: '/assets/img/duga.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  dugaSESULU.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>AWLR SESULU</b>',
    });
    infowindow.open(map, dugaSESULU);
  });

  //BWS Kalimantan III
  var dugaPATAS = new google.maps.Marker({
    position: { lat: -1.536351, lng: 115.160472 },
    map: map,
    icon: {
      url: '/assets/img/duga.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  dugaPATAS.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>AWLR PATAS</b>',
    });
    infowindow.open(map, dugaPATAS);
  });

  var dugaTAMPA = new google.maps.Marker({
    position: { lat: -1.9281, lng: 115.1195 },
    map: map,
    icon: {
      url: '/assets/img/duga.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  dugaTAMPA.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>AWLR TAMPA</b>',
    });
    infowindow.open(map, dugaTAMPA);
  });

  var dugaHAYAPING = new google.maps.Marker({
    position: { lat: -1.978235, lng: 115.235837 },
    map: map,
    icon: {
      url: '/assets/img/duga.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  dugaHAYAPING.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>AWLR HAYAPING</b>',
    });
    infowindow.open(map, dugaHAYAPING);
  });

  var dugaTANJUNG = new google.maps.Marker({
    position: { lat: -2.1611469617766907, lng: 115.38786243269593 },
    map: map,
    icon: {
      url: '/assets/img/duga.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  dugaTANJUNG.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>AWLR TANJUNG</b>',
    });
    infowindow.open(map, dugaTANJUNG);
  });

  var dugaLAMPIHONG = new google.maps.Marker({
    position: { lat: -2.3364, lng: 115.377 },
    map: map,
    icon: {
      url: '/assets/img/duga.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  dugaLAMPIHONG.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>AWLR LAMPIHONG</b>',
    });
    infowindow.open(map, dugaLAMPIHONG);
  });

  //BWS Sulawesi II
  // Marker for SGSUNGAIBOLANGOLONGALO
  var dugaSGSUNGAIBOLANGOLONGALO = new google.maps.Marker({
    position: { lat: 0.667369861, lng: 123.0788844 },
    map: map,
    icon: {
      url: '/assets/img/duga.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  dugaSGSUNGAIBOLANGOLONGALO.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>AWLR SG SUNGAI BOLANGO LONGALO</b>',
    });
    infowindow.open(map, dugaSGSUNGAIBOLANGOLONGALO);
  });

  // Marker for SGSUNGAIBOLANGOBOIDU
  var dugaSGSUNGAIBOLANGOBOIDU = new google.maps.Marker({
    position: { lat: 0.633991611, lng: 123.0855828 },
    map: map,
    icon: {
      url: '/assets/img/duga.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  dugaSGSUNGAIBOLANGOBOIDU.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>AWLR SG SUNGAI BOLANGO BOIDU</b>',
    });
    infowindow.open(map, dugaSGSUNGAIBOLANGOBOIDU);
  });

  // Marker for SGSUNGAIBOLANGOTELAGA
  var dugaSGSUNGAIBOLANGOTELAGA = new google.maps.Marker({
    position: { lat: 0.57526125, lng: 123.0443021 },
    map: map,
    icon: {
      url: '/assets/img/duga.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  dugaSGSUNGAIBOLANGOTELAGA.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>AWLR SG SUNGAI BOLANGO TELAGA</b>',
    });
    infowindow.open(map, dugaSGSUNGAIBOLANGOTELAGA);
  });

  // Marker for SGSUNGAIBOLANGOMOLOSIPATw
  var dugaSGSUNGAIBOLANGOMOLOSIPATw = new google.maps.Marker({
    position: { lat: 0.54213075, lng: 123.0445228 },
    map: map,
    icon: {
      url: '/assets/img/duga.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  dugaSGSUNGAIBOLANGOMOLOSIPATw.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>AWLR SG SUNGAI BOLANGO MOLOSIPAT w</b>',
    });
    infowindow.open(map, dugaSGSUNGAIBOLANGOMOLOSIPATw);
  });

  // Marker for SGSUNGAIALOPOHULIMEHU
  var dugaSGSUNGAIALOPOHULIMEHU = new google.maps.Marker({
    position: { lat: 0.6162, lng: 122.914867 },
    map: map,
    icon: {
      url: '/assets/img/duga.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  dugaSGSUNGAIALOPOHULIMEHU.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>AWLR SG SUNGAI ALOPOHU LIMEHU</b>',
    });
    infowindow.open(map, dugaSGSUNGAIALOPOHULIMEHU);
  });

  // Marker for SGSUNGAIPAGUYAMANPARUNGI
  var dugaSGSUNGAIPAGUYAMANPARUNGI = new google.maps.Marker({
    position: { lat: 0.614959026, lng: 122.6100698 },
    map: map,
    icon: {
      url: '/assets/img/duga.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  dugaSGSUNGAIPAGUYAMANPARUNGI.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>AWLR SG SUNGAI PAGUYAMAN PARUNGI</b>',
    });
    infowindow.open(map, dugaSGSUNGAIPAGUYAMANPARUNGI);
  });

  //BBWS Pompengan Jeneberang
  var dugaDERMAGABUMIBUNGPERMAI = new google.maps.Marker({
    position: { lat: -5.1498982, lng: 119.4873715 },
    map: map,
    icon: {
      url: '/assets/img/duga.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  dugaDERMAGABUMIBUNGPERMAI.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>AWLR DERMAGA BUMI BUNG PERMAI</b>',
    });
    infowindow.open(map, dugaDERMAGABUMIBUNGPERMAI);
  });

  var dugaWADUKTUNGGUPAMPANG = new google.maps.Marker({
    position: { lat: -5.1705565, lng: 119.4649761 },
    map: map,
    icon: {
      url: '/assets/img/duga.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  dugaWADUKTUNGGUPAMPANG.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>AWLR WADUK TUNGGU PAMPANG</b>',
    });
    infowindow.open(map, dugaWADUKTUNGGUPAMPANG);
  });

  var dugaNIPANIPASUNGAITALO = new google.maps.Marker({
    position: { lat: -5.1637411, lng: 119.5138554 },
    map: map,
    icon: {
      url: '/assets/img/duga.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  dugaNIPANIPASUNGAITALO.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>AWLR NIPA NIPA SUNGAI TALO</b>',
    });
    infowindow.open(map, dugaNIPANIPASUNGAITALO);
  });

  var dugaNIPANIPASPILWAY = new google.maps.Marker({
    position: { lat: -5.1664687, lng: 119.5172682 },
    map: map,
    icon: {
      url: '/assets/img/duga.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  dugaNIPANIPASPILWAY.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>AWLR NIPA NIPA SPILWAY</b>',
    });
    infowindow.open(map, dugaNIPANIPASPILWAY);
  });

  //BWS Maluku Utara
  var dugaDanauDuma = new google.maps.Marker({
    position: { lat: 1.850316687, lng: 127.7971494 },
    map: map,
    icon: {
      url: '/assets/img/duga.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  dugaDanauDuma.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>AWLR Danau Duma</b>',
    });
    infowindow.open(map, dugaDanauDuma);
  });

  var dugaAkedaga = new google.maps.Marker({
    position: { lat: 1.125185297, lng: 128.2003919 },
    map: map,
    icon: {
      url: '/assets/img/duga.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  dugaAkedaga.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>AWLR Akedaga</b>',
    });
    infowindow.open(map, dugaAkedaga);
  });

  //BWS Maluku
  var dugaWAIRUHU = new google.maps.Marker({
    position: { lat: -3.672005556, lng: 128.2068583 },
    map: map,
    icon: {
      url: '/assets/img/duga.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  dugaWAIRUHU.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>AWLR WAIRUHU</b>',
    });
    infowindow.open(map, dugaWAIRUHU);
  });

  var dugaBATUMERAH = new google.maps.Marker({
    position: { lat: -3.686219444, lng: 128.1933639 },
    map: map,
    icon: {
      url: '/assets/img/duga.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  dugaBATUMERAH.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>AWLR BATU MERAH</b>',
    });
    infowindow.open(map, dugaBATUMERAH);
  });

  var dugaWAITOMUHULU = new google.maps.Marker({
    position: { lat: -3.6965, lng: 128.1997806 },
    map: map,
    icon: {
      url: '/assets/img/duga.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  dugaWAITOMUHULU.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>AWLR WAI TOMU HULU</b>',
    });
    infowindow.open(map, dugaWAITOMUHULU);
  });

  var dugaBATUGAJAH = new google.maps.Marker({
    position: { lat: -3.706636111, lng: 128.1912306 },
    map: map,
    icon: {
      url: '/assets/img/duga.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  dugaBATUGAJAH.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>AWLR BATU GAJAH</b>',
    });
    infowindow.open(map, dugaBATUGAJAH);
  });

  //BWS Papua Barat
  var dugaSungaiRemu = new google.maps.Marker({
    position: { lat: -0.8725421, lng: 131.2830909 },
    map: map,
    icon: {
      url: '/assets/img/duga.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  dugaSungaiRemu.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>AWLR Sungai Remu</b>',
    });
    infowindow.open(map, dugaSungaiRemu);
  });

  var dugaSUNGAIMARIATHILIR = new google.maps.Marker({
    position: { lat: -0.99741, lng: 131.31976 },
    map: map,
    icon: {
      url: '/assets/img/duga.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  dugaSUNGAIMARIATHILIR.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>AWLR SUNGAI MARIAT HILIR</b>',
    });
    infowindow.open(map, dugaSUNGAIMARIATHILIR);
  });

  var dugaSUNGAIMARIATHULU = new google.maps.Marker({
    position: { lat: -1.0066, lng: 131.3385722 },
    map: map,
    icon: {
      url: '/assets/img/duga.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  dugaSUNGAIMARIATHULU.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>AWLR SUNGAI MARIAT HULU</b>',
    });
    infowindow.open(map, dugaSUNGAIMARIATHULU);
  });

  //BWS Papua
  var dugaIFARBESAR = new google.maps.Marker({
    position: { lat: -2.601962, lng: 140.528297 },
    map: map,
    icon: {
      url: '/assets/img/duga.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  dugaIFARBESAR.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>AWLR IFAR BESAR</b>',
    });
    infowindow.open(map, dugaIFARBESAR);
  });

  var dugaJAIFURI = new google.maps.Marker({
    position: { lat: -2.690296, lng: 140.584435 },
    map: map,
    icon: {
      url: '/assets/img/duga.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  dugaJAIFURI.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>AWLR JAIFURI</b>',
    });
    infowindow.open(map, dugaJAIFURI);
  });

  var dugaARSO12KEROM = new google.maps.Marker({
    position: { lat: -2.791306, lng: 140.707667 },
    map: map,
    icon: {
      url: '/assets/img/duga.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  dugaARSO12KEROM.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>AWLR ARSO 12 KEROM</b>',
    });
    infowindow.open(map, dugaARSO12KEROM);
  });

  var dugaYETI = new google.maps.Marker({
    position: { lat: -2.924111, lng: 140.873806 },
    map: map,
    icon: {
      url: '/assets/img/duga.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  dugaYETI.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>AWLR YETI</b>',
    });
    infowindow.open(map, dugaYETI);
  });

  //Summarecon Bogor
  var dugaSummareconBogor = new google.maps.Marker({
    position: { lat: -6.623625, lng: 106.846362 },
    map: map,
    icon: {
      url: '/assets/img/duga.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  dugaSummareconBogor.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>AWLR Summarecon Bogor</b>',
    });
    infowindow.open(map, dugaSummareconBogor);
  });

  //BBWS Cimanuk Cisanggarung
  var dugaBENDUNGANBOLANG = new google.maps.Marker({
    position: { lat: -6.53606, lng: 108.20073 },
    map: map,
    icon: {
      url: '/assets/img/duga.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  dugaBENDUNGANBOLANG.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>AWLR BENDUNGAN BOLANG</b>',
    });
    infowindow.open(map, dugaBENDUNGANBOLANG);
  });

  var dugaMALAHAYUINTAKE = new google.maps.Marker({
    position: { lat: -7.03042, lng: 108.81942 },
    map: map,
    icon: {
      url: '/assets/img/duga.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  dugaMALAHAYUINTAKE.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>AWLR MALAHAYU INTAKE</b>',
    });
    infowindow.open(map, dugaMALAHAYUINTAKE);
  });

  //Unit Hidrologi BBWS Citarum
  var dugaCIBURADUL = new google.maps.Marker({
    position: { lat: -6.8539198, lng: 107.4977187 },
    map: map,
    icon: {
      url: '/assets/img/duga.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  dugaCIBURADUL.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>AWLR CIBURADUL</b>',
    });
    infowindow.open(map, dugaCIBURADUL);
  });

  var dugaCIKERUH = new google.maps.Marker({
    position: { lat: -6.9253838, lng: 107.7802352 },
    map: map,
    icon: {
      url: '/assets/img/duga.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  dugaCIKERUH.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>AWLR CIKERUH</b>',
    });
    infowindow.open(map, dugaCIKERUH);
  });

  //PUPR Kab.Bandung
  var dugaCikeruh = new google.maps.Marker({
    position: { lat: -6.9548761, lng: 107.76954 },
    map: map,
    icon: {
      url: '/assets/img/duga.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  dugaCikeruh.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>AWLR Cikeruh</b>',
    });
    infowindow.open(map, dugaCikeruh);
  });

  var dugaCitarik = new google.maps.Marker({
    position: { lat: -6.964654, lng: 107.868185 },
    map: map,
    icon: {
      url: '/assets/img/duga.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  dugaCitarik.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>AWLR Citarik</b>',
    });
    infowindow.open(map, dugaCitarik);
  });

  var dugaCiwidey = new google.maps.Marker({
    position: { lat: -7.039873, lng: 107.495965 },
    map: map,
    icon: {
      url: '/assets/img/duga.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  dugaCiwidey.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>AWLR Ciwidey</b>',
    });
    infowindow.open(map, dugaCiwidey);
  });

  var dugaMikroDASCirasea = new google.maps.Marker({
    position: { lat: -7.0471744, lng: 107.7275444 },
    map: map,
    icon: {
      url: '/assets/img/duga.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  dugaMikroDASCirasea.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>AWLR Mikro DAS Cirasea</b>',
    });
    infowindow.open(map, dugaMikroDASCirasea);
  });

  //BBWS Citarum
  var dugaOUTLETNANJUNG = new google.maps.Marker({
    position: { lat: -6.9379446, lng: 107.5294872 },
    map: map,
    icon: {
      url: '/assets/img/duga.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  dugaOUTLETNANJUNG.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>AWLR OUTLET NANJUNG (OUTLET)</b>',
    });
    infowindow.open(map, dugaOUTLETNANJUNG);
  });

  var dugaSAPANOXBOW = new google.maps.Marker({
    position: { lat: -6.992482, lng: 107.7061 },
    map: map,
    icon: {
      url: '/assets/img/duga.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  dugaSAPANOXBOW.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>AWLR SAPAN OXBOW (SUNGAI)</b>',
    });
    infowindow.open(map, dugaSAPANOXBOW);
  });

  var dugaPARUNGHALANG = new google.maps.Marker({
    position: { lat: -6.9769899, lng: 107.6143694 },
    map: map,
    icon: {
      url: '/assets/img/duga.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  dugaPARUNGHALANG.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>AWLR PARUNGHALANG (KOLAM)</b>',
    });
    infowindow.open(map, dugaPARUNGHALANG);
  });

  var dugaFOLDERCIJAMBE = new google.maps.Marker({
    position: { lat: -6.982255, lng: 107.6014 },
    map: map,
    icon: {
      url: '/assets/img/duga.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  dugaFOLDERCIJAMBE.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>AWLR FOLDER CIJAMBE (SUNGAI)</b>',
    });
    infowindow.open(map, dugaFOLDERCIJAMBE);
  });

  var dugaFOLDERCIJAMBE = new google.maps.Marker({
    position: { lat: -6.9825468, lng: 107.6013087 },
    map: map,
    icon: {
      url: '/assets/img/duga.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  dugaFOLDERCIJAMBE.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>AWLR FOLDER CIJAMBE (KOLAM)</b>',
    });
    infowindow.open(map, dugaFOLDERCIJAMBE);
  });

  var dugaCIPALI = new google.maps.Marker({
    position: { lat: -6.982554, lng: 107.61908 },
    map: map,
    icon: {
      url: '/assets/img/duga.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  dugaCIPALI.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>AWLR CIPAL I (KOLAM)</b>',
    });
    infowindow.open(map, dugaCIPALI);
  });

  var dugaDIOUTLETANDIR = new google.maps.Marker({
    position: { lat: -6.987413180431643, lng: 107.61886922221129 },
    map: map,
    icon: {
      url: '/assets/img/duga.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  dugaDIOUTLETANDIR.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>AWLR DI OUT LET ANDIR</b>',
    });
    infowindow.open(map, dugaDIOUTLETANDIR);
  });

  var dugaAIRKOLAMRETENSIANDIR = new google.maps.Marker({
    position: { lat: -6.9880345, lng: 107.6189014 },
    map: map,
    icon: {
      url: '/assets/img/duga.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  dugaAIRKOLAMRETENSIANDIR.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>AWLR AIR KOLAM RETENSI ANDIR</b>',
    });
    infowindow.open(map, dugaAIRKOLAMRETENSIANDIR);
  });

  var dugaFOLDERCISANGKUY = new google.maps.Marker({
    position: { lat: -6.9909566, lng: 107.6252966 },
    map: map,
    icon: {
      url: '/assets/img/duga.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  dugaFOLDERCISANGKUY.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>AWLR FOLDER CISANGKUY (SUNGAI)</b>',
    });
    infowindow.open(map, dugaFOLDERCISANGKUY);
  });

  var dugaCIEUNTEUNG = new google.maps.Marker({
    position: { lat: -6.991843, lng: 107.6275 },
    map: map,
    icon: {
      url: '/assets/img/duga.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  dugaCIEUNTEUNG.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>AWLR CIEUNTEUNG</b>',
    });
    infowindow.open(map, dugaCIEUNTEUNG);
  });

  var dugaKOLAMRETENSICIEUNTEUNG = new google.maps.Marker({
    position: { lat: -6.9920585, lng: 107.6278582 },
    map: map,
    icon: {
      url: '/assets/img/duga.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  dugaKOLAMRETENSICIEUNTEUNG.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>AWLR KOLAM RETENSI CIEUNTEUNG</b>',
    });
    infowindow.open(map, dugaKOLAMRETENSICIEUNTEUNG);
  });

  var dugaOXBOWBOJONGSOANG = new google.maps.Marker({
    position: { lat: -6.9900279, lng: 107.6315948 },
    map: map,
    icon: {
      url: '/assets/img/duga.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  dugaOXBOWBOJONGSOANG.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>AWLR OXBOW BOJONGSOANG (KOLAM)</b>',
    });
    infowindow.open(map, dugaOXBOWBOJONGSOANG);
  });

  var dugaFOLDERBOJONGSOANG = new google.maps.Marker({
    position: { lat: -6.9906875, lng: 107.6301875 },
    map: map,
    icon: {
      url: '/assets/img/duga.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  dugaFOLDERBOJONGSOANG.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>AWLR FOLDER BOJONGSOANG (KOLAM)</b>',
    });
    infowindow.open(map, dugaFOLDERBOJONGSOANG);
  });

  //Dinas Sumber Daya Air Prov.Jabar
  var dugaCiwulanSodong = new google.maps.Marker({
    position: { lat: -7.5257627, lng: 108.1879641 },
    map: map,
    icon: {
      url: '/assets/img/duga.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  dugaCiwulanSodong.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>AWLR Ciwulan - Sodong</b>',
    });
    infowindow.open(map, dugaCiwulanSodong);
  });

  //{{ POS CURAH HUJAN }}
  //BWS Sumatera VII
  var curahbajak = new google.maps.Marker({
    position: { lat: -3.703222, lng: 102.489222 },
    map: map,
    icon: {
      url: '/assets/img/curah.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  curahbajak.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>PCH Bajak</b>',
    });
    infowindow.open(map, curahbajak);
  });

  var curahnenggalo = new google.maps.Marker({
    position: { lat: -2.746181, lng: 101.340044 },
    map: map,
    icon: {
      url: '/assets/img/curah.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  curahnenggalo.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>PCH Nenggalo</b>',
    });
    infowindow.open(map, curahnenggalo);
  });

  var curahsaribulan = new google.maps.Marker({
    position: { lat: -2.6275, lng: 101.2869 },
    map: map,
    icon: {
      url: '/assets/img/curah.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  curahsaribulan.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>PCH Sari Bulan</b>',
    });
    infowindow.open(map, curahsaribulan);
  });

  var curahsidodadi = new google.maps.Marker({
    position: { lat: -2.8905, lng: 101.455 },
    map: map,
    icon: {
      url: '/assets/img/curah.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  curahsidodadi.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>PCH Sidodadi</b>',
    });
    infowindow.open(map, curahsidodadi);
  });

  var curahsukamaju = new google.maps.Marker({
    position: { lat: -4.368153, lng: 103.065737 },
    map: map,
    icon: {
      url: '/assets/img/curah.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  curahsukamaju.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>PCH Suka Maju</b>',
    });
    infowindow.open(map, curahsukamaju);
  });

  //Sumatera IV
  var curahkarimun = new google.maps.Marker({
    position: { lat: 1.035023, lng: 103.376256 },
    map: map,
    icon: {
      url: '/assets/img/curah.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  curahkarimun.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>PCH Karimun</b>',
    });
    infowindow.open(map, curahkarimun);
  });

  var curahsawang = new google.maps.Marker({
    position: { lat: 0.756814, lng: 103.357878 },
    map: map,
    icon: {
      url: '/assets/img/curah.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  curahsawang.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>PCH Sawang</b>',
    });
    infowindow.open(map, curahsawang);
  });

  var curahtelukradang = new google.maps.Marker({
    position: { lat: 0.801999, lng: 103.443708 },
    map: map,
    icon: {
      url: '/assets/img/curah.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  curahtelukradang.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>PCH Teluk Radang</b>',
    });
    infowindow.open(map, curahtelukradang);
  });

  var curahsagulung = new google.maps.Marker({
    position: { lat: 1.037306, lng: 103.965778 },
    map: map,
    icon: {
      url: '/assets/img/curah.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  curahsagulung.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>PCH Sagulung</b>',
    });
    infowindow.open(map, curahsagulung);
  });

  var curahdaiklingga = new google.maps.Marker({
    position: { lat: 0.1227, lng: 104.3554 },
    map: map,
    icon: {
      url: '/assets/img/curah.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  curahdaiklingga.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>PCH Daik-Lingga</b>',
    });
    infowindow.open(map, curahdaiklingga);
  });

  var curahjemajatimur = new google.maps.Marker({
    position: { lat: 2.926003, lng: 105.73915 },
    map: map,
    icon: {
      url: '/assets/img/curah.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  curahjemajatimur.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>PCH Jemaja Timur</b>',
    });
    infowindow.open(map, curahjemajatimur);
  });

  var curahpalmatak = new google.maps.Marker({
    position: { lat: 3.334457, lng: 106.257984 },
    map: map,
    icon: {
      url: '/assets/img/curah.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  curahpalmatak.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>PCH Paltamak</b>',
    });
    infowindow.open(map, curahpalmatak);
  });

  var curahterempa = new google.maps.Marker({
    position: { lat: 3.16773, lng: 106.231937 },
    map: map,
    icon: {
      url: '/assets/img/curah.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  curahterempa.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>PCH Terempa</b>',
    });
    infowindow.open(map, curahterempa);
  });

  //Bangka Belitung
  var curahmentok = new google.maps.Marker({
    position: { lat: -2.058389, lng: 105.203737 },
    map: map,
    icon: {
      url: '/assets/img/curah.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  curahmentok.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>PCH Mentok</b>',
    });
    infowindow.open(map, curahmentok);
  });

  var curahsungaliat = new google.maps.Marker({
    position: { lat: -1.863171, lng: 106.102375 },
    map: map,
    icon: {
      url: '/assets/img/curah.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  curahsungaliat.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>PCH Sungaliat</b>',
    });
    infowindow.open(map, curahsungaliat);
  });

  var curahpayung = new google.maps.Marker({
    position: { lat: -2.603774, lng: 106.137113 },
    map: map,
    icon: {
      url: '/assets/img/curah.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  curahpayung.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>PCH Payung</b>',
    });
    infowindow.open(map, curahpayung);
  });

  var curahbadau = new google.maps.Marker({
    position: { lat: -2.817029, lng: 107.796064 },
    map: map,
    icon: {
      url: '/assets/img/curah.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  curahbadau.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>PCH Badau</b>',
    });
    infowindow.open(map, curahbadau);
  });

  var curahmengkubang = new google.maps.Marker({
    position: { lat: -2.785946, lng: 108.209492 },
    map: map,
    icon: {
      url: '/assets/img/curah.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  curahmengkubang.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>PCH Mengkubang</b>',
    });
    infowindow.open(map, curahmengkubang);
  });

  //BWS Kalimantan I
  var curahkubu = new google.maps.Marker({
    position: { lat: 0.490235, lng: 109.383067 },
    map: map,
    icon: {
      url: '/assets/img/curah.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  curahkubu.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>PCH Kubu</b>',
    });
    infowindow.open(map, curahkubu);
  });

  var curahdabong = new google.maps.Marker({
    position: { lat: 0.556266, lng: 109.287952 },
    map: map,
    icon: {
      url: '/assets/img/curah.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  curahdabong.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>PCH Dabong</b>',
    });
    infowindow.open(map, curahdabong);
  });

  var curahngabang = new google.maps.Marker({
    position: { lat: 0.333198, lng: 109.863519 },
    map: map,
    icon: {
      url: '/assets/img/curah.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  curahngabang.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>PCH Ngabang</b>',
    });
    infowindow.open(map, curahngabang);
  });

  var curahpancaroba = new google.maps.Marker({
    position: { lat: 0.029136, lng: 109.616305 },
    map: map,
    icon: {
      url: '/assets/img/curah.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  curahpancaroba.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>PCH Pancaroba</b>',
    });
    infowindow.open(map, curahpancaroba);
  });

  var curahtebangkacang = new google.maps.Marker({
    position: { lat: -0.191948, lng: 109.469682 },
    map: map,
    icon: {
      url: '/assets/img/curah.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  curahtebangkacang.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>PCH Tebang kacang</b>',
    });
    infowindow.open(map, curahtebangkacang);
  });

  var curahbatuampar = new google.maps.Marker({
    position: { lat: -0.74615, lng: 109.537092 },
    map: map,
    icon: {
      url: '/assets/img/curah.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  curahbatuampar.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>PCH Batu Ampar</b>',
    });
    infowindow.open(map, curahbatuampar);
  });

  //BWS Kalimantan III
  var curahjaro = new google.maps.Marker({
    position: { lat: -1.8345594, lng: 115.6347436 },
    map: map,
    icon: {
      url: '/assets/img/curah.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  curahjaro.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>PCH Jaro</b>',
    });
    infowindow.open(map, curahjaro);
  });

  var curahbendungpitap = new google.maps.Marker({
    position: { lat: -2.446774, lng: 115.543969 },
    map: map,
    icon: {
      url: '/assets/img/curah.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  curahbendungpitap.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>PCH Bendung Pitap</b>',
    });
    infowindow.open(map, curahbendungpitap);
  });

  var curahmantewe = new google.maps.Marker({
    position: { lat: -3.2043268382960726, lng: 115.66306749721332 },
    map: map,
    icon: {
      url: '/assets/img/curah.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  curahmantewe.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>PCH Mantewe</b>',
    });
    infowindow.open(map, curahmantewe);
  });

  var curahulm = new google.maps.Marker({
    position: { lat: -3.296589, lng: 114.587092 },
    map: map,
    icon: {
      url: '/assets/img/curah.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  curahulm.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>PCH ULM</b>',
    });
    infowindow.open(map, curahulm);
  });

  var curahtabakkanilan = new google.maps.Marker({
    position: { lat: -3.296589, lng: 115.587092 },
    map: map,
    icon: {
      url: '/assets/img/curah.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  curahtabakkanilan.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>PCH Tabak Kanilan</b>',
    });
    infowindow.open(map, curahtabakkanilan);
  });

  //BWS Kalimantan IV
  var curahlongbia = new google.maps.Marker({
    position: { lat: 2.7250395, lng: 116.484864 },
    map: map,
    icon: {
      url: '/assets/img/curah.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  curahlongbia.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>PCH Long Bia</b>',
    });
    infowindow.open(map, curahlongbia);
  });

  var curahlongbangun = new google.maps.Marker({
    position: { lat: 0.5265398, lng: 115.2198087 },
    map: map,
    icon: {
      url: '/assets/img/curah.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  curahlongbangun.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>PCH Long Bangun</b>',
    });
    infowindow.open(map, curahlongbangun);
  });

  var curahkembangjanggut = new google.maps.Marker({
    position: { lat: 0.137222, lng: 116.377583 },
    map: map,
    icon: {
      url: '/assets/img/curah.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  curahkembangjanggut.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>PCH Kembang Janggut</b>',
    });
    infowindow.open(map, curahkembangjanggut);
  });

  var curahLONGIRAM = new google.maps.Marker({
    position: { lat: -0.013611, lng: 115.632194 },
    map: map,
    icon: {
      url: '/assets/img/curah.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  curahLONGIRAM.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>PCH LONG IRAM</b>',
    });
    infowindow.open(map, curahLONGIRAM);
  });

  var curahkarangtunggal = new google.maps.Marker({
    position: { lat: -0.407639, lng: 117.092389 },
    map: map,
    icon: {
      url: '/assets/img/curah.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  curahkarangtunggal.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>PCH Karang Tunggal</b>',
    });
    infowindow.open(map, curahkarangtunggal);
  });

  var curahsempaja = new google.maps.Marker({
    position: { lat: -0.44115, lng: 117.162611 },
    map: map,
    icon: {
      url: '/assets/img/curah.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  curahsempaja.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>PCH Sempaja</b>',
    });
    infowindow.open(map, curahsempaja);
  });

  var curahmassaping = new google.maps.Marker({
    position: { lat: -0.63454, lng: 117.028879 },
    map: map,
    icon: {
      url: '/assets/img/curah.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  curahmassaping.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>PCH Massaping</b>',
    });
    infowindow.open(map, curahmassaping);
  });

  var curahjonggon = new google.maps.Marker({
    position: { lat: -0.619383, lng: 116.748366 },
    map: map,
    icon: {
      url: '/assets/img/curah.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  curahjonggon.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>PCH Jonggon</b>',
    });
    infowindow.open(map, curahjonggon);
  });

  var curahnurserysuring = new google.maps.Marker({
    position: { lat: -0.860778, lng: 116.793611 },
    map: map,
    icon: {
      url: '/assets/img/curah.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  curahnurserysuring.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>PCH Nursery Suring</b>',
    });
    infowindow.open(map, curahnurserysuring);
  });

  var curahterunen = new google.maps.Marker({
    position: { lat: -0.866944, lng: 116.741556 },
    map: map,
    icon: {
      url: '/assets/img/curah.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  curahterunen.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>PCH Terunen</b>',
    });
    infowindow.open(map, curahterunen);
  });

  var curahkarangjinawi = new google.maps.Marker({
    position: { lat: -0.962306, lng: 116.719306 },
    map: map,
    icon: {
      url: '/assets/img/curah.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  curahkarangjinawi.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>PCH Karang Jinawi</b>',
    });
    infowindow.open(map, curahkarangjinawi);
  });

  var curahpamalauan = new google.maps.Marker({
    position: { lat: -1.040582, lng: 116.651543 },
    map: map,
    icon: {
      url: '/assets/img/curah.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  curahpamalauan.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>PCH Pamalauan</b>',
    });
    infowindow.open(map, curahpamalauan);
  });

  var curahtenginbaru = new google.maps.Marker({
    position: { lat: -0.912759, lng: 116.818942 },
    map: map,
    icon: {
      url: '/assets/img/curah.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  curahtenginbaru.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>PCH Tengin Baru</b>',
    });
    infowindow.open(map, curahtenginbaru);
  });

  var curahbendunganteritip = new google.maps.Marker({
    position: { lat: -1.1538808225478288, lng: 116.98197917971397 },
    map: map,
    icon: {
      url: '/assets/img/curah.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  curahbendunganteritip.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>PCH Bendungan Teritip</b>',
    });
    infowindow.open(map, curahbendunganteritip);
  });

  //Bendungan sepaku semoi
  var curahkantorbendung = new google.maps.Marker({
    position: { lat: -0.9081754, lng: 116.84042404121914 },
    map: map,
    icon: {
      url: '/assets/img/curah.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  curahkantorbendung.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>PCH Kantor bendung</b>',
    });
    infowindow.open(map, curahkantorbendung);
  });

  var curahbendungansepakuhulu = new google.maps.Marker({
    position: { lat: -0.9081754, lng: 116.8359085 },
    map: map,
    icon: {
      url: '/assets/img/curah.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  curahbendungansepakuhulu.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>PCH Bendungan Sepaku Hulu</b>',
    });
    infowindow.open(map, curahbendungansepakuhulu);
  });

  //PUPR Kab.Kutai Timur
  var curahkaubun = new google.maps.Marker({
    position: { lat: 1.032942, lng: 117.768446 },
    map: map,
    icon: {
      url: '/assets/img/curah.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  curahkaubun.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>PCH Kaubun</b>',
    });
    infowindow.open(map, curahkaubun);
  });

  //BWS Sulawesi II
  var curahMRGDASTOMBULILATOBUNGA = new google.maps.Marker({
    position: { lat: 0.32175, lng: 123.34011 },
    map: map,
    icon: {
      url: '/assets/img/curah.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  curahMRGDASTOMBULILATOBUNGA.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>PCH MRG DAS TOMBULILATO BUNGA</b>',
    });
    infowindow.open(map, curahMRGDASTOMBULILATOBUNGA);
  });

  var curahMRGDASBOLANGOBONEPANGI = new google.maps.Marker({
    position: { lat: 0.508833333, lng: 123.2464333 },
    map: map,
    icon: {
      url: '/assets/img/curah.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  curahMRGDASBOLANGOBONEPANGI.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>PCH MRG DAS BOLANGO BONE PANGI</b>',
    });
    infowindow.open(map, curahMRGDASBOLANGOBONEPANGI);
  });

  var curahMRGDASBOLANGOBONEALALE = new google.maps.Marker({
    position: { lat: 0.534091417, lng: 123.1722614 },
    map: map,
    icon: {
      url: '/assets/img/curah.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  curahMRGDASBOLANGOBONEALALE.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>PCH MRG DAS BOLANGO BONE ALALE</b>',
    });
    infowindow.open(map, curahMRGDASBOLANGOBONEALALE);
  });

  var curahMRGDASBOLANGOBONEDULAMAYOSELATAN = new google.maps.Marker({
    position: { lat: 0.702833333, lng: 123.0395667 },
    map: map,
    icon: {
      url: '/assets/img/curah.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  curahMRGDASBOLANGOBONEDULAMAYOSELATAN.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>PCH MRG DAS BOLANGO BONE DULAMAYO SELATAN</b>',
    });
    infowindow.open(map, curahMRGDASBOLANGOBONEDULAMAYOSELATAN);
  });

  var curahMRGDASBOLANGOBONELONGALO = new google.maps.Marker({
    position: { lat: 0.662615722, lng: 123.0776333 },
    map: map,
    icon: {
      url: '/assets/img/curah.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  curahMRGDASBOLANGOBONELONGALO.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>PCH MRG DAS BOLANGO BONE LONGALO</b>',
    });
    infowindow.open(map, curahMRGDASBOLANGOBONELONGALO);
  });

  var curahMRGDASBOLANGOBONEDUMATI = new google.maps.Marker({
    position: { lat: 0.6145, lng: 123.0413 },
    map: map,
    icon: {
      url: '/assets/img/curah.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  curahMRGDASBOLANGOBONEDUMATI.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>PCH MRG DAS BOLANGO BONE DUMATI</b>',
    });
    infowindow.open(map, curahMRGDASBOLANGOBONEDUMATI);
  });

  var curahMRGDASLIMBOTOOMBULO = new google.maps.Marker({
    position: { lat: 0.65118, lng: 122.92196 },
    map: map,
    icon: {
      url: '/assets/img/curah.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  curahMRGDASLIMBOTOOMBULO.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>PCH MRG DAS LIMBOTO OMBULO</b>',
    });
    infowindow.open(map, curahMRGDASLIMBOTOOMBULO);
  });

  var curahMRGDASLIMBOTOISIMURAYA = new google.maps.Marker({
    position: { lat: 0.650538, lng: 122.863281 },
    map: map,
    icon: {
      url: '/assets/img/curah.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  curahMRGDASLIMBOTOISIMURAYA.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>PCH MRG DAS LIMBOTO ISIMU RAYA</b>',
    });
    infowindow.open(map, curahMRGDASLIMBOTOISIMURAYA);
  });

  var curahMRGDASLIMBOTOBOTULIYODU = new google.maps.Marker({
    position: { lat: 0.558189, lng: 122.7979 },
    map: map,
    icon: {
      url: '/assets/img/curah.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  curahMRGDASLIMBOTOBOTULIYODU.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>PCH MRG DAS LIMBOTO BOTU LIYODU</b>',
    });
    infowindow.open(map, curahMRGDASLIMBOTOBOTULIYODU);
  });

  var curahMRGDASPAGUYMANTANGKOBU = new google.maps.Marker({
    position: { lat: 0.620872224478473, lng: 122.606075000193 },
    map: map,
    icon: {
      url: '/assets/img/curah.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  curahMRGDASPAGUYMANTANGKOBU.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>PCH MRG DAS PAGUYMAN TANGKOBU</b>',
    });
    infowindow.open(map, curahMRGDASPAGUYMANTANGKOBU);
  });

  var curahMRGDASPAGUYAMANOLIMOHULO = new google.maps.Marker({
    position: { lat: 0.7675086431480521, lng: 122.46194356869222 },
    map: map,
    icon: {
      url: '/assets/img/curah.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  curahMRGDASPAGUYAMANOLIMOHULO.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>PCH MRG DAS PAGUYAMAN OLIMOHULO</b>',
    });
    infowindow.open(map, curahMRGDASPAGUYAMANOLIMOHULO);
  });

  var curahMRGDASTILAMUTAMODELOMO = new google.maps.Marker({
    position: { lat: 0.5301006495893843, lng: 122.34634706619089 },
    map: map,
    icon: {
      url: '/assets/img/curah.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  curahMRGDASTILAMUTAMODELOMO.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>PCH MRG DAS TILAMUTA MODELOMO</b>',
    });
    infowindow.open(map, curahMRGDASTILAMUTAMODELOMO);
  });

  var curahMRGDASBUMBULANKARYABARU = new google.maps.Marker({
    position: { lat: 0.582863, lng: 122.09928 },
    map: map,
    icon: {
      url: '/assets/img/curah.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  curahMRGDASBUMBULANKARYABARU.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>PCH MRG DAS BUMBULAN KARYA BARU</b>',
    });
    infowindow.open(map, curahMRGDASBUMBULANKARYABARU);
  });

  var curahMRGDASRANDANGANLEMBAHPERMAI = new google.maps.Marker({
    position: { lat: 0.643053, lng: 121.746423 },
    map: map,
    icon: {
      url: '/assets/img/curah.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  curahMRGDASRANDANGANLEMBAHPERMAI.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>PCH MRG DAS RANDANGAN LEMBAH PERMAI</b>',
    });
    infowindow.open(map, curahMRGDASRANDANGANLEMBAHPERMAI);
  });

  var curahMRGDASPOPAYATOMARISA = new google.maps.Marker({
    position: { lat: 0.56353, lng: 121.45113 },
    map: map,
    icon: {
      url: '/assets/img/curah.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  curahMRGDASPOPAYATOMARISA.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>PCH MRG DAS POPAYATO MARISA</b>',
    });
    infowindow.open(map, curahMRGDASPOPAYATOMARISA);
  });

  var curahMRGDASSIDORUKUN = new google.maps.Marker({
    position: { lat: 0.54686, lng: 121.74657 },
    map: map,
    icon: {
      url: '/assets/img/curah.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  curahMRGDASSIDORUKUN.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>PCH MRG DAS SIDORUKUN</b>',
    });
    infowindow.open(map, curahMRGDASSIDORUKUN);
  });

  //BWS Sulawesi III
  var curahkasoloang = new google.maps.Marker({
    position: { lat: -1.009987, lng: 119.505119 },
    map: map,
    icon: {
      url: '/assets/img/curah.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  curahkasoloang.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>PCH Kasoloang</b>',
    });
    infowindow.open(map, curahkasoloang);
  });

  //BBWS Pompengan Jeneberang
  var curahbungin = new google.maps.Marker({
    position: { lat: -3.536305, lng: 119.995714 },
    map: map,
    icon: {
      url: '/assets/img/curah.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  curahbungin.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>PCH Bungin</b>',
    });
    infowindow.open(map, curahbungin);
  });

  //BWS Maluku Utara
  var curahgalela = new google.maps.Marker({
    position: { lat: 1.79954816, lng: 127.9011918 },
    map: map,
    icon: {
      url: '/assets/img/curah.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  curahgalela.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>PCH Galela</b>',
    });
    infowindow.open(map, curahgalela);
  });

  var curahtobelo = new google.maps.Marker({
    position: { lat: 1.762005509, lng: 127.9549328 },
    map: map,
    icon: {
      url: '/assets/img/curah.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  curahtobelo.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>PCH Tobelo</b>',
    });
    infowindow.open(map, curahtobelo);
  });

  var curahmacalele = new google.maps.Marker({
    position: { lat: 1.305305805, lng: 128.5912592 },
    map: map,
    icon: {
      url: '/assets/img/curah.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  curahmacalele.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>PCH Macalele</b>',
    });
    infowindow.open(map, curahmacalele);
  });

  var curahdakaino = new google.maps.Marker({
    position: { lat: 1.096293833, lng: 128.1943795 },
    map: map,
    icon: {
      url: '/assets/img/curah.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  curahdakaino.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>PCH Dakaino</b>',
    });
    infowindow.open(map, curahdakaino);
  });

  var curahembungsofifi = new google.maps.Marker({
    position: { lat: 0.7012248, lng: 127.5915756 },
    map: map,
    icon: {
      url: '/assets/img/curah.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  curahembungsofifi.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>PCH Embung Sofifi</b>',
    });
    infowindow.open(map, curahembungsofifi);
  });

  var curahtubo = new google.maps.Marker({
    position: { lat: 0.79081667, lng: 127.3749167 },
    map: map,
    icon: {
      url: '/assets/img/curah.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  curahtubo.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>PCH Tubo</b>',
    });
    infowindow.open(map, curahtubo);
  });

  var curahdanaungade = new google.maps.Marker({
    position: { lat: 0.767226, lng: 127.3486902 },
    map: map,
    icon: {
      url: '/assets/img/curah.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  curahdanaungade.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>PCH Danau Ngade</b>',
    });
    infowindow.open(map, curahdanaungade);
  });

  //BWS Maluku
  var curahairbuaya = new google.maps.Marker({
    position: { lat: -3.087813889, lng: 126.4367722 },
    map: map,
    icon: {
      url: '/assets/img/curah.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  curahairbuaya.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>PCH Air Buaya</b>',
    });
    infowindow.open(map, curahairbuaya);
  });

  var curahwaekose = new google.maps.Marker({
    position: { lat: -3.074288889, lng: 126.5981417 },
    map: map,
    icon: {
      url: '/assets/img/curah.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  curahwaekose.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>PCH Wae Kose</b>',
    });
    infowindow.open(map, curahwaekose);
  });

  var curahsavanajaya = new google.maps.Marker({
    position: { lat: -3.303888889, lng: 127.0177778 },
    map: map,
    icon: {
      url: '/assets/img/curah.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  curahsavanajaya.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>PCH Savanajaya</b>',
    });
    infowindow.open(map, curahsavanajaya);
  });

  var curahwaegeren = new google.maps.Marker({
    position: { lat: -3.401694444, lng: 126.91235 },
    map: map,
    icon: {
      url: '/assets/img/curah.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  curahwaegeren.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>PCH Wae Geren</b>',
    });
    infowindow.open(map, curahwaegeren);
  });

  var curahparbulu = new google.maps.Marker({
    position: { lat: -3.43067222222222, lng: 127.007891666666 },
    map: map,
    icon: {
      url: '/assets/img/curah.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  curahparbulu.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>PCH Parbulu</b>',
    });
    infowindow.open(map, curahparbulu);
  });

  var curahwaelo = new google.maps.Marker({
    position: { lat: -3.439216667, lng: 126.9460817 },
    map: map,
    icon: {
      url: '/assets/img/curah.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  curahwaelo.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>PCH Wae Lo</b>',
    });
    infowindow.open(map, curahwaelo);
  });

  var curahwaepamali = new google.maps.Marker({
    position: { lat: -3.4944444444444445, lng: 126.88333333333334 },
    map: map,
    icon: {
      url: '/assets/img/curah.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  curahwaepamali.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>PCH Wae Pamali</b>',
    });
    infowindow.open(map, curahwaepamali);
  });

  var curahgemba = new google.maps.Marker({
    position: { lat: -3.339638889, lng: 128.3536389 },
    map: map,
    icon: {
      url: '/assets/img/curah.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  curahgemba.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>PCH Gemba</b>',
    });
    infowindow.open(map, curahgemba);
  });

  var curahiain = new google.maps.Marker({
    position: { lat: -3.681369444, lng: 128.2296583 },
    map: map,
    icon: {
      url: '/assets/img/curah.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  curahiain.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>PCH Iain</b>',
    });
    infowindow.open(map, curahiain);
  });

  var curahbatumerah = new google.maps.Marker({
    position: { lat: -3.691961111, lng: 128.2086389 },
    map: map,
    icon: {
      url: '/assets/img/curah.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  curahbatumerah.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>PCH Batu Merah</b>',
    });
    infowindow.open(map, curahbatumerah);
  });

  var curahkayutiga = new google.maps.Marker({
    position: { lat: -3.697555556, lng: 128.2003722 },
    map: map,
    icon: {
      url: '/assets/img/curah.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  curahkayutiga.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>PCH Kayu Tiga</b>',
    });
    infowindow.open(map, curahkayutiga);
  });

  var curahkobisonta = new google.maps.Marker({
    position: { lat: -2.989947222, lng: 129.9213028 },
    map: map,
    icon: {
      url: '/assets/img/curah.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  curahkobisonta.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>PCH Kobisonta</b>',
    });
    infowindow.open(map, curahkobisonta);
  });

  var curahkobi = new google.maps.Marker({
    position: { lat: -3.065880556, lng: 129.9024722 },
    map: map,
    icon: {
      url: '/assets/img/curah.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  curahkobi.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>PCH Kobi</b>',
    });
    infowindow.open(map, curahkobi);
  });

  var curahmatakabo = new google.maps.Marker({
    position: { lat: -3.050277778, lng: 130.1441667 },
    map: map,
    icon: {
      url: '/assets/img/curah.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  curahmatakabo.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>PCH Matakabo</b>',
    });
    infowindow.open(map, curahmatakabo);
  });

  var curahbubi = new google.maps.Marker({
    position: { lat: -3.058197222, lng: 130.26455 },
    map: map,
    icon: {
      url: '/assets/img/curah.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  curahbubi.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>PCH Bubi</b>',
    });
    infowindow.open(map, curahbubi);
  });

  var curahbula = new google.maps.Marker({
    position: { lat: -3.110622222, lng: 130.515325 },
    map: map,
    icon: {
      url: '/assets/img/curah.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  curahbula.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>PCH Bula</b>',
    });
    infowindow.open(map, curahbula);
  });

  //BWS Papua Barat
  var curahDistrikBonkawir = new google.maps.Marker({
    position: { lat: -0.40723, lng: 130.87292 },
    map: map,
    icon: {
      url: '/assets/img/curah.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });

  curahDistrikBonkawir.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>PCH Distrik Bonkawir (Kab. Raja Ampat)</b>',
    });
    infowindow.open(map, curahDistrikBonkawir);
  });

  var curahBambuKuningKlammik = new google.maps.Marker({
    position: { lat: -0.8902, lng: 131.3429056 },
    map: map,
    icon: {
      url: '/assets/img/curah.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });

  curahBambuKuningKlammik.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>PCH Km. 12 Bambu Kuning Klammik (Kota Sorong)</b>',
    });
    infowindow.open(map, curahBambuKuningKlammik);
  });

  var curahKlamono = new google.maps.Marker({
    position: { lat: -1.13294, lng: 131.4782417 },
    map: map,
    icon: {
      url: '/assets/img/curah.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });

  curahKlamono.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>PCH Klamono (Kab. Sorong)</b>',
    });
    infowindow.open(map, curahKlamono);
  });

  var curahPKSBMKGFEF = new google.maps.Marker({
    position: { lat: -0.7875, lng: 132.420725 },
    map: map,
    icon: {
      url: '/assets/img/curah.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });

  curahPKSBMKGFEF.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>PCH PKS BMKG FEF (Kab. Tambrauw)</b>',
    });
    infowindow.open(map, curahPKSBMKGFEF);
  });

  var curahPKSBMKGTEMINABUAN = new google.maps.Marker({
    position: { lat: -1.47557, lng: 132.0720722 },
    map: map,
    icon: {
      url: '/assets/img/curah.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });

  curahPKSBMKGTEMINABUAN.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>PCH PKS BMKG TEMINABUAN (Kab. Sorong Selatan)</b>',
    });
    infowindow.open(map, curahPKSBMKGTEMINABUAN);
  });

  var curahUnipaGunungMeja = new google.maps.Marker({
    position: { lat: -0.83621, lng: 134.0728778 },
    map: map,
    icon: {
      url: '/assets/img/curah.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });

  curahUnipaGunungMeja.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>PCH Unipa Gunung Meja (Kab. Manokwari)</b>',
    });
    infowindow.open(map, curahUnipaGunungMeja);
  });

  var curahWarmareKantorDistrik = new google.maps.Marker({
    position: { lat: -0.9722734924226074, lng: 133.94772833702555 },
    map: map,
    icon: {
      url: '/assets/img/curah.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });

  curahWarmareKantorDistrik.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>PCH Warmare Kantor Distrik (Kab. Manokwari)</b>',
    });
    infowindow.open(map, curahWarmareKantorDistrik);
  });

  var curahOransbariSDMasabui = new google.maps.Marker({
    position: { lat: -1.20466, lng: 134.1877361 },
    map: map,
    icon: {
      url: '/assets/img/curah.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });

  curahOransbariSDMasabui.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>PCH Oransbari SD Masabui (Kab. Manokwari Selatan)</b>',
    });
    infowindow.open(map, curahOransbariSDMasabui);
  });

  var curahRansikiKantorDistrik = new google.maps.Marker({
    position: { lat: -1.50171, lng: 134.1713667 },
    map: map,
    icon: {
      url: '/assets/img/curah.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });

  curahRansikiKantorDistrik.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>PCH Ransiki Kantor Distrik (Kab. Manokwari Selatan)</b>',
    });
    infowindow.open(map, curahRansikiKantorDistrik);
  });

  var curahPKSBMKGBINTUNI = new google.maps.Marker({
    position: { lat: -2.10185, lng: 133.513922 },
    map: map,
    icon: {
      url: '/assets/img/curah.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });

  curahPKSBMKGBINTUNI.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>PCH PKS BMKG BINTUNI (Kab. Teluk Bintuni)</b>',
    });
    infowindow.open(map, curahPKSBMKGBINTUNI);
  });

  var curahDistrikFakfakTengah = new google.maps.Marker({
    position: { lat: -2.924417, lng: 132.33461 },
    map: map,
    icon: {
      url: '/assets/img/curah.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });

  curahDistrikFakfakTengah.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>PCH K. Distrik Fakfak Tengah (Kab. Fakfak)</b>',
    });
    infowindow.open(map, curahDistrikFakfakTengah);
  });

  var curahMbimaJaya = new google.maps.Marker({
    position: { lat: -2.82763, lng: 133.01054 },
    map: map,
    icon: {
      url: '/assets/img/curah.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });

  curahMbimaJaya.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>PCH Mbima Jaya (Kab. Fakfak)</b>',
    });
    infowindow.open(map, curahMbimaJaya);
  });

  var curahSipuiSanduai = new google.maps.Marker({
    position: { lat: -2.71406, lng: 134.5066444 },
    map: map,
    icon: {
      url: '/assets/img/curah.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });

  curahSipuiSanduai.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>PCH Sipui Sanduai (Kab. Teluk Wondama)</b>',
    });
    infowindow.open(map, curahSipuiSanduai);
  });

  var curahKantorDinasPU_Wondama = new google.maps.Marker({
    position: { lat: -2.8275437520684203, lng: 134.5383617802229 },
    map: map,
    icon: {
      url: '/assets/img/curah.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });

  curahKantorDinasPU_Wondama.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>PCH Kantor Dinas PU (Kab. Teluk Wondama)</b>',
    });
    infowindow.open(map, curahKantorDinasPU_Wondama);
  });

  var curahTanggaromi = new google.maps.Marker({
    position: { lat: -3.473975, lng: 133.626883 },
    map: map,
    icon: {
      url: '/assets/img/curah.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });

  curahTanggaromi.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>PCH Tanggaromi (Kab. Kaimana)</b>',
    });
    infowindow.open(map, curahTanggaromi);
  });

  var curahKantorDinasPU = new google.maps.Marker({
    position: { lat: -3.63961, lng: 133.74118 },
    map: map,
    icon: {
      url: '/assets/img/curah.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });

  curahKantorDinasPU.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>PCH Kantor Dinas PU (Kab. Kaimana)</b>',
    });
    infowindow.open(map, curahKantorDinasPU);
  });

  //BWS Papua
  var curahPKSBMKGWARSABIAKNUMFOR = new google.maps.Marker({
    position: { lat: -1.1906883563144877, lng: 136.10357379718226 },
    map: map,
    icon: {
      url: '/assets/img/curah.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });

  curahPKSBMKGWARSABIAKNUMFOR.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>PCH PKS BMKG WARSA BIAK NUMFOR</b>',
    });
    infowindow.open(map, curahPKSBMKGWARSABIAKNUMFOR);
  });

  var curahPKSBMKGWAROPENBAWAHWAROPEN = new google.maps.Marker({
    position: { lat: -2.242917, lng: 136.382028 },
    map: map,
    icon: {
      url: '/assets/img/curah.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  curahPKSBMKGWAROPENBAWAHWAROPEN.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>PCH PKS BMKG WAROPEN BAWAH WAROPEN</b>',
    });
    infowindow.open(map, curahPKSBMKGWAROPENBAWAHWAROPEN);
  });

  var curahPKSBMKGBONGGOSARMI = new google.maps.Marker({
    position: { lat: -2.3100417, lng: 139.5656139 },
    map: map,
    icon: {
      url: '/assets/img/curah.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  curahPKSBMKGBONGGOSARMI.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>PCH PKS BMKG BONGGO SARMI</b>',
    });
    infowindow.open(map, curahPKSBMKGBONGGOSARMI);
  });

  var curahNIMBOKRANG = new google.maps.Marker({
    position: { lat: -2.54975, lng: 140.132278 },
    map: map,
    icon: {
      url: '/assets/img/curah.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  curahNIMBOKRANG.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>PCH NIMBOKRANG</b>',
    });
    infowindow.open(map, curahNIMBOKRANG);
  });

  var curahPKSBMKGSKANTOKEEROM = new google.maps.Marker({
    position: { lat: -2.7831388889, lng: 140.0926111111 },
    map: map,
    icon: {
      url: '/assets/img/curah.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  curahPKSBMKGSKANTOKEEROM.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>PCH PKS BMKG SKANTO KEEROM</b>',
    });
    infowindow.open(map, curahPKSBMKGSKANTOKEEROM);
  });

  var curahMARIBU = new google.maps.Marker({
    position: { lat: -2.495833, lng: 140.373056 },
    map: map,
    icon: {
      url: '/assets/img/curah.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  curahMARIBU.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>PCH MARIBU</b>',
    });
    infowindow.open(map, curahMARIBU);
  });

  var curahIFARGUNUNG = new google.maps.Marker({
    position: { lat: -2.551417, lng: 140.546222 },
    map: map,
    icon: {
      url: '/assets/img/curah.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  curahIFARGUNUNG.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>PCH IFAR GUNUNG</b>',
    });
    infowindow.open(map, curahIFARGUNUNG);
  });

  var curahSTAIN = new google.maps.Marker({
    position: { lat: -2.578726, lng: 140.630266 },
    map: map,
    icon: {
      url: '/assets/img/curah.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  curahSTAIN.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>PCH STAIN</b>',
    });
    infowindow.open(map, curahSTAIN);
  });

  var curahPKSBMKGABEPURAKOTAJAYAPURA = new google.maps.Marker({
    position: { lat: -2.5977486, lng: 140.6829012 },
    map: map,
    icon: {
      url: '/assets/img/curah.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  curahPKSBMKGABEPURAKOTAJAYAPURA.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>PCH PKS BMKG ABEPURA KOTA JAYAPURA</b>',
    });
    infowindow.open(map, curahPKSBMKGABEPURAKOTAJAYAPURA);
  });

  var curahKOYATIMURKLIMATMANUAL = new google.maps.Marker({
    position: { lat: -2.674584, lng: 140.843623 },
    map: map,
    icon: {
      url: '/assets/img/curah.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  curahKOYATIMURKLIMATMANUAL.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>PCH KOYA TIMUR & KLIMAT MANUAL</b>',
    });
    infowindow.open(map, curahKOYATIMURKLIMATMANUAL);
  });

  var curahARSO9KLIMATMANUAL = new google.maps.Marker({
    position: { lat: -2.781972, lng: 140.656967 },
    map: map,
    icon: {
      url: '/assets/img/curah.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  curahARSO9KLIMATMANUAL.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>PCH ARSO 9 & KLIMAT MANUAL</b>',
    });
    infowindow.open(map, curahARSO9KLIMATMANUAL);
  });

  var curahARSOPIERIV = new google.maps.Marker({
    position: { lat: -2.999389, lng: 140.822056 },
    map: map,
    icon: {
      url: '/assets/img/curah.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  curahARSOPIERIV.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>PCH ARSO PIER IV</b>',
    });
    infowindow.open(map, curahARSOPIERIV);
  });

  //BBWS Citarum
  var curahCIPANCUH = new google.maps.Marker({
    position: { lat: -6.48961993348178, lng: 107.94748827532032 },
    map: map,
    icon: {
      url: '/assets/img/curah.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  curahCIPANCUH.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>PCH CIPANCUH</b>',
    });
    infowindow.open(map, curahCIPANCUH);
  });

  //Unit Hidrologi BBWS Citarum
  var curahTEMPURAN = new google.maps.Marker({
    position: { lat: -6.2945, lng: 107.473611 },
    map: map,
    icon: {
      url: '/assets/img/curah.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  curahTEMPURAN.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>PCH TEMPURAN</b>',
    });
    infowindow.open(map, curahTEMPURAN);
  });

  var curahCIHERANG = new google.maps.Marker({
    position: { lat: -6.581762, lng: 107.691647 },
    map: map,
    icon: {
      url: '/assets/img/curah.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  curahCIHERANG.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>PCH CIHERANG</b>',
    });
    infowindow.open(map, curahCIHERANG);
  });

  var curahCISAMPIH = new google.maps.Marker({
    position: { lat: -6.585828, lng: 107.706067 },
    map: map,
    icon: {
      url: '/assets/img/curah.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  curahCISAMPIH.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>PCH CISAMPIH</b>',
    });
    infowindow.open(map, curahCISAMPIH);
  });

  var curahCISALAK = new google.maps.Marker({
    position: { lat: -6.715302, lng: 107.74201 },
    map: map,
    icon: {
      url: '/assets/img/curah.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  curahCISALAK.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>PCH CISALAK</b>',
    });
    infowindow.open(map, curahCISALAK);
  });

  var curahMARGAHAYULEMBANG = new google.maps.Marker({
    position: { lat: -6.801456, lng: 107.648807 },
    map: map,
    icon: {
      url: '/assets/img/curah.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  curahMARGAHAYULEMBANG.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>PCH MARGAHAYU LEMBANG</b>',
    });
    infowindow.open(map, curahMARGAHAYULEMBANG);
  });

  var curahNGAMPRAH = new google.maps.Marker({
    position: { lat: -6.8315222, lng: 107.4991126 },
    map: map,
    icon: {
      url: '/assets/img/curah.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  curahNGAMPRAH.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>PCH NGAMPRAH</b>',
    });
    infowindow.open(map, curahNGAMPRAH);
  });

  var curahRONGGA = new google.maps.Marker({
    position: { lat: -6.985472, lng: 107.279639 },
    map: map,
    icon: {
      url: '/assets/img/curah.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  curahRONGGA.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>PCH RONGGA</b>',
    });
    infowindow.open(map, curahRONGGA);
  });

  var curahJATIHANDAP = new google.maps.Marker({
    position: { lat: -6.88908, lng: 107.66596 },
    map: map,
    icon: {
      url: '/assets/img/curah.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  curahJATIHANDAP.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>PCH JATIHANDAP (HIGERTECH)</b>',
    });
    infowindow.open(map, curahJATIHANDAP);
  });

  var curahCIBIRU = new google.maps.Marker({
    position: { lat: -6.916133, lng: 107.7168699 },
    map: map,
    icon: {
      url: '/assets/img/curah.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  curahCIBIRU.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>PCH CIBIRU</b>',
    });
    infowindow.open(map, curahCIBIRU);
  });

  var curahTANJUNGSARI = new google.maps.Marker({
    position: { lat: -6.9042362, lng: 107.7996542 },
    map: map,
    icon: {
      url: '/assets/img/curah.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  curahTANJUNGSARI.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>PCH TANJUNGSARI</b>',
    });
    infowindow.open(map, curahTANJUNGSARI);
  });

  var curahCIKANCUNG = new google.maps.Marker({
    position: { lat: -6.936139, lng: 107.785 },
    map: map,
    icon: {
      url: '/assets/img/curah.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  curahCIKANCUNG.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>PCH CIKANCUNG</b>',
    });
    infowindow.open(map, curahCIKANCUNG);
  });

  var curahARJASARI = new google.maps.Marker({
    position: { lat: -7.054875, lng: 107.656976 },
    map: map,
    icon: {
      url: '/assets/img/curah.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  curahARJASARI.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>PCH ARJASARI</b>',
    });
    infowindow.open(map, curahARJASARI);
  });

  var curahPASEH = new google.maps.Marker({
    position: { lat: -7.056617, lng: 107.763847 },
    map: map,
    icon: {
      url: '/assets/img/curah.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  curahPASEH.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>PCH PASEH</b>',
    });
    infowindow.open(map, curahPASEH);
  });

  var curahCINCHONA = new google.maps.Marker({
    position: { lat: -7.186419, lng: 107.577092 },
    map: map,
    icon: {
      url: '/assets/img/curah.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  curahCINCHONA.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>PCH CINCHONA</b>',
    });
    infowindow.open(map, curahCINCHONA);
  });

  var curahKERTAMANAH = new google.maps.Marker({
    position: { lat: -7.188865, lng: 107.605896 },
    map: map,
    icon: {
      url: '/assets/img/curah.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  curahKERTAMANAH.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>PCH KERTAMANAH</b>',
    });
    infowindow.open(map, curahKERTAMANAH);
  });

  var curahCISANTI = new google.maps.Marker({
    position: { lat: -7.209458, lng: 107.658638 },
    map: map,
    icon: {
      url: '/assets/img/curah.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  curahCISANTI.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>PCH CISANTI</b>',
    });
    infowindow.open(map, curahCISANTI);
  });

  var curahRANCAUPAS = new google.maps.Marker({
    position: { lat: -7.294875, lng: 107.75616 },
    map: map,
    icon: {
      url: '/assets/img/curah.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  curahRANCAUPAS.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>PCH RANCAUPAS</b>',
    });
    infowindow.open(map, curahRANCAUPAS);
  });

  //Jaga Balai
  var curahIBUN = new google.maps.Marker({
    position: { lat: -7.099045, lng: 107.763373 },
    map: map,
    icon: {
      url: '/assets/img/curah.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  curahIBUN.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>PCH IBUN</b>',
    });
    infowindow.open(map, curahIBUN);
  });

  var curahCIKITU = new google.maps.Marker({
    position: { lat: -7.142651, lng: 107.691972 },
    map: map,
    icon: {
      url: '/assets/img/curah.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  curahCIKITU.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>PCH CIKITU</b>',
    });
    infowindow.open(map, curahCIKITU);
  });

  var curahCIHAWUK = new google.maps.Marker({
    position: { lat: -7.185951, lng: 107.699982 },
    map: map,
    icon: {
      url: '/assets/img/curah.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  curahCIHAWUK.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>PCH CIHAWUK</b>',
    });
    infowindow.open(map, curahCIHAWUK);
  });

  //{{ POS PDA & PCH }}
  //Unit Hidrologi Kalteng
  var POSDUGAAIRDANHUJANTEWAH = new google.maps.Marker({
    position: { lat: -1.057794, lng: 113.735804 },
    map: map,
    icon: {
      url: '/assets/img/awlr.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  POSDUGAAIRDANHUJANTEWAH.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>POS DUGA AIR DAN HUJAN TEWAH</b>',
    });
    infowindow.open(map, POSDUGAAIRDANHUJANTEWAH);
  });

  var POSDUGAAIRDANHUJANKUALAKURUN = new google.maps.Marker({
    position: { lat: -1.102122, lng: 113.870991 },
    map: map,
    icon: {
      url: '/assets/img/awlr.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  POSDUGAAIRDANHUJANKUALAKURUN.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>POS DUGA AIR DAN HUJAN KUALA KURUN</b>',
    });
    infowindow.open(map, POSDUGAAIRDANHUJANKUALAKURUN);
  });

  var POSDUGAAIRDANHUJANTANGKILING = new google.maps.Marker({
    position: { lat: -1.960752, lng: 113.756039 },
    map: map,
    icon: {
      url: '/assets/img/awlr.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  POSDUGAAIRDANHUJANTANGKILING.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>POS DUGA AIR DAN HUJAN TANGKILING</b>',
    });
    infowindow.open(map, POSDUGAAIRDANHUJANTANGKILING);
  });

  var POSDUGAAIRDANHUJANBAHUPELAWA = new google.maps.Marker({
    position: { lat: -1.95497222, lng: 113.951803 },
    map: map,
    icon: {
      url: '/assets/img/awlr.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  POSDUGAAIRDANHUJANBAHUPELAWA.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>POS DUGA AIR DAN HUJAN BAHU PELAWA</b>',
    });
    infowindow.open(map, POSDUGAAIRDANHUJANBAHUPELAWA);
  });

  var POSDUGAAIRDANHUJANTMBRUNGAN = new google.maps.Marker({
    position: { lat: -2.170854, lng: 113.987687 },
    map: map,
    icon: {
      url: '/assets/img/awlr.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  POSDUGAAIRDANHUJANTMBRUNGAN.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>POS DUGA AIR DAN HUJAN TMB RUNGAN</b>',
    });
    infowindow.open(map, POSDUGAAIRDANHUJANTMBRUNGAN);
  });

  var POSDUGAAIRDANHUJANJABIREN = new google.maps.Marker({
    position: { lat: -2.520424, lng: 114.191998 },
    map: map,
    icon: {
      url: '/assets/img/awlr.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  POSDUGAAIRDANHUJANJABIREN.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>POS DUGA AIR DAN HUJAN JABIREN</b>',
    });
    infowindow.open(map, POSDUGAAIRDANHUJANJABIREN);
  });

  var POSDUGAAIRDANHUJANPAHAWAN = new google.maps.Marker({
    position: { lat: -2.40053611, lng: 112.187461 },
    map: map,
    icon: {
      url: '/assets/img/awlr.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  POSDUGAAIRDANHUJANPAHAWAN.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>POS DUGA AIR DAN HUJAN PAHAWAN</b>',
    });
    infowindow.open(map, POSDUGAAIRDANHUJANPAHAWAN);
  });

  var POSDUGAAIRDANHUJANPEMBUANGHULU1 = new google.maps.Marker({
    position: { lat: -2.50008056, lng: 112.133586 },
    map: map,
    icon: {
      url: '/assets/img/awlr.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  POSDUGAAIRDANHUJANPEMBUANGHULU1.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>POS DUGA AIR DAN HUJAN PEMBUANG HULU 1</b>',
    });
    infowindow.open(map, POSDUGAAIRDANHUJANPEMBUANGHULU1);
  });

  //BWS Kalimantan III
  var PDAPCHMARABAHAN = new google.maps.Marker({
    position: { lat: -2.9783, lng: 114.7766 },
    map: map,
    icon: {
      url: '/assets/img/awlr.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  PDAPCHMARABAHAN.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>PDA PCH MARABAHAN</b>',
    });
    infowindow.open(map, PDAPCHMARABAHAN);
  });

  //{{ POS KLIMATOLOGI }}
  //BWS Sumatera IV
  var AWSBUKITBERANGIN = new google.maps.Marker({
    position: { lat: 3.938748, lng: 108.3292 },
    map: map,
    icon: {
      url: '/assets/img/klimatologi.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  AWSBUKITBERANGIN.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>AWS BUKIT BERANGIN</b>',
    });
    infowindow.open(map, AWSBUKITBERANGIN);
  });

  var AWSKOLONGPONGKAR = new google.maps.Marker({
    position: { lat: 1.077798, lng: 103.379306 },
    map: map,
    icon: {
      url: '/assets/img/klimatologi.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  AWSKOLONGPONGKAR.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>AWS KOLONG PONGKAR</b>',
    });
    infowindow.open(map, AWSKOLONGPONGKAR);
  });

  var AWSBENDUNGANSEIGONG = new google.maps.Marker({
    position: { lat: 0.725292, lng: 104.219072 },
    map: map,
    icon: {
      url: '/assets/img/klimatologi.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  AWSBENDUNGANSEIGONG.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>AWS BENDUNGAN SEI GONG</b>',
    });
    infowindow.open(map, AWSBENDUNGANSEIGONG);
  });

  //BWS Bangka Belitung
  var AWSKOBA = new google.maps.Marker({
    position: { lat: -2.518236, lng: 106.42088 },
    map: map,
    icon: {
      url: '/assets/img/klimatologi.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  AWSKOBA.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>AWS KOBA</b>',
    });
    infowindow.open(map, AWSKOBA);
  });

  var AWSBENDUNGMETUKUL = new google.maps.Marker({
    position: { lat: -2.91227, lng: 106.409569 },
    map: map,
    icon: {
      url: '/assets/img/klimatologi.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  AWSBENDUNGMETUKUL.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>AWS BENDUNG METUKUL</b>',
    });
    infowindow.open(map, AWSBENDUNGMETUKUL);
  });

  var AWSBENDUNGPICEBESAR = new google.maps.Marker({
    position: { lat: -2.959072, lng: 108.164757 },
    map: map,
    icon: {
      url: '/assets/img/klimatologi.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  AWSBENDUNGPICEBESAR.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>AWS BENDUNG PICE BESAR</b>',
    });
    infowindow.open(map, AWSBENDUNGPICEBESAR);
  });

  //BWS Kalimantan III
  var AWSMUARATEWEH = new google.maps.Marker({
    position: { lat: -0.9480861592638232, lng: 114.90038504716269 },
    map: map,
    icon: {
      url: '/assets/img/klimatologi.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  AWSMUARATEWEH.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>AWS MUARA TEWEH</b>',
    });
    infowindow.open(map, AWSMUARATEWEH);
  });

  //BWS Maluku Utara
  var AWSDiKahoho = new google.maps.Marker({
    position: { lat: 0.4153209, lng: 127.7188269 },
    map: map,
    icon: {
      url: '/assets/img/klimatologi.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  AWSDiKahoho.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>AWS Di Kahoho</b>',
    });
    infowindow.open(map, AWSDiKahoho);
  });

  var AWSDiWairoro = new google.maps.Marker({
    position: { lat: 0.1646103, lng: 127.8895872 },
    map: map,
    icon: {
      url: '/assets/img/klimatologi.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });
  AWSDiWairoro.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>AWS Di Wairoro</b>',
    });
    infowindow.open(map, AWSDiWairoro);
  });

  // var AWSTutilingJaya = new google.maps.Marker({
  //   position: { lat: 0.1646103, lng: 127.8895872 },
  //   map: map,
  //   icon: {
  //     url: '/assets/img/klimatologi.png',
  //     scaledSize: new google.maps.Size(25, 35),
  //   },
  // });

  // AWSTutilingJaya.addListener('click', function () {
  //   var infowindow = new google.maps.InfoWindow({
  //     content: '<b>AWS Tutiling Jaya</b>',
  //   });
  //   infowindow.open(map, AWSTutilingJaya);
  // });

  //BWS Maluku
  var AWSWAILELA = new google.maps.Marker({
    position: { lat: -3.65975, lng: 128.1844889 },
    map: map,
    icon: {
      url: '/assets/img/klimatologi.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });

  AWSWAILELA.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>AWS WAI LELA</b>',
    });
    infowindow.open(map, AWSWAILELA);
  });

  var AWSHALONG = new google.maps.Marker({
    position: { lat: -3.669986111, lng: 128.2292444 },
    map: map,
    icon: {
      url: '/assets/img/klimatologi.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });

  AWSHALONG.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>AWS HALONG</b>',
    });
    infowindow.open(map, AWSHALONG);
  });

  //BWS Papua Barat
  var AWSPrafiSPVMacuan = new google.maps.Marker({
    position: { lat: -0.85401, lng: 133.7829361 },
    map: map,
    icon: {
      url: '/assets/img/klimatologi.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });

  AWSPrafiSPVMacuan.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>AWS Prafi SP V Macuan (Kab. Manokwari)</b>',
    });
    infowindow.open(map, AWSPrafiSPVMacuan);
  });

  var AWSORANSBARI = new google.maps.Marker({
    position: { lat: -1.314276, lng: 134.240062 },
    map: map,
    icon: {
      url: '/assets/img/klimatologi.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });

  AWSORANSBARI.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>AWS ORANSBARI</b>',
    });
    infowindow.open(map, AWSORANSBARI);
  });

  //BWS Papua
  var AWSRUSUNBWSPAPUA = new google.maps.Marker({
    position: { lat: -2.611108, lng: 140.678027 },
    map: map,
    icon: {
      url: '/assets/img/klimatologi.png',
      scaledSize: new google.maps.Size(25, 35),
    },
  });

  AWSRUSUNBWSPAPUA.addListener('click', function () {
    var infowindow = new google.maps.InfoWindow({
      content: '<b>AWS RUSUN BWS PAPUA</b>',
    });
    infowindow.open(map, AWSRUSUNBWSPAPUA);
  });

  //BWS Cimanuk Cisanggarung
  // var AWSSETUPATOK = new google.maps.Marker({
  //   position: { lat: -2.611108, lng: 140.678027 },
  //   map: map,
  //   icon: {
  //     url: '/assets/img/klimatologi.png',
  //     scaledSize: new google.maps.Size(25, 35),
  //   },
  // });

  // AWSSETUPATOK.addListener('click', function () {
  //   var infowindow = new google.maps.InfoWindow({
  //     content: '<b>AWS SETUPATOK</b>',
  //   });
  //   infowindow.open(map, AWSSETUPATOK);
  // });
}
