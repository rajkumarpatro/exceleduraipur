using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace DAL.Models
{
    public class LatestUpdatesModel
    {
        public int NEWS_ID { get; set; }
        public DateTime NEWS_DATE { get; set; }
        public string NEWS_TITLE { get; set; }

        public string NEWS_SECTION { get; set; }
        public string NEWS_FILEPATH { get; set; }

        public string NEWS_LINK { get; set; }

        public string NEWS_LINKTYPE { get; set; }

        public string NEWS_YEAR { get; set; }
        public string NEWS_DAY { get; set; }
        public string NEWS_MONTH { get; set; }

        public List<SelectListItem> NEWS_SECTIONDD { get; set; }
        public List<SelectListItem> NEWS_LINKTYPEDD { get; set; }

        public string ACTION { get; set; }
    }
}
