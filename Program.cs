using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Menyala.Data; // Sesuaikan namespace dengan nama proyek Anda
using menyala.Hubs; // Sesuaikan namespace dengan nama proyek Anda


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();
builder.Services.AddSignalR();

// Konfigurasi autentikasi dan authorization
builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
    .AddCookie(options =>
    {
        options.LoginPath = "/Akun/Login";
        options.AccessDeniedPath = "/Akun/AccessDenied";
    });

builder.Services.AddAuthorization();

// Registrasi DbContext dengan koneksi database
builder.Services.AddDbContext<AppDbContext>(options =>
{
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"));
});

// Tambahkan layanan MemoryCache
builder.Services.AddMemoryCache();



var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

// Tambahkan middleware autentikasi
app.UseAuthentication();

// Tambahkan middleware authorization
app.UseAuthorization();
// Tambahkan endpoint SignalR
app.MapHub<NotificationHub>("/notificationHub");

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Akun}/{action=Login}/{id?}");
// nnnn
app.Run();
app.UseEndpoints(endpoints =>
{
    endpoints.MapHub<NotificationHub>("/notificationHub");
});