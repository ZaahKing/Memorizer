﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Memorizer.Web.Models.Authorize
{
    public class Credentials
    {
        [Required(ErrorMessage = "Login must be typed.")]
        public string Login { get; set; }
        [Required(ErrorMessage = "Password must be typed."), DataType(DataType.Password)]
        public string Password { get; set; }
    }
}
