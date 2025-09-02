using DAL;
using DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace ExcelEducation.Controllers
{
    public class ExcelInfoController : Controller
    {
        // GET: ExcelInfo
        public async Task<ActionResult> Index(string page)
        {
            ExcelInfoModel ob = new ExcelInfoModel();
            ob.page = page;

            int pageid = await ExcelInfoDB.GetPageId(page);

            ob.Topics = await MenusDB.GetTopics(pageid);

            return View("ExcelInfo", ob);
        }
       

        public async Task<ActionResult> LoadPageContents(int topicid)
        {
            List<TopicDetail> details = await ExcelInfoDB.GetTopicDetails(topicid);
            return PartialView("_PageContents", details);
        }

        
    }
}