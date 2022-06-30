using DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace ExcelEducation.Controllers
{
    public class TopicController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public async Task<ActionResult> GetPageHead()
        {
            return Json(new
            {
                data = (await MenusDB.GetPageHead())
                .Select(x => new { id = x.PAGE_HEAD_ID, text = x.PAGE_HEAD_NAME }).ToList()
            }, JsonRequestBehavior.AllowGet);
        }

        public async Task<ActionResult> GetPage(int pageHeadId = 0)
        {
            return Json(new
            {
                data = (await MenusDB.GetPage(pageHeadId))
                .Select(x => new { id = x.PAGE_ID, text = x.PAGE_NAME }).ToList()
            }, JsonRequestBehavior.AllowGet);
        }
    }
}