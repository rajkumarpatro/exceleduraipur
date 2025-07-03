using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace DAL.Models
{
    public class HomeViewModel {
        public List<FlashModel> FlashList { get; set; }
        public List<TestimonialModel> TestimonialList { get; set; }
        public string PopupImg { get; set; }
        public bool ShowPopup { get; set; }
        public int CourseMasterId { get; set; }
        public List<SelectListItem> CourseMasterDD { get; set; }
        public int BatchId { get; set; }
        public List<SelectListItem> BatchDD { get; set; }
    }   

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
