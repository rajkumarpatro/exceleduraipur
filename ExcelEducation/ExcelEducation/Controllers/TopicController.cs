using DAL.Models;
using ExcelEducation.Helpers;
using PDFReader;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace ExcelEducation.Controllers
{
    public class TopicController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public async Task<ActionResult> GetPageHeads()
        {
            return Json(new
            {
                data = (await MenusDB.GetPageHeads())
                .Select(x => new { id = x.PAGE_HEAD_ID, text = x.PAGE_HEAD_NAME }).ToList()
            }, JsonRequestBehavior.AllowGet);
        }

        public async Task<ActionResult> GetPages(int pageHeadId = 0)
        {
            return Json(new
            {
                data = (await MenusDB.GetPages(pageHeadId))
                .Select(x => new { id = x.PAGE_ID, text = x.PAGE_NAME }).ToList()
            }, JsonRequestBehavior.AllowGet);
        }

        public async Task<ActionResult> GetTopics(int pageId = 0)
        {
            return Json(new
            {
                data = (await MenusDB.GetTopics(pageId))
                .Select(x => new { id = x.TOPIC_ID, text = x.TOPIC_NAME }).ToList()
            }, JsonRequestBehavior.AllowGet);
        }

        public async Task<ActionResult> GetTopicDetails(int topicId = 0)
        {
            return Json(new
            {
                data = await MenusDB.GetTopicDetails(topicId)
            }, JsonRequestBehavior.AllowGet);
        }

        public async Task<ActionResult> AddTopicDetail(int? topicId, int? subTopicId)
        {
            TopicDetail topicDetail = new TopicDetail();
            if (subTopicId == null)
            {
                topicDetail.ORDERDD = DDList.GetOrderList();
                topicDetail.SUBTOPICTYPEDD = DDList.GetSubTopictype();
                topicDetail.TOPIC_DATE = DateTime.Now;
                topicDetail.TOPIC_ID = topicId ?? 0;
            }
            else
            {
                topicDetail = await MenusDB.GetTopicDetailsBySubTopicId(subTopicId ?? 0);
                topicDetail.ORDERDD = DDList.GetOrderList();
                topicDetail.SUBTOPICTYPEDD = DDList.GetSubTopictype();
                topicDetail.PagePhotos = await MenusDB.GetSubTopicPhotos(subTopicId ?? 0);
            }

            return PartialView("_AddTopic", topicDetail);
        }

        [HttpPost]
        public async Task<bool> AddTopicDetail(TopicDetail topicDetail)
        {
            //topicDetail.TOPIC_ID = 1;
            topicDetail.TOPIC_FILEPATH = FileHandler.SaveUploadedFile(Request, "SubTopic", topicDetail.SUB_TOPIC_ID);
            return await MenusDB.AddTopicDetail(topicDetail);
        }

        [HttpPost]
        public async Task<bool> UploadTopicDetailPhotos(int subTopicId)
        {
            var list = FileHandler.UploadedMultipleFiles(Request, "topicdetailphoto", 0);
            var pagePhotos = new List<PagePhotos>();
            list.ForEach(x =>
            {
                pagePhotos.Add(new PagePhotos
                {
                    PHOTO_PATH = x.path,
                    SUB_TOPIC_ID = subTopicId
                });
            });
            return await MenusDB.InsertTopicDetailPhotos(pagePhotos);
        }

        public async Task<bool> DeletePhoto(int photoId)
        {
            return await MenusDB.DeletePhoto(photoId);
        }

        public async Task<ActionResult> AddTopicDetailFiles(int subTopicId = 0)
        {
            PageFiles pageFiles = new PageFiles()
            {
                FILE_DATE = DateTime.Now,
                ORDERDD = DDList.GetOrderList(),
                SUB_TOPIC_ID = subTopicId
            };

            return PartialView("_AddTopicFiles", pageFiles);
        }

        [HttpPost]
        public async Task<bool> AddTopicDetailFiles(PageFiles pageFiles)
        {
            pageFiles.FILE_DATE = DateTime.Now;
            pageFiles.FILE_PATH = FileHandler.SaveUploadedFile(Request, "topicdetailfile", 0);
            return await MenusDB.InsertTopicDetailFiles(new List<PageFiles> { pageFiles });
        }

        [HttpPost]
        public async Task<bool> UploadTopicDetailFiles(int subTopicId)
        {
            var list = FileHandler.UploadedMultipleFiles(Request, "topicdetailfile", 0);
            var pageFiles = new List<PageFiles>();
            list.ForEach(x =>
            {
                pageFiles.Add(new PageFiles
                {
                    FILE_DESCRIPTION = x.name,
                    FILE_DATE = DateTime.Now,
                    FILE_ORDER = 1,
                    SUB_TOPIC_ID = subTopicId,
                    FILE_PATH = x.path
                });
            });
            return await MenusDB.InsertTopicDetailFiles(pageFiles);
        }

        public async Task<ActionResult> GetTopicDetailFiles(int subTopicId)
        {
            return Json(new
            {
                data = await MenusDB.GetTopicDetailFiles(subTopicId)
            }, JsonRequestBehavior.AllowGet);
        }

        public async Task<bool> SetOrder(int fileId, int order)
        {
            return await MenusDB.SetOrder(fileId, order);
        }

        public async Task<bool> DeleteTopicDetailFile(int fileId)
        {
            return await MenusDB.DeleteTopicDetailFile(fileId);
        }
    }
}