using DAL;
using DAL.Models;
using Dapper;
using Dapper.Contrib.Extensions;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Web;
using static System.Net.WebRequestMethods;

namespace DAL
{
    public class MenusDB
    {
        public async static Task<List<PageHead>> GetPageHeads()
        {
            using (IDbConnection db = new SqlConnection(Connection.MyConnection()))
            {
                var list = await db.QueryAsync<PageHead>("select * from TBL_PAGE_HEAD ORDER BY REORDER");
                return list.ToList();
            }
        }

        public async static Task<List<MenuModel>> GetMenu()
        {
            try
            {
                using (IDbConnection db = new SqlConnection(Connection.MyConnection()))
                {
                    var pageHeads = db.QueryAsync<PageHead>("select PAGE_HEAD_ID, PAGE_HEAD_NAME, IS_LINK, LINK_URL, REORDER from TBL_PAGE_HEAD WHERE SHOW='true' ORDER BY REORDER");

                    List<MenuModel> ob = new List<MenuModel>();

                    foreach (var ph in pageHeads.Result)
                    {
                        MenuModel mm = new MenuModel();
                        mm.PAGE_HEAD_ID = ph.PAGE_HEAD_ID;
                        mm.PAGE_HEAD_NAME = ph.PAGE_HEAD_NAME;
                        mm.IS_LINK = ph.IS_LINK;
                        mm.LINK_URL = ph.LINK_URL;
                        mm.REORDER = ph.REORDER;

                        var list = db.QueryAsync<SubMenuModel>("SELECT [PAGE_ID] ,[PAGE_HEAD_ID] ,[PAGE_NAME] ,[SHOW] ,[SUB_MENU] ,[REORDER] ,[IS_DEPARTMENT] ,[IS_LINK] ,[LINK_URL] FROM [dbo].[TBL_PAGE] WHERE SHOW='true' AND PAGE_HEAD_ID = @pageheadid ORDER BY REORDER", new { @pageheadid = mm.PAGE_HEAD_ID });
                        mm.SUBMENU = list.Result.ToList();

                        ob.Add(mm);
                    }

                    return ob;
                }
            }
            catch (Exception ee)
            {
                return null;
            }

        }

        public async static Task<List<Page>> GetPages(int pageHeadId)
        {
            using (IDbConnection db = new SqlConnection(Connection.MyConnection()))
            {
                var list = await db.QueryAsync<Page>("select * from TBL_PAGE where PAGE_HEAD_ID = @pageheadid", new { @pageheadid = pageHeadId });
                return list.ToList();
            }
        }
        public async static Task<PageTopic> GetTopic(int topicId)
        {
            using (IDbConnection db = new SqlConnection(Connection.MyConnection()))
            {
                var list = await db
                    .QueryAsync<PageTopic>("select * from TBL_PAGE_TOPIC where TOPIC_ID = @topicId", new { @topicId = topicId });
                return list.FirstOrDefault();
            }
        }

        public async static Task<List<PageTopic>> GetTopics(int pageId)
        {
            using (IDbConnection db = new SqlConnection(Connection.MyConnection()))
            {
                var list = await db.QueryAsync<PageTopic>("select * from TBL_PAGE_TOPIC where PAGE_ID = @pageid", new { @pageid = pageId });
                return list.ToList();
            }
        }

        public async static Task<List<TopicDetail>> GetTopicDetails(int topicId)
        {
            using (IDbConnection db = new SqlConnection(Connection.MyConnection()))
            {
                var list = await db.QueryAsync<TopicDetail>("select * from TBL_TOPIC_DETAIL where topic_id = @topicId", new { topicId = topicId });
                return list.ToList();
            }
        }

        public async static Task<TopicDetail> GetTopicDetailsBySubTopicId(int subTopicId)
        {
            using (IDbConnection db = new SqlConnection(Connection.MyConnection()))
            {
                return db.Get<TopicDetail>(subTopicId);
                //var list = await db.QueryAsync<TopicDetail>("select * from TBL_TOPIC_DETAIL where topic_id = @topicId", new { topicId = topicId });
            }
        }

        public async static Task<string> AddTopicDetail(TopicDetail topicDetail)
        {
            try
            {
                using (IDbConnection db = new SqlConnection(Connection.MyConnection()))
                {
                    if (topicDetail.SUB_TOPIC_ID > 0)
                    {
                        await db.UpdateAsync(topicDetail);
                        return "Updated";
                    }
                    else
                    {
                        await db.InsertAsync<TopicDetail>(topicDetail);
                        return "Inserted";
                    }
                }
            }
            catch (Exception ex)
            {
                return ("Error: " + ex.Message);
            }
            
        }

        public async static Task<bool> InsertSubTopicPhotos(List<PagePhotos> photos)
        {
            int res = 0;
            try
            {
                using (IDbConnection db = new SqlConnection(Connection.MyConnection()))
                {
                    res = await db.InsertAsync<List<PagePhotos>>(photos);
                }
            }
            catch (Exception ex)
            {

            }
            return res > 0;
        }

        public async static Task<List<PagePhotos>> GetSubTopicPhotos(int subTopicId)
        {
            int res = 0;

            using (IDbConnection db = new SqlConnection(Connection.MyConnection()))
            {
                var list = await db.QueryAsync<PagePhotos>("SELECT * FROM TBL_PAGE_PHOTOS where SUB_TOPIC_ID = @id", new { @id = subTopicId });
                return list.ToList();
            }
        }

        public async static Task<bool> DeletePhoto(int photoId)
        {
            using (IDbConnection db = new SqlConnection(Connection.MyConnection()))
            {
                var photo = (await db
                    .QueryAsync<PagePhotos>("select * from [dbo].[TBL_PAGE_PHOTOS] where  PHOTO_ID = @photoId"
                    , new { @photoId = photoId })).FirstOrDefault();

                PagePhotos pagePhotos = new PagePhotos { PHOTO_ID = photoId };

                await DeleteFile(photo.PHOTO_PATH);

                return await db.DeleteAsync<PagePhotos>(pagePhotos);
            }
        }

        public async static Task<List<PageFiles>> GetTopicDetailFiles(int subTopicId)
        {
            using (IDbConnection db = new SqlConnection(Connection.MyConnection()))
            {
                var res = await db.QueryAsync<PageFiles>("SELECT * FROM TBL_PAGE_FILES where SUB_TOPIC_ID = @id", new { @id = subTopicId });
                return res.ToList();
            }
        }

        public async static Task<bool> InsertTopicDetailPhotos(List<PagePhotos> pagePhotos)
        {
            int res = 0;
            using (IDbConnection db = new SqlConnection(Connection.MyConnection()))
            {
                try
                {
                    res = await db.InsertAsync<List<PagePhotos>>(pagePhotos);
                }
                catch (Exception ex)
                {

                }
            }
            return res > 0;
        }

        public async static Task<bool> InsertTopicDetailFiles(List<PageFiles> pageFiles)
        {
            int res = 0;
            using (IDbConnection db = new SqlConnection(Connection.MyConnection()))
            {
                try
                {
                    res = await db.InsertAsync<List<PageFiles>>(pageFiles);
                }
                catch (Exception ex)
                {

                }
            }
            return res > 0;
        }
        public async static Task<bool> SetOrder(int fileId, int order)
        {
            int res = 0;
            using (IDbConnection db = new SqlConnection(Connection.MyConnection()))
            {
                db.Open();
                res = await db.ExecuteAsync
                    ("update TBL_PAGE_FILES set FILE_ORDER = @order where FILE_ID = @Id",
                    new { @order = order, @Id = fileId }, commandType: CommandType.Text);
            }

            return res > 0;
        }
        public async static Task<bool> DeleteTopicDetailFile(int fileId)
        {
            using (IDbConnection db = new SqlConnection(Connection.MyConnection()))
            {
                var photo = (await db
                    .QueryAsync<PageFiles>("select * from [dbo].[TBL_PAGE_FILES] where  FILE_ID = @fileId"
                    , new { @fileId = fileId })).FirstOrDefault();

                PageFiles pageFiles = new PageFiles { FILE_ID = fileId };

                await DeleteFile(photo.FILE_PATH);

                return await db.DeleteAsync<PageFiles>(pageFiles);
            }
        }
        public async static Task<bool> DeleteTopicDetail(int subTopicId, string filepath)
        {
            try
            {
                await DeleteTopicPhotos(subTopicId.ToString());
                await DeleteTopicFiles(subTopicId.ToString());

                if(filepath!="")
                {
                    string file = HttpContext.Current.Server.MapPath(filepath);

                    if (System.IO.File.Exists(file))
                    {
                        System.IO.File.Delete(file);
                    }
                }

                using (IDbConnection db = new SqlConnection(Connection.MyConnection()))
                {
                    var num = await db.ExecuteAsync("Delete from TBL_TOPIC_DETAIL where sub_topic_id = @subTopicId"
                    , new { @subTopicId = subTopicId });
                    return true;
                }
               
            }
            catch (Exception ex)
            {
                return false;
            }
        }
        public async static Task<bool> SetTopicOrder(int topicId, int order)
        {
            int res = 0;
            using (IDbConnection db = new SqlConnection(Connection.MyConnection()))
            {
                db.Open();
                res = await db.ExecuteAsync
                    ("update TBL_PAGE_TOPIC set TOPIC_ORDER = @order where TOPIC_ID = @Id",
                    new { @order = order, @Id = topicId }, commandType: CommandType.Text);
            }

            return res > 0;
        }

        public async static Task<bool> SetTopicDetailsOrder(int subtopicId, int order)
        {
            int res = 0;
            using (IDbConnection db = new SqlConnection(Connection.MyConnection()))
            {
                db.Open();
                res = await db.ExecuteAsync
                    ("update TBL_TOPIC_DETAIL set SUB_TOPIC_ORDER = @order where SUB_TOPIC_ID = @Id",
                    new { @order = order, @Id = subtopicId }, commandType: CommandType.Text);
            }

            return res > 0;
        }

        public async static Task<bool> AddTopic(PageTopic pageTopic)
        {
            int res = 0;
            try
            {
                using (IDbConnection db = new SqlConnection(Connection.MyConnection()))
                {
                    if (pageTopic.TOPIC_ID > 0)
                        return await db.UpdateAsync<PageTopic>(pageTopic);
                    else
                        res = await db.InsertAsync<PageTopic>(pageTopic);
                }
            }
            catch (Exception ex)
            {

            }
            return res > 0;
        }

        public async static Task<bool> DeleteTopicDetailsByTopicId(string TopicIds)
        {
            using (IDbConnection db = new SqlConnection(Connection.MyConnection()))
            {
                var details = await db.QueryAsync<TopicDetail>("select * from TBL_TOPIC_DETAIL f inner join Split_Strings (@ids,',') l on f.TOPIC_ID = l.item"
                    , new { @ids = TopicIds });

                details.ToList().ForEach( x =>
                {
                    DeleteFile(x.TOPIC_FILEPATH);

                    #region deletes images in description
                    string strGuid = HttpUtility.HtmlDecode(x.TOPIC_DESCRIPTION ?? "");
                    string pattern = @"([a-z0-9]{8}[-][a-z0-9]{4}[-][a-z0-9]{4}[-][a-z0-9]{4}[-][a-z0-9]{12})";

                    MatchCollection mc;
                    mc = Regex.Matches(strGuid, pattern);

                    for (int i = 0; i < mc.Count; i++)
                    {

                        string loc = $"/{ConfigurationManager.AppSettings["UploadPath"]}";
                        string path = HttpContext.Current.Server.MapPath(loc);
                        string filesToDelete = $"topicdetails_{mc[i].Value}*";
                        string file = System.IO.Directory.GetFiles(path, filesToDelete).FirstOrDefault() ?? "";

                        if (System.IO.File.Exists(file))
                        {
                            System.IO.File.Delete(file);
                        }
                    }
                    #endregion
                });

                var num = await db.ExecuteAsync("Delete d from TBL_TOPIC_DETAIL d inner join Split_Strings (@ids,',') l on d.TOPIC_ID = l.item"
                    , new { @ids = TopicIds });
                return num > 0;
            }
        }

        static async Task DeleteFile(string filePath)
        {
            if (System.IO.File.Exists(HttpContext.Current.Server.MapPath(filePath)))
            {
                System.IO.File.Delete(HttpContext.Current.Server.MapPath(filePath));
            }
        }
        public async static Task<bool> DeleteTopicFiles(string SubTopicIds)
        {
            using (IDbConnection db = new SqlConnection(Connection.MyConnection()))
            {
                var pageFiles = await db.QueryAsync<PageFiles>("select * from TBL_PAGE_FILES f inner join Split_Strings (@ids,',') l on f.SUB_TOPIC_ID = l.item"
                    , new { @ids = SubTopicIds });

                pageFiles.ToList().ForEach(async file =>
                {
                    await DeleteFile(file.FILE_PATH);
                });

                var num = await db
                    .ExecuteAsync("delete f from TBL_PAGE_FILES f inner join Split_Strings (@ids,',') l on f.SUB_TOPIC_ID = l.item"
                        , new { @ids = SubTopicIds });
                return num > 0;
            }
        }
        public async static Task<bool> DeleteTopicPhotos(string SubTopicIds)
        {
            using (IDbConnection db = new SqlConnection(Connection.MyConnection()))
            {
                var pagePhotos = await db.QueryAsync<PagePhotos>("select * from TBL_PAGE_PHOTOS f inner join Split_Strings (@ids,',') l on f.SUB_TOPIC_ID = l.item"
                   , new { @ids = SubTopicIds });

                pagePhotos.ToList().ForEach(async x =>
                {
                    await DeleteFile(x.PHOTO_PATH);
                });

                var num = await db.ExecuteAsync("delete P from TBL_PAGE_PHOTOS P inner join Split_Strings (@ids,',') l on P.SUB_TOPIC_ID = l.item"
                    , new { @ids = SubTopicIds });
                return num > 0;
            }
        }

        public async static Task<bool> DeleteTopic(int id)
        {
            var subTopicIds = string.Join(",", (await GetTopicDetails(id)).Select(x => x.SUB_TOPIC_ID));

            await DeleteTopicPhotos(subTopicIds);
            await DeleteTopicFiles(subTopicIds);
            await DeleteTopicDetailsByTopicId(id.ToString());

            using (IDbConnection db = new SqlConnection(Connection.MyConnection()))
            {
                PageTopic topic = new PageTopic { TOPIC_ID = id };
                return await db.DeleteAsync(topic);
            }
        }
    }

}
