using System.ComponentModel.DataAnnotations;

public class TiketModel
{
    [Required(ErrorMessage = "Email wajib diisi.")]
    [EmailAddress(ErrorMessage = "Masukkan alamat email yang valid.")]
    public string Email { get; set; }

    [Required(ErrorMessage = "Subjek wajib diisi.")]
    public string Subject { get; set; }

    [Required(ErrorMessage = "Pesan wajib diisi.")]
    public string Message { get; set; }
}
