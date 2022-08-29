using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using DAL;
using DAL.Models;

namespace ExcelEducation.Controllers
{
    public class HomeController : Controller
    {
        // GET: Home
        public async Task<ActionResult> Index()
        {
            HomeModel homeModel = new HomeModel();
            homeModel.flashModels = await FlashDB.LoadFlash();
            return View(homeModel);
        }
    }
}