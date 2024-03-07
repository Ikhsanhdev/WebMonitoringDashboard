// Create a class for your item type
using System.ComponentModel.DataAnnotations;

public class Api
{
    public string? deviceId { get; set; }
    public string? slug { get; set; }
    public string? organizationCode { get; set; }
    public string balaiName { get; set; }
    public DateTime? lastReadingAt { get; set; }
    public string? deviceStatus { get; set; }

    // Sesuaikan properti berikut dengan yang digunakan dalam logika penyortiran
    public int nomor { get; set; }
    public int jumlahPos { get; set; }
    public int jumlahPosOnline { get; set; }
    public int jumlahPosOffline { get; set; }
}

 public class DataTableResult<T>
    {
        public int draw { get; set; }
        public int recordsTotal { get; set; }
        public int recordsFiltered { get; set; }
        public List<T> data { get; set; }
    }
