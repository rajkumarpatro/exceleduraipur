using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using DAL.Models;
using System.Web.Mvc;

namespace ExcelEducation.Controllers
{
    public class ContactController : Controller
    {
        [HttpGet]
        public ActionResult Index()
        {
            return View(new ContactUS());
        }

        [HttpPost]
        public ActionResult Index(ContactUS model)
        {
            if (!ModelState.IsValid)
            {
                return View(model);
            }

            // TODO: Handle the data (e.g., send email or save to DB)

            ViewBag.MessageSent = true;
            ModelState.Clear();
            return View(new ContactUS());
        }
    }
}