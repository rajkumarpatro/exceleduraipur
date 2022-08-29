using DAL.Models;
using DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Threading.Tasks;

namespace ExcelEducation.Controllers
{
    public class PageHeadController : Controller
    {
        // GET: PageHead
        public ActionResult Index()
        {
            PageHead ob = new PageHead();
            ob.ACTION = "1";

            var orderList = new List<SelectListItem>();
            for (int i = 1; i <= 100; i++) {
                orderList.Add(new SelectListItem { Text = i.ToString(), Value = i.ToString() });
            }

            ob.LINKDD = new List<SelectListItem> { new SelectListItem { Text = "LINK", Value = "true", Selected = true }, new SelectListItem { Text = "DESCRIPTION", Value = "false" }, };

            ob.ORDERDD = orderList;
            ob.SHOWDD = new List<SelectListItem> { new SelectListItem { Text = "YES", Value = "true", Selected=true }, new SelectListItem { Text = "NO", Value = "false" }, } ;
            return View("PageHead", ob);

        }

        public async Task<ActionResult> loadRecord()
        {
            return Json(new { data=await PageHeadDB.LoadPageHead()}, JsonRequestBehavior.AllowGet);
        }

        public async Task<bool> addEditRecord(PageHead param)
        {
            return await PageHeadDB.AddRecord(param);
        }

        [HttpPost]
        public async Task<bool> SetOrder(int order, int recordId)
        {
            return await PageHeadDB.SetOrder(order, recordId);
        }

        [HttpPost]
        public async Task<bool> ToggleRecord(bool togglevalue, int recordId)
        {
            return await PageHeadDB.toggleRecord(togglevalue, recordId);
        }

        [HttpPost]
        public async Task<bool> DeleteRecord(int recordId)
        {
            return await PageHeadDB.DeleteRecord(recordId);
        }
    }
}