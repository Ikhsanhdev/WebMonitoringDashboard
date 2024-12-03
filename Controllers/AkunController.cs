using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using Menyala.Data;
using System.Security.Claims;
using System.Threading.Tasks;
using System;
using System.Security.Cryptography;

namespace menyala.Controllers
{
    public class AkunController : Controller
    {

        private readonly AppDbContext _context;

        public AkunController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult Login(string returnUrl = null)
        {
            ViewData["ReturnUrl"] = returnUrl;
            return View();
        }

        private (string Hash, string Salt) HashPassword(string password)
        {
            // Generate a salt
            byte[] saltBytes = new byte[16];
            using (var rng = new RNGCryptoServiceProvider())
            {
                rng.GetBytes(saltBytes);
            }
            string salt = Convert.ToBase64String(saltBytes);

            // Generate the hash using PBKDF2
            using (var pbkdf2 = new Rfc2898DeriveBytes(password, saltBytes, 10000))
            {
                byte[] hashBytes = pbkdf2.GetBytes(32); // 256-bit hash
                string hash = Convert.ToBase64String(hashBytes);
                return (hash, salt);
            }
        }

        private bool VerifyPassword(string password, string storedHash, string storedSalt)
        {
            byte[] saltBytes = Convert.FromBase64String(storedSalt);
            using (var pbkdf2 = new Rfc2898DeriveBytes(password, saltBytes, 10000))
            {
                byte[] hashBytes = pbkdf2.GetBytes(32);
                string hash = Convert.ToBase64String(hashBytes);
                return hash == storedHash;
            }
        }

        [HttpPost]
        public async Task<IActionResult> Login(string username, string password, string returnUrl = null)
        {
            // Cek pengguna di database
            var Pengguna = _context.Pengguna.FirstOrDefault(u => u.UserName == username);

            // Periksa jika pengguna, hash, atau salt tidak ada
            if (Pengguna == null || Pengguna.Password == null || Pengguna.Salt == null)
            {
                ModelState.AddModelError(string.Empty, "Username atau password salah.");
                return View();
            }

            // Verifikasi password
            if (!VerifyPassword(password, Pengguna.Password, Pengguna.Salt))
            {
                ModelState.AddModelError(string.Empty, "Username atau password salah.");
                return View();
            }

            // Update last login
            Pengguna.LastLogin = DateTime.UtcNow;
            _context.Update(Pengguna);
            await _context.SaveChangesAsync();

            // Tambahkan claim untuk role
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, Pengguna.UserName),
                new Claim(ClaimTypes.Role, Pengguna.Role)
            };

            var claimsIdentity = new ClaimsIdentity(
                claims, CookieAuthenticationDefaults.AuthenticationScheme);

            var authProperties = new AuthenticationProperties
            {
                // IsPersistent = true,
                // ExpiresUtc = DateTimeOffset.UtcNow.AddMinutes(10)
            };

            // Login pengguna
            await HttpContext.SignInAsync(
                CookieAuthenticationDefaults.AuthenticationScheme,
                new ClaimsPrincipal(claimsIdentity),
                authProperties);

            // Redirect berdasarkan role
            if (Pengguna.Role == "Admin")
            {
                return RedirectToAction("Index", "Api"); // arahkan ke halaman admin
            }
            else if (Pengguna.Role == "User")
            {
                return RedirectToAction("index", "Tiket"); // arahkan ke halaman user
            }

            if (!string.IsNullOrEmpty(returnUrl))
            {
                return LocalRedirect(returnUrl);
            }

            return RedirectToAction("Index", "Api");
        }
        
        public async Task<IActionResult> Logout()
        {
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            return RedirectToAction("Login", "Akun");
        }

        public IActionResult AccessDenied()
        {
            return View();
        }
    }
}