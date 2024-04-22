using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;
using menyala.Models;
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
        // Hardcode username dan password
        if (username == "admin" && password == "12345678")
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, username)
                // Anda bisa menambahkan claim lainnya di sini jika diperlukan
            };

            var claimsIdentity = new ClaimsIdentity(
                claims, CookieAuthenticationDefaults.AuthenticationScheme);

            var authProperties = new AuthenticationProperties
            {
                // IsPersistent = true,
                // ExpiresUtc = DateTimeOffset.UtcNow.AddMinutes(10)
            };

            await HttpContext.SignInAsync(
                CookieAuthenticationDefaults.AuthenticationScheme,
                new ClaimsPrincipal(claimsIdentity),
                authProperties);

            if (!string.IsNullOrEmpty(returnUrl))
            {
                return LocalRedirect(returnUrl);
            }
            else
            {
                return RedirectToAction("Index", "Api");
            }
        }

        ModelState.AddModelError(string.Empty, "Username atau password salah.");
        return View();
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