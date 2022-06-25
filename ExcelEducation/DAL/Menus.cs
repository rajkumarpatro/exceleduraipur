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

namespace PDFReader
{
    public class Menus
    {
        public async static Task<List<PageHead>> GetPageHead()
        {
            using (IDbConnection db = new SqlConnection(Connection.MyConnection()))
            {
                var list = await db.QueryAsync<PageHead>("select * from TBL_PAGE_HEAD");
                return list.ToList();
            }
        }

        public async static Task<List<Page>> GetPage(int pageHeadId)
        {
            using (IDbConnection db = new SqlConnection(Connection.MyConnection()))
            {
                var list = await db.QueryAsync<Page>("select * from TBL_PAGE where PAGE_HEAD_ID = @pageheadid", new { @pageheadid  = pageHeadId });
                return list.ToList();
            }
        }
    }

}