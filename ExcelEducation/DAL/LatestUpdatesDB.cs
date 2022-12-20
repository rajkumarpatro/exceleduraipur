﻿using DAL;
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
    public class LatestUpdatesDB
    {
        public async static Task<List<LatestUpdatesModel>> LoadLatestUpdates()
        {
            using (IDbConnection db = new SqlConnection(Connection.MyConnection()))
            {
                DynamicParameters dp = new DynamicParameters();
                dp.Add("NEWS_ID", 1);
                dp.Add("NEWS_DATE", null);
                dp.Add("NEWS_TITLE", "");
                dp.Add("NEWS_SECTION", "");
                dp.Add("NEWS_FILEPATH", "");
                dp.Add("NEWS_LINK", "");
                dp.Add("NEWS_LINKTYPE", "");
                dp.Add("ACTION", "4");
                var res = await db.QueryAsync<LatestUpdatesModel>("SP_LATEST_UPDATES", dp, commandType: CommandType.StoredProcedure);
                return res.ToList();
            }
        }

        public async static Task<bool> AddRecord(LatestUpdatesModel param)
        {
            var res = 0;
            using (IDbConnection db = new SqlConnection(Connection.MyConnection()))
            {
                DynamicParameters dp = new DynamicParameters();
                dp.Add("NEWS_ID", param.NEWS_ID);
                dp.Add("NEWS_DATE", param.NEWS_DATE);
                dp.Add("NEWS_TITLE", param.NEWS_TITLE);
                dp.Add("NEWS_SECTION", param.NEWS_SECTION);
                dp.Add("NEWS_FILEPATH", param.NEWS_FILEPATH);
                dp.Add("NEWS_LINK", param.NEWS_LINK);
                dp.Add("NEWS_LINKTYPE", param.NEWS_LINKTYPE);
                dp.Add("ACTION", param.ACTION);

                res = await db.ExecuteScalarAsync<int>("SP_LATEST_UPDATES", dp, commandType: CommandType.StoredProcedure);
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
                    ("delete from TBL_LATEST_UPDATE where NEWS_ID = @recordId",
                    new { @recordId = recordId }, commandType: CommandType.Text);
            }

            return res > 0;
        }

        public async static Task<bool> Enquiry(string name, string mode, string Message, string mobile, string applyfor, string course, string city)
        {
            int res = 0;
            using (IDbConnection db = new SqlConnection(Connection.MyConnection()))
            {
                db.Open();
                res = await db.ExecuteAsync
                    ("insert into TBL_ENQUIRY (student, mode_of_class, course_id, appearing_for, message, contact, place, DATETIMESTAMP) " +
                     "values (@name, @mode, @course, @applyfor, @message, @mobile, @city, GETDATE())",
                    new { @name = name, @mode = mode, @course = course, @applyfor = applyfor, @message = Message, @mobile = mobile, @city = city },
                    commandType: CommandType.Text);
            }

            return res > 0;
        }

        public async static Task<List<CourseModel>> GetCourses()
        {
            try
            {
                using (IDbConnection db = new SqlConnection(Connection.MyConnection()))
                {
                    db.Open();
                    var xx = await db.QueryAsync<CourseModel>
                        ("select COURSE_ID, COURSE, OFFLINE_FEES, ONLINE_FEES, ISACTIVE, APPEARING_FOR_VALUES from TBL_COURSE where isactive = 'YES'", commandType: CommandType.Text);
                    return xx.ToList();
                }
            }
            catch (Exception ex) {
                return null;
            }
        }

        public async static Task<List<string>> GetAppearingFor(int courseId)
        {
            using (IDbConnection db = new SqlConnection(Connection.MyConnection()))
            {
                db.Open();

                var xx = await db.QueryAsync<string>
                    ("select APPEARING_FOR_VALUES from TBL_COURSE where COURSE_ID  = @courseId",
                    new { @courseId = courseId}, commandType: CommandType.Text);

                return xx.FirstOrDefault().Split(',').ToList();
            }
        }

    }
}