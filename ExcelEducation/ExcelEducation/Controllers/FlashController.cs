using DAL;
using DAL.Models;
using Dapper;
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
            using (IDbConnection db = new SqlConnection(Connection.MyConnection()))
            {
                DynamicParameters dp = new DynamicParameters();
                dp.Add("FLASH_ID", 0);
                dp.Add("FLASH_CAPTION", "");
                dp.Add("FLASH_FILEPATH", "");
                dp.Add("FLASH_ORDER", 0);
                dp.Add("FLASH_SHOW", true);
                dp.Add("ACTION", "4");

                try
                {
                    return Json(new { data = await db.QueryAsync<FlashModel>("SP_FLASH", dp, commandType: CommandType.StoredProcedure) }, JsonRequestBehavior.AllowGet);
                }
                catch (Exception ee)
                {
                    return View("Flash", new FlashModel());
                }
            }            
        }

        public async Task<int> addEditDeleteRecord(FlashModel flash)
        {
            using(IDbConnection db=new SqlConnection(Connection.MyConnection()))
            {
                DynamicParameters dp = new DynamicParameters();
                dp.Add("FLASH_ID", flash.FLASH_ID);
                dp.Add("FLASH_CAPTION", flash.FLASH_CAPTION);
                dp.Add("FLASH_FILEPATH", flash.FLASH_FILEPATH);
                dp.Add("FLASH_ORDER", flash.FLASH_ORDER);
                dp.Add("FLASH_SHOW", flash.FLASH_SHOW);
                dp.Add("ACTION", flash.ACTION);

                try
                {
                    return await db.ExecuteScalarAsync<int>("SP_FLASH", dp, commandType: CommandType.StoredProcedure);
                }
                catch (Exception ee)
                {
                    return (0);
                }
            }
        }
    }
}