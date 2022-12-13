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
using System.Web.UI;

namespace DAL
{
    public class PopupDB
    {
        public async static Task<PopupModel> GetPopup()
        {
            using (IDbConnection db = new SqlConnection(Connection.MyConnection()))
            {
                db.Open();
                var res = await db.QueryAsync<PopupModel>("SELECT ID, IMAGE_PATH, SHOW FROM TBL_POPUP",
                    null, commandType: CommandType.Text);
                return res.FirstOrDefault();
            }
        }

        public async static Task<bool> UpdatePopup(bool show, string path)
        {
            int res = 0;
            using (IDbConnection db = new SqlConnection(Connection.MyConnection()))
            {
                db.Open();
                res = await db.ExecuteAsync
                    ("UPDATE TBL_POPUP SET IMAGE_PATH = @path, SHOW = @show where ID = 1",
                    new { @path = path, @show = show}, commandType: CommandType.Text);
            }

            return res > 0;
        }
    }
}