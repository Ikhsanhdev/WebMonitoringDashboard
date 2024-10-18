using System.ComponentModel.DataAnnotations;

public class TiketModel
{
    [Required(ErrorMessage = "Nama wajib diisi.")]
    public string Name { get; set; }

    [Required(ErrorMessage = "Email wajib diisi.")]
    [EmailAddress(ErrorMessage = "Masukkan email yang valid.")]
    public string Email { get; set; }

    [Required(ErrorMessage = "Subjek wajib diisi.")]
    public string Subject { get; set; }

    [Required(ErrorMessage = "Pesan wajib diisi.")]
    public string Message { get; set; }
}
