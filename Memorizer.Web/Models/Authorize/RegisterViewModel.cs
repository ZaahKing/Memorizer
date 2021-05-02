using System.ComponentModel.DataAnnotations;

namespace Memorizer.Web.Models.Authorize
{
    public class RegisterViewModel
    {
        [Required(ErrorMessage = "Login must be typed.")]
        [DataType(DataType.EmailAddress)]
        public string Login { get; set; }

        public string Name { get; set; }

        [Required(ErrorMessage = "Password must be typed.")]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        [DataType(DataType.Password)]
        [Compare("Password", ErrorMessage ="Paswords are not same.")]
        public string ConfirmPassword { get; set; }
    }
}
