using Dapper.Contrib.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace DAL.Models
{
	[Table("TBL_PAGE_FILES")]
	public class PageFiles
	{
        [Key]
		public int FILE_ID { get; set; }
		public int SUB_TOPIC_ID { get; set; }
		public DateTime FILE_DATE { get; set; }
		public string FILE_DESCRIPTION { get; set; }
		public string FILE_PATH { get; set; }
		public int FILE_ORDER { get; set; }
		[Computed]
		public List<SelectListItem> ORDERDD { get; set; }
		
	}
}
