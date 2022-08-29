using DAL;
using DAL.Models;
using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;

namespace ExcelEducation.Controllers
{
    public class OverridableAuthorize : AuthorizeAttribute
    {
        public override void OnAuthorization(AuthorizationContext filterContext)
        {
            var authorized = base.AuthorizeCore(filterContext.HttpContext);
            if (!authorized)
            {
                // The user is not authorized => no need to go any further
            }
            base.OnAuthorization(filterContext);
        }
    }

    public class LoginController : Controller
    {
        // GET: Login
        public ActionResult Index()
        {
            LoginModel ob = new LoginModel();
            ob.StatusCode = "0";
            return View("Login", ob);
        }

        [HttpPost]
        public async Task<ActionResult> Index(LoginModel Login)
        {
            using (IDbConnection db = new SqlConnection(Connection.MyConnection()))
            {
                DynamicParameters ob = new DynamicParameters();
                ob.Add("USER_NAME", Login.USER_NAME);
                ob.Add("USER_PASSWORD", Login.USER_PASSWORD);

                var xx = await db.QueryAsync<LoginModel>("SP_LOGIN", ob, commandType: CommandType.StoredProcedure);
                Login = xx.FirstOrDefault();

                if (Login.StatusCode == "0" || Login.StatusCode == "-1" || Login.StatusCode == "-2")
                {
                    return View("Login", Login);
                }
                else
                {
                    FormsAuthentication.SetAuthCookie(Login.USER_NAME, true);
                    Session.Add("User", Login);
                    Session.Add("Role", "User");

                    return RedirectToAction("index", "AdminHome");
                }
            }
        }
    }
}