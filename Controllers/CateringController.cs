using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using menyala.Models;
using Microsoft.AspNetCore.Authorization;

namespace menyala.Controllers;

public class CateringController : Controller
{
    private readonly ILogger<HomeController> _logger;

    public CateringController(ILogger<HomeController> logger)
    {
        _logger = logger;
    }

    [Authorize]
    public ActionResult Index() {
        return View();
    }
}