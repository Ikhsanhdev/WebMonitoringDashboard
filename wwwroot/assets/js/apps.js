// Inisialisasi peta
// var maps = L.map('maps').setView([-1.558, 118.707], 5);

// Tambahkan tile layer OSM
// L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
//   attribution: '&copy; <a href="http://higertech.com">Higertech</a>',
// }).addTo(maps);

//new google map api
function initMap() {
  var initialLocation = {lat: -1.558, lng: 118.707};
  var map = new google.maps.Map(document.getElementById('maps'), {
      zoom: 5,
      center: initialLocation
  });
  
  var marker = new google.maps.Marker({
      position: initialLocation,
      map: map
  });
}

var legendControl = L.control({ position: 'bottomright' });
legendControl.onAdd = function (maps) {
  var div = L.DomUtil.create('div', 'legend');
  div.innerHTML = `
    <div style="display: flex; align-items: center; padding: 5px; background-color: white;">
      <img src="/assets/img/duga.png" style="width: 20px; height: 25px; margin-right: 5px; border-radius: 50%;">
      <div font-weight: bold;">Pos Duga Air (PDA/AWLR)</div>
    </div>
    <div style="display: flex; align-items: center; padding: 5px; background-color: white;">
      <img src="/assets/img/curah.png" style="width: 20px; height: 25px; margin-right: 5px; border-radius: 50%;">
      <div font-weight: bold;">Pos Curah Hujan (PCH/ARR)</div>
    </div>
    <div style="display: flex; align-items: center; padding: 5px; background-color: white;">
      <img src="/assets/img/awlr.png" style="width: 20px; height: 25px; margin-right: 5px; border-radius: 50%;">
      <div font-weight: bold;">Pos PDA & PCH</div>
    </div>
    <div style="display: flex; align-items: center; padding: 5px; background-color: white;">
      <img src="/assets/img/klimatologi.png" style="width: 20px; height: 25px; margin-right: 5px; border-radius: 50%;">
      <div font-weight: bold;">Pos Klimatologi (AWS)</div>
    </div>
  `;
  return div;
};

legendControl.addTo(maps);

//{{ POS DUGA AIR }}
//BWS Sumatera IV
var dugaSEIBALOI = L.marker([1.122535, 104.017628], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/duga.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
dugaSEIBALOI.bindPopup('<b>AWLR SEI BALOI</b>');

var dugaWADUKJAGO = L.marker([1.079686, 104.253733], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/duga.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
dugaWADUKJAGO.bindPopup('<b>AWLR WADUK JAGO</b>');

var dugaSEIJERAM = L.marker([1.072273, 104.286197], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/duga.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
dugaSEIJERAM.bindPopup('<b>AWLR SEI JERAM</b>');

var dugaSEIGESEK = L.marker([0.975699, 104.557781], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/duga.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
dugaSEIGESEK.bindPopup('<b>AWLR SEI GESEK</b>');

var dugaKOLONGENAM = L.marker([0.850264, 104.591368], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/duga.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
dugaKOLONGENAM.bindPopup('<b>AWLR KOLONG ENAM</b>');

//Kerandin
var dugaJembatanGantungKerandin = L.marker([-0.2293477, 104.7468405], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/duga.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
dugaJembatanGantungKerandin.bindPopup('<b>AWLR Jembatan Gantung Kerandin</b>');

//BWS Bangka Belitung
var dugaAIRDAENG = L.marker([-2.0327841053780658, 105.17041498348578], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/duga.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
dugaAIRDAENG.bindPopup('<b>AWLR AIR DAENG</b>');

var dugaSUNGAIAIRRAYA = L.marker([-2.0647249248334734, 105.17781777446504], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/duga.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
dugaSUNGAIAIRRAYA.bindPopup('<b>AWLR SUNGAI AIR RAYA</b>');

var dugaPEDINDANG = L.marker([-2.151084, 106.102157], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/duga.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
dugaPEDINDANG.bindPopup('<b>AWLR PEDINDANG</b>');

var dugaKELUBI = L.marker([-2.83606938, 108.14638889], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/duga.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
dugaKELUBI.bindPopup('<b>AWLR KELUBI</b>');

//BWS Kalimantan I
var dugaKEMBAYAN = L.marker([0.547503, 110.415179], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/duga.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
dugaKEMBAYAN.bindPopup('<b>AWLR KEMBAYAN</b>');

var dugaMANGGU = L.marker([0.44497, 109.943254], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/duga.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
dugaMANGGU.bindPopup('<b>AWLR MANGGU (LANDAK)</b>');

var dugaSINTANG = L.marker([0.380786, 109.724477], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/duga.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
dugaSINTANG.bindPopup('<b>AWLR SINTANG (KRANJI)</b>');

var dugaTAYAN = L.marker([-0.037938, 110.121328], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/duga.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
dugaTAYAN.bindPopup('<b>AWLR TAYAN</b>');

//Dinas PUPR Kotawaringin
var dugaKOTAWARINGIN = L.marker([-2.6755341, 111.6471538], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/duga.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
dugaKOTAWARINGIN.bindPopup('<b>AWLR KOTAWARINGIN</b>');

//BWS Kalimantan IV
var dugaLONGIRAM = L.marker([-0.01725, 115.6255], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/duga.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
dugaLONGIRAM.bindPopup('<b>AWLR LONG IRAM</b>');

var dugaJONGGON = L.marker([-0.623161, 116.760109], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/duga.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
dugaJONGGON.bindPopup('<b>AWLR JONGGON</b>');

var dugaSELAMYULOKDAM = L.marker([-0.891416, 116.769326], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/duga.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
dugaSELAMYULOKDAM.bindPopup('<b>AWLR SELAMYU LOK DAM</b>');

var dugaSESULU = L.marker([-1.399028, 116.610389], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/duga.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
dugaSESULU.bindPopup('<b>AWLR SESULU</b>');

//BWS Kalimantan III
var dugaPATAS = L.marker([-1.536351, 115.160472], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/duga.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
dugaPATAS.bindPopup('<b>AWLR PATAS</b>');

var dugaTAMPA = L.marker([-1.9281, 115.1195], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/duga.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
dugaTAMPA.bindPopup('<b>AWLR TAMPA</b>');

var dugaHAYAPING = L.marker([-1.978235, 115.235837], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/duga.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
dugaHAYAPING.bindPopup('<b>AWLR HAYAPING</b>');

var dugaTANJUNG = L.marker([-2.1611469617766907, 115.38786243269593], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/duga.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
dugaTANJUNG.bindPopup('<b>AWLR TANJUNG</b>');

var dugaLAMPIHONG = L.marker([-2.3364, 115.377], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/duga.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
dugaLAMPIHONG.bindPopup('<b>AWLR LAMPIHONG</b>');

//BWS Sulawesi II
var dugaSGSUNGAIBOLANGOLONGALO = L.marker([0.667369861, 123.0788844], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/duga.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
dugaSGSUNGAIBOLANGOLONGALO.bindPopup('<b>AWLR SG SUNGAI BOLANGO LONGALO</b>');

var dugaSGSUNGAIBOLANGOBOIDU = L.marker([0.633991611, 123.0855828], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/duga.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
dugaSGSUNGAIBOLANGOBOIDU.bindPopup('<b>AWLR SG SUNGAI BOLANGO BOIDU</b>');

var dugaSGSUNGAIBOLANGOTELAGA = L.marker([0.57526125, 123.0443021], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/duga.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
dugaSGSUNGAIBOLANGOTELAGA.bindPopup('<b>AWLR SG SUNGAI BOLANGO TELAGA</b>');

var dugaSGSUNGAIBOLANGOMOLOSIPATw = L.marker([0.54213075, 123.0445228], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/duga.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
dugaSGSUNGAIBOLANGOMOLOSIPATw.bindPopup('<b>AWLR SG SUNGAI BOLANGO MOLOSIPAT w</b>');

var dugaSGSUNGAIALOPOHULIMEHU = L.marker([0.6162, 122.914867], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/duga.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
dugaSGSUNGAIALOPOHULIMEHU.bindPopup('<b>AWLR SG SUNGAI ALOPOHU LIMEHU</b>');

var dugaSGSUNGAIPAGUYAMANPARUNGI = L.marker([0.614959026, 122.6100698], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/duga.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
dugaSGSUNGAIPAGUYAMANPARUNGI.bindPopup('<b>AWLR SG SUNGAI PAGUYAMAN PARUNGI</b>');

//BBWS Pompengan Jeneberang
var dugaDERMAGABUMIBUNGPERMAI = L.marker([-5.1498982, 119.4873715], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/duga.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
dugaDERMAGABUMIBUNGPERMAI.bindPopup('<b>AWLR DERMAGA BUMI BUNG PERMAI</b>');

var dugaWADUKTUNGGUPAMPANG = L.marker([-5.1705565, 119.4649761], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/duga.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
dugaWADUKTUNGGUPAMPANG.bindPopup('<b>AWLR WADUK TUNGGU PAMPANG</b>');

var dugaNIPANIPASUNGAITALO = L.marker([-5.1637411, 119.5138554], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/duga.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
dugaNIPANIPASUNGAITALO.bindPopup('<b>AWLR NIPA NIPA SUNGAI TALO</b>');

var dugaNIPANIPASPILWAY = L.marker([-5.1664687, 119.5172682], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/duga.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
dugaNIPANIPASPILWAY.bindPopup('<b>AWLR NIPA NIPA SPILWAY</b>');

//BWS Maluku Utara
var dugaDanauDuma = L.marker([1.850316687, 127.7971494], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/duga.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
dugaDanauDuma.bindPopup('<b>AWLR Danau Duma</b>');

var dugaAkedaga = L.marker([1.125185297, 128.2003919], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/duga.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
dugaAkedaga.bindPopup('<b>AWLR Akedaga</b>');

//BWS Maluku
var dugaWAIRUHU = L.marker([-3.672005556, 128.2068583], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/duga.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
dugaWAIRUHU.bindPopup('<b>AWLR WAIRUHU</b>');

var dugaBATUMERAH = L.marker([-3.686219444, 128.1933639], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/duga.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
dugaBATUMERAH.bindPopup('<b>AWLR BATU MERAH</b>');

var dugaWAITOMUHULU = L.marker([-3.6965, 128.1997806], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/duga.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
dugaWAITOMUHULU.bindPopup('<b>AWLR WAI TOMU HULU</b>');

var dugaBATUGAJAH = L.marker([-3.706636111, 128.1912306], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/duga.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
dugaBATUGAJAH.bindPopup('<b>AWLR BATU GAJAH</b>');

//BWS Papua Barat
var dugaSungaiRemu = L.marker([-0.8725421, 131.2830909], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/duga.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
dugaSungaiRemu.bindPopup('<b>AWLR Sungai Remu</b>');

var dugaSUNGAIMARIATHILIR = L.marker([-0.99741, 131.31976], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/duga.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
dugaSUNGAIMARIATHILIR.bindPopup('<b>AWLR SUNGAI MARIAT HILIR</b>');

var dugaSUNGAIMARIATHULU = L.marker([-1.0066, 131.3385722], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/duga.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
dugaSUNGAIMARIATHULU.bindPopup('<b>AWLR SUNGAI MARIAT HULU</b>');

//BWS Papua
var dugaIFARBESAR = L.marker([-2.601962, 140.528297], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/duga.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
dugaIFARBESAR.bindPopup('<b>AWLR IFAR BESAR</b>');

var dugaJAIFURI = L.marker([-2.690296, 140.584435], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/duga.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
dugaJAIFURI.bindPopup('<b>AWLR JAIFURI</b>');

var dugaARSO12KEROM = L.marker([-2.791306, 140.707667], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/duga.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
dugaARSO12KEROM.bindPopup('<b>AWLR ARSO 12 KEROM</b>');

var dugaYETI = L.marker([-2.924111, 140.873806], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/duga.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
dugaYETI.bindPopup('<b>AWLR YETI</b>');

//Summarecon Bogor
var dugaSummareconBogor = L.marker([-6.623625, 106.846362], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/duga.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
dugaSummareconBogor.bindPopup('<b>AWLR Summarecon Bogor</b>');

//BBWS Cimanuk Cisanggarung
var dugaBENDUNGANBOLANG = L.marker([-6.53606, 108.20073], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/duga.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
dugaBENDUNGANBOLANG.bindPopup('<b>AWLR BENDUNGAN BOLANG</b>');

var dugaMALAHAYUINTAKE = L.marker([-7.03042, 108.81942], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/duga.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
dugaMALAHAYUINTAKE.bindPopup('<b>AWLR MALAHAYU INTAKE</b>');

//Unit Hidrologi BBWS Citarum
var dugaCIBURADUL = L.marker([-6.8539198, 107.4977187], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/duga.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
dugaCIBURADUL.bindPopup('<b>AWLR CIBURADUL</b>');

var dugaCIKERUH = L.marker([-6.9253838, 107.7802352], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/duga.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
dugaCIKERUH.bindPopup('<b>AWLR CIKERUH</b>');

//PUPR Kab.Bandung
var dugaCikeruh = L.marker([-6.9548761, 107.76954], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/duga.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
dugaCikeruh.bindPopup('<b>AWLR Cikeruh</b>');

var dugaCitarik = L.marker([-6.964654, 107.868185], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/duga.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
dugaCitarik.bindPopup('<b>AWLR Citarik</b>');

var dugaCiwidey = L.marker([-7.039873, 107.495965], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/duga.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
dugaCiwidey.bindPopup('<b>AWLR Ciwidey</b>');

var dugaMikroDASCirasea = L.marker([-7.0471744, 107.7275444], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/duga.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
dugaMikroDASCirasea.bindPopup('<b>AWLR Mikro DAS Cirasea</b>');

//BBWS Citarum
var dugaOUTLETNANJUNG = L.marker([-6.9379446, 107.5294872], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/duga.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
dugaOUTLETNANJUNG.bindPopup('<b>AWLR OUTLET NANJUNG (OUTLET)</b>');

var dugaSAPANOXBOW = L.marker([-6.992482, 107.7061], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/duga.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
dugaSAPANOXBOW.bindPopup('<b>AWLR SAPAN OXBOW (SUNGAI)</b>');

var dugaPARUNGHALANG = L.marker([-6.9769899, 107.6143694], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/duga.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
dugaPARUNGHALANG.bindPopup('<b>AWLR PARUNGHALANG (KOLAM)</b>');

var dugaFOLDERCIJAMBE = L.marker([-6.982255, 107.6014], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/duga.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
dugaFOLDERCIJAMBE.bindPopup('<b>AWLR FOLDER CIJAMBE (SUNGAI)</b>');

var dugaFOLDERCIJAMBE = L.marker([-6.9825468, 107.6013087], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/duga.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
dugaFOLDERCIJAMBE.bindPopup('<b>AWLR FOLDER CIJAMBE (KOLAM)</b>');

var dugaCIPALI = L.marker([-6.982554, 107.61908], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/duga.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
dugaCIPALI.bindPopup('<b>AWLR CIPAL I (KOLAM)</b>');

var dugaDIOUTLETANDIR = L.marker([-6.987413180431643, 107.61886922221129], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/duga.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
dugaDIOUTLETANDIR.bindPopup('<b>AWLR DI OUT LET ANDIR</b>');

var dugaAIRKOLAMRETENSIANDIR = L.marker([-6.9880345, 107.6189014], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/duga.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
dugaAIRKOLAMRETENSIANDIR.bindPopup('<b>AWLR AIR KOLAM RETENSI ANDIR</b>');

var dugaFOLDERCISANGKUY = L.marker([-6.9909566, 107.6252966], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/duga.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
dugaFOLDERCISANGKUY.bindPopup('<b>AWLR FOLDER CISANGKUY (SUNGAI)</b>');

var dugaCIEUNTEUNG = L.marker([-6.991843, 107.6275], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/duga.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
dugaCIEUNTEUNG.bindPopup('<b>AWLR CIEUNTEUNG</b>');

var dugaKOLAMRETENSICIEUNTEUNG = L.marker([-6.9920585, 107.6278582], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/duga.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
dugaKOLAMRETENSICIEUNTEUNG.bindPopup('<b>AWLR KOLAM RETENSI CIEUNTEUNG</b>');

var dugaOXBOWBOJONGSOANG = L.marker([-6.9900279, 107.6315948], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/duga.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
dugaOXBOWBOJONGSOANG.bindPopup('<b>AWLR OXBOW BOJONGSOANG (KOLAM)</b>');

var dugaFOLDERBOJONGSOANG = L.marker([-6.9906875, 107.6301875], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/duga.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
dugaFOLDERBOJONGSOANG.bindPopup('<b>AWLR FOLDER BOJONGSOANG (KOLAM)</b>');

//Dinas Sumber Daya Air Prov.Jabar
var dugaCiwulanSodong = L.marker([-7.5257627, 108.1879641], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/duga.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
dugaCiwulanSodong.bindPopup('<b>AWLR Ciwulan - Sodong</b>');

//{{ POS CURAH HUJAN }}
//BWS Sumatera VII
var curahbajak = L.marker([-3.703222, 102.489222], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/curah.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
curahbajak.bindPopup('<b>PCH Bajak</b>');

var curahnenggalo = L.marker([-2.746181, 101.340044], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/curah.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
curahnenggalo.bindPopup('<b>PCH Nenggalo</b>');

var curahsaribulan = L.marker([-2.6275, 101.2869], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/curah.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
curahsaribulan.bindPopup('<b>PCH Sari Bulan</b>');

var curahsidodadi = L.marker([-2.8905, 101.455], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/curah.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
curahsidodadi.bindPopup('<b>PCH Sidodadi</b>');

var curahsukamaju = L.marker([-4.368153, 103.065737], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/curah.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
curahsukamaju.bindPopup('<b>PCH Suka Maju</b>');

//Sumatera IV
var curahkarimun = L.marker([1.035023, 103.376256], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/curah.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
curahkarimun.bindPopup('<b>PCH Karimun</b>');

var curahsawang = L.marker([0.756814, 103.357878], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/curah.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
curahsawang.bindPopup('<b>PCH Sawang</b>');

var curahtelukradang = L.marker([0.801999, 103.443708], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/curah.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
curahtelukradang.bindPopup('<b>PCH Teluk Radang</b>');

var curahsagulung = L.marker([1.037306, 103.965778], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/curah.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
curahsagulung.bindPopup('<b>PCH Sagulung</b>');

var curahdaiklingga = L.marker([0.1227, 104.3554], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/curah.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
curahdaiklingga.bindPopup('<b>PCH Daik-Lingga</b>');

var curahjemajatimur = L.marker([2.926003, 105.73915], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/curah.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
curahjemajatimur.bindPopup('<b>PCH Jemaja Timur</b>');

var curahpalmatak = L.marker([3.334457, 106.257984], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/curah.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
curahpalmatak.bindPopup('<b>PCH Paltamak</b>');

var curahterempa = L.marker([3.16773, 106.231937], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/curah.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
curahterempa.bindPopup('<b>PCH Terempa</b>');

//Bangka Belitung
var curahmentok = L.marker([-2.058389, 105.203737], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/curah.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
curahmentok.bindPopup('<b>PCH Mentok</b>');

var curahsungaliat = L.marker([-1.863171, 106.102375], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/curah.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
curahsungaliat.bindPopup('<b>PCH Sungaliat</b>');

var curahpayung = L.marker([-2.603774, 106.137113], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/curah.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
curahpayung.bindPopup('<b>PCH Payung</b>');

var curahbadau = L.marker([-2.817029, 107.796064], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/curah.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
curahbadau.bindPopup('<b>PCH Badau</b>');

var curahmengkubang = L.marker([-2.785946, 108.209492], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/curah.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
curahmengkubang.bindPopup('<b>PCH Mengkubang</b>');

//BWS Kalimantan I
var curahkubu = L.marker([0.490235, 109.383067], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/curah.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
curahkubu.bindPopup('<b>PCH Kubu</b>');

var curahdabong = L.marker([0.556266, 109.287952], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/curah.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
curahdabong.bindPopup('<b>PCH Dabong</b>');

var curahngabang = L.marker([0.333198, 109.863519], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/curah.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
curahngabang.bindPopup('<b>PCH Ngabang</b>');

var curahpancaroba = L.marker([0.029136, 109.616305], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/curah.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
curahpancaroba.bindPopup('<b>PCH Pancaroba</b>');

var curahtebangkacang = L.marker([-0.191948, 109.469682], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/curah.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
curahtebangkacang.bindPopup('<b>PCH Tebang kacang</b>');

var curahbatuampar = L.marker([-0.74615, 109.537092], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/curah.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
curahbatuampar.bindPopup('<b>PCH Batu Ampar</b>');

//BWS Kalimantan III
var curahjaro = L.marker([-1.8345594, 115.6347436], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/curah.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
curahjaro.bindPopup('<b>PCH Jaro</b>');

var curahbendungpitap = L.marker([-2.446774, 115.543969], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/curah.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
curahbendungpitap.bindPopup('<b>PCH Bendung Pitap</b>');

var curahmantewe = L.marker([-3.2043268382960726, 115.66306749721332], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/curah.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
curahmantewe.bindPopup('<b>PCH Mantewe</b>');

var curahulm = L.marker([-3.296589, 114.587092], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/curah.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
curahulm.bindPopup('<b>PCH ULM</b>');

var curahtabakkanilan = L.marker([-3.296589, 115.587092], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/curah.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
curahtabakkanilan.bindPopup('<b>PCH Tabak Kanilan</b>');

//BWS Kalimantan IV
var curahlongbia = L.marker([2.7250395, 116.484864], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/curah.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
curahlongbia.bindPopup('<b>PCH Long Bia</b>');

var curahlongbangun = L.marker([0.5265398, 115.2198087], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/curah.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
curahlongbangun.bindPopup('<b>PCH Long Bangun</b>');

var curahkembangjanggut = L.marker([0.137222, 116.377583], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/curah.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
curahkembangjanggut.bindPopup('<b>PCH Kembang Janggut</b>');

var curahLONGIRAM = L.marker([-0.013611, 115.632194], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/curah.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
curahLONGIRAM.bindPopup('<b>PCH LONG IRAM</b>');

var curahkarangtunggal = L.marker([-0.407639, 117.092389], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/curah.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
curahkarangtunggal.bindPopup('<b>PCH Karang Tunggal</b>');

var curahsempaja = L.marker([-0.44115, 117.162611], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/curah.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
curahsempaja.bindPopup('<b>PCH Sempaja</b>');

var curahmassaping = L.marker([-0.63454, 117.028879], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/curah.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
curahmassaping.bindPopup('<b>PCH Massaping</b>');

var curahjonggon = L.marker([-0.619383, 116.748366], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/curah.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
curahjonggon.bindPopup('<b>PCH Jonggon</b>');

var curahnurserysuring = L.marker([-0.860778, 116.793611], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/curah.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
curahnurserysuring.bindPopup('<b>PCH Nursery Suring</b>');

var curahterunen = L.marker([-0.866944, 116.741556], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/curah.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
curahterunen.bindPopup('<b>PCH Terunen</b>');

var curahkarangjinawi = L.marker([-0.962306, 116.719306], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/curah.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
curahkarangjinawi.bindPopup('<b>PCH Karang Jinawi</b>');

var curahpamalauan = L.marker([-1.040582, 116.651543], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/curah.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
curahpamalauan.bindPopup('<b>PCH Pamalauan</b>');

var curahtenginbaru = L.marker([-0.912759, 116.818942], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/curah.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
curahtenginbaru.bindPopup('<b>PCH Tengin Baru</b>');

var curahbendunganteritip = L.marker([-1.1538808225478288, 116.98197917971397], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/curah.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
curahbendunganteritip.bindPopup('<b>PCH Bendungan Teritip</b>');

//Bendungan sepaku semoi
var curahkantorbendung = L.marker([-0.9081754, 116.84042404121914], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/curah.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
curahkantorbendung.bindPopup('<b>PCH Kantor bendung</b>');

var curahbendungansepakuhulu = L.marker([-0.9081754, 116.8359085], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/curah.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
curahbendungansepakuhulu.bindPopup('<b>PCH Bendungan Sepaku Hulu</b>');

//PUPR Kab.Kutai Timur
var curahkaubun = L.marker([1.032942, 117.768446], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/curah.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
curahkaubun.bindPopup('<b>PCH Kaubun</b>');

//BWS Sulawesi II
var curahMRGDASTOMBULILATOBUNGA = L.marker([0.32175, 123.34011], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/curah.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
curahMRGDASTOMBULILATOBUNGA.bindPopup('<b>PCH MRG DAS TOMBULILATO BUNGA</b>');

var curahMRGDASBOLANGOBONEPANGI = L.marker([0.508833333, 123.2464333], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/curah.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
curahMRGDASBOLANGOBONEPANGI.bindPopup('<b>PCH MRG DAS BOLANGO BONE PANGI</b>');

var curahMRGDASBOLANGOBONEALALE = L.marker([0.534091417, 123.1722614], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/curah.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
curahMRGDASBOLANGOBONEALALE.bindPopup('<b>PCH MRG DAS BOLANGO BONE ALALE</b>');

var curahMRGDASBOLANGOBONEDULAMAYOSELATAN = L.marker([0.702833333, 123.0395667], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/curah.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
curahMRGDASBOLANGOBONEDULAMAYOSELATAN.bindPopup('<b>PCH MRG DAS BOLANGO BONE DULAMAYO SELATAN</b>');

var curahMRGDASBOLANGOBONELONGALO = L.marker([0.662615722, 123.0776333], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/curah.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
curahMRGDASBOLANGOBONELONGALO.bindPopup('<b>PCH MRG DAS BOLANGO BONE LONGALO</b>');

var curahMRGDASBOLANGOBONEDUMATI = L.marker([0.6145, 123.0413], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/curah.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
curahMRGDASBOLANGOBONEDUMATI.bindPopup('<b>PCH MRG DAS BOLANGO BONE DUMATI</b>');

var curahMRGDASLIMBOTOOMBULO = L.marker([0.65118, 122.92196], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/curah.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
curahMRGDASLIMBOTOOMBULO.bindPopup('<b>PCH MRG DAS LIMBOTO OMBULO</b>');

var curahMRGDASLIMBOTOISIMURAYA = L.marker([0.650538, 122.863281], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/curah.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
curahMRGDASLIMBOTOISIMURAYA.bindPopup('<b>PCH MRG DAS LIMBOTO ISIMU RAYA</b>');

var curahMRGDASLIMBOTOBOTULIYODU = L.marker([0.558189, 122.7979], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/curah.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
curahMRGDASLIMBOTOBOTULIYODU.bindPopup('<b>PCH MRG DAS LIMBOTO BOTU LIYODU</b>');

var curahMRGDASPAGUYMANTANGKOBU = L.marker([0.620872224478473, 122.606075000193], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/curah.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
curahMRGDASPAGUYMANTANGKOBU.bindPopup('<b>PCH MRG DAS PAGUYMAN TANGKOBU</b>');

var curahMRGDASPAGUYAMANOLIMOHULO = L.marker([0.7675086431480521, 122.46194356869222], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/curah.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
curahMRGDASPAGUYAMANOLIMOHULO.bindPopup('<b>PCH MRG DAS PAGUYAMAN OLIMOHULO</b>');

var curahMRGDASTILAMUTAMODELOMO = L.marker([0.5301006495893843, 122.34634706619089], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/curah.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
curahMRGDASTILAMUTAMODELOMO.bindPopup('<b>PCH MRG DAS TILAMUTA MODELOMO</b>');

var curahMRGDASBUMBULANKARYABARU = L.marker([0.582863, 122.09928], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/curah.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
curahMRGDASBUMBULANKARYABARU.bindPopup('<b>PCH MRG DAS BUMBULAN KARYA BARU</b>');

var curahMRGDASRANDANGANLEMBAHPERMAI = L.marker([0.643053, 121.746423], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/curah.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
curahMRGDASRANDANGANLEMBAHPERMAI.bindPopup('<b>PCH MRG DAS RANDANGAN LEMBAH PERMAI</b>');

var curahMRGDASPOPAYATOMARISA = L.marker([0.56353, 121.45113], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/curah.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
curahMRGDASPOPAYATOMARISA.bindPopup('<b>PCH MRG DAS POPAYATO MARISA</b>');

var curahMRGDASSIDORUKUN = L.marker([0.54686, 121.74657], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/curah.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
curahMRGDASSIDORUKUN.bindPopup('<b>PCH MRG DAS SIDORUKUN</b>');

//BWS Sulawesi III
var curahkasoloang = L.marker([-1.009987, 119.505119], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/curah.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
curahkasoloang.bindPopup('<b>PCH Kasoloang</b>');

//BBWS Pompengan Jeneberang
var curahbungin = L.marker([-3.536305, 119.995714], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/curah.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
curahbungin.bindPopup('<b>PCH Bungin</b>');

//BWS Maluku Utara
var curahgalela = L.marker([1.79954816, 127.9011918], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/curah.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
curahgalela.bindPopup('<b>PCH Galela</b>');

var curahtobelo = L.marker([1.762005509, 127.9549328], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/curah.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
curahtobelo.bindPopup('<b>PCH Tobelo</b>');

var curahmacalele = L.marker([1.305305805, 128.5912592], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/curah.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
curahmacalele.bindPopup('<b>PCH Macalele</b>');

var curahdakaino = L.marker([1.096293833, 128.1943795], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/curah.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
curahdakaino.bindPopup('<b>PCH Dakaino</b>');

var curahembungsofifi = L.marker([0.7012248, 127.5915756], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/curah.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
curahembungsofifi.bindPopup('<b>PCH Embung Sofifi</b>');

var curahtubo = L.marker([0.79081667, 127.3749167], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/curah.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
curahtubo.bindPopup('<b>PCH Tubo</b>');

var curahdanaungade = L.marker([0.767226, 127.3486902], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/curah.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
curahdanaungade.bindPopup('<b>PCH Danau Ngade</b>');

//BWS Maluku
var curahairbuaya = L.marker([-3.087813889, 126.4367722], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/curah.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
curahairbuaya.bindPopup('<b>PCH Air Buaya</b>');

var curahwaekose = L.marker([-3.074288889, 126.5981417], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/curah.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
curahwaekose.bindPopup('<b>PCH Wae Kose</b>');

var curahsavanajaya = L.marker([-3.303888889, 127.0177778], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/curah.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
curahsavanajaya.bindPopup('<b>PCH Savanajaya</b>');

var curahwaegeren = L.marker([-3.401694444, 126.91235], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/curah.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
curahwaegeren.bindPopup('<b>PCH Wae Geren</b>');

var curahparbulu = L.marker([-3.43067222222222, 127.007891666666], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/curah.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
curahparbulu.bindPopup('<b>PCH Parbulu</b>');

var curahwaelo = L.marker([-3.439216667, 126.9460817], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/curah.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
curahwaelo.bindPopup('<b>PCH Wae Lo</b>');

var curahwaepamali = L.marker([-3.4944444444444445, 126.88333333333334], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/curah.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
curahwaepamali.bindPopup('<b>PCH Wae Pamali</b>');

var curahgemba = L.marker([-3.339638889, 128.3536389], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/curah.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
curahgemba.bindPopup('<b>PCH Gemba</b>');

var curahiain = L.marker([-3.681369444, 128.2296583], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/curah.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
curahiain.bindPopup('<b>PCH Iain</b>');

var curahbatumerah = L.marker([-3.691961111, 128.2086389], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/curah.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
curahbatumerah.bindPopup('<b>PCH Batu Merah</b>');

var curahkayutiga = L.marker([-3.697555556, 128.2003722], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/curah.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
curahkayutiga.bindPopup('<b>PCH Kayu Tiga</b>');

var curahkobisonta = L.marker([-2.989947222, 129.9213028], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/curah.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
curahkobisonta.bindPopup('<b>PCH Kobisonta</b>');

var curahkobi = L.marker([-3.065880556, 129.9024722], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/curah.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
curahkobi.bindPopup('<b>PCH Kobi</b>');

var curahmatakabo = L.marker([-3.050277778, 130.1441667], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/curah.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
curahmatakabo.bindPopup('<b>PCH Matakabo</b>');

var curahbubi = L.marker([-3.058197222, 130.26455], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/curah.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
curahbubi.bindPopup('<b>PCH Bubi</b>');

var curahbula = L.marker([-3.110622222, 130.515325], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/curah.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
curahbula.bindPopup('<b>PCH Bula</b>');

//BWS Papua Barat
var curahDistrikBonkawir = L.marker([-0.40723, 130.87292], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/curah.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
curahDistrikBonkawir.bindPopup('<b>PCH Distrik Bonkawir (Kab. Raja Ampat)</b>');

var curahBambuKuningKlammik = L.marker([-0.8902, 131.3429056], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/curah.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
curahBambuKuningKlammik.bindPopup('<b>PCH Km. 12 Bambu Kuning Klammik (Kota Sorong)</b>');

var curahKlamono = L.marker([-1.13294, 131.4782417], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/curah.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
curahKlamono.bindPopup('<b>PCH Klamono (Kab. Sorong)</b>');

var curahPKSBMKGFEF = L.marker([-0.7875, 132.420725], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/curah.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
curahPKSBMKGFEF.bindPopup('<b>PCH PKS BMKG FEF (Kab. Tambrauw)</b>');

var curahPKSBMKGTEMINABUAN = L.marker([-1.47557, 132.0720722], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/curah.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
curahPKSBMKGTEMINABUAN.bindPopup('<b>PCH PKS BMKG TEMINABUAN (Kab. Sorong Selatan)</b>');

var curahUnipaGunungMeja = L.marker([-0.83621, 134.0728778], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/curah.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
curahUnipaGunungMeja.bindPopup('<b>PCH Unipa Gunung Meja (Kab. Manokwari)</b>');

var curahWarmareKantorDistrik = L.marker([-0.9722734924226074, 133.94772833702555], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/curah.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
curahWarmareKantorDistrik.bindPopup('<b>PCH Warmare Kantor Distrik (Kab. Manokwari)</b>');

var curahOransbariSDMasabui = L.marker([-1.20466, 134.1877361], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/curah.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
curahOransbariSDMasabui.bindPopup('<b>PCH Oransbari SD Masabui (Kab. Manokwari Selatan)</b>');

var curahRansikiKantorDistrik = L.marker([-1.50171, 134.1713667], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/curah.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
curahRansikiKantorDistrik.bindPopup('<b>PCH Ransiki Kantor Distrik (Kab. Manokwari Selatan)</b>');

var curahPKSBMKGBINTUNI = L.marker([-2.10185, 133.513922], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/curah.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
curahPKSBMKGBINTUNI.bindPopup('<b>PCH PKS BMKG BINTUNI (Kab. Teluk Bintuni)</b>');

var curahDistrikFakfakTengah = L.marker([-2.924417, 132.33461], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/curah.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
curahDistrikFakfakTengah.bindPopup('<b>PCH K. Distrik Fakfak Tengah (Kab. Fakfak)</b>');

var curahMbimaJaya = L.marker([-2.82763, 133.01054], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/curah.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
curahMbimaJaya.bindPopup('<b>PCH Mbima Jaya (Kab. Fakfak)</b>');

var curahSipuiSanduai = L.marker([-2.71406, 134.5066444], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/curah.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
curahSipuiSanduai.bindPopup('<b>PCH Sipui Sanduai (Kab. Teluk Wondama)</b>');

var curahKantorDinasPU = L.marker([-2.8275437520684203, 134.5383617802229], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/curah.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
curahKantorDinasPU.bindPopup('<b>PCH Kantor Dinas PU (Kab. Teluk Wondama)</b>');

var curahTanggaromi = L.marker([-3.473975, 133.626883], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/curah.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
curahTanggaromi.bindPopup('<b>PCH Tanggaromi (Kab. Kaimana)</b>');

var curahKantorDinasPU = L.marker([-3.63961, 133.74118], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/curah.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
curahKantorDinasPU.bindPopup('<b>PCH Kantor Dinas PU (Kab. Kaimana)</b>');

//BWS Papua
var curahPKSBMKGWARSABIAKNUMFOR = L.marker([-1.1906883563144877, 136.10357379718226], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/curah.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
curahPKSBMKGWARSABIAKNUMFOR.bindPopup('<b>PCH PKS BMKG WARSA BIAK NUMFOR</b>');

var curahPKSBMKGWAROPENBAWAHWAROPEN = L.marker([-2.242917, 136.382028], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/curah.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
curahPKSBMKGWAROPENBAWAHWAROPEN.bindPopup('<b>PCH PKS BMKG WAROPEN BAWAH WAROPEN</b>');

var curahPKSBMKGBONGGOSARMI = L.marker([-2.3100417, 139.5656139], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/curah.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
curahPKSBMKGBONGGOSARMI.bindPopup('<b>PCH PKS BMKG BONGGO SARMI</b>');

var curahNIMBOKRANG = L.marker([-2.54975, 140.132278], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/curah.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
curahNIMBOKRANG.bindPopup('<b>PCH NIMBOKRANG</b>');

var curahPKSBMKGSKANTOKEEROM = L.marker([-2.7831388889, 140.0926111111], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/curah.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
curahPKSBMKGSKANTOKEEROM.bindPopup('<b>PCH PKS BMKG SKANTO KEEROM</b>');

var curahMARIBU = L.marker([-2.495833, 140.373056], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/curah.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
curahMARIBU.bindPopup('<b>PCH MARIBU</b>');

var curahIFARGUNUNG = L.marker([-2.551417, 140.546222], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/curah.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
curahIFARGUNUNG.bindPopup('<b>PCH IFAR GUNUNG</b>');

var curahSTAIN = L.marker([-2.578726, 140.630266], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/curah.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
curahSTAIN.bindPopup('<b>PCH STAIN</b>');

var curahPKSBMKGABEPURAKOTAJAYAPURA = L.marker([-2.5977486, 140.6829012], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/curah.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
curahPKSBMKGABEPURAKOTAJAYAPURA.bindPopup('<b>PCH PKS BMKG ABEPURA KOTA JAYAPURA</b>');

var curahKOYATIMURKLIMATMANUAL = L.marker([-2.674584, 140.843623], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/curah.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
curahKOYATIMURKLIMATMANUAL.bindPopup('<b>PCH KOYA TIMUR & KLIMAT MANUAL</b>');

var curahARSO9KLIMATMANUAL = L.marker([-2.781972, 140.656967], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/curah.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
curahARSO9KLIMATMANUAL.bindPopup('<b>PCH ARSO 9 & KLIMAT MANUAL</b>');

var curahARSOPIERIV = L.marker([-2.999389, 140.822056], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/curah.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
curahARSOPIERIV.bindPopup('<b>PCH ARSO PIER IV</b>');

//BBWS Citarum
var curahCIPANCUH = L.marker([-6.48961993348178, 107.94748827532032], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/curah.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
curahCIPANCUH.bindPopup('<b>PCH CIPANCUH</b>');

//Unit Hidrologi BBWS Citarum
var curahTEMPURAN = L.marker([-6.2945, 107.473611], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/curah.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
curahTEMPURAN.bindPopup('<b>PCH TEMPURAN</b>');

var curahCIHERANG = L.marker([-6.581762, 107.691647], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/curah.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
curahCIHERANG.bindPopup('<b>PCH CIHERANG</b>');

var curahCISAMPIH = L.marker([-6.585828, 107.706067], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/curah.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
curahCISAMPIH.bindPopup('<b>PCH CISAMPIH</b>');

var curahCISALAK = L.marker([-6.715302, 107.74201], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/curah.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
curahCISALAK.bindPopup('<b>PCH CISALAK</b>');

var curahMARGAHAYULEMBANG = L.marker([-6.801456, 107.648807], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/curah.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
curahMARGAHAYULEMBANG.bindPopup('<b>PCH MARGAHAYU LEMBANG</b>');

var curahNGAMPRAH = L.marker([-6.8315222, 107.4991126], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/curah.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
curahNGAMPRAH.bindPopup('<b>PCH NGAMPRAH</b>');

var curahRONGGA = L.marker([-6.985472, 107.279639], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/curah.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
curahRONGGA.bindPopup('<b>PCH RONGGA</b>');

var curahJATIHANDAP = L.marker([-6.88908, 107.66596], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/curah.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
curahJATIHANDAP.bindPopup('<b>PCH JATIHANDAP (HIGERTECH)</b>');

var curahCIBIRU = L.marker([-6.916133, 107.7168699], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/curah.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
curahCIBIRU.bindPopup('<b>PCH CIBIRU</b>');

var curahTANJUNGSARI = L.marker([-6.9042362, 107.7996542], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/curah.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
curahTANJUNGSARI.bindPopup('<b>PCH TANJUNGSARI</b>');

var curahCIKANCUNG = L.marker([-6.936139, 107.785], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/curah.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
curahCIKANCUNG.bindPopup('<b>PCH CIKANCUNG</b>');

var curahARJASARI = L.marker([-7.054875, 107.656976], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/curah.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
curahARJASARI.bindPopup('<b>PCH ARJASARI</b>');

var curahPASEH = L.marker([-7.056617, 107.763847], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/curah.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
curahPASEH.bindPopup('<b>PCH PASEH</b>');

var curahCINCHONA = L.marker([-7.186419, 107.577092], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/curah.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
curahCINCHONA.bindPopup('<b>PCH CINCHONA</b>');

var curahKERTAMANAH = L.marker([-7.188865, 107.605896], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/curah.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
curahKERTAMANAH.bindPopup('<b>PCH KERTAMANAH</b>');

var curahCISANTI = L.marker([-7.209458, 107.658638], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/curah.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
curahCISANTI.bindPopup('<b>PCH CISANTI</b>');

var curahRANCAUPAS = L.marker([-7.294875, 107.75616], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/curah.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
curahRANCAUPAS.bindPopup('<b>PCH RANCAUPAS</b>');

//Jaga Balai
var curahIBUN = L.marker([-7.099045, 107.763373], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/curah.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
curahIBUN.bindPopup('<b>PCH IBUN</b>');

var curahCIKITU = L.marker([-7.142651, 107.691972], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/curah.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
curahCIKITU.bindPopup('<b>PCH CIKITU</b>');

var curahCIHAWUK = L.marker([-7.185951, 107.699982], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/curah.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
curahCIHAWUK.bindPopup('<b>PCH CIHAWUK</b>');

//{{ POS PDA & PCH }}
//Unit Hidrologi Kalteng
var POSDUGAAIRDANHUJANTEWAH = L.marker([-1.057794, 113.735804], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/awlr.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
POSDUGAAIRDANHUJANTEWAH.bindPopup('<b>POS DUGA AIR DAN HUJAN TEWAH</b>');

var POSDUGAAIRDANHUJANKUALAKURUN = L.marker([-1.102122, 113.870991], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/awlr.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
POSDUGAAIRDANHUJANKUALAKURUN.bindPopup('<b>POS DUGA AIR DAN HUJAN KUALA KURUN</b>');

var POSDUGAAIRDANHUJANTANGKILING = L.marker([-1.960752, 113.756039], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/awlr.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
POSDUGAAIRDANHUJANTANGKILING.bindPopup('<b>POS DUGA AIR DAN HUJAN TANGKILING</b>');

var POSDUGAAIRDANHUJANBAHUPELAWA = L.marker([-1.95497222, 113.951803], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/awlr.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
POSDUGAAIRDANHUJANBAHUPELAWA.bindPopup('<b>POS DUGA AIR DAN HUJAN BAHU PELAWA</b>');

var POSDUGAAIRDANHUJANTMBRUNGAN = L.marker([-2.170854, 113.987687], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/awlr.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
POSDUGAAIRDANHUJANTMBRUNGAN.bindPopup('<b>POS DUGA AIR DAN HUJAN TMB RUNGAN</b>');

var POSDUGAAIRDANHUJANJABIREN = L.marker([-2.520424, 114.191998], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/awlr.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
POSDUGAAIRDANHUJANJABIREN.bindPopup('<b>POS DUGA AIR DAN HUJAN JABIREN</b>');

var POSDUGAAIRDANHUJANPAHAWAN = L.marker([-2.40053611, 112.187461], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/awlr.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
POSDUGAAIRDANHUJANPAHAWAN.bindPopup('<b>POS DUGA AIR DAN HUJAN PAHAWAN</b>');

var POSDUGAAIRDANHUJANPEMBUANGHULU1 = L.marker([-2.50008056, 112.133586], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/awlr.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
POSDUGAAIRDANHUJANPEMBUANGHULU1.bindPopup('<b>POS DUGA AIR DAN HUJAN  PEMBUANG HULU 1</b>');

//BWS Kalimantan III
var PDAPCHMARABAHAN = L.marker([-2.9783, 114.7766], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/awlr.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
PDAPCHMARABAHAN.bindPopup('<b>PDA PCH MARABAHAN</b>');

//{{ POS KLIMATOLOGI }}
//BWS Sumatera IV
var AWSBUKITBERANGIN = L.marker([3.938748, 108.3292], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/klimatologi.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
AWSBUKITBERANGIN.bindPopup('<b>AWS BUKIT BERANGIN</b>');

var AWSKOLONGPONGKAR = L.marker([1.077798, 103.379306], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/klimatologi.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
AWSKOLONGPONGKAR.bindPopup('<b>AWS KOLONG PONGKAR</b>');

var AWSBENDUNGANSEIGONG = L.marker([0.725292, 104.219072], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/klimatologi.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
AWSBENDUNGANSEIGONG.bindPopup('<b>AWS BENDUNGAN SEI GONG</b>');

//BWS Bangka Belitung
var AWSKOBA = L.marker([-2.518236, 106.42088], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/klimatologi.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
AWSKOBA.bindPopup('<b>AWS KOBA</b>');

var AWSBENDUNGMETUKUL = L.marker([-2.91227, 106.409569], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/klimatologi.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
AWSBENDUNGMETUKUL.bindPopup('<b>AWS BENDUNG METUKUL</b>');

var AWSBENDUNGPICEBESAR = L.marker([-2.959072, 108.164757], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/klimatologi.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
AWSBENDUNGPICEBESAR.bindPopup('<b>AWS BENDUNG PICE BESAR</b>');

//BWS Kalimantan III
var AWSMUARATEWEH = L.marker([-0.9480861592638232, 114.90038504716269], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/klimatologi.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
AWSMUARATEWEH.bindPopup('<b>AWS MUARA TEWEH</b>');

//BWS Maluku Utara
var AWSDiKahoho = L.marker([0.4153209, 127.7188269], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/klimatologi.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
AWSDiKahoho.bindPopup('<b>AWS Di Kahoho</b>');

var AWSDiWairoro = L.marker([0.1646103, 127.8895872], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/klimatologi.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
AWSDiWairoro.bindPopup('<b>AWS Di Wairoro</b>');

// var AWSTutilingJaya = L.marker([0.1646103, 127.8895872], {
//   icon: L.divIcon({
//     className: 'custom-icon',
//     html: '<img src="/assets/img/klimatologi.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
//   }),
// }).addTo(maps);
// AWSTutilingJaya.bindPopup('<b>AWS Tutiling Jaya</b>');

//BWS Maluku
var AWSWAILELA = L.marker([-3.65975, 128.1844889], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/klimatologi.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
AWSWAILELA.bindPopup('<b>AWS WAI LELA</b>');

var AWSHALONG = L.marker([-3.669986111, 128.2292444], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/klimatologi.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
AWSHALONG.bindPopup('<b>AWS HALONG</b>');

//BWS Papua Barat
var AWSPrafiSPVMacuan = L.marker([-0.85401, 133.7829361], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/klimatologi.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
AWSPrafiSPVMacuan.bindPopup('<b>AWS Prafi SP V Macuan (Kab. Manokwari)</b>');

var AWSORANSBARI = L.marker([-1.314276, 134.240062], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/klimatologi.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
AWSORANSBARI.bindPopup('<b>AWS ORANSBARI</b>');

//BWS Papua
var AWSRUSUNBWSPAPUA = L.marker([-2.611108, 140.678027], {
  icon: L.divIcon({
    className: 'custom-icon',
    html: '<img src="/assets/img/klimatologi.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
  }),
}).addTo(maps);
AWSRUSUNBWSPAPUA.bindPopup('<b>AWS RUSUN BWS PAPUA</b>');

//BWS Cimanuk Cisanggarung
// var AWSSETUPATOK = L.marker([-2.611108, 140.678027], {
//   icon: L.divIcon({
//     className: 'custom-icon',
//     html: '<img src="/assets/img/klimatologi.png" style="transform: rotate(0deg); width: 25px; height: 35px;">',
//   }),
// }).addTo(maps);
// AWSSETUPATOK.bindPopup('<b>AWS SETUPATOK</b>');
