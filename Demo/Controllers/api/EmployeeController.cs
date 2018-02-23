
using Demo.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Demo.Controllers.api
{
    public class EmployeeController : ApiController
    {
        SMARTEntities db = new SMARTEntities();


        [ActionName("get"), HttpGet]
        public IEnumerable<EmployeeViewModel> Emps()
        {
            return (from emps in db.EMPs
                    join deptm in db.DEPTs on emps.DEPT equals deptm.DeptId
                    select
                    new EmployeeViewModel()
                    {
                        ID = emps.ID,
                        FIRTSNAME = emps.FIRTSNAME,
                        LASTNAME = emps.LASTNAME,
                        LOCATION = emps.LOCATION,
                        SALARY = emps.SALARY,
                        DEPT = emps.DEPT,
                        DOB = emps.DOB,
                        DEPTNAME = deptm.DeptName,
                    }).ToList();
        }

        public IQueryable<EmployeeViewModel> Get(int id)
        {
            return (from emps in db.EMPs
                    join deptm in db.DEPTs on emps.DEPT equals deptm.DeptId
                    select
                    new EmployeeViewModel()
                    {
                        ID = emps.ID,
                        FIRTSNAME = emps.FIRTSNAME,
                        LASTNAME = emps.LASTNAME,
                        LOCATION = emps.LOCATION,
                        SALARY = emps.SALARY,
                        DEPT = emps.DEPT,
                        DOB = emps.DOB,
                        DEPTNAME = deptm.DeptName,
                    }).Where(a => a.ID == id);
        }
        public HttpResponseMessage Post(EMP EMPLOYEE)
        {
            HttpResponseMessage resp = new HttpResponseMessage();
            if (ModelState.IsValid && EMPLOYEE != null)
            {
                db.EMPs.Add(EMPLOYEE);
                db.SaveChanges();
                resp = Request.CreateResponse(HttpStatusCode.Created, EMPLOYEE);
            }
            else
            {
                resp = Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
            return resp;
        }
        public HttpResponseMessage Put(EMP EMPLOYEE)
        {
            HttpResponseMessage res = new HttpResponseMessage();
            if (ModelState.IsValid)
            {
                db.Entry(EMPLOYEE).State = System.Data.Entity.EntityState.Modified;
                db.SaveChanges();
                res = Request.CreateResponse(HttpStatusCode.OK, ModelState);
            }
            else
            {
                res = Request.CreateResponse(HttpStatusCode.BadRequest, ModelState);
            }
            return res;
        }
        public HttpResponseMessage Delete(int Id)
        {
            EMP EMPLOYEE = new EMP();
            if (Id >= 0)
            {
                EMPLOYEE = db.EMPs.Find(Id);
                if (EMPLOYEE == null)
                {
                    Request.CreateResponse(HttpStatusCode.NotFound);
                }
                db.EMPs.Remove(EMPLOYEE);
                db.SaveChanges();
            }
            return Request.CreateResponse(HttpStatusCode.OK, EMPLOYEE);
        }



    }
}
