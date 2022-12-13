using DAL.Models;
using Dapper;
using Dapper.Contrib.Extensions;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace DAL
{
    public class TestimonialDB
    {

        public async static Task<TestimonialModel> LoadTestimonialById(int id)
        {
            using (IDbConnection db = new SqlConnection(Connection.MyConnection()))
            {
                db.Open();
                var res = await db
                    .QueryAsync<TestimonialModel>
                    ("SELECT ID, STUDENT_NAME, STUDENT_CLASS, TESTIMONIAL, STUDENT_PHOTO, TESTIMONIAL_ORDER FROM TBL_TESTIMONIAL WHERE ID = @ID"
                    , new { @ID = id }
                    , commandType: CommandType.Text);

                return res.FirstOrDefault();
            }
        }

        public async static Task<List<TestimonialModel>> LoadTestimonial()
        {
            using (IDbConnection db = new SqlConnection(Connection.MyConnection()))
            {
                db.Open();
                var res = await db
                    .QueryAsync<TestimonialModel>
                    ("SELECT ID, STUDENT_NAME, STUDENT_CLASS, TESTIMONIAL, STUDENT_PHOTO, TESTIMONIAL_ORDER FROM TBL_TESTIMONIAL"
                    , null
                    , commandType: CommandType.Text);

                return res.ToList();
            }
        }

        public async static Task<bool> AddTestimonial(TestimonialModel Testimonial)
        {
            try
            {
                int res = 0;
                using (IDbConnection db = new SqlConnection(Connection.MyConnection()))
                {
                    db.Open();

                    if (Testimonial.ID == 0)
                        res = await db.InsertAsync(Testimonial);
                    else
                        return await db.UpdateAsync(Testimonial);
                }

                return res > 0;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public async static Task<bool> toggleTestimonial(bool Testimonial, int TestimonialId)
        {
            int res = 0;
            using (IDbConnection db = new SqlConnection(Connection.MyConnection()))
            {
                db.Open();
                res = await db.ExecuteAsync
                    ("update TBL_Testimonial set Testimonial_SHOW = @Testimonial where ID = @TestimonialId",
                    new { @Testimonial = !Testimonial, @TestimonialId = TestimonialId }, commandType: CommandType.Text);
            }

            return res > 0;
        }
        public async static Task<bool> SetOrder(int order, int TestimonialId)
        {
            int res = 0;
            using (IDbConnection db = new SqlConnection(Connection.MyConnection()))
            {
                db.Open();
                res = await db.ExecuteAsync
                    ("update TBL_Testimonial set Testimonial_ORDER = @order where ID = @TestimonialId",
                    new { @order = order, @TestimonialId = TestimonialId }, commandType: CommandType.Text);
            }

            return res > 0;
        }
        public async static Task<bool> DeleteTestimonial(int TestimonialId)
        {
            int res = 0;
            using (IDbConnection db = new SqlConnection(Connection.MyConnection()))
            {
                db.Open();
                res = await db.ExecuteAsync
                    ("delete from TBL_Testimonial where ID = @TestimonialId",
                    new { @TestimonialId = TestimonialId }, commandType: CommandType.Text);
            }

            return res > 0;
        }

    }

}