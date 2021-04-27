using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Memorizer.Web.Controllers
{
    public class Welcom : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
