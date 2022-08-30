using Dapper.Contrib.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace DAL.Models
{
    [Table("TBL_TOPIC_DETAIL")]
    public class TopicDetail
    {
        [Key]
        public int SUB_TOPIC_ID { get; set; }
        public int TOPIC_ID { get; set; }
        public string SUB_TOPIC_NAME { get; set; }
        public DateTime TOPIC_DATE { get; set; }
        public string TOPIC_DESCRIPTION { get; set; }
        public string TOPIC_FILEPATH { get; set; }
        public bool TOPIC_LINK_TYPE { get; set; }
        public bool SHOW_TOPIC_NAME { get; set; } = true;
        public bool SUB_TOPIC_TYPE { get; set; }
        public int SUB_TOPIC_ORDER { get; set; }

        [Computed]
        public List<SelectListItem> ORDERDD { get; set; }
        [Computed]
        public List<SelectListItem> SUBTOPICTYPEDD { get; set; }

        [Computed]
        public List<PagePhotos> PagePhotos { get; set; } = new List<PagePhotos>();

        [Computed]
        public List<PageFiles> PageFiles { get; set; } = new List<PageFiles>();

    }
}
