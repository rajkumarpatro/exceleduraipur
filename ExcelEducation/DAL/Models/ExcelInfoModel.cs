using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Models
{
    public class ExcelInfoModel
    {
        public string page { get; set; }
        public List<PageTopic> Topics { get; set; }
    }
}
