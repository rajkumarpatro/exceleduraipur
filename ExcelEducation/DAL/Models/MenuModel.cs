using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Models
{
    public class MenuModel
    {
        public int PAGE_HEAD_ID { get; set; }
        public string PAGE_HEAD_NAME { get; set; }
        public int REORDER { get; set; }
        public bool IS_LINK { get; set; } = false;
        public string LINK_URL { get; set; }
        public List<SubMenuModel> SUBMENU { get; set; }
    }

    public class SubMenuModel
    {
        public int PAGE_ID { get; set; }
        public int PAGE_HEAD_ID { get; set; }
        public string PAGE_NAME { get; set; }
        public bool SHOW { get; set; } = true;
        public bool SUB_MENU { get; set; } = false;
        public int REORDER { get; set; }
        public bool IS_DEPARTMENT { get; set; } = false;
        public bool IS_LINK { get; set; } = false;
        public string LINK_URL { get; set; }
    }
}
