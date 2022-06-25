using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Models
{
	public class PageTopic
	{
		public int TOPIC_ID { get; set; }
		public int PAGE_ID { get; set; }
		public string TOPIC_NAME { get; set; }
		public string IS_LINK { get; set; }
		public string LINK_URL { get; set; }
		public int TOPIC_ORDER { get; set; }
	}
}
