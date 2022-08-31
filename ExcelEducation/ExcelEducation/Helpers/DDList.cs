using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Web;
using System.Web.Mvc;

namespace ExcelEducation.Helpers
{
    public class DDList
    {
        public static List<SelectListItem> GetOrderList()
        {
            var list = new List<SelectListItem>();

            for (int i = 1; i <= 100; i++)
            {
                list.Add(new SelectListItem { Text = i.ToString(), Value = i.ToString() });
            }

            return list;
        }

        public static List<SelectListItem> GetYesNoList()
        {
            var list = new List<SelectListItem> {
                new SelectListItem{ Text = "YES", Value = "true"},
                new SelectListItem{ Text = "NO", Value = "false"},
            };

            return list;
        }
        public static List<SelectListItem> GetSubTopictype()
        {
            var list = new List<SelectListItem> {
                new SelectListItem{ Text = "ACCORDION", Value = "true"},
                new SelectListItem{ Text = "PARAGRAPH", Value = "false"},
            };

            return list;
        }
    }
}