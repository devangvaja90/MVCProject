using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Demo.Models
{
    public class EmployeeViewModel
    {
        public int ID { get; set; }
        public string FIRTSNAME { get; set; }
        public string LASTNAME { get; set; }
        public string LOCATION { get; set; }
        public Nullable<System.DateTime> DOB { get; set; }
        public Nullable<decimal> SALARY { get; set; }
        public Nullable<int> DEPT { get; set; }
        public string DEPTNAME { get; set; }
    }
}