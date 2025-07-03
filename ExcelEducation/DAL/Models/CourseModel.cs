using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace DAL.Models
{
	public class CourseModel
    {
		public int COURSE_ID { get; set; }
		public int M_COURSE_ID { get; set; }
		public string COURSE { get; set; }
        public int ONLINE_FEES { get; set; }
        public int OFFLINE_FEES { get; set; }
		public string ISACTIVE { get; set; }
		public string APPLEARING_FOR_VALUES { get; set; }
	}
}
