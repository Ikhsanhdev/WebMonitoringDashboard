using System;
using System.Linq;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using menyala.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

public class ApiController : Controller
{
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
                    a.slug.Contains(searchValue) ||
                    a.stationType.Contains(searchValue) ||
                    a.organizationCode.Contains(searchValue) ||
                    a.deviceId.Contains(searchValue) ||
                    (a.deviceStatus != null && a.deviceStatus.Contains(searchValue)) ||
                    a.lastReadingAt?.ToString().Contains(searchValue) == true)
                )
                .ToList();

            // Sorting
            if (!string.IsNullOrEmpty(sortColumn) && !string.IsNullOrEmpty(sortColumnDirection))
            {
                filteredData = SortData(filteredData, sortColumn, sortColumnDirection);
            }

            // Grouping and calculating aggregated values
            var groupedData = filteredData
            .GroupBy(a => a.balaiName)
            .Select(g => new Api
            {
                balaiName = g.Key,
                jumlahPos = g.Count(),
                jumlahPosOnline = g.Count(p => p.deviceStatus == "online"),
                jumlahPosOffline = g.Count(p => p.deviceStatus == "offline"),

                slug = g.Any(p => p.deviceStatus == "offline") ? g.Where(p => p.deviceStatus == "offline").Max(p => p.slug) : g.Max(p => p.slug),
                subDomain = g.FirstOrDefault(p => p.deviceStatus == "offline")?.subDomain,
                name = g.FirstOrDefault(p => p.deviceStatus == "offline")?.name,
                stationType = g.Any(p => p.deviceStatus == "offline") ? g.Where(p => p.deviceStatus == "offline").Max(p => p.stationType) : g.Max(p => p.stationType),
                organizationCode = g.Any(p => p.deviceStatus == "offline")? g.Where(p => p.deviceStatus == "offline").Max(p => p.organizationCode) : g.Max(p => p.organizationCode),
                deviceStatus = g.Any(p => p.deviceStatus == "offline") ? "offline" : "online",
                lastReadingAt = g.Any(p => p.deviceStatus == "offline") ? g.Where(p => p.deviceStatus == "offline").Max(p => p.lastReadingAt) : g.Max(p => p.lastReadingAt)
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
    
    [HttpPost]
    public async Task<IActionResult> GetTotalPos()
    {
        try
        {
            // Panggil metode untuk mendapatkan data dari API
            var apiResponse = await GetDataFromApi();

            if (apiResponse == null)
            {
                // Jika respons API null, kembalikan total pos 0
                return Json(new { TotalPos = 0 });
            }

            // Hitung total pos menggunakan metode Count()
            int totalPos = apiResponse.Count();

            return Json(new { TotalPos = totalPos });
        }
        catch (Exception ex)
        {
            // Handle exception
            Console.WriteLine(ex.Message);
            return Json(new { TotalPos = 0 });
        }
    }

    [HttpPost]
    public async Task<IActionResult> GetTotalInstansi()
    {
        try
        {
            // Panggil metode untuk mendapatkan data dari API
            var apiResponse = await GetDataFromApi();

            if (apiResponse == null)
            {
                // Jika respons API null, kembalikan total pos 0
                return Json(new { TotalInstansi = 0 });
            }

            // Hitung total pos menggunakan operasi Distinct pada balaiName
            int totalInstansi = apiResponse.Select(a => a.balaiName).Distinct().Count();

            return Json(new { TotalInstansi = totalInstansi });
        }
        catch (Exception ex)
        {
            // Handle exception
            Console.WriteLine(ex.Message);
            return Json(new { TotalInstansi = 0 });
        }
    }

    [HttpPost]
    public async Task<IActionResult> GetTotalDugaAir()
    {
        try
        {
            // Panggil metode untuk mendapatkan data dari API
            var apiResponse = await GetDataFromApi();

            if (apiResponse == null)
            {
                // Jika respons API null, kembalikan total pos 0
                return Json(new { TotalDugaAir = 0 });
            }

            // Hitung total pos menggunakan metode Count()
            int totalDugaAir = apiResponse.Count(a => a.stationType == "AWLR" || a.stationType == "AWLR_ARR");

            return Json(new { TotalDugaAir = totalDugaAir });
        }
        catch (Exception ex)
        {
            // Handle exception
            Console.WriteLine(ex.Message);
            return Json(new { TotalDugaAir = 0 });
        }
    }

    [HttpPost]
    public async Task<IActionResult> GetTotalCurahHujan()
    {
        try
        {
            // Panggil metode untuk mendapatkan data dari API
            var apiResponse = await GetDataFromApi();

            if (apiResponse == null)
            {
                // Jika respons API null, kembalikan total pos 0
                return Json(new { TotalCurahHujan = 0 });
            }

            // Hitung total pos menggunakan metode Count()
            int totalCurahHujan = apiResponse.Count(a => a.stationType == "ARR" || a.stationType == "AWLR_ARR");

            return Json(new { TotalCurahHujan = totalCurahHujan });
        }
        catch (Exception ex)
        {
            // Handle exception
            Console.WriteLine(ex.Message);
            return Json(new { TotalCurahHujan = 0 });
        }
    }

    [HttpPost]
    public async Task<IActionResult> GetTotalKlimatologi()
    {
        try
        {
            // Panggil metode untuk mendapatkan data dari API
            var apiResponse = await GetDataFromApi();

            if (apiResponse == null)
            {
                // Jika respons API null, kembalikan total pos 0
                return Json(new { TotalKlimatologi = 0 });
            }

            // Hitung total pos menggunakan metode Count()
            int totalKlimatologi = apiResponse.Count(a => a.stationType == "AWS");

            return Json(new { TotalKlimatologi = totalKlimatologi });
        }
        catch (Exception ex)
        {
            // Handle exception
            Console.WriteLine(ex.Message);
            return Json(new { TotalKlimatologi = 0 });
        }
    }

    [HttpPost]
    public async Task<IActionResult> GetTotalOnline()
    {
        try
        {
            // Panggil metode untuk mendapatkan data dari API
            var apiResponse = await GetDataFromApi();

            if (apiResponse == null)
            {
                // Jika respons API null, kembalikan total pos 0
                return Json(new { TotalOnline = 0 });
            }

            // Hitung total pos menggunakan metode Count()
            int totalOnline = apiResponse.Count(a => a.deviceStatus == "online");

            return Json(new { TotalOnline = totalOnline });
        }
        catch (Exception ex)
        {
            // Handle exception
            Console.WriteLine(ex.Message);
            return Json(new { TotalOnline = 0 });
        }
    }
    
    [HttpPost]
    public async Task<IActionResult> GetTotalOffline()
    {
        try
        {
            // Panggil metode untuk mendapatkan data dari API
            var apiResponse = await GetDataFromApi();

            if (apiResponse == null)
            {
                // Jika respons API null, kembalikan total pos 0
                return Json(new { TotalOffline = 0 });
            }

            // Hitung total pos menggunakan metode Count()
            int totalOffline = apiResponse.Count(a => a.deviceStatus == "offline");

            return Json(new { TotalOffline = totalOffline });
        }
        catch (Exception ex)
        {
            // Handle exception
            Console.WriteLine(ex.Message);
            return Json(new { TotalOffline = 0 });
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

    [HttpPost]
    public async Task<IActionResult> GetDetail(string organizationCode)
    {
        try
        {
            var draw = int.Parse(Request.Form["draw"].FirstOrDefault());
            var start = int.Parse(Request.Form["start"].FirstOrDefault());
            var length = int.Parse(Request.Form["length"].FirstOrDefault());
            var sortColumn = Request.Form["columns[" + Request.Form["order[0][column]"].FirstOrDefault() + "][name]"].FirstOrDefault();
            var sortColumnDirection = Request.Form["order[0][dir]"].FirstOrDefault();
            var searchValue = Request.Form["search[value]"].FirstOrDefault();

            var (apiResponse, balaiName) = await GetDataFromApiDetail(organizationCode);
            
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

            var filteredData = apiResponse.Where(a =>
                string.IsNullOrEmpty(searchValue) ||
                a.balaiName.Contains(searchValue) ||
                a.name.Contains(searchValue) ||
                a.subDomain.Contains(searchValue) ||
                a.jumlahPos.ToString().Contains(searchValue) ||
                a.jumlahPosOnline.ToString().Contains(searchValue) ||
                a.jumlahPosOffline.ToString().Contains(searchValue) ||
                a.slug.Contains(searchValue) ||
                a.stationType.Contains(searchValue) ||
                a.organizationCode.Contains(searchValue) ||
                a.deviceId.Contains(searchValue) ||
                (a.deviceStatus != null && a.deviceStatus.Contains(searchValue)) ||
                (a.lastReadingAt != null && a.lastReadingAt.ToString().Contains(searchValue)))
                .ToList();

            if (!string.IsNullOrEmpty(sortColumn) && !string.IsNullOrEmpty(sortColumnDirection))
            {
                filteredData = SortData(filteredData, sortColumn, sortColumnDirection);
            }

            var result = new DataTableResult<Api>
            {
                draw = draw,
                recordsTotal = apiResponse.Count(),
                recordsFiltered = filteredData.Count(),
                data = filteredData.Skip(start).Take(length).ToList()
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
            Console.WriteLine($"An error occurred while processing request: {ex.Message}");
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

    private async Task<(List<Api>, string)> GetDataFromApiDetail(string orgCode)
    {
        string apiUrl = "http://localhost:5000/Station/Organization/ORG003";
        string username = "m0n1tor_st4tion";
        string password = "H1gertech.1dua3";

        try
        {
            using (HttpClient client = new HttpClient())
            {
                var credentials = Convert.ToBase64String(Encoding.ASCII.GetBytes($"{username}:{password}"));
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", credentials);
                HttpResponseMessage response = await client.GetAsync(apiUrl);

                if (response.IsSuccessStatusCode)
                {
                    string responseData = await response.Content.ReadAsStringAsync();
                    var apiResponse = JsonConvert.DeserializeObject<ApiResponse>(responseData);
                    
                    // Filter hanya data dengan DeviceStatus offline
                    var offlineData = apiResponse?.Data?.Where(item => item.deviceStatus == "offline").ToList();
                    
                    string balaiName = apiResponse?.Data?.FirstOrDefault()?.balaiName;
                    List<Api> data = offlineData ?? new List<Api>();
                    return (data, balaiName);
                }
                else
                {
                    Console.WriteLine($"Failed to retrieve data from API. Status code: {response.StatusCode}");
                    return (new List<Api>(), null);
                }
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"An error occurred while fetching data from the API: {ex.Message}");
            return (new List<Api>(), null);
        }
    }

    private List<Api> SortData(List<Api> data, string sortColumn, string sortColumnDirection)
    {
        switch (sortColumn)
        {
            case "balaiName":
                return sortColumnDirection == "asc" ?
                    data.OrderBy(a => a.balaiName).ToList() :
                    data.OrderByDescending(a => a.balaiName).ToList();

            case "jumlahPos":
                return sortColumnDirection == "asc" ?
                    data.OrderBy(a => a.jumlahPos).ToList() :
                    data.OrderByDescending(a => a.jumlahPos).ToList();

            case "jumlahPosOnline":
                return sortColumnDirection == "asc" ?
                    data.OrderBy(a => a.jumlahPosOnline).ToList() :
                    data.OrderByDescending(a => a.jumlahPosOnline).ToList();

            case "jumlahPosOffline":
                return sortColumnDirection == "asc" ?
                    data.OrderBy(a => a.jumlahPosOffline).ToList() :
                    data.OrderByDescending(a => a.jumlahPosOffline).ToList();

            default:
                return data;
        }
    }
}
