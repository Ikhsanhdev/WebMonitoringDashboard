// AkunController.cs
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using menyala.Models;
using System.Diagnostics;

namespace menyala.Controllers
{
    public class AkunController : Controller
    {
        private readonly ILogger<AkunController> _logger;

        public AkunController(ILogger<AkunController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View();
        }

        // Action method untuk menampilkan halaman login
        public IActionResult Login()
        {
            return View();
        }

        // Action method untuk menangani proses login
        [HttpPost]
        public IActionResult Login(string username, string password)
        {
            // Di sini Anda dapat menambahkan logika autentikasi sesuai dengan kebutuhan Anda
            // Contoh sederhana: jika username dan password benar, maka arahkan ke halaman Api/Index.cshtml
            if (username == "admin" && password == "12345678")
            {
                // Redirect ke halaman Api/Index.cshtml
                return RedirectToAction("Index", "Api");
            }
            else
            {
                // Jika username atau password salah, mungkin Anda ingin menampilkan pesan kesalahan
                ViewBag.ErrorMessage = "Username atau password salah.";
                return View(); // Kembali ke halaman login dengan pesan kesalahan
            }
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
