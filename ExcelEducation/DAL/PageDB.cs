using DAL;
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
    public class PageDB
    {
        public async static Task<bool> AddRecord(Page param)
        {
            var res = 0;
            using (IDbConnection db = new SqlConnection(Connection.MyConnection()))
            {
                DynamicParameters dp = new DynamicParameters();
                dp.Add("PAGE_ID", param.PAGE_ID);
                dp.Add("PAGE_HEAD_ID", param.PAGE_HEAD_ID);
                dp.Add("PAGE_NAME", param.PAGE_NAME);
                dp.Add("SHOW", param.SHOW);
                dp.Add("SUB_MENU", param.SUB_MENU);
                dp.Add("REORDER", param.REORDER);
                dp.Add("IS_DEPARTMENT", param.IS_DEPARTMENT);
                dp.Add("IS_LINK", param.IS_LINK);
                dp.Add("LINK_URL", param.LINK_URL);
                dp.Add("ACTION", param.ACTION);

                res = await db.ExecuteScalarAsync<int>("SP_PAGE", dp, commandType: CommandType.StoredProcedure);
            }
            return res > 0;
        }

        public async static Task<bool> toggleRecord(bool param, int recordId, string fieldName)
        {
            int res = 0;
            using (IDbConnection db = new SqlConnection(Connection.MyConnection()))
            {
                db.Open();
                res = await db.ExecuteAsync
                    ("update TBL_PAGE set "+ fieldName + " = @param where PAGE_ID = @recordId",
                    new { @param = !param, @recordId = recordId }, commandType: CommandType.Text);
            }

            return res > 0;
        }
        public async static Task<bool> SetOrder(int order, int recordId)
        {
            int res = 0;
            using (IDbConnection db = new SqlConnection(Connection.MyConnection()))
            {
                db.Open();
                res = await db.ExecuteAsync
                    ("update TBL_PAGE set REORDER = @order where PAGE_ID = @recordId",
                    new { @order = order, @recordId = recordId }, commandType: CommandType.Text);
            }

            return res > 0;
        }
        public async static Task<bool> DeleteRecord(int recordId)
        {
            int res = 0;
            using (IDbConnection db = new SqlConnection(Connection.MyConnection()))
            {
                db.Open();
                res = await db.ExecuteAsync
                    ("delete from TBL_PAGE where PAGE_ID = @recordId",
                    new { @recordId = recordId }, commandType: CommandType.Text);
            }

            return res > 0;
        }
    }

}