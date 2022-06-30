using Dapper.Contrib.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Models
{
	[Table("TBL_PAGE_PHOTOS")]
	public class PagePhotos
	{
		public int SUB_TOPIC_ID { get; set; }
		[Key]
		public int PHOTO_ID { get; set; }
		public string PHOTO_PATH { get; set; }
	}
}
