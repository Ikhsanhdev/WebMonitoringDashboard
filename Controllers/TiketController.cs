using Microsoft.AspNetCore.Mvc;
using Menyala.Data;
using menyala.Models;
using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http;
using System.IO;
using Microsoft.AspNetCore.Hosting;
using menyala.Hubs; // Sesuaikan dengan namespace NotificationHub Anda
using Microsoft.AspNetCore.Authorization;

public class TiketController : Controller
{
    private readonly AppDbContext _context;
    private readonly IWebHostEnvironment _webHostEnvironment;

    // Menyuntikkan IWebHostEnvironment dan IHubContext untuk notifikasi SignalR
    public TiketController(AppDbContext context, IWebHostEnvironment webHostEnvironment)
    {
        _context = context;
        _webHostEnvironment = webHostEnvironment;
    }


    // Menampilkan semua tiket
    [Authorize] 
    public async Task<IActionResult> Index(string? filter)
    {
        // Ambil username dari user yang login
        var username = User.Identity?.Name;
        if (string.IsNullOrEmpty(username))
        {
            TempData["ErrorMessage"] = "Pengguna tidak terautentikasi.";
            return RedirectToAction("Login", "Account"); // Arahkan ke halaman login jika username tidak valid
        }

         IQueryable<Tiket> ticketsQuery = _context.Tikets;

        // Terapkan filter jika ada
         if (!string.IsNullOrEmpty(filter))
    {
        switch (filter.ToLower())
        {
            case "processing":
                ticketsQuery = ticketsQuery.Where(t => t.status == "Processing");
                break;
            case "resolved":
                ticketsQuery = ticketsQuery.Where(t => t.status == "Resolved");
                break;
            case "pending":
                ticketsQuery = ticketsQuery.Where(t => string.IsNullOrEmpty(t.status) || t.status == "Pending");
                break;
            case "all":
                // Tidak ada filter, tampilkan semua tiket
                break;
            default:
                ticketsQuery = ticketsQuery.Where(t => t.status == filter);
                break;
        }
    }
        // Filter berdasarkan instansi pengguna
        ticketsQuery = ticketsQuery.Where(t => t.instansi == username);

        var ticketList = await ticketsQuery.ToListAsync();

        return View(ticketList);
    }

    [Authorize]
    // Menampilkan form untuk membuat tiket baru
    public IActionResult Create()
    {
        return View();
    }

    // Menyimpan tiket baru ke database dan mengirim notifikasi
    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Create(Tiket tiket, IFormFile gambarFile)
    {
        if (ModelState.IsValid)
        {
            // Konversi waktu UTC ke lokal (WIB)
            var localTimeZone = TimeZoneInfo.FindSystemTimeZoneById("SE Asia Standard Time");
            tiket.CreatedAt = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, localTimeZone);

            // Generate unique ID untuk tiket
            tiket.id = Guid.NewGuid();

            // Proses upload file gambar
            if (gambarFile != null && gambarFile.Length > 0)
            {
                var fileName = Path.GetFileNameWithoutExtension(gambarFile.FileName);
                var extension = Path.GetExtension(gambarFile.FileName);
                var newFileName = $"{fileName}_{DateTime.Now.Ticks}{extension}";
                var uploadPath = Path.Combine(_webHostEnvironment.WebRootPath, "uploads", newFileName);

                using (var fileStream = new FileStream(uploadPath, FileMode.Create))
                {
                    await gambarFile.CopyToAsync(fileStream);
                }

                tiket.gambar = $"/uploads/{newFileName}";
            }

            // Menambahkan tiket ke database
            _context.Add(tiket);
            await _context.SaveChangesAsync();

           

            // Set TempData untuk pesan sukses
            TempData["SuccessMessage"] = "Keluhan berhasil dibuat!";

           

            return RedirectToAction("Index");
        }

        // Set TempData untuk pesan error jika gagal
        TempData["ErrorMessage"] = "Gagal membuat tiket. Mohon periksa data Anda.";
        return View(tiket);
    }



    // Menghitung jumlah notifikasi yang belum dibaca
    public int GetUnreadNotificationCount()
    {
        return _context.Tikets.Count(t => t.read == 0); // Menghitung tiket yang belum dibaca (read == 0)
    }
    [HttpGet]
    public async Task<IActionResult> GetUnreadTickets()
    {
        var unreadTickets = await _context.Tikets
            .Where(t => t.read == 0) // Filter tiket yang belum dibaca
            .Select(t => new { t.id, t.instansi, t.subject, t.deskripsi, t.gambar })
            .ToListAsync();

        return Json(unreadTickets);
    }

        [HttpPost]
        public async Task<IActionResult> MarkAsRead(Guid id)
        {
            var tiket = await _context.Tikets.FindAsync(id);
            if (tiket != null && tiket.read == 0)
            {
                tiket.read = 1; // Set sebagai "read"
                await _context.SaveChangesAsync();
            }
            return Ok();
        }
        [Authorize]
        public IActionResult Detail()
        {
            var tiketList = _context.Tikets.ToList(); // Mengambil semua data dari tabel Tikets
            return View(tiketList); // Mengirimkan data ke view
        }
      // Private static dictionary untuk menyimpan nomor antrian berdasarkan hari
        private static readonly Dictionary<DateTime, int> QueueNumbers = new Dictionary<DateTime, int>();

        // Fungsi untuk mendapatkan nomor urut antrian berikutnya
        private int GetNextQueueNumber()
        {
            var today = DateTime.Today;

            // Jika hari baru, mulai dari 1
            if (!QueueNumbers.ContainsKey(today))
            {
                QueueNumbers[today] = 1;
            }
            else
            {
                QueueNumbers[today]++;
            }

            return QueueNumbers[today];
        }

    [HttpPost]
    public IActionResult KirimAntrian([FromBody] Guid id)
    {
        if (id == Guid.Empty)
        {
            return BadRequest("Invalid Ticket ID");
        }

        // Cari tiket berdasarkan ID
        var tiket = _context.Tikets.FirstOrDefault(t => t.id == id);
        if (tiket == null)
        {
            return NotFound("Tiket tidak ditemukan");
        }

        // Perbarui status tiket
        tiket.status = "Dalam Antrian";
        _context.SaveChanges();

        // Dapatkan nomor urut antrian
        int nomorUrut = GetNextQueueNumber();


        return Ok(new { nomorUrut });
    }
    [HttpPost]
    public IActionResult UpdateStatus([FromBody] UpdateStatusRequest request)
    {
        try
        {
            var tiket = _context.Tikets.FirstOrDefault(t => t.id == request.id);
            if (tiket == null)
            {
                return Json(new { success = false, message = "Keluhan tidak ditemukan." });
            }

            tiket.status = request.status; // Update status tiket
            _context.SaveChanges();

            // Kembalikan respons sukses
            return Json(new { success = true, message = "Keluhan  berhasil diupdate." });
        }
        catch (Exception ex)
        {
            // Tangani jika ada error
            return Json(new { success = false, message = "Terjadi kesalahan: " + ex.Message });
        }
    }
[HttpPost]
public IActionResult UpdatePriority([FromBody] UpdatePriorityRequest request)
{
    try
    {
        // Cari tiket berdasarkan id
        var tiket = _context.Tikets.FirstOrDefault(t => t.id == request.id);
        if (tiket == null)
        {
            return Json(new { success = false, message = "Keluhan tidak ditemukan." });
        }

        // Perbarui prioritas tiket
        tiket.priority = request.priority;
        _context.SaveChanges();

        // Kembalikan respons sukses
        return Json(new { success = true, message = $"Prioritas Keluhan berhasil diupdate menjadi {request.priority}." });
    }
    catch (Exception ex)
    {
        // Tangani jika terjadi error
        return Json(new { success = false, message = "Terjadi kesalahan: " + ex.Message });
    }
}
    // Model untuk request
    public class UpdateStatusRequest
    {
        public Guid id { get; set; }
        public string status { get; set; }
    }
    public class UpdatePriorityRequest
{
    public Guid id { get; set; }
    public string priority { get; set; }
}
}

