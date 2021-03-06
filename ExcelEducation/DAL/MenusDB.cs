using DAL;
using DAL.Models;
using Dapper;
using Dapper.Contrib.Extensions;
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
        public async static Task<List<PageHead>> GetPageHeads()
        {
            using (IDbConnection db = new SqlConnection(Connection.MyConnection()))
            {
                var list = await db.QueryAsync<PageHead>("select * from TBL_PAGE_HEAD ORDER BY REORDER");
                return list.ToList();
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

        public async static Task<bool> AddTopicDetail(TopicDetail topicDetail)
        {
            int res = 0;
            try
            {
                using (IDbConnection db = new SqlConnection(Connection.MyConnection()))
                {
                    if (topicDetail.SUB_TOPIC_ID > 0)
                        return await db.UpdateAsync<TopicDetail>(topicDetail);
                    else
                        res = await db.InsertAsync<TopicDetail>(topicDetail);
                }
            }
            catch (Exception ex)
            {

            }
            return res > 0;
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
                var list = await db.QueryAsync<PagePhotos>("SELECT *FROM TBL_PAGE_PHOTOS where SUB_TOPIC_ID = @id", new { @id = subTopicId });
                return list.ToList();
            }
        }

        public async static Task<bool> DeletePhoto(int photoId)
        {
            using (IDbConnection db = new SqlConnection(Connection.MyConnection()))
            {
                PagePhotos pagePhotos = new PagePhotos { PHOTO_ID = photoId };
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

        public async static Task<bool> InsertTopicDetailPhotos(List<PagePhotos>  pagePhotos)
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
                PageFiles pageFiles = new PageFiles { FILE_ID = fileId };
                db.Open();
                return await db.DeleteAsync<PageFiles>(pageFiles);
            }
        }
    }

}