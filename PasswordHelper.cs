namespace Menyala.Helpers // Sesuaikan dengan namespace proyek Anda
{
    public class PasswordHelper
    {
        // Method untuk hashing password
        public static string HashPassword(string password)
        {
            return BCrypt.Net.BCrypt.HashPassword(password);
        }

        // Method untuk verifikasi password
        public static bool VerifyPassword(string password, string hashedPassword)
        {
            return BCrypt.Net.BCrypt.Verify(password, hashedPassword);
        }
    }
}
