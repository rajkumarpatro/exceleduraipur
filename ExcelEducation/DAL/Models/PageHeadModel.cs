using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Models
{
    public class PageHeadModel
    {
        public int PAGE_HEAD_ID { get; set; }
        public string PAGE_HEAD_NAME { get; set; }
        public bool SHOW { get; set; }
        public int REORDER { get; set; }

        public string ACTION { get; set; }
    }
}
