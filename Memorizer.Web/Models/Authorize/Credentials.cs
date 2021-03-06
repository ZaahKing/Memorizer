using System.ComponentModel.DataAnnotations;

namespace Memorizer.Web.Models.Authorize
{
    public class Credentials
    {
        [Required(ErrorMessage = "Login must be typed.")]
        [DataType(DataType.EmailAddress, ErrorMessage = "Email needed.")]
        public string Login { get; set; }
        [Required(ErrorMessage = "Password must be typed."), DataType(DataType.Password)]
        public string Password { get; set; }
    }
}
