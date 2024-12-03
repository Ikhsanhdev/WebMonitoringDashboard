public class Tiket
{
    public Guid id { get; set; } = Guid.NewGuid();
    public string? instansi { get; set; }
    public string? subject { get; set; }
    public string? deskripsi { get; set; }
    public string? gambar { get; set; }
    public int read { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.Now; // Default ke waktu saat ini
    public string? status { get; set; } // Tambahkan tanda '?' untuk nullable
}
