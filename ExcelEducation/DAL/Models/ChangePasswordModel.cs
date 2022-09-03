using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Models
{
    public class ChangePasswordModel
    {
        public string USER_NAME { get; set; }

        public string USER_PASSWORD { get; set; }

        public string NEW_PASSWORD { get; set; }
    }
}
