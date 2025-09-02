using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using DAL;
using DAL.Models;
using System.Threading.Tasks;
using ExcelEducation.Helpers;

namespace ExcelEducation.Controllers
{
    public class BlogUpdatesController : Controller
    {
        // For testing purpose (replace with DB in production)
        private static List<BlogUpdates> blogs = new List<BlogUpdates>();

        // GET: BlogUpdates
        public ActionResult Index()
        {
            return View(new BlogUpdates()); // Empty model pass करें
        }

        // Load all records
        public ActionResult LoadBlogs()
        {
            return Json(new { data = blogs }, JsonRequestBehavior.AllowGet);
        }

        // Save or Update Blog
        [HttpPost]
        public ActionResult SaveOrUpdateBlog(BlogUpdates blog)
        {
            if (blog == null)
                return Json(new { success = false, message = "Invalid data" });

            if (blog.Id > 0) // Update case
            {
                var existing = blogs.FirstOrDefault(b => b.Id == blog.Id);
                if (existing != null)
                {
                    existing.Category = blog.Category;
                    existing.PublishedDate = blog.PublishedDate;
                    existing.Title = blog.Title;
                    existing.ImageUrl = blog.ImageUrl;
                    existing.A_Name = blog.A_Name;
                    existing.A_Role = blog.A_Role;
                    existing.A_Photo = blog.A_Photo;
                }
            }
            else // Insert case
            {
                blog.Id = blogs.Count > 0 ? blogs.Max(b => b.Id) + 1 : 1;
                blogs.Add(blog);
            }

            return Json(new { success = true, message = "Record saved successfully" });
        }

        // Get blog by id
        public ActionResult GetBlog(int id)
        {
            var blog = blogs.FirstOrDefault(b => b.Id == id);
            return Json(blog, JsonRequestBehavior.AllowGet);
        }

        // Delete blog
        [HttpPost]
        public ActionResult DeleteBlog(int id)
        {
            var blog = blogs.FirstOrDefault(b => b.Id == id);
            if (blog != null)
            {
                blogs.Remove(blog);
                return Json(new { success = true, message = "Record deleted successfully" });
            }
            return Json(new { success = false, message = "Record not found" });
        }

    }
}
