using DAL;
using DAL.Models;
using Dapper;
using ExcelEducation.Helpers;
using PDFReader;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace ExcelEducation.Controllers
{
    public class TestimonialController : Controller
    {
        // GET: Testimonial
        public ActionResult Index()
        {
            TestimonialModel ob = new TestimonialModel();
            return View("Testimonial", ob);
        }

        public async Task<ActionResult> loadRecord()
        {
            return Json(new { data = await TestimonialDB.LoadTestimonial() }, JsonRequestBehavior.AllowGet);
        }

        public async Task<bool> addEditDeleteRecord(TestimonialModel Testimonial1)
        {
            if (Testimonial1.ID > 0) {
                var path = "";
                var testM = await TestimonialDB.LoadTestimonialById(Testimonial1.ID);

                if (Request.Files.Count > 0)
                {
                    if (string.IsNullOrEmpty(testM.STUDENT_PHOTO) || FileHandler.DeleteFile(testM.STUDENT_PHOTO))
                        path = FileHandler.SaveUploadedFile(Request, "Testimmonial", 1);
                }
                else
                    path = testM.STUDENT_PHOTO;

                Testimonial1.STUDENT_PHOTO = path;
            }
            else
            Testimonial1.STUDENT_PHOTO = FileHandler.SaveUploadedFile(Request, "Testimonial", Testimonial1.ID);

            return await TestimonialDB.AddTestimonial(Testimonial1);
        }

        [HttpPost]
        public async Task<bool> ToggleTestimonial(bool Testimonial, int TestimonialId)
        {
            return await TestimonialDB.toggleTestimonial(Testimonial, TestimonialId);
        }

        [HttpPost]
        public async Task<bool> SetOrder(int order, int TestimonialId)
        {
            return await TestimonialDB.SetOrder(order, TestimonialId);
        }

        public async Task<bool> DeleteTestimonial(int TestimonialId)
        {
            return await TestimonialDB.DeleteTestimonial(TestimonialId);
        }

        public async Task<ActionResult> GetTestimonial(int TestimonialId)
        {
            return Json(await TestimonialDB.LoadTestimonialById(TestimonialId), JsonRequestBehavior.AllowGet);
        }

    }
}