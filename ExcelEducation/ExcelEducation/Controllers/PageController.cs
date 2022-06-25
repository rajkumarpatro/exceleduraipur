using DAL.Models;
using System.Web.Mvc;

namespace ExcelEducation.Controllers
{
    public class PageController : Controller
    {
        // GET: Page
        public ActionResult Index()
        {
            Page ob = new Page();
            ob.ACTION = "1";
            return View("Page", ob);
        }
    }
}