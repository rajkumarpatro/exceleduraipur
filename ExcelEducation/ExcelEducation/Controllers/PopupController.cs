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
using System.Security.Policy;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace ExcelEducation.Controllers
{
    public class PopupController : Controller
    {
        // GET: Popup
        public async Task<ActionResult> Index()
        {
            return View(await PopupDB.GetPopup());
        }
        public async Task<bool> SavePopup(PopupModel popupModel)
        {
            try
            {
                var path = "";
                var popup = await PopupDB.GetPopup();

                if (Request.Files.Count > 0)
                {
                    if (string.IsNullOrEmpty(popup.IMAGE_PATH) || FileHandler.DeleteFile(popup.IMAGE_PATH))
                        path = FileHandler.SaveUploadedFile(Request, "Flash", 1);
                }
                else
                    path = popup.IMAGE_PATH;

                popupModel.IMAGE_PATH = path;
                await PopupDB.UpdatePopup(popupModel.SHOW, popupModel.IMAGE_PATH);
                return true;

            }
            catch {
                return false;
            }
            
        }
    }
}