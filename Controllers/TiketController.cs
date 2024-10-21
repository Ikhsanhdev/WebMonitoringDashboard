using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Net.Mail;

public class TiketController : Controller
{
    [HttpGet]
    public IActionResult Tiket()
    {
        return View();
    }

    [HttpPost]
    public IActionResult Tiket(TiketModel model)
    {
        if (ModelState.IsValid)
        {
            try
            {
                // Email pengirim berdasarkan input pengguna
                var senderEmail = new MailAddress(model.Email); 
                var receiverEmail = new MailAddress("akushafaa27@gmail.com", "WebMonitoring"); // Email penerima tetap
                var smtpUser = "akushafaa27@gmail.com"; // Email tetap untuk otentikasi SMTP
                var password = "ronmxwoxvkxqbnyj"; // Password untuk SMTP
   
                // Isi email dari model form
                var subject = model.Subject; 
                var body = $"Pesan dari: {model.Email} \n\nPesan: {model.Message}";

                // Konfigurasi SMTP untuk pengiriman email
                var smtp = new SmtpClient
                {
                    Host = "smtp.gmail.com",
                    Port = 587,
                    EnableSsl = true,
                    DeliveryMethod = SmtpDeliveryMethod.Network,
                    UseDefaultCredentials = false,
                    Credentials = new NetworkCredential(smtpUser, password)
                };

                // Membuat objek MailMessage
                using (var message = new MailMessage(senderEmail, receiverEmail)
                {
                    Subject = subject,
                    Body = body
                })
                {
                    smtp.Send(message); // Kirim email
                }

                // Jika email berhasil dikirim, tampilkan pesan sukses
                ViewBag.StatusMessage = "Tiket berhasil dikirim.";
                 // Kembalikan view yang sama (tanpa redirect)
                return View(model);
            }
            catch (Exception ex)
            {
                // Jika ada kesalahan dalam pengiriman email
                ViewBag.StatusMessage = $"Terjadi kesalahan: {ex.Message}";
                return View(model);
            }
        }
        return View(model); // Jika data tidak valid, kembali ke form
    }

    public IActionResult Success()
    {
        return View();
    }
}
