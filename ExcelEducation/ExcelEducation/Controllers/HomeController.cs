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
            var testimonials = await TestimonialDB.LoadTestimonial();
            var popup = await PopupDB.GetPopup();
            List<FlashModel> flash = await FlashDB.LoadFlash();

            HomeViewModel homeViewModel = new HomeViewModel
            {
                PopupImg = popup.IMAGE_PATH,
                ShowPopup = popup.SHOW,
                FlashList = flash,
                TestimonialList = testimonials
            };

            return View("Index", homeViewModel);
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