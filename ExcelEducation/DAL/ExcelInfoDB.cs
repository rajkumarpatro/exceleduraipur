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
                res = db.ExecuteScalar<int>("SELECT PAGE_ID FROM TBL_PAGE WHERE PAGE_NAME=@PAGE_NAME",
                    new { @PAGE_NAME = page}, commandType: CommandType.Text);
            }
            return res;
        }
        public async static Task<List<TopicDetail>> GetTopicDetails(int topicId)
        {
            try
            {
                using (IDbConnection db = new SqlConnection(Connection.MyConnection()))
                {
                    string queryTopicDetails = @"SELECT [SUB_TOPIC_ID]
                                              ,[TOPIC_ID]
                                              ,[SUB_TOPIC_NAME]
                                              ,[TOPIC_DATE]
                                              ,[TOPIC_DESCRIPTION]
                                              ,[TOPIC_FILEPATH]
                                              ,[TOPIC_LINK_TYPE]
                                              ,[SHOW_TOPIC_NAME]
                                              ,[SUB_TOPIC_TYPE]
                                              ,[SUB_TOPIC_ORDER]
                                          FROM[dbo].[TBL_TOPIC_DETAIL] WHERE TOPIC_ID = @TOPIC_ID ORDER BY SUB_TOPIC_ORDER";
                    var details = await db.QueryAsync<TopicDetail>(queryTopicDetails, new { @TOPIC_ID = topicId });

                    List<TopicDetail> ob = new List<TopicDetail>();

                    foreach (var detail in details)
                    {
                        TopicDetail td = new TopicDetail();
                        td.SUB_TOPIC_ID = detail.SUB_TOPIC_ID;
                        td.TOPIC_ID = detail.TOPIC_ID;
                        td.SUB_TOPIC_NAME = detail.SUB_TOPIC_NAME;
                        td.TOPIC_DATE = detail.TOPIC_DATE;
                        td.TOPIC_DESCRIPTION = detail.TOPIC_DESCRIPTION;
                        td.TOPIC_FILEPATH = detail.TOPIC_FILEPATH;
                        td.TOPIC_LINK_TYPE = detail.TOPIC_LINK_TYPE;
                        td.SHOW_TOPIC_NAME = detail.SHOW_TOPIC_NAME;
                        td.SUB_TOPIC_TYPE = detail.SUB_TOPIC_TYPE;
                        td.SUB_TOPIC_ORDER = detail.SUB_TOPIC_ORDER;

                        var photoList = await db.QueryAsync<PagePhotos>("SELECT [PHOTO_ID] ,[SUB_TOPIC_ID] ,[PHOTO_PATH] FROM [dbo].[TBL_PAGE_PHOTOS] WHERE SUB_TOPIC_ID=@SUB_TOPIC_ID", new { SUB_TOPIC_ID = td.SUB_TOPIC_ID });
                        td.PagePhotos = photoList.ToList();

                        var fileList = await db.QueryAsync<PageFiles>("SELECT [FILE_ID] ,[SUB_TOPIC_ID] ,CONVERT(VARCHAR(10),[FILE_DATE],105) AS FILE_DATE ,[FILE_DESCRIPTION] ,[FILE_PATH] ,[FILE_ORDER] FROM [dbo].[TBL_PAGE_FILES] WHERE SUB_TOPIC_ID=@SUB_TOPIC_ID", new { SUB_TOPIC_ID = td.SUB_TOPIC_ID });
                        td.PagePhotos = photoList.ToList();

                        ob.Add(td);
                    }

                    return ob;
                }
            }
            catch (Exception ee)
            {
                return null;
            }
        }
    }

}