using DAL;
using DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace ExcelEducation.Controllers
{
    public class PageController : Controller
    {
        // GET: Page
        public async Task<ActionResult> Index()
        {
            Page ob = new Page();
            ob.ACTION = "1";

            var orderList = new List<SelectListItem>();
            for (int i = 1; i <= 100; i++)
            {
                orderList.Add(new SelectListItem { Text = i.ToString(), Value = i.ToString() });
            }
            ob.ORDERDD = orderList;

            ob.SHOWDD = new List<SelectListItem> { new SelectListItem { Text = "YES", Value = "true", Selected = true }, new SelectListItem { Text = "NO", Value = "false" }, };

            ob.LINKDD = new List<SelectListItem> { new SelectListItem { Text = "LINK", Value = "true", Selected = true }, new SelectListItem { Text = "DESCRIPTION", Value = "false" }, };

            ob.SUBMENUDD = new List<SelectListItem> { new SelectListItem { Text = "YES", Value = "true", Selected = true }, new SelectListItem { Text = "NO", Value = "false" }, };

            ob.DEPARTMENTDD = new List<SelectListItem> { new SelectListItem { Text = "YES", Value = "true", Selected = true }, new SelectListItem { Text = "NO", Value = "false" }, };

            var pageHeads = await MenusDB.GetPageHeads();
            ob.SelectPageHead = pageHeads.Select(x => new SelectListItem
            {
                Text = x.PAGE_HEAD_NAME,
                Value = x.PAGE_HEAD_ID.ToString()
            }).ToList();

            return View("Page", ob);
        }

        public async Task<ActionResult> loadRecord(string pageHeadId)
        {
            return Json(new { data = await MenusDB.GetPages(Convert.ToInt32(pageHeadId)) }, JsonRequestBehavior.AllowGet);
        }

        public async Task<bool> addEditRecord(Page param)
        {
            return await PageDB.AddRecord(param);
        }

        [HttpPost]
        public async Task<bool> SetOrder(int order, int recordId)
        {
            return await PageDB.SetOrder(order, recordId);
        }

        [HttpPost]
        public async Task<bool> ToggleRecord(bool togglevalue, int recordId, string fieldName)
        {
            return await PageDB.toggleRecord(togglevalue, recordId, fieldName);
        }

        [HttpPost]
        public async Task<bool> DeleteRecord(int recordId)
        {
            return await PageDB.DeleteRecord(recordId);
        }
    }
}