using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace DAL.Models
{
	public class PageHead
	{
		public int PAGE_HEAD_ID { get; set; }
		public string PAGE_HEAD_NAME { get; set; }
		public bool SHOW { get; set; }
		public int REORDER { get; set; }
		public List<SelectListItem> SelectPageHead { get; set; }
		public string ACTION { get; set; }
	}
}
