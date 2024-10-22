using System.ComponentModel.DataAnnotations;

public class TiketModel
{
    [Required(ErrorMessage = "Email wajib diisi.")]
    [EmailAddress(ErrorMessage = "Masukkan alamat email yang valid.")]
    [MaxLength(100, ErrorMessage = "Email tidak boleh lebih dari 100 karakter.")]
    public string Email { get; set; }

    [Required(ErrorMessage = "Subjek wajib diisi.")]
    [MaxLength(150, ErrorMessage = "Subjek tidak boleh lebih dari 150 karakter.")]
    public string Subject { get; set; }

    [Required(ErrorMessage = "Pesan wajib diisi.")]
    [MaxLength(1000, ErrorMessage = "Pesan tidak boleh lebih dari 1000 karakter.")]
    public string Message { get; set; }
}
