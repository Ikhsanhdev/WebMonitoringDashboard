using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Net.Mail;
using Newtonsoft.Json;
using System.Threading.Tasks;


public class TiketController : Controller
{
     private const string recaptchaSecretKey = "6LcSX2gqAAAAALaplCFO-Bl7b_dKZ8Tu3o5ZCZ3P"; // Ganti dengan secret key reCAPTCHA Anda
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

                 // Berikan pesan sukses
                ViewBag.StatusMessage = "Tiket berhasil dikirim!";
                ViewBag.StatusClass = "alert-success";
                 
                // Kembalikan form kosong
                ModelState.Clear(); // Reset form validation
                return View(new TiketModel()); // Kirim model baru yang kosong
                
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
