using Memorizer.Web.DataAccess;
using Memorizer.Web.Models;
using Memorizer.Web.Models.Authorize;
using Memorizer.Web.Services;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Memorizer.Web.Controllers
{
    public class AccountController : Controller
    {
        private readonly AppDBContext db;
        private readonly AuthService authService;
        public AccountController(AppDBContext db) : base()
        {
            this.db = db;
            authService = new AuthService(db);
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public IActionResult Login()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Login(Credentials credentials)
        {
            if (ModelState.IsValid)
            {
                var user = await authService.Login(credentials.Login, credentials.Password);
                if (user != null)
                {
                    await Authenticate(credentials.Login);
                    return RedirectToAction("Index", "Home");
                }
                ModelState.AddModelError("", "Login or password are not correct");
            }

            return View(credentials);
        }

        [HttpGet]
        public IActionResult Register()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Register(RegisterViewModel registerData)
        {
            if (ModelState.IsValid)
            {
                if (!await this.authService.UserExists(registerData.Login.ToLower()))
                {
                    await this.authService.Register(
                        new User
                        {
                            Email = registerData.Login,
                            Name = registerData.Name,
                        },
                        registerData.Password);
                    await this.Authenticate(registerData.Login);
                    return RedirectToAction("Index", "Home");
                }
                ModelState.AddModelError("", "User with same login is exist.");
            }
            return View(registerData);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Logout()
        {
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            return RedirectToAction("Index", "Home");
        }

        private async Task Authenticate(string userName)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimsIdentity.DefaultNameClaimType, userName)
            };
            ClaimsIdentity id = new ClaimsIdentity(claims, "ApplicationCookie", ClaimsIdentity.DefaultNameClaimType, ClaimsIdentity.DefaultRoleClaimType);
            await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(id));
        }
    }
}
