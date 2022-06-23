using DAL;
using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;

namespace PDFReader
{
    public class DAL
    {
        public static dynamic GetPrcoessedReport(string FinancialYear)
        {
            
            using (IDbConnection db = new SqlConnection(Connection.MyConnection()))
            {
                //reportResult.Processed = db.QueryAsync<ReportModel>($"select * from tbl_AnnualReports where ProcessedDate is not null and FinancialYear = '{FinancialYear}'", commandType: CommandType.Text).Result.ToList();
                //reportResult.UnProcessed = db.QueryAsync<ReportModel>($"select * from tbl_AnnualReports where ProcessedDate is null and FinancialYear = '{FinancialYear}'", commandType: CommandType.Text).Result.ToList();
            }

            return null;
        }
    }
        
}