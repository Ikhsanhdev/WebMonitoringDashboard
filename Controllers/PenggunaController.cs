using System.Linq;
using System.Security.Cryptography;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Menyala.Data;
using menyala.Models;
using System.Security.Cryptography;
using System;
using Microsoft.AspNetCore.Authorization;

    public class PenggunaController : Controller
    {
        private readonly AppDbContext _context;

        public PenggunaController(AppDbContext context)
        {
            _context = context;
        }
        [Authorize]
        public IActionResult Index()
        {
            var pengguna = _context.Pengguna.ToList();
            return View(pengguna);
        }

        [HttpPost]
        [Authorize]
        public IActionResult Create(Pengguna pengguna)
        {
            if (ModelState.IsValid)
            {
                var (hashedPassword, salt) = HashPassword(pengguna.Password);
                pengguna.Password = hashedPassword;
                pengguna.Salt = salt;
                Console.WriteLine(hashedPassword);

                _context.Pengguna.Add(pengguna);
                _context.SaveChanges();

                return RedirectToAction(nameof(Index));
            }
            return View(pengguna); // Jika model tidak valid, kembali ke form create dengan data yang diinput
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
        [Authorize]
        public IActionResult Update(Guid id, Pengguna updatedPengguna)
    {
        var pengguna = _context.Pengguna.FirstOrDefault(p => p.Id == id);
        if (pengguna == null)
        {
            return NotFound();
        }

        if (ModelState.IsValid)
        {
            pengguna.UserName = updatedPengguna.UserName;
            pengguna.Password = updatedPengguna.Password;
            pengguna.Role = updatedPengguna.Role;
            _context.SaveChanges();
            return RedirectToAction(nameof(Index));
        }

        return View(pengguna); // Jika model tidak valid, kembali ke form update dengan data yang diinput
    }

        [HttpPost]
        public IActionResult Delete(Guid id)
        {
            var pengguna = _context.Pengguna.FirstOrDefault(p => p.Id == id);
            if (pengguna == null)
            {
                return NotFound();
            }

            _context.Pengguna.Remove(pengguna);
            _context.SaveChanges();
            return RedirectToAction(nameof(Index));
        }
    }