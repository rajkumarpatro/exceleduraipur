using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace DAL.Models
{
    public class EnquiryModel
    {
        public int E_ID { get; set; }
        public string STUDENT { get; set; }
        public string CONTACT { get; set; }
        public string PLACE { get; set; }
        public int COURSE_ID { get; set; }
        public string APPEARING_FOR { get; set; }
        public string MODE_OF_CLASS { get; set; }
        public string MESSAGE { get; set; }
        public string ENQUERIES_READ_UNREAD { get; set; }

        public int CourseMasterId { get; set; }
        public List<SelectListItem> CourseMasterDD { get; set; }
        public int BatchId { get; set; }
        public List<SelectListItem> BatchDD { get; set; }
    }
}
