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
            List<FlashModel> flash = await FlashDB.LoadFlash();
            //return PartialView("_Flash", flash);
            return View("Index", flash);
        }

        public async Task<ActionResult> LoadFlashPhotos()
        {
            List<FlashModel> flash = await FlashDB.LoadFlash();
            return PartialView("_Flash", flash);
        }


        public async Task<ActionResult> LoadNews()
        {
            List<LatestUpdatesModel> news = await LatestUpdatesDB.LoadLatestUpdates();
            return PartialView("_News", news);
        }
    }
}