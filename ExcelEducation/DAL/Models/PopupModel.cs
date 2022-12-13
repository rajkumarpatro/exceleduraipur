using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Models
{
    public class PopupModel
    {
        public int ID { get; set; }
        
        public string IMAGE_PATH { get; set; }
        public bool SHOW { get; set; }

    }
}
