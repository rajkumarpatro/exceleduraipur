using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using System.Web.Services.Description;
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
            List<CourseModel> courses = await LatestUpdatesDB.GetCourses();

            HomeViewModel homeViewModel = new HomeViewModel
            {
                PopupImg = popup.IMAGE_PATH,
                ShowPopup = popup.SHOW,
                FlashList = flash,
                TestimonialList = testimonials,
                CourseDD  = courses.Select(x=> new SelectListItem { 
                 Text = x.COURSE, Value = x.COURSE_ID.ToString()
                 }).ToList(),
                AppearingForDD = new List<SelectListItem>()
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

        public async Task<ActionResult> GetAppearingFor(int courseId)
        {
            return Json(await LatestUpdatesDB.GetAppearingFor(courseId), JsonRequestBehavior.AllowGet);
        }

        public async Task<bool> Enquiry(string name, string mode, string message, string mobile, string applyfor, string course, string city)
        {
            return await LatestUpdatesDB.Enquiry(name, mode, message, mobile, applyfor, course, city);
        }
    }
}