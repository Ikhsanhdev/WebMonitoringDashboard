using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using menyala.Models;
using System.Diagnostics;
using System.Linq;
using dotnetIcon.Data;

namespace menyala.Controllers
{
    public class PhoneController : Controller
    {
        private readonly AppDbContext _context;
        private readonly ILogger<PhoneController> _logger;

        public PhoneController(AppDbContext context, ILogger<PhoneController> logger)
        {
            _context = context;
            _logger = logger;
        }

        public IActionResult Phones()
        {
            var phones = _context.Phones.ToList(); // Ambil semua data Phone dari database
            return View("Phones", phones); // Menggunakan nama view "Phones" secara eksplisit
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
