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
		public bool SHOW { get; set; } = true;
		public int REORDER { get; set; }
		public bool IS_LINK { get; set; } = false;
		public string LINK_URL { get; set; }
		public List<SelectListItem> LINKDD { get; set; }
		public List<SelectListItem> SelectPageHead { get; set; }
		public List<SelectListItem> ORDERDD { get; set; }
		public List<SelectListItem> SHOWDD { get; set; }
		public string ACTION { get; set; }


	}
}
