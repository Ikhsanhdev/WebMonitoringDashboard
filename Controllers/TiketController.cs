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
                // Pengaturan penerima email dan subjek email
                var toEmail = "email@namadomain.com"; // Ganti dengan alamat email yang diinginkan
                var emailSubject = $"Pesan website dari {model.Name}";
                var body = $"<h2>via Form Kontak Website</h2>" +
                           $"<h4>Name</h4><p>{model.Name}</p>" +
                           $"<h4>Email</h4><p>{model.Email}</p>" +
                           $"<h4>Subject</h4><p>{model.Subject}</p>" +
                           $"<h4>Message</h4><p>{model.Message}</p>";

                // Mengirim email menggunakan SMTP
                var smtpClient = new SmtpClient("smtp.your-email-provider.com")
                {
                    Port = 587,
                    Credentials = new NetworkCredential("your-email@example.com", "your-email-password"),
                    EnableSsl = true,
                };

                var mailMessage = new MailMessage
                {
                    From = new MailAddress(model.Email, model.Name),
                    Subject = emailSubject,
                    Body = body,
                    IsBodyHtml = true,
                };

                mailMessage.To.Add(toEmail);

                smtpClient.Send(mailMessage);

                ViewBag.StatusMessage = "Pesan Anda sudah terkirim dengan sukses!";
                ViewBag.StatusClass = "succdiv";
            }
            catch
            {
                ViewBag.StatusMessage = "Maaf, pesan Anda gagal terkirim. Silakan coba lagi.";
                ViewBag.StatusClass = "errordiv";
            }
        }
        else
        {
            ViewBag.StatusMessage = "Harap mengisi semua field data.";
            ViewBag.StatusClass = "errordiv";
        }

        return View(model);
    }
}
