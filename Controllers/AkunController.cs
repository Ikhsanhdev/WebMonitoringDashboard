using Microsoft.AspNetCore.Mvc;
using menyala.Models;
using System.Threading.Tasks;

namespace menyala.Controllers
{
    public class AkunController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Login()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Login(string username, string password)
        {
            // Periksa apakah username dan password sesuai dengan yang diharapkan
            if (username == "admin" && password == "12345678")
            {
                // Jika berhasil, arahkan ke halaman Index di folder API
                return RedirectToAction("Index", "Api");
            }
            else
            {
                // Jika gagal, tampilkan pesan kesalahan pada halaman login
                ModelState.AddModelError(string.Empty, "Username atau password salah.");
                return View();
            }
        }
    }
}