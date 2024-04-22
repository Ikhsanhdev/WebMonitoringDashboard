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
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using menyala.Controllers;
using Newtonsoft.Json.Linq;
using Microsoft.AspNetCore.Authorization;

[Authorize]

public class ApiController : Controller
{
    private readonly HttpClient _httpClient;

    public ApiController() {
        _httpClient = new HttpClient();
        _httpClient.BaseAddress = new System.Uri("http://live2.higertech.com");
    }

    public class ApiResponse
    {
        public IEnumerable<Api> Data { get; set; }
    }

    public async Task<IActionResult> Index()
    {
        return View();
    }

    public async Task<IActionResult> Detail()
    {
        return View();
    }

    public async Task<IActionResult> JsonDetail()
    {
        return View();
    }
      public async Task<IActionResult> TotalPos()
    {
        return View();
    }
    
     public async Task<IActionResult> TotalOnline()
    {
        return View();
    }
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

            if (apiResponse == null || !apiResponse.Any())
            {
                // Handle the case where the API response is empty or null
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
                    a.name.Contains(searchValue) ||
                    a.subDomain.Contains(searchValue) ||
                    a.jumlahPos.ToString().Contains(searchValue) ||
                    a.jumlahPosOnline.ToString().Contains(searchValue) ||
                    a.jumlahPosOffline.ToString().Contains(searchValue) ||
                    // a.slug.Contains(searchValue) ||
                    // a.stationType.Contains(searchValue) ||
                    a.organizationCode.Contains(searchValue) ||
                    a.deviceId.Contains(searchValue) )
                    // (a.deviceStatus != null && a.deviceStatus.Contains(searchValue)) ||
                    // a.lastReadingAt?.ToString().Contains(searchValue) == true)
                )
                .ToList();

            // Grouping and calculating aggregated values
            var groupedData = filteredData
            .GroupBy(a => a.balaiName)
            .Select(g => new Api
            {
                balaiName = g.Key,
                jumlahPos = g.Count(),
                jumlahPosOnline = g.Count(p => p.deviceStatus == "online"),
                jumlahPosOffline = g.Count(p => p.deviceStatus == "offline"),

                // slug = g.Any(p => p.deviceStatus == "offline") ? g.Where(p => p.deviceStatus == "offline").Max(p => p.slug) : g.Max(p => p.slug),
                subDomain = g.Any(p => p.deviceStatus == "offline")? g.Where(p => p.deviceStatus == "offline").Max(p => p.subDomain) : g.Max(p => p.subDomain),
                name = g.Any(p => p.deviceStatus == "offline")? g.Where(p => p.deviceStatus == "offline").Max(p => p.name) : g.Max(p => p.name),
                // stationType = g.Any(p => p.deviceStatus == "offline") ? g.Where(p => p.deviceStatus == "offline").Max(p => p.stationType) : g.Max(p => p.stationType),
                organizationCode = g.Any(p => p.deviceStatus == "offline")? g.Where(p => p.deviceStatus == "offline").Max(p => p.organizationCode) : g.Max(p => p.organizationCode),
                // deviceStatus = g.Any(p => p.deviceStatus == "offline") ? "offline" : "online",
                // lastReadingAt = g.Any(p => p.deviceStatus == "offline") ? g.Where(p => p.deviceStatus == "offline").Max(p => p.lastReadingAt) : g.Max(p => p.lastReadingAt)
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
            // Handle other exceptions
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
        string apiUrl = "http://localhost:5000/Station/All";
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

            switch (totalType.ToLower())
            {
                case "totalpos":
                    total = apiResponse.Count();
                    break;
                case "totalinstansi":
                    total = apiResponse.Select(a => a.balaiName).Distinct().Count();
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
                    total = apiResponse.Count(a => a.deviceStatus == "online");
                    break;
                case "totaloffline":
                    total = apiResponse.Count(a => a.deviceStatus == "offline");
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

    // [HttpPost]
    // public async Task<IActionResult> GetDetail(string organizationCode)
    // {
    //     try
    //     {
    //         var draw = int.Parse(Request.Form["draw"].FirstOrDefault());
    //         var start = int.Parse(Request.Form["start"].FirstOrDefault());
    //         var length = int.Parse(Request.Form["length"].FirstOrDefault());
    //         var sortColumn = Request.Form["columns[" + Request.Form["order[0][column]"].FirstOrDefault() + "][name]"].FirstOrDefault();
    //         var sortColumnDirection = Request.Form["order[0][dir]"].FirstOrDefault();
    //         var searchValue = Request.Form["search[value]"].FirstOrDefault();

    //         var (apiResponse, balaiName) = await GetDataFromApiDetail(organizationCode);

    //         if (apiResponse == null || !apiResponse.Any())
    //         {
    //             return Json(new DataTableResult<Api>
    //             {
    //                 draw = draw,
    //                 recordsTotal = 0,
    //                 recordsFiltered = 0,
    //                 data = new List<Api>()
    //             });
    //         }

    //         var filteredData = apiResponse.Where(a =>
    //             string.IsNullOrEmpty(searchValue) ||
    //             a.balaiName.Contains(searchValue) ||
    //             // a.name.Contains(searchValue) ||
    //             // a.subDomain.Contains(searchValue) ||
    //             // a.jumlahPos.ToString().Contains(searchValue) ||
    //             // a.jumlahPosOnline.ToString().Contains(searchValue) ||
    //             // a.jumlahPosOffline.ToString().Contains(searchValue) ||
    //             a.slug.Contains(searchValue) ||
    //             // a.stationType.Contains(searchValue) ||
    //             a.organizationCode.Contains(searchValue) ||
    //             // a.deviceId.Contains(searchValue) ||
    //             (a.deviceStatus != null && a.deviceStatus.Contains(searchValue)) ||
    //             (a.lastReadingAt != null && a.lastReadingAt.ToString().Contains(searchValue)))
    //             .ToList();

    //         var result = new DataTableResult<Api>
    //         {
    //             draw = draw,
    //             recordsTotal = apiResponse.Count(),
    //             recordsFiltered = filteredData.Count(),
    //             data = filteredData.Skip(start).Take(length).ToList()
    //         };

    //         var nomorColumn = start + 1;
    //         result.data.ForEach(item =>
    //         {
    //             item.nomor = nomorColumn;
    //             nomorColumn++;
    //         });

    //         return Json(result);
    //     }
    //     catch (Exception ex)
    //     {
    //         // Ganti dengan penanganan kesalahan yang lebih baik, seperti menyimpan ke file log atau memberikan tanggapan yang sesuai kepada klien
    //         Console.WriteLine($"An error occurred while processing request: {ex.Message}");
    //         return Json(new DataTableResult<Api>
    //         {
    //             draw = 0,
    //             recordsTotal = 0,
    //             recordsFiltered = 0,
    //             data = new List<Api>()
    //         });
    //     }
    // }
    
    // private async Task<(List<Api>, string)> GetDataFromApiDetail(string orgCode)
    // {
    //     string apiUrl = $"http://localhost:5000/Station/Organization/{orgCode}";
    //     string username = "m0n1tor_st4tion";
    //     string password = "H1gertech.1dua3";

    //     try
    //     {
    //         using (HttpClient client = new HttpClient())
    //         {
    //             var credentials = Convert.ToBase64String(Encoding.ASCII.GetBytes($"{username}:{password}"));
    //             client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", credentials);
    //             HttpResponseMessage response = await client.GetAsync(apiUrl);

    //             if (response.IsSuccessStatusCode)
    //             {
    //                 string responseData = await response.Content.ReadAsStringAsync();
    //                 var apiResponse = JsonConvert.DeserializeObject<ApiResponse>(responseData);
                    
    //                 // Filter hanya data dengan DeviceStatus offline
    //                 var offlineData = apiResponse?.Data?.Where(item => item.deviceStatus == "offline").ToList();
                    
    //                 string balaiName = apiResponse?.Data?.FirstOrDefault()?.balaiName;
    //                 List<Api> data = offlineData ?? new List<Api>();
    //                 return (data, balaiName);
    //             }
    //             else
    //             {
    //                 Console.WriteLine($"Failed to retrieve data from API. Status code: {response.StatusCode}");
    //                 return (new List<Api>(), null);
    //             }
    //         }
    //     }
    //     catch (Exception ex)
    //     {
    //         Console.WriteLine($"An error occurred while fetching data from the API: {ex.Message}");
    //         return (new List<Api>(), null);
    //     }
    // }

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

    // [HttpPost]
    // public async Task<IActionResult> ProcessDataDashboard() {
    //     try {
    //         var draw = int.Parse(Request.Form["draw"].FirstOrDefault());
    //         var start = int.Parse(Request.Form["start"].FirstOrDefault());
    //         var length = int.Parse(Request.Form["length"].FirstOrDefault());
    //         var sortColumn = Request.Form["columns[" + Request.Form["order[0][column]"].FirstOrDefault() + "][name]"].FirstOrDefault();
    //         var sortColumnDirection = Request.Form["order[0][dir]"].FirstOrDefault();
    //         var searchValue = Request.Form["search[value]"].FirstOrDefault();

    //         var apiResponse = await GetDataFromApi();

    //         var groupedData = apiResponse
    //             .GroupBy(d => new { d.balaiName, d.name, d.subDomain, d.organizationCode })
    //             .Select(group => new Api
    //             {
    //                 balaiName = group.Key.balaiName,
    //                 name = group.Key.name,
    //                 subDomain = group.Key.subDomain,
    //                 organizationCode = group.Key.organizationCode,
    //                 jumlahPos = group.Count(),
    //                 jumlahPosOffline = group.Count(d => d.deviceStatus == "offline"),
    //                 jumlahPosOnline = group.Count(d => d.deviceStatus == "online")
    //             }).ToList();

    //         var result = new DataTableResult<Api> {
    //             draw = draw,
    //             recordsTotal = apiResponse.Count(),
    //             recordsFiltered = groupedData.Count(),
    //             data = groupedData.Skip(start).Take(length).ToList()
    //         };

    //         var nomorColumn = start + 1;
    //         result.data.ForEach(item =>
    //         {
    //             item.nomor = nomorColumn;
    //             nomorColumn++;
    //         });

    //         return Json(result);
    //     } catch (Exception ex) {
    //         return StatusCode(500, $"Internal Server Error: {ex.Message}");
    //     }
    // }
    
    [HttpGet]
    public async Task<JsonResult> GetStationByOrgCode(string orgCode){
        string endPoint = $"Station/Organization/{orgCode}";
        var data = await GetDataApi(endPoint);
        return Json(data);
    }
     public async Task<JsonResult> GetStationAll(){
        string endPoint = $"Station/All/";
        var data = await GetDataApi(endPoint);
        return Json(data);
    }
    [HttpPost]
    public async Task<IActionResult> SendMessageToApi(string orgCode, string number) {
        string apiUrl = "http://localhost:3000/send-message";
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

                // Check response status
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
    public async Task<IActionResult> SendMessageGroup(string orgCode, string number) {
        string apiUrl = "http://localhost:3000/send-group";
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
        string apiUrl = "http://localhost:3000/send-channel";
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
}