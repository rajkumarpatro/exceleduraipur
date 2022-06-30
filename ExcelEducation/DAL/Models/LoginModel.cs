using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Models
{
    public class LoginModel
    {
        public string FULL_NAME { get; set; }

        public string USER_NAME { get; set; }

        public string USER_PASSWORD { get; set; }

        public string USER_STATUS { get; set; }

        public string StatusCode { get; set; }
    }
}
