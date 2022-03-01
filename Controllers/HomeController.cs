using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using HarputGayriMenkul.Models;
using System.Collections;
namespace HarputGayriMenkul.Controllers
{
    public class HomeController : Controller
    {
        //
        // GET: /Home/
        EMLAKDBEntities db = new EMLAKDBEntities();
        [HttpGet]
        public ActionResult Index()
        {
            ViewBag.CityList = db.City.ToList();
            ViewBag.CategoryList = db.Category.ToList();

            return View(db.sel_Advert(null).ToList());
        }
 
        public ActionResult Property(int AdvertID)
        {

            var ListInternal = from ad in db.AdvertInternalFeature
                                                  join i in db.InternalFeatures on ad.InternalFeatureID equals i.ID
                                                  where ad.AdvertID == AdvertID
                                                 select new { 
                                                    i.FeatureName
                                                  };
            var ListExterior = from ad in db.AdvertExteriorFeature
                               join i in db.ExteriorFeatures on ad.ExteriorFeatureID equals i.ID
                               where ad.AdvertID == AdvertID
                               select new
                               {
                                   i.FeatureName
                               };
            var ListEnviron = from ad in db.AdvertEnvironmentFeature
                               join i in db.EnvironmentFeatures on ad.EnvironmentFeatureID equals i.EnvironmentFeatureID
                               where ad.AdvertID == AdvertID
                               select new
                               {
                                   i.EnvironmentFeatureName
                               };

            List<string> listeInter = new List<string>();
            List<string> listeExter = new List<string>();
            List<string> listeEnvir = new List<string>();

            foreach (var item in ListInternal) {
                listeInter.Add(item.FeatureName);
            
            }
            foreach (var item in ListExterior)
            {
                listeExter.Add(item.FeatureName);

            }
            foreach (var item in ListEnviron)
            {
                listeInter.Add(item.EnvironmentFeatureName);

            }
            List<Picture> ListPicture = db.Picture.Where(u=>u.AdvertID==AdvertID).ToList();
            
            ViewBag.InternalFeatures = listeInter;
            ViewBag.ExteriorFeatures = listeExter;
            ViewBag.EnvironmentFeatures = listeEnvir;
            ViewBag.ListPicture = ListPicture;
            
            return View((IEnumerable)db.sel_Advert(AdvertID).ToList());
        }
        public ActionResult Contact() {

            return View();
        }

        public ActionResult AdvancedSearch()
        {

            return View();
        }
        public ActionResult About()
        {

            return View();
        }

    }
}
