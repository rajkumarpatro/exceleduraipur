using DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ExcelEducation.Controllers
{
    public class PageHeadController : Controller
    {
        // GET: PageHead
        public ActionResult Index()
        {
            PageHead ob = new PageHead();
            ob.ACTION = "1";
            return View("PageHead", ob);
        }
    }
}