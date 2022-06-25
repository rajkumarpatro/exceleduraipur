using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Models
{
	public class PastEvent
	{
		public int event_id { get; set; }
		public string department_show { get; set; }
		public string event_page { get; set; }
		public string event_name { get; set; }
		public DateTime event_date { get; set; }
		public string event_venue { get; set; }
		public string event_pic { get; set; }
		public string event_description { get; set; }
		public int event_order { get; set; }
	}
}
