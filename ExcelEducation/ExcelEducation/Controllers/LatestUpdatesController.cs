using DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
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
            return View("LatestUpdates", ob);
        }
    }
}