using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;

namespace menyala.Controllers
{
    public class AkunController : Controller
    {
        [HttpGet]
        public IActionResult Login(string returnUrl = null)
        {
            ViewData["ReturnUrl"] = returnUrl;
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Login(string username, string password, string returnUrl = null)
        {
            // Hardcode username, password, dan role
            string userRole = string.Empty;

            if (username == "admin" && password == "12345678")
            {
                userRole = "admin"; // Role admin
            }
            else if (username == "user" && password == "userpassword")
            {
                userRole = "user"; // Role user
            }
            else
            {
                ModelState.AddModelError(string.Empty, "Username atau password salah.");
                return View();
            }

            // Jika login berhasil, tambahkan claim untuk role
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, username),
                new Claim(ClaimTypes.Role, userRole)  // Tambahkan role ke dalam claim
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
            if (userRole == "admin")
            {
                return RedirectToAction("Index", "Api");  // Admin diarahkan ke dashboard
            }
            else if (userRole == "user")
            {
                return Redirect("http://localhost:5269/Tiket/Tiket");  // User diarahkan ke halaman tiket
            }

            if (!string.IsNullOrEmpty(returnUrl))
            {
                return LocalRedirect(returnUrl);
            }

            return RedirectToAction("Index", "Home");
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