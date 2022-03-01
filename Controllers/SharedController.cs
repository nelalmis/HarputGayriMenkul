using HarputGayriMenkul.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace HarputGayriMenkul.Controllers
{
    public class SharedController : Controller
    {
        //
        // GET: /Shared/

      
        public ActionResult _AdminAnasayfaLayout()
        {
            return RedirectToAction("AdminAnasayfa","Admin");
        }
        public ActionResult _HomePageLayout()
        {
            return RedirectToAction("Index", "Home");
        }
       

    }
}
