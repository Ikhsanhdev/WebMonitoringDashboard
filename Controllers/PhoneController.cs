using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using menyala.Models;
using System.Diagnostics;
using System.Linq;
using dotnetIcon.Data;
using Microsoft.AspNetCore.Authorization;

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

        [Authorize]
        public IActionResult JsonDetail()
        {
            return View();
        }

        [Authorize]
        public IActionResult GetPhoneNumbers()
        {
            var phoneNumbers = _context.Phones.Select(p => new { p.nomor, p.name, p.pic }).ToList();
            return Json(phoneNumbers);
        }

        [Authorize]
        public IActionResult Phones()
        {
            var phones = _context.Phones.ToList(); // Ambil semua data Phone dari database
            return View("Phones", phones); // Menggunakan nama view "Phones" secara eksplisit
        }

        [Authorize]
        [HttpPost]
        public IActionResult Create(Phone phone)
        {
            if (ModelState.IsValid)
            {
                _context.Phones.Add(phone);
                _context.SaveChanges();
                return RedirectToAction(nameof(Phones));
            }
            return View(phone); // Jika model tidak valid, kembali ke form create dengan data yang diinput
        }

        [Authorize]
        [HttpPost]
        public IActionResult Update(int id, Phone updatedPhone)
        {
            var phone = _context.Phones.FirstOrDefault(p => p.Id == id);
            if (phone == null)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                phone.name = updatedPhone.name;
                phone.pic = updatedPhone.pic;
                phone.nomor = updatedPhone.nomor;
                _context.SaveChanges();
                return RedirectToAction(nameof(Phones));
            }

            return View(phone); // Jika model tidak valid, kembali ke form update dengan data yang diinput
        }

        [Authorize]
        [HttpPost]
        public IActionResult Delete(int id)
        {
            var phone = _context.Phones.FirstOrDefault(p => p.Id == id);
            if (phone == null)
            {
                return NotFound();
            }

            _context.Phones.Remove(phone);
            _context.SaveChanges();
            return RedirectToAction(nameof(Phones));
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
