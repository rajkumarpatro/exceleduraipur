using DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ExcelEducation.Controllers
{
    public class ChangePasswordController : Controller
    {
        // GET: ChangePassword
        public ActionResult Index()
        {
            ChangePasswordModel cpm = new ChangePasswordModel();
            return View("ChangePassword", cpm);
        }
    }
}