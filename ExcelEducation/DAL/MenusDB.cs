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

namespace DAL
{
    public class MenusDB
    {
        public async static Task<List<PageHead>> GetPageHead()
        {
            using (IDbConnection db = new SqlConnection(Connection.MyConnection()))
            {
                var list = await db.QueryAsync<PageHead>("select * from TBL_PAGE_HEAD ORDER BY REORDER");
                return list.ToList();
            }
        }

        public async static Task<List<Page>> GetPage(int pageHeadId)
        {
            using (IDbConnection db = new SqlConnection(Connection.MyConnection()))
            {
                var list = await db.QueryAsync<Page>("select * from TBL_PAGE where PAGE_HEAD_ID = @pageheadid ORDER BY REORDER, PAGE_NAME", new { @pageheadid  = pageHeadId });
                return list.ToList();
            }
        }
    }

}