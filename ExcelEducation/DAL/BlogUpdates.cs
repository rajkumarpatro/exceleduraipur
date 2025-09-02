using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class BlogUpdates
    {
        public int Id { get; set; }                 //  for Id
        public string Category { get; set; }        // For Development
        public DateTime PublishedDate { get; set; } //  for Date
        public string Title { get; set; }           // For The Complete Web Developer Guideline 2023
        public string ImageUrl { get; set; }        //  for photo
        public string A_Name { get; set; }      //  A photo
        public string A_Role { get; set; }      // A Category typr Frontend Developer
        public string A_Photo { get; set; }     // A  photo URL
    }
}
