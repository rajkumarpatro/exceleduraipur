using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Dapper.Contrib.Extensions;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Models
{
    [Table("TBL_TESTIMONIAL")]
    public class TestimonialModel
    {
       
        public int ID { get; set; }
        public string STUDENT_NAME { get; set; }
        public string STUDENT_CLASS { get; set; }
        public string TESTIMONIAL { get; set; }
        public string STUDENT_PHOTO { get; set; }
        public string TESTIMONIAL_ORDER { get; set; }

    }
}
