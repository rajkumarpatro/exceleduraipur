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
            List<CourseMasterModel> courses = await LatestUpdatesDB.GetCourses();

            HomeViewModel homeViewModel = new HomeViewModel
            {
                PopupImg = popup.IMAGE_PATH,
                ShowPopup = popup.SHOW,
                FlashList = flash,
                TestimonialList = testimonials,
                BatchDD = new List<SelectListItem>(),
                CourseMasterDD = courses.Select(x => new SelectListItem {
                    Text = x.M_COURSE_NAME, Value = x.M_COURSE_ID.ToString()
                }).ToList()
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

        public async Task<ActionResult> GetBatch(int courseId)
        {
            return Json(await LatestUpdatesDB.GetBatch(courseId), JsonRequestBehavior.AllowGet);
        }

        public async Task<ActionResult> GetAppearingForYear()
        {
            return Json(await LatestUpdatesDB.GetAppearingForYear(), JsonRequestBehavior.AllowGet);
        }

        public async Task<bool> Enquiry(string name, string mode, string message, string mobile, string batch, string course, string city)
        {
            return await LatestUpdatesDB.Enquiry(name, mode, message, mobile, batch, course, city);
        }
    }
}