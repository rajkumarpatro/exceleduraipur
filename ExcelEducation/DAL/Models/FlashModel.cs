using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Models
{
    public class FlashModel
    {
        public int FLASH_ID { get; set; }
        
        public string FLASH_CAPTION { get; set; }
        public string FLASH_FILEPATH { get; set; }
        public int FLASH_ORDER { get; set; }

        public bool FLASH_SHOW { get; set; }

        public string ACTION { get; set; }

    }
}
