using Dapper.Contrib.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace DAL.Models
{

    [Table("TBL_PAGE_TOPIC")]
    public class PageTopic
	{
        [Key]
        public int TOPIC_ID { get; set; }
		public int PAGE_ID { get; set; }
		public string TOPIC_NAME { get; set; }
		public bool IS_LINK { get; set; }
		public string LINK_URL { get; set; }
		public int TOPIC_ORDER { get; set; }
		
		[Computed]
		public List<SelectListItem> ORDERDD { get; set; }
	}
}
