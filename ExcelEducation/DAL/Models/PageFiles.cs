using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Models
{
	public class PageFiles
	{
		public int FILE_ID { get; set; }
		public int SUB_TOPIC_ID { get; set; }
		public DateTime FILE_DATE { get; set; }
		public string FILE_DESCRIPTION { get; set; }
		public string FILE_PATH { get; set; }
		public int FILE_ORDER { get; set; }
	}
}
