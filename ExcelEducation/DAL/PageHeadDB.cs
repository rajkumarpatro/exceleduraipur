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
    public class PageHeadDB
    {
        public async static Task<List<PageHead>> LoadPageHead()
        {
            using (IDbConnection db = new SqlConnection(Connection.MyConnection()))
            {
                DynamicParameters dp = new DynamicParameters();
                dp.Add("PAGE_HEAD_ID", 0);
                dp.Add("PAGE_HEAD_NAME", "");                
                dp.Add("SHOW", true);
                dp.Add("REORDER", 0);
                dp.Add("IS_LINK", false);
                dp.Add("LINK_URL", "");
                dp.Add("ACTION", "4");

                var res = await db.QueryAsync<PageHead>("SP_PAGE_HEAD", dp, commandType: CommandType.StoredProcedure);
                return res.ToList();
            }
        }

        public async static Task<bool> AddRecord(PageHead param)
        {
            var res = 0;
            using (IDbConnection db = new SqlConnection(Connection.MyConnection()))
            {
                DynamicParameters dp = new DynamicParameters();
                dp.Add("PAGE_HEAD_ID", param.PAGE_HEAD_ID);
                dp.Add("PAGE_HEAD_NAME", param.PAGE_HEAD_NAME);                
                dp.Add("SHOW", param.SHOW);
                dp.Add("REORDER", param.REORDER);
                dp.Add("IS_LINK", param.IS_LINK);
                dp.Add("LINK_URL", param.LINK_URL);
                dp.Add("ACTION", param.ACTION);

                res = await db.ExecuteScalarAsync<int>("SP_PAGE_HEAD", dp, commandType: CommandType.StoredProcedure);
            }
            return res > 0;
        }

        public async static Task<bool> toggleRecord(bool param, int recordId)
        {
            int res = 0;
            using (IDbConnection db = new SqlConnection(Connection.MyConnection()))
            {
                db.Open();
                res = await db.ExecuteAsync
                    ("update TBL_PAGE_HEAD set SHOW = @param where PAGE_HEAD_ID = @recordId",
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
                    ("update TBL_PAGE_HEAD set REORDER = @order where PAGE_HEAD_ID = @recordId",
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
                    ("delete from TBL_PAGE_HEAD where PAGE_HEAD_ID = @recordId",
                    new { @recordId = recordId }, commandType: CommandType.Text);
            }

            return res > 0;
        }
    }

}