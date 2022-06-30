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
    public class FlashController : Controller
    {
        // GET: Flash
        public ActionResult Index()
        {
            FlashModel ob = new FlashModel();
            ob.ACTION = "1";
            return View("Flash", ob);
        }

        public async Task<ActionResult> loadRecord()
        {
            return Json(new { data = await FlashDB.LoadFlash() }, JsonRequestBehavior.AllowGet);
        }

        public async Task<bool> addEditDeleteRecord(FlashModel flash)
        {
            flash.FLASH_FILEPATH = FileHandler.SaveUploadedFile(Request, "Flash", flash.FLASH_ID);

            return await FlashDB.AddFlash(flash);
        }

        [HttpPost]
        public async Task<bool> ToggleFlash(bool flash, int flashId)
        {
            return await FlashDB.toggleFlash(flash, flashId);
        }

        [HttpPost]
        public async Task<bool> SetOrder(int order, int flashId)
        {
            return await FlashDB.SetOrder(order, flashId);
        }

        public async Task<bool> DeleteFlash(int flashId)
        {
            return await FlashDB.DeleteFlash(flashId);
        }

    }
}