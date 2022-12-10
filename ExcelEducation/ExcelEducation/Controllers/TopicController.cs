using DAL.Models;
using ExcelEducation.Helpers;
using PDFReader;
using DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using System.Text.RegularExpressions;
using System.Text;

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
                data = (await MenusDB.GetPageHeads()).Where(x=>!x.IS_LINK)
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
                topicDetail.TOPIC_DESCRIPTION = HttpUtility.UrlDecode(topicDetail.TOPIC_DESCRIPTION);
                topicDetail.ORDERDD = DDList.GetOrderList();
                topicDetail.SUBTOPICTYPEDD = DDList.GetSubTopictype();
                topicDetail.PagePhotos = await MenusDB.GetSubTopicPhotos(subTopicId ?? 0);
            }

            return PartialView("_AddTopicDetails", topicDetail);
        }

        [HttpPost]
        public async Task<string> AddTopicDetail(TopicDetail topicDetail)
        {
            if (Request.Files.Count > 0)
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

        public async Task<ActionResult> GetPagePhotos(int subTopicId)
        {
            return PartialView("_PagePhotos", await MenusDB.GetSubTopicPhotos(subTopicId));
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

        public async Task<bool> SetSubTopicOrder(int Id, int order)
        {
            return await MenusDB.SetTopicDetailsOrder(Id, order);
        }

        public async Task<bool> DeleteTopicDetailFile(int fileId)
        {
            return await MenusDB.DeleteTopicDetailFile(fileId);
        }

        public async Task<bool> DeleteTopicDetail(int subTopicId, string filepath)
        {
            return await MenusDB.DeleteTopicDetail(subTopicId,filepath);
        }

        [HttpPost]
        public string SaveImages()
        {
            return FileHandler.SaveUploadedFile(Request, "topicdetails");
        }

        public async Task<ActionResult> AddTopic(int pageId = 0)
        {
            PageTopic pageTopic = new PageTopic()
            {
                PAGE_ID = pageId,
                ORDERDD = DDList.GetOrderList()
            };

            return PartialView("_AddTopic", pageTopic);
        }
        [HttpPost]
        public async Task<bool> AddTopic(PageTopic pageTopic)
        {
            return await MenusDB.AddTopic(pageTopic);
        }

        public async Task<bool> DeleteTopic(int id)
        {
            return await MenusDB.DeleteTopic(id);
        }

        public async Task<ActionResult> GetTopicList(int pageId)
        {
            return Json(new
            {
                data = (await MenusDB.GetTopics(pageId))
            }, JsonRequestBehavior.AllowGet);
        }

        public async Task<ActionResult> GetTopic(int topicId)
        {
            return Json(await MenusDB.GetTopic(topicId), JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public async Task<bool> SetTopicOrder(int topicId, int order)
        {
            return await MenusDB.SetTopicOrder(topicId, order);
        }


    }
}