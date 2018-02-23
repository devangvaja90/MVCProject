using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Demo.Controllers.api
{
    public class DepartmentController : ApiController
    {
        SMARTEntities db = new SMARTEntities();
        public List<DEPT> Get()
        {
            
            var Dept = db.DEPTs.ToList();
           
            return Dept;
        }
        public IEnumerable<System.Web.Mvc.SelectListItem> Get(int Id)
        {
            List<System.Web.Mvc.SelectListItem> Department = new List<System.Web.Mvc.SelectListItem>();
            DEPT dept = db.DEPTs.Find(Id);
            System.Web.Mvc.SelectListItem item = new System.Web.Mvc.SelectListItem();
            item.Text = dept.DeptName;
            item.Value = dept.DeptId.ToString();
            Department.Add(item);
            return Department;
        }
    }
}
