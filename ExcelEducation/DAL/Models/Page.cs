using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace DAL.Models
{
	public class Page
	{
		public int PAGE_ID { get; set; }
		public int PAGE_HEAD_ID { get; set; }
		public string PAGE_NAME { get; set; }
		public bool SHOW { get; set; }
		public bool SUB_MENU { get; set; }
		public int REORDER { get; set; }
		public bool IS_DEPARTMENT { get; set; }
		public bool IS_LINK { get; set; }
		public string LINK_URL { get; set; }
	}
}
