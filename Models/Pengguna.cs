using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace menyala.Models
{
    public class Pengguna
    {
        [Key]
        [Column("id")] // Pastikan nama kolom sesuai dengan yang ada di database
        public Guid Id { get; set; } // Pastikan tipe datanya Guid jika menggunakan UUID
        
        [Column("user_name")]
        public string UserName { get; set; }
        
        [Column("password")]
        public string Password { get; set; }
        
        [Column("last_login")]
        public DateTime? LastLogin { get; set; }
        
        [Column("role")]
        public string Role { get; set; }

        [Column("salt")]
        public string? Salt {get; set;}
    }
}