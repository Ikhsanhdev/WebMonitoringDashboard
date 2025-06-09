using System;
using System.Net;
using System.Linq;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using System.Threading;
using menyala.Models;
using Menyala.Data;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using menyala.Controllers;
using Newtonsoft.Json.Linq;
using Microsoft.AspNetCore.Authorization;
using System.Globalization;

public class ApiController : Controller
{
    private readonly HttpClient _httpClient;
    private readonly AppDbContext _context;

    public ApiController(AppDbContext context) {
        _httpClient = new HttpClient();
        _httpClient.BaseAddress = new System.Uri("http://live2.higertech.com");
        _context = context;
    }

    public class ApiResponse
    {
        public IEnumerable<Api> Data { get; set; }
    }

    [Authorize]
    public async Task<IActionResult> Index()
    {
        return View();
    }

    [Authorize]
    public async Task<IActionResult> Detail()
    {
        return View();
    }

    [Authorize]
    public async Task<IActionResult> JsonDetail()
    {
        return View();
    }

    [Authorize]
    public async Task<IActionResult> TotalPos()
    {
        return View();
    }
    
    [Authorize]
    public async Task<IActionResult> TotalOnline()
    {
        return View();
    }

    [Authorize]
    public async Task<IActionResult> TotalOffline()
    {
        return View();
    }

[HttpPost]
public async Task<IActionResult> GetList()
{
    try
    {
        var draw = int.Parse(Request.Form["draw"].FirstOrDefault());
        var start = int.Parse(Request.Form["start"].FirstOrDefault());
        var length = int.Parse(Request.Form["length"].FirstOrDefault());
        var sortColumn = Request.Form["columns[" + Request.Form["order[0][column]"].FirstOrDefault() + "][name]"].FirstOrDefault();
        var sortColumnDirection = Request.Form["order[0][dir]"].FirstOrDefault();
        var searchValue = Request.Form["search[value]"].FirstOrDefault();

        // Call your API and get data
        var apiResponse = await GetDataFromApi();
        Console.WriteLine(apiResponse);

        if (apiResponse == null || !apiResponse.Any())
        {
            return Json(new DataTableResult<Api>
            {
                draw = draw,
                recordsTotal = 0,
                recordsFiltered = 0,
                data = new List<Api>()
            });
        }

        // Filtering
        var filteredData = apiResponse.Where(a =>
            (string.IsNullOrEmpty(searchValue) ||
                a.balaiName.Contains(searchValue) ||
                a.subDomainOld.Contains(searchValue) ||
                a.subDomain.Contains(searchValue) ||
                a.jumlahPos.ToString().Contains(searchValue) ||
                a.jumlahPosOnline.ToString().Contains(searchValue) ||
                a.jumlahPosOffline.ToString().Contains(searchValue) ||
                a.organizationCode.Contains(searchValue) ||
                a.deviceId.Contains(searchValue))
        ).ToList();

        var today = DateTime.Today;

        // Grouping and calculating aggregated values
        var groupedData = filteredData
            .GroupBy(a => new { 
                a.balaiName, 
                a.organizationCode,
                a.subDomain,    // Tambahkan ini
                a.subDomainOld // Dan ini
            })
            .Select(g => new Api
            {
                balaiName = g.Key.balaiName,
                organizationCode = g.Key.organizationCode,
                subDomain = g.Key.subDomain,       // Masukkan ke hasil
                subDomainOld = g.Key.subDomainOld, // Masukkan ke hasil
                jumlahPos = g.Count(),

                // Hitung jumlahPosOnline berdasarkan readingAt
                jumlahPosOnline = g.Count(p =>
                    (p.stationType.ToLower() == "arr" && p.arrLastReading?.readingAt?.Date == today) ||
                    (p.stationType.ToLower() == "awlr" && p.awlrLastReading?.readingAt?.Date == today) ||
                    (p.stationType.ToLower() == "aws" && p.awsLastReading?.readingAt?.Date == today) ||
                    (p.stationType.ToLower() == "awlr_arr" && p.awlrArrLastReading?.readingAt?.Date == today)
                ),

                // Hitung jumlahPosOffline berdasarkan readingAt
                jumlahPosOffline = g.Count(p =>
                    (p.stationType.ToLower() == "arr" && (p.arrLastReading?.readingAt == null || p.arrLastReading?.readingAt?.Date < today)) ||
                    (p.stationType.ToLower() == "awlr" && (p.awlrLastReading?.readingAt == null || p.awlrLastReading?.readingAt?.Date < today)) ||
                    (p.stationType.ToLower() == "aws" && (p.awsLastReading?.readingAt == null || p.awsLastReading?.readingAt?.Date < today)) ||
                    (p.stationType.ToLower() == "awlr_arr" && (p.awlrArrLastReading?.readingAt == null || p.awlrArrLastReading?.readingAt?.Date < today))
                ),
            })
            .ToList();

        // Paging
        var result = new DataTableResult<Api>
        {
            draw = draw,
            recordsTotal = apiResponse.Count(),
            recordsFiltered = groupedData.Count(),
            data = groupedData.Skip(start).Take(length).ToList()
        };

        var nomorColumn = start + 1;
        result.data.ForEach(item =>
        {
            item.nomor = nomorColumn;
            nomorColumn++;
        });

        return Json(result);
    }
    catch (Exception ex)
    {
        // Logging error
        Console.WriteLine($"Error: {ex.Message}");
        return Json(new DataTableResult<Api>
        {
            draw = 0,
            recordsTotal = 0,
            recordsFiltered = 0,
            data = new List<Api>()
        });
    }
}

    private async Task<List<Api>> GetDataFromApi()
    {
        string apiUrl = "http://localhost:5000/LastReading/all";
        string username = "m0n1tor_st4tion";
        string password = "H1gertech.1dua3";

        using (HttpClient client = new HttpClient())
        {
            var credentials = Convert.ToBase64String(Encoding.ASCII.GetBytes($"{username}:{password}"));
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", credentials);
            HttpResponseMessage response = await client.GetAsync(apiUrl);

            if (response.IsSuccessStatusCode)
            {
                string responseData = await response.Content.ReadAsStringAsync();
                var apiResponse = JsonConvert.DeserializeObject<ApiResponse>(responseData);
                return apiResponse?.Data?.ToList() ?? new List<Api>();
            }
            else
            {
                // Handle errors appropriately
                return new List<Api>();
            }
        }
    }

    [HttpPost]
    public async Task<IActionResult> GetTotalData(string totalType)
    {
        try
        {
            var apiResponse = await GetDataFromApi();

            if (apiResponse == null)
            {
                // Jika respons API null, kembalikan total 0
                return Json(new { Total = 0 });
            }

            int total = 0;
            var today = DateTime.Today; // Menyimpan tanggal hari ini

            switch (totalType.ToLower())
            {
                case "totalpos":
                    total = apiResponse.Count();
                    break;
                case "totalinstansi":
                    total = apiResponse.Select(a => a.subDomain).Distinct().Count();
                    break;
                case "totaldugaair":
                    total = apiResponse.Count(a => a.stationType == "AWLR" || a.stationType == "AWLR_ARR");
                    break;
                case "totalcurahhujan":
                    total = apiResponse.Count(a => a.stationType == "ARR" || a.stationType == "AWLR_ARR");
                    break;
                case "totalklimatologi":
                    total = apiResponse.Count(a => a.stationType == "AWS");
                    break;
                case "totalonline":
                    total = apiResponse.Count(a =>
                        (a.stationType == "ARR" && a.arrLastReading?.readingAt?.Date == today) ||
                        (a.stationType == "AWLR" && a.awlrLastReading?.readingAt?.Date == today) ||
                        (a.stationType == "AWS" && a.awsLastReading?.readingAt?.Date == today) ||
                        (a.stationType == "AWLR_ARR" && a.awlrArrLastReading?.readingAt?.Date == today)
                    );
                    break;
                case "totaloffline":
                    total = apiResponse.Count(a =>
                        (a.stationType == "ARR" && (a.arrLastReading?.readingAt == null || a.arrLastReading?.readingAt?.Date < today)) ||
                        (a.stationType == "AWLR" && (a.awlrLastReading?.readingAt == null || a.awlrLastReading?.readingAt?.Date < today)) ||
                        (a.stationType == "AWS" && (a.awsLastReading?.readingAt == null || a.awsLastReading?.readingAt?.Date < today)) ||
                        (a.stationType == "AWLR_ARR" && (a.awlrArrLastReading?.readingAt == null || a.awlrArrLastReading?.readingAt?.Date < today))
                    );
                    break;
                default:
                    // Jika totalType tidak valid, kembalikan total 0
                    total = 0;
                    break;
            }

            return Json(new { Total = total });
        }
        catch (Exception ex)
        {
            // Handle exception
            Console.WriteLine(ex.Message);
            return Json(new { Total = 0 });
        }
    }

    private async Task<dynamic> GetDataApi(string endPoint){
        
        string apiUrl = $"http://localhost:5000/{endPoint}"; 
        string username = "m0n1tor_st4tion";
        string password = "H1gertech.1dua3";

        using (HttpClient client = new HttpClient())
        {
            // Set up basic authentication credentials
            string authHeaderValue = Convert.ToBase64String(System.Text.Encoding.ASCII.GetBytes($"{username}:{password}"));
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", authHeaderValue);

            try
            {
                HttpResponseMessage response = await client.GetAsync(apiUrl);
                if (response.IsSuccessStatusCode)
                {
                    string responseData = await response.Content.ReadAsStringAsync();
                    // Deserialize the response data to a JSON string
                    string jsonResponse = Newtonsoft.Json.JsonConvert.SerializeObject(responseData);
                    return responseData; // Output the JSON string
                }
                else
                {
                    return response.StatusCode;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"An error occurred: {ex.Message}");
                return ex.Message;
            }
        }
    }

    [HttpGet]
    public ActionResult GetLastUpdateTime()
    {
        // Get the last update time from your data source
        var lastUpdateTime = DateTime.Now; // Replace with logic as needed

        // Return the last update time in an appropriate format
        return Json(new { lastUpdateTime = lastUpdateTime.ToString("yyyy-MM-ddTHH:mm:ss") });
    }
    
    [HttpGet]
    public async Task<JsonResult> GetStationByOrgCode(string orgCode){
        string endPoint = $"LastReading/Organization/{orgCode}";
        var data = await GetDataApi(endPoint);
        return Json(data);
    }
     public async Task<JsonResult> GetStationAll(){
        string endPoint = $"LastReading/all/";
        var data = await GetDataApi(endPoint);
        return Json(data);
    }

    [HttpPost]
    public async Task<IActionResult> SendMessageBpbdBdg(string deviceId, string number) {
        string apiUrl = "https://wa.higertech.com/send/message";

        try {
            using(HttpClient client = new HttpClient()) {
                string endPointData = $"LastReading/Device/{deviceId}";
                var deviceData = await GetDataApi(endPointData);

                if (string.IsNullOrEmpty(deviceData)) {
                    return StatusCode(500, "Respons API kosong atau tidak valid");
                }

                var stationData = JObject.Parse(deviceData);
                var result = stationData["data"];

                if (result == null) {
                    return StatusCode(500, "Data tidak ditemukan dalam respons API");
                }

                var lastReading = result["awlrLastReading"] as JObject;
                if (lastReading == null) {
                    return StatusCode(500, "Data 'awlrLastReading' tidak ditemukan dalam respons API");
                }

                string readingAtRaw = lastReading?["readingAt"]?.ToString();
                string formattedDate = "Tidak tersedia";
                if (!string.IsNullOrEmpty(readingAtRaw) && DateTime.TryParse(readingAtRaw, out DateTime readingAt)) {
                    formattedDate = readingAt.ToString("d MMMM yyyy HH:mm", new CultureInfo("id-ID"));
                }

                if(lastReading["waterLevel"] < result["siaga3"]) {
                    Console.WriteLine("Tidak Ada Siaga !");
                    return StatusCode(200, "Sukses tidak ada siaga !");
                } else if(lastReading["waterLevel"] >= result["siaga3"]) {
                    string siagaLogo = "";
                    string ketSiaga = "";
                    switch (lastReading["warningStatus"]) {
                        case "Siaga 1":
                            siagaLogo = "🔴";
                            ketSiaga = "AWAS";
                            break;
                        case "Siaga 2":
                            siagaLogo = "🟠";
                            ketSiaga = "SIAGA";
                            break;
                        case "Siaga 3":
                            siagaLogo = "🟡";
                            ketSiaga = "WASPADA";
                            break;
                    }
                    string msg = $"{siagaLogo} *[Status: {ketSiaga ?? "Tidak tersedia"}]* \n";
                    msg += "\n";
                    msg += $"Nama Pos : *{result?["name"]?.ToString() ?? "Tidak tersedia"}* \n";
                    msg += $"Device : *{result?["brandName"]?.ToString() ?? "Tidak tersedia"} - {result?["deviceId"]?.ToString() ?? "Tidak tersedia"}* \n";
                    msg += $"Waktu : *{formattedDate} WIB* \n";
                    msg += $"Tinggi Muka Air : *{lastReading?["waterLevel"]?.ToString() ?? "Tidak tersedia"} m*";

                    msg = msg.Replace("\n", "\\n");

                    string jsonBody = $@"{{ 
                        ""phone"" : ""{number}"",
                        ""message"" : ""{msg}""
                    }}";

                    var content = new StringContent(jsonBody, Encoding.UTF8, "application/json");

                    HttpResponseMessage response = await client.PostAsync(apiUrl, content);

                    if(response.IsSuccessStatusCode) {
                        string apiResponse = await response.Content.ReadAsStringAsync();
                        Console.WriteLine("API Response:");
                        Console.WriteLine(apiResponse);
                        return Ok(apiResponse);
                    } else {
                        Console.WriteLine($"Error: {response.StatusCode} - {response.ReasonPhrase}");
                        return StatusCode((int)response.StatusCode);
                    }
                }
            }
        } catch(Exception ex)  {
            Console.WriteLine($"An error occurred: {ex.Message}");
            return StatusCode(500, "An error occurred");
        }

        return StatusCode(500, "Fatal Error !");
    }

    [HttpPost]
    public async Task<IActionResult> SendMessageToApi(string orgCode, string number) {
        string apiUrl = "https://wa.higertech.com/send/message";

        try {
            using (HttpClient client = new HttpClient()) {
                string endPointData = $"LastReading/Organization/{orgCode}";
                var organizationData = await GetDataApi(endPointData);
                var stationData = JsonConvert.DeserializeObject<ApiResponse>(organizationData.ToString());
                var result = stationData.Data;

                int lengthPos = result?.Count ?? 0;
                int lengthOnline = 0;
                int lengthOffline = 0;

                DateTime currentDate = DateTime.Now;
                string today = currentDate.ToString("dd/MM/yyyy HH:mm");

                // Pesan
                string msg = "Selamat Pagi\n";
                msg += "Bapak/Ibu Yth,\n";
                msg += "Kami informasikan rekapitulasi data pos :\n";

                var dataList = result as List<Api>;
                if (dataList != null) {
                    var offlineDevices = new List<Api>();

                    // Loop untuk menentukan perangkat online atau offline
                    foreach (var item in dataList) {
                        DateTime? readingAt = null;

                        // Tentukan readingAt berdasarkan tipe station
                        switch (item.stationType)
                        {
                            case "AWS":
                                readingAt = item.awsLastReading?.readingAt;
                                break;
                            case "AWLR":
                                readingAt = item.awlrLastReading?.readingAt;
                                break;
                            case "ARR":
                                readingAt = item.arrLastReading?.readingAt;
                                break;
                            case "AWLR_ARR":
                                readingAt = item.awlrArrLastReading?.readingAt;
                                break;
                            case "WQ":
                                readingAt = item.waterQualityLastReading?.readingAt;
                                break;
                        }

                        // Klasifikasi online atau offline
                        if (readingAt.HasValue && readingAt.Value.Date >= DateTime.Today) {
                            lengthOnline++;
                        } else {
                            lengthOffline++;
                            offlineDevices.Add(item);
                        }
                    }

                    // Update pesan dengan perhitungan online/offline
                    msg += $"Dari *Total* : {lengthPos} pos, \n";
                    msg += $"*Online* : {lengthOnline} pos, \n";
                    msg += $"*Offline* : {lengthOffline} pos, \n";
                    msg += $"Di Tanggal  : {today}\n";
                    msg += $"Instansi : {result[0].balaiName}\n";
                    msg += $"Website  : https://{result[0].subDomain}.higertech.com\n";

                    var i = 1;
                    if (offlineDevices.Count > 0) {
                        foreach (var device in offlineDevices) {
                            string lastReading ; // Default jika readingAt tidak ditemukan
                            
                            // Ambil readingAt yang sesuai
                            DateTime? deviceReadingAt = null;
                            switch (device.stationType)
                            {
                                case "AWS":
                                    deviceReadingAt = device.awsLastReading?.readingAt;
                                    break;
                                case "AWLR":
                                    deviceReadingAt = device.awlrLastReading?.readingAt;
                                    break;
                                case "ARR":
                                    deviceReadingAt = device.arrLastReading?.readingAt;
                                    break;
                                case "AWLR_ARR":
                                    deviceReadingAt = device.awlrArrLastReading?.readingAt;
                                    break;
                                case "WQ":
                                    deviceReadingAt = device.waterQualityLastReading?.readingAt;
                                    break;
                            }

                            // Tentukan lastReading berdasarkan kondisi
                            if (!deviceReadingAt.HasValue) {
                                // Jika readingAt null atau lebih dari 6 bulan yang lalu
                                lastReading = "lebih dari 6 bulan";
                            } else {
                                // Konversi tanggal dan waktu jika ada readingAt
                                lastReading = deviceReadingAt.Value.ToLocalTime().ToString("dd/MM/yyyy, HH:mm:ss");
                            }

                            // Tambahkan informasi perangkat offline ke pesan
                            msg += $"{i}. {device.name} ({device.deviceId}) Alat tidak mengirim data sejak, {lastReading}\n";
                            i++;
                        }
                    } else {
                        msg += "Keterangan : Alat Aktif Semua\n";
                    }
                } else {
                    Console.WriteLine("Failed to cast data to List<Api>.");
                }

                msg += "Sekian kami sampaikan, untuk informasi lebih lanjut hubungi \n";
                msg += "081120217941 (admin CS teknis Higertech)\n";
                msg += "Terima Kasih 🙏🏻.";

                // Format pesan dengan karakter escape untuk baris baru
                msg = msg.Replace("\n", "\\n");

                string jsonBody = $@"{{
                    ""phone"" : ""{number}"",
                    ""message"": ""{msg}""
                }}";

                // Buat konten untuk POST request
                var content = new StringContent(jsonBody, Encoding.UTF8, "application/json");

                // Kirim POST request
                HttpResponseMessage response = await client.PostAsync(apiUrl, content);

                // Periksa status respons
                if (response.IsSuccessStatusCode) {
                    string apiResponse = await response.Content.ReadAsStringAsync();
                    Console.WriteLine("API Response:");
                    Console.WriteLine(apiResponse);
                    return Ok(apiResponse);
                } else {
                    Console.WriteLine($"Error: {response.StatusCode} - {response.ReasonPhrase}");
                    return StatusCode((int)response.StatusCode);
                }
            }
        } catch (Exception ex) {
            Console.WriteLine($"An error occurred: {ex.Message}");
            return StatusCode(500, "An error occurred");
        }
    }

    [HttpPost]
    public async Task<IActionResult> SendMessageToLog(string orgCode, string number) {
        string apiUrl = "https://wa.higertech.com/send/message";

        try {
            using (HttpClient client = new HttpClient()) {
                string endPointData = $"LastReading/Organization/{orgCode}";
                var organizationData = await GetDataApi(endPointData);
                var stationData = JsonConvert.DeserializeObject<ApiResponse>(organizationData.ToString());
                var result = stationData.Data;

                int lengthPos = result?.Count ?? 0;
                int lengthOnline = 0;
                int lengthOffline = 0;

                DateTime currentDate = DateTime.Now;
                string today = currentDate.ToString("dd/MM/yyyy HH:mm");

            // Ambil semua data PIC terkait orgCode
            var picDataList = _context.pic.Where(p => p.orgCode == orgCode).ToList();
            if (picDataList == null || picDataList.Count == 0)
            {
                return NotFound($"Tidak ditemukan data PIC untuk orgCode: {orgCode}");
            }

                // Pesan
                string msg = "Selamat Pagi\n";
                msg += "Bapak/Ibu Yth,\n";
                msg += "Kami informasikan rekapitulasi data pos :\n";

                var dataList = result as List<Api>;
                if (dataList != null) {
                    var offlineDevices = new List<Api>();

                    // Loop untuk menentukan perangkat online atau offline
                    foreach (var item in dataList) {
                        DateTime? readingAt = null;

                        // Tentukan readingAt berdasarkan tipe station
                        switch (item.stationType) {
                            case "AWS":
                                readingAt = item.awsLastReading?.readingAt;
                                break;
                            case "AWLR":
                                readingAt = item.awlrLastReading?.readingAt;
                                break;
                            case "ARR":
                                readingAt = item.arrLastReading?.readingAt;
                                break;
                            case "AWLR_ARR":
                                readingAt = item.awlrArrLastReading?.readingAt;
                                break;
                        }

                        // Klasifikasi online atau offline
                        if (readingAt.HasValue && readingAt.Value.Date >= DateTime.Today) {
                            lengthOnline++;
                        } else {
                            lengthOffline++;
                            offlineDevices.Add(item);
                        }
                    }

                    // Update pesan dengan perhitungan online/offline
                    msg += $"Dari *Total* : {lengthPos} pos, \n";
                    msg += $"*Online* : {lengthOnline} pos, \n";
                    msg += $"*Offline* : {lengthOffline} pos, \n";
                    msg += $"Di Tanggal  : {today}\n";
                    msg += $"Instansi : {result[0].balaiName}\n";
                    msg += $"Website  : https://{result[0].subDomain}.higertech.com\n";

                    var i = 1;
                    if (offlineDevices.Count > 0) {
                        foreach (var device in offlineDevices) {
                            string lastReading ; // Default jika readingAt tidak ditemukan
                            
                            // Ambil readingAt yang sesuai
                            DateTime? deviceReadingAt = null;
                            switch (device.stationType) {
                                case "AWS":
                                    deviceReadingAt = device.awsLastReading?.readingAt;
                                    break;
                                case "AWLR":
                                    deviceReadingAt = device.awlrLastReading?.readingAt;
                                    break;
                                case "ARR":
                                    deviceReadingAt = device.arrLastReading?.readingAt;
                                    break;
                                case "AWLR_ARR":
                                    deviceReadingAt = device.awlrArrLastReading?.readingAt;
                                    break;
                            }

                    // Tentukan lastReading berdasarkan kondisi
                    if (!deviceReadingAt.HasValue) {
                        // Jika readingAt null atau lebih dari 6 bulan yang lalu
                        lastReading = "lebih dari 6 bulan";
                    } else {
                        // Konversi tanggal dan waktu jika ada readingAt
                        lastReading = deviceReadingAt.Value.ToLocalTime().ToString("dd/MM/yyyy, HH:mm:ss");
                    }

                    // Tambahkan informasi perangkat offline ke pesan
                    msg += $"{i}. {device.slug} Alat tidak mengirim data sejak, {lastReading}\n";
                    i++;
                }
            } else {
                msg += "Keterangan : Alat Aktif Semua\n";
            }
                } else {
                    Console.WriteLine("Failed to cast data to List<Api>.");
                }

                msg += "Sekian kami sampaikan, untuk informasi lebih lanjut hubungi \n";
                msg += "081120217941 (admin CS teknis Higertech)\n";
                msg += "Terima Kasih 🙏🏻.\n";
                msg += $"Pesan ini telah terkirim ke balai {result[0].balaiName} melalui PIC berikut:\n";
                foreach (var picData in picDataList)
                {
                    string noPic = picData.no_pic ?? "Tidak ada nomor";
                    msg += $"- PIC-{picData.pic}: {noPic}\n";
                }

                // Format pesan dengan karakter escape untuk baris baru
                msg = msg.Replace("\n", "\\n");

                string jsonBody = $@"{{
                    ""phone"" : ""{number}"",
                    ""message"": ""{msg}""
                }}";

                // Buat konten untuk POST request
                var content = new StringContent(jsonBody, Encoding.UTF8, "application/json");

                // Kirim POST request
                HttpResponseMessage response = await client.PostAsync(apiUrl, content);

                // Periksa status respons
                if (response.IsSuccessStatusCode) {
                    string apiResponse = await response.Content.ReadAsStringAsync();
                    Console.WriteLine("API Response:");
                    Console.WriteLine(apiResponse);
                    return Ok(apiResponse);
                } else {
                    Console.WriteLine($"Error: {response.StatusCode} - {response.ReasonPhrase}");
                    return StatusCode((int)response.StatusCode);
                }
            }
        } catch (Exception ex) {
            Console.WriteLine($"An error occurred: {ex.Message}");
            return StatusCode(500, "An error occurred");
        }
    }

    [HttpGet("print-pic-data")]
    public void PrintPicData()
    {
        try
        {
            // Ambil data dari tabel Pics
            var picData = _context.pic
                .Select(p => new 
                {
                    OrgCode = p.orgCode,
                    NoPic = p.no_pic,
                    Pic = p.pic
                })
                .ToList();

            // Jika data ditemukan, tampilkan di console
            if (picData.Any())
            {
                foreach (var data in picData)
                {
                    Console.WriteLine($"OrgCode: {data.OrgCode}, NoPic: {data.NoPic}, Pic: {data.Pic}");
                }
            }
            else
            {
                Console.WriteLine("No data found in the database.");
            }
        }
        catch (Exception ex)
        {
            // Log error jika terjadi
            Console.WriteLine($"An error occurred: {ex.Message}");
        }
    }


    [HttpPost]
    public async Task<IActionResult> SendMessageGroup(string orgCode, string number) {
        string apiUrl = "https://wa.higertech.com/send-group";
        string username = "higertech";
        string password = "1234";

        try {
            using (HttpClient client = new HttpClient()) {
                string endPointData = $"Station/Organization/{orgCode}";
                var organizationData = await GetDataApi(endPointData);
                var stationData = JsonConvert.DeserializeObject<ApiResponse>(organizationData.ToString());
                var result = stationData.Data;

                int lengthPos = result?.Count ?? 0;

                DateTime currentDate = DateTime.Now;
                string today = currentDate.ToString("dd/MM/yyyy HH:mm");

                //message
                string msg = "Selamat Pagi\n";
                msg += "Bapak/Ibu Yth,\n";
                msg += $"Dari total {lengthPos} pos, kami informasikan rekapitulasi data pos offline :\n";
                msg += $"Tanggal  : {today}\n";
                msg += $"Instansi : {result[0].balaiName}\n";
                msg += $"Website  : https://{result[0].subDomain}.higertech.com\n";

                var i = 1;
                var dataList = result as List<Api>;
                if (dataList != null) {
                    var offlineDevices = dataList.Where(item => item.deviceStatus == "offline").ToList();

                    if (offlineDevices.Count > 0) {
                        foreach(var device in offlineDevices) {
                            string lastReading = device.lastReadingAt?.ToString("dd/MM/yyyy, HH:mm:ss") ?? "00/00/0000, 00:00";

                            msg += $"{i}. {device.slug} Alat tidak mengirim data, {lastReading} localtime\n";
                            i++;
                        }
                    } else {
                        msg += "Keterangan : Alat Aktif Semua\n";
                    }
                } else {
                    Console.WriteLine("Failed to cast data to YourItemType[].");
                }

                msg += "Sekian kami sampaikan, untuk informasi lebih lanjut hubungi 081120217941 (admin CS teknis Higertech)\n";
                msg += "Terima Kasih 🙏🏻.";

                msg = msg.Replace("\n", "\\n");

                string jsonBody = $@"{{
                    ""number"" : ""{number}"",
                    ""message"": ""{msg}""
                }}";

                // Set authentication header
                string authHeaderValue = Convert.ToBase64String(System.Text.Encoding.ASCII.GetBytes($"{username}:{password}"));
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", authHeaderValue);

                // Create content for POST request
                var content = new StringContent(jsonBody, Encoding.UTF8, "application/json");

                // Send POST request
                HttpResponseMessage response = await client.PostAsync(apiUrl, content);

                if (response.IsSuccessStatusCode) {
                    string apiResponse = await response.Content.ReadAsStringAsync();
                    Console.WriteLine("API Response:");
                    Console.WriteLine(apiResponse);
                    return Ok(apiResponse);
                } else {
                    Console.WriteLine($"Error: {response.StatusCode} - {response.ReasonPhrase}");
                    return StatusCode((int)response.StatusCode);
                }
            }
        } catch(Exception ex) {
            Console.WriteLine($"An error occurred: {ex.Message}");
            return StatusCode(500, "An error occurred");
        }
    }

    [HttpPost]
    public async Task<IActionResult> SendChannel(string orgCode, string channelId) {
        string apiUrl = "https://wa.higertech.com/send-channel";
        string username = "higertech";
        string password = "1234";

        try {
            using (HttpClient client = new HttpClient()) {
                string endPointData = $"Station/Organization/{orgCode}";
                var organizationData = await GetDataApi(endPointData);
                var stationData = JsonConvert.DeserializeObject<ApiResponse>(organizationData.ToString());
                var result = stationData.Data;

                int lengthPos = result?.Count ?? 0;

                DateTime currentDate = DateTime.Now;
                string today = currentDate.ToString("dd/MM/yyyy HH:mm");

                //message
                string msg = "Selamat Pagi\n";
                msg += "Bapak/Ibu Yth,\n";
                msg += $"Dari total {lengthPos} pos, kami informasikan rekapitulasi data pos offline :\n";
                msg += $"Tanggal  : {today}\n";
                msg += $"Instansi : {result[0].balaiName}\n";
                msg += $"Website  : https://{result[0].subDomain}.higertech.com\n";

                var i = 1;
                var dataList = result as List<Api>;
                if (dataList != null) {
                    var offlineDevices = dataList.Where(item => item.deviceStatus == "offline").ToList();

                    if (offlineDevices.Count > 0) {
                        foreach(var device in offlineDevices) {
                            string lastReading = device.lastReadingAt?.ToString("dd/MM/yyyy, HH:mm:ss") ?? "00/00/0000, 00:00";

                            msg += $"{i}. {device.slug} Alat tidak mengirim data, {lastReading} localtime\n";
                            i++;
                        }
                    } else {
                        msg += "Keterangan : Alat Aktif Semua\n";
                    }
                } else {
                    Console.WriteLine("Failed to cast data to YourItemType[].");
                }

                msg += "Sekian kami sampaikan, untuk informasi lebih lanjut hubungi 081120217941 (admin CS teknis Higertech)\n";
                msg += "Terima Kasih 🙏🏻.";

                msg = msg.Replace("\n", "\\n");

                string jsonBody = $@"{{
                    ""id"" : ""{channelId}"",
                    ""message"": ""{msg}""
                }}";

                 // Set authentication header
                string authHeaderValue = Convert.ToBase64String(System.Text.Encoding.ASCII.GetBytes($"{username}:{password}"));
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", authHeaderValue);

                // Create content for POST request
                var content = new StringContent(jsonBody, Encoding.UTF8, "application/json");

                // Send POST request
                HttpResponseMessage response = await client.PostAsync(apiUrl, content);

                if (response.IsSuccessStatusCode) {
                    string apiResponse = await response.Content.ReadAsStringAsync();
                    Console.WriteLine("API Response:");
                    Console.WriteLine(apiResponse);
                    return Ok(apiResponse);
                } else {
                    Console.WriteLine($"Error: {response.StatusCode} - {response.ReasonPhrase}");
                    return StatusCode((int)response.StatusCode);
                }
            }
        } catch(Exception ex) {
            Console.WriteLine($"An error occurred: {ex.Message}");
            return StatusCode(500, "An error occurred");
        }
    }

    [HttpPost]
    public async Task<IActionResult> SendGroup(string number, string msg) {
        string apiUrl = "https://wa.higertech.com/send-group";
        string username = "higertech";
        string password = "1234";

        try {
            using (HttpClient client = new HttpClient())  {
                string jsonBody = $@"{{
                    ""number"" : ""{number}"",
                    ""message"": ""{msg}""
                }}";

                string authHeaderValue = Convert.ToBase64String(System.Text.Encoding.ASCII.GetBytes($"{username}:{password}"));
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", authHeaderValue);

                var content = new StringContent(jsonBody, Encoding.UTF8, "application/json");

                HttpResponseMessage response = await client.PostAsync(apiUrl, content);

                if (response.IsSuccessStatusCode) {
                    string apiResponse = await response.Content.ReadAsStringAsync();
                    Console.WriteLine("API Response:");
                    Console.WriteLine(apiResponse);
                    return Ok(apiResponse);
                } else {
                    Console.WriteLine($"Error: {response.StatusCode} - {response.ReasonPhrase}");
                    return StatusCode((int)response.StatusCode);
                }
            }
        } catch(Exception ex) {
            Console.WriteLine($"An error occurred: {ex.Message}");
            return StatusCode(500, "An error occurred");
        }
    }

    [HttpPost]
    public async Task<IActionResult> SendMessageMedia(string orgCode, string number) {
        try {
            string endPointData = $"Station/Organization/{orgCode}";
            var organizationData = await GetDataApi(endPointData);
            var stationData = JsonConvert.DeserializeObject<ApiResponse>(organizationData.ToString());
            var result = stationData.Data;

            int lengthPos = result?.Count ?? 0;
            string img = $"https://{result[0].subDomain}.higertech.com";

            DateTime currentDate = DateTime.Now;
            string today = currentDate.ToString("dd/MM/yyyy HH:mm");

            //message
            string msg = "Selamat Pagi\n";
            msg += "Bapak/Ibu Yth,\n";
            msg += $"Dari total {lengthPos} pos, kami informasikan rekapitulasi data pos offline :\n";
            msg += $"Tanggal  : {today}\n";
            msg += $"Instansi : {result[0].balaiName}\n";
            msg += $"Website  : https://{result[0].subDomain}.higertech.com\n";

            var i = 1;
            var dataList = result as List<Api>;
            if (dataList != null) {
                var offlineDevices = dataList.Where(item => item.deviceStatus == "offline").ToList();

                if (offlineDevices.Count > 0) {
                    foreach(var device in offlineDevices) {
                        string lastReading = device.lastReadingAt?.ToString("dd/MM/yyyy, HH:mm:ss") ?? "00/00/0000, 00:00";

                        msg += $"{i}. {device.slug} Alat tidak mengirim data, {lastReading} localtime\n";
                        i++;
                    }
                } else {
                    msg += "Keterangan : Alat Aktif Semua\n";
                }
            } else {
                Console.WriteLine("Failed to cast data to YourItemType[].");
            }

            msg += "Sekian kami sampaikan, untuk informasi lebih lanjut hubungi 081120217941 (admin CS teknis Higertech)\n";
            msg += "Terima Kasih 🙏🏻.";

            msg = msg.Replace("\n", "\\n");

            return await SendMedia(number, msg, img);
        } catch(Exception ex) {
            Console.WriteLine($"An error occurred: {ex.Message}");
            return StatusCode(500, "An error occurred");
        }
    }

    [HttpPost]
    public async Task<IActionResult> SendGroupMedia(string orgCode, string number) {
        try {
            string endPointData = $"Station/Organization/{orgCode}";
            var organizationData = await GetDataApi(endPointData);
            var stationData = JsonConvert.DeserializeObject<ApiResponse>(organizationData.ToString());
            var result = stationData.Data;

            int lengthPos = result?.Count ?? 0;
            string img = $"https://{result[0].subDomain}.higertech.com";

            DateTime currentDate = DateTime.Now;
            string today = currentDate.ToString("dd/MM/yyyy HH:mm");

            //message
            string msg = "Selamat Pagi\n";
            msg += "Bapak/Ibu Yth,\n";
            msg += $"Dari total {lengthPos} pos, kami informasikan rekapitulasi data pos offline :\n";
            msg += $"Tanggal  : {today}\n";
            msg += $"Instansi : {result[0].balaiName}\n";
            msg += $"Website  : https://{result[0].subDomain}.higertech.com\n";

            var i = 1;
            var dataList = result as List<Api>;
            if (dataList != null) {
                var offlineDevices = dataList.Where(item => item.deviceStatus == "offline").ToList();

                if (offlineDevices.Count > 0) {
                    foreach(var device in offlineDevices) {
                        string lastReading = device.lastReadingAt?.ToString("dd/MM/yyyy, HH:mm:ss") ?? "00/00/0000, 00:00";

                        msg += $"{i}. {device.slug} Alat tidak mengirim data, {lastReading} localtime\n";
                        i++;
                    }
                } else {
                    msg += "Keterangan : Alat Aktif Semua\n";
                }
            } else {
                Console.WriteLine("Failed to cast data to YourItemType[].");
            }

            msg += "Sekian kami sampaikan, untuk informasi lebih lanjut hubungi 081120217941 (admin CS teknis Higertech)\n";
            msg += "Terima Kasih 🙏🏻.";

            msg = msg.Replace("\n", "\\n");

            return await SendMediaGroup(number, msg, img);
        } catch(Exception ex) {
            Console.WriteLine($"An error occurred: {ex.Message}");
            return StatusCode(500, "An error occurred");
        }
    }

    [HttpPost]
    public async Task<IActionResult> SendMedia(string number, string msg, string img) {
        string apiUrl = "https://wa.higertech.com/send-media";
        string username = "higertech";
        string password = "1234";

        try {
            using (HttpClient client = new HttpClient())  {
                string jsonBody = $@"{{
                    ""number"" : ""{number}"",
                    ""message"": ""{msg}"",
                    ""imgUrl"" : ""{img}""
                }}";

                string authHeaderValue = Convert.ToBase64String(System.Text.Encoding.ASCII.GetBytes($"{username}:{password}"));
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", authHeaderValue);

                var content = new StringContent(jsonBody, Encoding.UTF8, "application/json");

                HttpResponseMessage response = await client.PostAsync(apiUrl, content);

                if (response.IsSuccessStatusCode) {
                    string apiResponse = await response.Content.ReadAsStringAsync();
                    Console.WriteLine("API Response:");
                    Console.WriteLine(apiResponse);
                    return Ok(apiResponse);
                } else {
                    Console.WriteLine($"Error: {response.StatusCode} - {response.ReasonPhrase}");
                    return StatusCode((int)response.StatusCode);
                }
            }
        } catch(Exception ex) {
            Console.WriteLine($"An error occurred: {ex.Message}");
            return StatusCode(500, "An error occurred");
        }
    }

    [HttpPost]
    public async Task<IActionResult> SendMediaGroup(string number, string msg, string img) {
        string apiUrl = "https://wa-higertech.com/send-group-media";
        string username = "higertech";
        string password = "1234";

        try {
            using (HttpClient client = new HttpClient())  {
                string jsonBody = $@"{{
                    ""number"" : ""{number}"",
                    ""message"": ""{msg}"",
                    ""imgUrl"" : ""{img}""
                }}";

                string authHeaderValue = Convert.ToBase64String(System.Text.Encoding.ASCII.GetBytes($"{username}:{password}"));
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", authHeaderValue);

                var content = new StringContent(jsonBody, Encoding.UTF8, "application/json");

                HttpResponseMessage response = await client.PostAsync(apiUrl, content);

                if (response.IsSuccessStatusCode) {
                    string apiResponse = await response.Content.ReadAsStringAsync();
                    Console.WriteLine("API Response:");
                    Console.WriteLine(apiResponse);
                    return Ok(apiResponse);
                } else {
                    Console.WriteLine($"Error: {response.StatusCode} - {response.ReasonPhrase}");
                    return StatusCode((int)response.StatusCode);
                }
            }
        } catch(Exception ex) {
            Console.WriteLine($"An error occurred: {ex.Message}");
            return StatusCode(500, "An error occurred");
        }
    }

    [HttpPost]
    public async Task<IActionResult> SendMessage(string number, string msg) {
        string apiUrl = "https://wa.higertech.com/send-message";
        string username = "higertech";
        string password = "1234";

        try {
            using (HttpClient client = new HttpClient())  {
                string jsonBody = $@"{{
                    ""number"" : ""{number}"",
                    ""message"": ""{msg}""
                }}";

                string authHeaderValue = Convert.ToBase64String(System.Text.Encoding.ASCII.GetBytes($"{username}:{password}"));
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", authHeaderValue);

                var content = new StringContent(jsonBody, Encoding.UTF8, "application/json");

                HttpResponseMessage response = await client.PostAsync(apiUrl, content);

                if (response.IsSuccessStatusCode) {
                    string apiResponse = await response.Content.ReadAsStringAsync();
                    Console.WriteLine("API Response:");
                    Console.WriteLine(apiResponse);
                    return Ok(apiResponse);
                } else {
                    Console.WriteLine($"Error: {response.StatusCode} - {response.ReasonPhrase}");
                    return StatusCode((int)response.StatusCode);
                }
            }
        } catch(Exception ex) {
            Console.WriteLine($"An error occurred: {ex.Message}");
            return StatusCode(500, "An error occurred");
        }
    }

    [HttpPost]
    public async Task<IActionResult> SendWarningStatus(string orgCode, string station, string number) {
        try {
            string endPointData = $"Station/Organization/{orgCode}";
            var organizationData = await GetDataApi(endPointData);
            var stationData = JsonConvert.DeserializeObject<ApiResponse>(organizationData.ToString());
            var result = stationData.Data;

            DateTime currentDate = DateTime.Now;
            string today = currentDate.ToString("d MMMM yyyy HH:mm");

            var dataList = result as List<Api>;
            string msg = "";

            if (dataList != null) {
                var data = dataList.Where(item => item.type == station && item.deviceStatus == "online").ToList();

                if(data != null) {
                    if(station == "AWLR") {
                        var dataWarning = data.Where(item => item.warningStatus == "Siaga 1" || item.warningStatus == "Siaga 2" || item.warningStatus == "Siaga 3").ToList();

                        if(dataWarning.Any()) {
                            foreach(var row in dataWarning) {
                                string status = "";
                                string statusWarning = "";

                                if(row.warningStatus == "Siaga 1") {
                                    status = "🔴 [Status: AWAS ]\\n";
                                    statusWarning = "🔴 AWAS";
                                } else if (row.warningStatus == "Siaga 2") {
                                    status = "🟠 [Status: SIAGA ]\\n";
                                    statusWarning = "🟠 SIAGA";
                                } else if(row.warningStatus == "Siaga 3") {
                                    status = "🟡 [Status: WASPADA ]\\n";
                                    statusWarning = "🟡 WASPADA";
                                }

                                DateTime lastReading = row.lastReadingAt ?? DateTime.Now;
                                string dayName = await GenerateDay(lastReading);

                                msg += status;
                                msg += "\\n";
                                msg += $"Nama Pos \u003A {row.name}\\n";
                                msg += $"ID Device \u003A {row.deviceId}\\n";
                                msg += $"Web \u003A http://{row.subDomain}.higertech.com\\n";
                                msg += $"Hari \u003A {dayName}\\n";
                                msg += $"Tanggal  \u003A {lastReading.ToString("dd-MM-yyyy HH:mm")} WIB\\n";
                                msg += $"Tma \u003A {row.waterLevel} {row.unitDisplay}\\n";
                                msg += $"Status \u003A {statusWarning}\\n";
                                msg += "\\n";
                                msg += $"_diupdate \u003A {today} WIB_\\n";
                                msg += "=============================";
                                msg += "\\n";
                                msg += "\\n";
                            }

                            return await SendGroup(number, msg);
                        } else {
                            string returnText = "Tidak ada Pos Siaga";
                            return Content(returnText, "text/plain");
                            Console.WriteLine("Tidak ada data siaga");
                        }
                    } else if(station == "ARR") {
                        var dataWarning = data.Where(item => item.intensityLastHour == "Hujan Ringan" || item.intensityLastHour == "Hujan Sedang" || item.intensityLastHour == "Hujan Lebat" || item.intensityLastHour == "Hujan Sangat Lebat").ToList();
        
                        if(dataWarning.Any()) {
                            foreach(var row in dataWarning) {  
                                string status = "";
                                string statusWarning = "";

                                if(row.intensityLastHour == "Hujan Ringan") {
                                    status = $"🔵 [Intensitas Jam \u003A {row.intensityLastHour}]\\n";
                                    statusWarning = $"Intensitas \u003A 🔵 {row.intensityLastHour}\\n";
                                } else if(row.intensityLastHour == "Hujan Sedang") {
                                    status = $"🟡 [Intensitas Jam \u003A {row.intensityLastHour}]\\n";
                                    statusWarning = $"Intensitas \u003A 🟡 {row.intensityLastHour}\\n";
                                } else if(row.intensityLastHour == "Hujan Lebat") {
                                    status = $"🟠 [Intensitas Jam \u003A {row.intensityLastHour}]\\n";
                                    statusWarning = $"Intensitas \u003A 🟠 {row.intensityLastHour}\\n";
                                } else if(row.intensityLastHour == "Hujan Sangat Lebat") {
                                    status = $"🔴 [Intensitas Jam \u003A {row.intensityLastHour}]\\n";
                                    statusWarning = $"Intensitas \u003A 🔴 {row.intensityLastHour}\\n";
                                }

                                DateTime lastReading = row.lastReadingAt ?? DateTime.Now;
                                string dayName = await GenerateDay(lastReading);

                                msg += status;
                                msg += "\\n";
                                msg += $"Nama Pos \u003A {row.name}\\n";
                                msg += $"ID Device \u003A {row.deviceId}\\n";
                                msg += $"Web \u003A http://{row.subDomain}.higertech.com\\n";
                                msg += $"Hari \u003A {dayName}\\n";
                                msg += $"Tanggal \u003A {lastReading.ToString("dd-MM-yyyy HH:mm")} WIB\\n";
                                msg += $"CH \u003A {row.rainfall} mm\\n";
                                msg += "\\n";
                                msg += "1 Jam Terakhir \u003A\\n";
                                msg += $"CH \u003A {row.rainfallLastHour} mm/hour\\n";
                                msg += statusWarning;
                                msg += "\\n";
                                msg += $"_diupdate \u003A {today} WIB_\\n";
                                msg += "=============================";
                                msg += "\\n";
                                msg += "\\n";
                            }

                            return await SendGroup(number, msg);
                        } else {
                            string returnText = "Tidak ada Pos Siaga";
                            return Content(returnText, "text/plain");
                            Console.WriteLine("Tidak ada data siaga");
                        }
                    }
                }
            } else {
                Console.WriteLine("Failed to cast data to YourItemType[].");
            }
            
            return StatusCode(500, "An error occurred");
        } catch(Exception ex) {
            Console.WriteLine($"An error occurred: {ex.Message}");
            return StatusCode(500, "An error occurred");
        }
    }

    public async Task<string> GenerateDay(DateTime? lastReading) {
        if (lastReading.HasValue) {
            DayOfWeek dayOfWeek = lastReading.Value.DayOfWeek;
            string dayName = dayOfWeek.ToString();
            return dayName;
        } else {
            return "Unknown"; // Default value
        }
    }
}