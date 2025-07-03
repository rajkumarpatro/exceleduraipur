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
    public class EnquiryController : Controller
    {
        // GET: Flash
        public async Task<ActionResult> Index()
        {
            List<CourseMasterModel> courses = await LatestUpdatesDB.GetCourses();
            EnquiryModel ob = new EnquiryModel()
            {
                BatchDD = new List<SelectListItem>(),
                CourseMasterDD = courses.Select(x => new SelectListItem
                {
                    Text = x.M_COURSE_NAME,
                    Value = x.M_COURSE_ID.ToString()
                }).ToList()
            };

            return View("Enquiry", ob);
        }
    }
}