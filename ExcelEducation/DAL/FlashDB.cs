using DAL.Models;
using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace DAL
{
    public class FlashDB
    {
        public async static Task<List<FlashModel>> LoadFlash()
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

                var res = await db.QueryAsync<FlashModel>("SP_FLASH", dp, commandType: CommandType.StoredProcedure);
                return res.ToList();
            }
        }

        public async static Task<bool> AddFlash(FlashModel flash)
        {
            var res = 0;
            using (IDbConnection db = new SqlConnection(Connection.MyConnection()))
            {
                DynamicParameters dp = new DynamicParameters();
                dp.Add("FLASH_ID", flash.FLASH_ID);
                dp.Add("FLASH_CAPTION", flash.FLASH_CAPTION);
                dp.Add("FLASH_FILEPATH", flash.FLASH_FILEPATH);
                dp.Add("FLASH_ORDER", flash.FLASH_ORDER);
                dp.Add("FLASH_SHOW", flash.FLASH_SHOW);
                dp.Add("ACTION", flash.ACTION);


                res = await db.ExecuteScalarAsync<int>("SP_FLASH", dp, commandType: CommandType.StoredProcedure);
            }
            return res > 0;
        }

        public async static Task<bool> toggleFlash(bool flash, int flashId)
        {
            int res = 0;
            using (IDbConnection db = new SqlConnection(Connection.MyConnection()))
            {
                db.Open();
                res = await db.ExecuteAsync
                    ("update TBL_FLASH set FLASH_SHOW = @flash where FLASH_ID = @flashId",
                    new { @flash = !flash, @flashId = flashId }, commandType: CommandType.Text);
            }

            return res > 0;
        }
        public async static Task<bool> SetOrder(int order, int flashId)
        {
            int res = 0;
            using (IDbConnection db = new SqlConnection(Connection.MyConnection()))
            {
                db.Open();
                res = await db.ExecuteAsync
                    ("update TBL_FLASH set FLASH_ORDER = @order where FLASH_ID = @flashId",
                    new { @order = order, @flashId = flashId }, commandType: CommandType.Text);
            }

            return res > 0;
        }
        public async static Task<bool> DeleteFlash(int flashId)
        {
            int res = 0;
            using (IDbConnection db = new SqlConnection(Connection.MyConnection()))
            {
                db.Open();
                res = await db.ExecuteAsync
                    ("delete from TBL_FLASH where FLASH_ID = @flashId",
                    new { @flashId = flashId }, commandType: CommandType.Text);
            }

            return res > 0;
        }
        public async static Task<List<FlashModel>> AddTopicDetail()
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
                
                var res = await db.QueryAsync<FlashModel>("SP_FLASH", dp, commandType: CommandType.StoredProcedure);
                return res.ToList();
            }
        }
    }

}