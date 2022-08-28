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
    public class ExcelInfoDB
    {
        public async static Task<int> GetPageId(string page)
        {
            int res = 0;
            using (IDbConnection db = new SqlConnection(Connection.MyConnection()))
            {
                db.Open();
                res = await db.ExecuteAsync
                    ("SELECT PAGE_ID FROM TBL_PAGE WHERE PAGE_NAME=@PAGE_NAME",
                    new { @PAGE_NAME = page}, commandType: CommandType.Text);
            }

            return res;
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