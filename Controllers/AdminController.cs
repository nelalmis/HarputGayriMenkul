using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using HarputGayriMenkul.Models;
using System.Drawing;
using System.IO;
using System.Collections;
namespace HarputGayriMenkul.Controllers
{
    public class AdminController : Controller
    {
        //
        // GET: /Admin/
        
        EMLAKDBEntities db=new EMLAKDBEntities();
        public ActionResult Login(string username, string password)
        {
            if (!String.IsNullOrEmpty(username) && !String.IsNullOrEmpty(password))
            {

                User kullanici = db.User.Where(u => u.UserName == username && u.Password == password).FirstOrDefault();
               // var kullanici = (from u in db.User where u.UserName == txtUsername && u.Password == txtPassword select new { u.Name, u.Surname }).ToList();
                if (kullanici != null) 
                {
                    Session["User"] = new User();
                    Session["User"] = kullanici;
                    return View("AdminAnasayfa");
                }
            }
            
            return View();
        }
       
        public ActionResult AdminAnasayfa()
        {
           User us= GetSessionUser();
           return View();
        }
        public User GetSessionUser() {
            
            return (User)Session["User"];
        }
       
       
    }
}
