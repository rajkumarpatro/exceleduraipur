using DAL;
using DAL.Models;
using ExcelEducation.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace ExcelEducation.Controllers
{
    public class LatestUpdatesController : Controller
    {
        // GET: LatestUpdates
        public ActionResult Index()
        {
            LatestUpdatesModel ob = new LatestUpdatesModel();
            ob.ACTION = "1";
            ob.NEWS_SECTIONDD = new List<SelectListItem> { 
                new SelectListItem { Text = "News", Value = "News", Selected = true },
                //new SelectListItem { Text = "Announcements", Value = "Announcements" },
                //new SelectListItem { Text = "Both", Value = "Both" }
            };
            ob.NEWS_LINKTYPEDD = new List<SelectListItem> {
                new SelectListItem { Text = "Text", Value = "Text", Selected = true },
                new SelectListItem { Text = "URL", Value = "URL" },
                new SelectListItem { Text = "File", Value = "File" }
            };
            return View("LatestUpdates", ob);
        }

        public async Task<ActionResult> loadRecord()
        {
            return Json(new { data = await LatestUpdatesDB.LoadLatestUpdates() }, JsonRequestBehavior.AllowGet);
        }

        public async Task<bool> addEditRecord(LatestUpdatesModel param)
        {
            if(param.NEWS_LINKTYPE== "File") 
            {
                param.NEWS_FILEPATH = FileHandler.SaveUploadedFile(Request, "LatestUpdates", param.NEWS_ID);
            }
            
            return await LatestUpdatesDB.AddRecord(param);
        }

        [HttpPost]
        public async Task<bool> DeleteRecord(int recordId)
        {
            return await LatestUpdatesDB.DeleteRecord(recordId);
        }
    }
}