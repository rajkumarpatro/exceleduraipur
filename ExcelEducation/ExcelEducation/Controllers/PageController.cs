using DAL.Models;
using System.Web.Mvc;

namespace ExcelEducation.Controllers
{
    public class PageController : Controller
    {
        // GET: Page
        public ActionResult Index()
        {
            PageModel ob = new PageModel();
            ob.ACTION = "1";
            return View("Page", ob);
        }
    }
}