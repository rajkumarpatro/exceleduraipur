using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Models
{
    public class PageDetails
    {
        public int SUB_TOPIC_ID { get; set; }
        public int TOPIC_ID { get; set; }
        public string SUB_TOPIC_NAME { get; set; }
        public DateTime TOPIC_DATE { get; set; }
        public string TOPIC_DESCRIPTION { get; set; }
        public string TOPIC_FILEPATH { get; set; }
        public string TOPIC_LINK_TYPE { get; set; }
        public bool SHOW_TOPIC_NAME { get; set; }
        public string SUB_TOPIC_TYPE { get; set; }
        public int SUB_TOPIC_ORDER { get; set; }

    }
}
