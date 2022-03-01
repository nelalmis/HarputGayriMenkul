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
    public class AdvertTransactionController : Controller
    {
        //
        // GET: /AdvertTransaction/
        EMLAKDBEntities db = new EMLAKDBEntities();
        
        #region İlan Ekleme Sayfaları
        [HttpGet]
        public ActionResult AdvertIns()
        {
            AdvertClass Model = new AdvertClass();
            ViewBag.VarietyList = db.Variety.ToList();
            ViewBag.CategoryList = db.Category.ToList();
            ViewBag.CityList = db.City.ToList();
            ViewBag.CountyList = db.County.ToList();
            ViewBag.RoomCountList = db.RoomCount.ToList();
            ViewBag.HeatingList = db.HeatingType.ToList();
            ViewBag.SuitableList = db.SuitableCondition.ToList();
            if (Session["advert"] != null)
            {

                Model = GetSessionAdvert();
            }

            // ViewBag.CountyList = db.County.ToList();
            // ViewBag.CategoryList = new SelectList(db.Category, "ID", "CategoryName");
            return View(Model);
        }
        [HttpPost]
        public ActionResult AdvertIns(AdvertClass tmp, string btnNext)
        {

            ViewBag.VarietyList = db.Variety.ToList();
            ViewBag.CategoryList = db.Category.ToList();
            ViewBag.CityList = db.City.ToList();
            ViewBag.CountyList = db.County.ToList();
            ViewBag.RoomCountList = db.RoomCount.ToList();
            ViewBag.HeatingList = db.HeatingType.ToList();

            if (Session["advert"] != null)
            {

                tmp = GetSessionAdvert();
            }


            if (btnNext != null)
            {
                if (ModelState.IsValid)
                {
                    if (Session["advert"] == null)
                        Session["advert"] = new AdvertClass();

                        Session["advert"] = tmp;
                    //AdvertClass session =(AdvertClass)Session["advert"];
                    //session.AdvertOwnerName = tmp.AdvertOwner.AdvertOwnerName;
                    //session.AdvertOwnerSurname = tmp.AdvertOwner.AdvertOwnerSurname;
                    //session.Phone1 = tmp.AdvertOwner.Phone1;
                    //session.Phone2 = tmp.AdvertOwner.Phone2;
                    //session.E_mail = tmp.AdvertOwner.E_mail;
                    //session.BathCount = tmp.AdvertDetail.BathCount;
                    //session.BuildingAge = tmp.AdvertDetail.BuildingAge;
                    //session.CategoryID = tmp.Advert.CategoryID;
                    //session.CityID = tmp.City.CityID;
                    //session.CountyID = tmp.County.CountyID;
                    //session.SemtID = tmp.Semt.SemtID;
                    //session.SquareMeters = tmp.Advert.SquareMeters;
                    //session.Title = tmp.Advert.Title;
                    //session.UserID = 1;
                    //session.VarietyID = tmp.Advert.VarietyID;
                    //session.Description = tmp.AdvertDetail.Description;
                    //session.Floors = tmp.AdvertDetail.Floors;
                    //session.HallCount = tmp.AdvertDetail.HallCount;
                    //session.Heating = tmp.AdvertDetail.Heating;
                    //session.IsActive = true;
                    //session.IsAvailableCredit = tmp.AdvertDetail.IsAvailableCredit;
                    //session.IsFurnished = tmp.AdvertDetail.IsFurnished;
                    //session.Location = tmp.AdvertDetail.Location;
                    //session.OnWhichFloor = tmp.AdvertDetail.OnWhichFloor;
                    //session.Price = tmp.Advert.Price;
                    //session.QuarterID = tmp.Advert.QuarterID;
                    //session.RoomCount = tmp.AdvertDetail.RoomCount;


                    return RedirectToAction("AdvertFeature");

                }
            }


            return View(tmp);

        }
        [HttpGet]
        public ActionResult AdvertFeature()
        {
            ViewBag.InternalFeatureList = db.InternalFeatures.ToList();
            ViewBag.ExteriorFeatureList = db.ExteriorFeatures.ToList();
            ViewBag.EnvironmentFeatureList = db.EnvironmentFeatures.ToList();
            return View();
        }
        [HttpPost]
        public ActionResult AdvertFeature(string btnPrev, string btnNext)
        {
            ViewBag.InternalFeatureList = db.InternalFeatures.ToList();
            ViewBag.ExteriorFeatureList = db.ExteriorFeatures.ToList();
            ViewBag.EnvironmentFeatureList = db.EnvironmentFeatures.ToList();

            if (btnNext != null)
            {
                if (ModelState.IsValid)
                {
                    //Liste elemanına ekleme yap
                    return RedirectToAction("AdvertPicture");
                }
            }
            else if (btnPrev != null)
            {

                return RedirectToAction("AdvertIns");

            }

            return View();
        }

        [HttpGet]
        public ActionResult AdvertPicture()
        {
            return View();
        }
        [HttpPost]
        public ActionResult AdvertPicture(string btnPrev,string btnNext, HttpPostedFileBase[] files)
        {
            if (btnNext != null)
            {

                if (files.Count() > 0)
                {
                    DosyaYukleme(files);
                    return RedirectToAction("AdvertConfirm2");
                    //Kesin Kayıt İşlemi için Bir fonksiyon Yazılacak
                }
                else
                {
                    ViewBag.Message = "Resim seçmediniz";
                    return View();

                }
            }
            else if (btnPrev != null)
            {

                return RedirectToAction("AdvertFeature");
            }
            else {
                AdvertClass ad=GetSessionAdvert();
                if (ad.PictureList != null && ad.PictureList.Count > 0) { 
                        
                
                
                }
                return View();
            }

        }
        [HttpGet]
        public ActionResult AdvertConfirm2()
        {
            string FeatureName;
            List<string> listIn = new List<string>();
            List<string> listEx = new List<string>();
            ViewBag.InternalFeatureList = db.InternalFeatures.ToList();
            ViewBag.ExteriorFeatureList = db.ExteriorFeatures.ToList();
            AdvertClass ad = new AdvertClass();
             ad = GetSessionAdvert();

            foreach(int item in ad.InternalListID){
                 FeatureName = db.InternalFeatures.Where(u => u.ID == item).Select(u => u.FeatureName).FirstOrDefault();
                listIn.Add(FeatureName);
            }
            foreach (int item in ad.ExteriorListID)
            {
               
                FeatureName = db.ExteriorFeatures.Where(u => u.ID == item).Select(u => u.FeatureName).FirstOrDefault();
                listEx.Add(FeatureName);
            }


            ViewBag.InternalFeatureList = listIn;
             ViewBag.ExteriorFeatureList = listEx;
             ad.CategoryStr = db.Category.Where(u => u.ID == ad.CategoryID).Select(u => u.CategoryName).FirstOrDefault();
             ad.CityStr = db.City.Where(u=>u.CityID==ad.CityID).Select(u=>u.CityName).FirstOrDefault();
             ad.CountyStr = db.County.Where(u => u.CountyID == ad.CountyID).Select(u => u.CountyName).FirstOrDefault();
             ad.SemtStr = db.tbl_semt.Where(u => u.SemtID == ad.SemtID).Select(u => u.SemtAdi).FirstOrDefault();
             ad.QuarterStr = db.Quarter.Where(u => u.QuarterID == ad.QuarterID).Select(u => u.mahalle_ad).FirstOrDefault();
             ad.RoomCount = db.RoomCount.Where(u => u.RoomCountID == ad.RoomCountID).Select(u => u.RoomCountName).FirstOrDefault();
             ad.VarietyStr = db.Variety.Where(u => u.ID == ad.VarietyID).Select(u => u.VarietyName).FirstOrDefault();
             ad.IsFurnishedStr = db.SuitableCondition.Where(u => u.SuitableID == ad.IsFurnishedID).Select(u => u.SuitableName).FirstOrDefault();
             ad.IsAvailableCreditStr = db.SuitableCondition.Where(u => u.SuitableID == ad.IsAvailableCreditID).Select(u => u.SuitableName).FirstOrDefault();
             ad.HeatingStr = db.HeatingType.Where(u => u.HeatingID == ad.HeatingID).Select(u => u.HetingName).FirstOrDefault();
         
            return View(ad);
        }
        [HttpPost]
        public ActionResult AdvertConfirm2(string btnKaydet,string btnPrev,string btnCancel){
            if (btnPrev != null) {

                return RedirectToAction("AdvertPicture");

            }
            else if (btnKaydet != null) {
                if (ModelState.IsValid) { 
                //Kayıt fonksionu
                    if (AdvertSave())
                    {

                        string mesajScript = ("<script lang='javascript'>alert('İlan Başarıyla Eklendi');</script>");
                        ViewBag.Message = "Kayıt başarılı";
                        return Content(mesajScript);
                        
                    }

                }
           
            }
            else if (btnCancel != null) {
                ResimleriSil();
                RemoteAdvert();
                
                return View("AdvertIns");
            }




            return View("AdvertIns"); 
        }
        #endregion

        #region Methodlar


        public bool AdvertSave(){
            AdvertClass ad = GetSessionAdvert();
            Advert Anew = new Advert();

           List<AdvertExteriorFeature> Aef = new List<AdvertExteriorFeature>();
           AdvertExteriorFeature ae;
           List<AdvertInternalFeature> aif = new List<AdvertInternalFeature>();
           AdvertInternalFeature ife; 
           foreach (int item in ad.ExteriorListID)
           {
               ae= new AdvertExteriorFeature();
               ae.ExteriorFeatureID = item;
               Aef.Add(ae);
               ae.AdvertID = db.Advert.Max(u=>u.AdvertID)+1;
              db.AdvertExteriorFeature.Add(ae);
           }
           foreach (int item in ad.InternalListID)
           {
               ife = new AdvertInternalFeature();
               ife.InternalFeatureID = item;
               aif.Add(ife);
               ife.AdvertID = db.Advert.Max(u => u.AdvertID) + 1;
               
               db.AdvertInternalFeature.Add(ife);
           }

            Anew.CategoryID = ad.CategoryID;
            Anew.CreationDate = DateTime.Now;
            Anew.IsActive = true;
            Anew.Picture = ad.PictureList;
            Anew.Price = ad.Price;
            Anew.QuarterID = ad.QuarterID;
            Anew.SquareMeters = ad.SquareMeters;
            Anew.Title = ad.Title;
            Anew.UserID = 1;
            Anew.VarietyID = ad.VarietyID;
            //Anew.AdvertExteriorFeature = Aef;
            //Anew.AdvertInternalFeature = aif;

            AdvertOwner ow = new AdvertOwner();
            ow.AdvertOwnerName = ad.AdvertOwnerName;
            ow.AdvertOwnerSurname = ad.AdvertOwnerSurname;
            ow.E_mail = ad.E_mail;
            ow.Phone1 = ad.Phone1;
            ow.Phone2 = ad.Phone2;
            Anew.AdvertOwner = ow;

            AdvertDetail al = new AdvertDetail();
            al.BathCount = ad.BathCount;
            al.BuildingAge = ad.BuildingAge;
            al.Description = ad.Description;
            al.Floors = ad.Floors;
            al.HallCount = ad.HallCount;
            al.HeatingTypeID = ad.HeatingID;
            al.IsAvailableCredit = ad.IsAvailableCreditID;
            al.IsFurnished = ad.IsFurnishedID;
            al.Location = ad.Location;
            al.OnWhichFloor = ad.OnWhichFloor;
            al.RoomCountID = ad.RoomCountID;
            Anew.AdvertDetail = al;

            db.Advert.Add(Anew);



            db.SaveChanges();
            return true;

        
        
        }

        [HttpPost]
        public void DosyaYukleme(HttpPostedFileBase[] files)
        {
            List<Picture> PictureList = new List<Picture>();
            //string resimAdi = (Guid.NewGuid().ToString("N")) + AdvertID.ToString() + k.ToString() + Path.GetExtension(file.FileName);
            //(Path.GetFileName(file.FileName)

            int AdvertID = db.Advert.Max(u => u.AdvertID);

            int k = 1;
            if (files.Count() > 5)
            {
                ViewBag.Message = "En fazla 5 Resim Seçebilirsiniz.";
                //return View();
            }
            else
            {
                try
                {
                    foreach (HttpPostedFileBase file in files)
                    {

                        // Bitmap ResimOrjinal = new Bitmap(file.InputStream);
                        Bitmap ResimLarge = new Bitmap(file.InputStream);
                        Bitmap ResimSmall = new Bitmap(file.InputStream);
                        ResimLarge = new Bitmap(ResimLarge, 1200, 800);
                        string resimAdi = AdvertID.ToString() + "-" + k.ToString() + Path.GetExtension(file.FileName);
                        ResimLarge.Save(Server.MapPath("~/Images/large/" + resimAdi));
                        ResimLarge.Dispose();
                        //BoyutlandirilmisResim.Dispose();
                        ResimSmall = new Bitmap(ResimSmall, 220, 170);
                        // string resimAdi2 = (Guid.NewGuid().ToString("N")) + AdvertID.ToString() + k.ToString();
                        ResimSmall.Save(Server.MapPath("~/Images/small/" + resimAdi));
                        ResimSmall.Dispose();
                        Picture picture = new Picture();
                        picture.AdvertID = AdvertID;
                        picture.PictureName = resimAdi;
                        picture.PictureWay = Server.MapPath("~/Images/large/" + resimAdi);

                        PictureList.Add(picture);

                        //db.SaveChanges();

                        k++;
                        // BoyutlandirilmisResim2.Dispose();

                    }
                    PictureList[0].IsVitrin = 1;
                    AdvertClass tp = GetSessionAdvert();
                    tp.PictureList = PictureList;
                    ViewBag.Message = "Resimler Yüklendi.";

                }
                catch
                {
                    ViewBag.Message = "Resimler Yüklenemedi.";
                }
            }



        }
        [HttpPost]
        public void SeciliOzelliklerAdd(String[] SeciliOzellikler)
        {
            List<Int32> ExteriorFeatureList = new List<Int32>();
            List<Int32> InternalFeatureList = new List<Int32>();
            List<Int32> EnvironmentFeatureList = new List<Int32>();
            //Session["ExteriorFeatureList"] = new List<string>();
            //Session["InternalFeatureList"] = new List<string>();
            int AdvertId = 0;
            AdvertTemp tmpt = new AdvertTemp();

            if (db.Advert.ToList().Count != 0)
                AdvertId = db.Advert.Max(u => u.AdvertID) + 1;
            else
                AdvertId = 1;

            bool islem = false;
            bool islem2 = false;
            foreach (string item in SeciliOzellikler)
            {
                
                if (item.ToString() == "#")
                    islem = true;
                if (item.ToString() == "/")
                    islem2 = true;
                if (islem && !islem2 && item.ToString() != "#" && item.ToString() != "/")
                {

                    ExteriorFeatureList.Add(Convert.ToInt32(item));
                    //ad.ExteriorFeatureListID.Add(Convert.ToInt16(item));

                    AdvertExteriorFeature ae = new AdvertExteriorFeature
                    {
                        AdvertID = AdvertId,
                        ExteriorFeatureID = (Convert.ToInt16(item))
                    };
                    // db.AdvertExteriorFeature.Add(ae);



                }
                if (!islem && !islem2 && item.ToString() != "#" && item.ToString() != "/")
                {
                    InternalFeatureList.Add(Convert.ToInt32(item));
                    // ad.InternalFeatureListID.Add(Convert.ToInt16(item));
                    AdvertInternalFeature ai = new AdvertInternalFeature
                    {
                        AdvertID = AdvertId,
                        InternalFeatureID = Convert.ToInt16(item)

                    };
                    //db.ins_InternalFeature(AdvertId, Convert.ToInt32(item));
                    //db.AdvertInternalFeature.Add(ai);


                }
                if (islem2 && item.ToString() != "/")
                {
                    EnvironmentFeatureList.Add(Convert.ToInt32(item));
                    // ad.InternalFeatureListID.Add(Convert.ToInt16(item));
                    AdvertEnvironmentFeature aef = new AdvertEnvironmentFeature
                    {
                        AdvertID = AdvertId,
                        EnvironmentFeatureID = Convert.ToInt16(item)
                        

                    };
                    //db.ins_InternalFeature(AdvertId, Convert.ToInt32(item));
                    //db.AdvertEnvironmentFeature.Add(aef);


                }
                //db.SaveChanges();
            }
            
            AdvertClass ad = GetSessionAdvert();
            ad.ExteriorListID = ExteriorFeatureList;
            ad.InternalListID = InternalFeatureList;
            ad.EnvironmentListID = EnvironmentFeatureList;
            //Session["ExteriorFeatureList"] = ExteriorFeatureList;
            //Session["InternalFeatureList"] = InternalFeatureList;
        }


        [HttpPost]
        public JsonResult GetirIlceler(int CityID)
        {
            var CountyList = db.County.Where(co => co.CityID == CityID).Select(co => new IdAd
            {
                CountyID = co.CountyID,
                CountyName = co.CountyName

            }).ToList();

            return Json(CountyList);
        }
        [HttpPost]
        public JsonResult GetirSemtler(int CountyID)
        {
            var SemtList = db.tbl_semt.Where(co => co.CountyID == CountyID).Select(co => new IdAd
            {
                CountyID = co.SemtID,
                CountyName = co.SemtAdi

            }).ToList();


            return Json(SemtList);
        }
        [HttpPost]
        public JsonResult GetirMahalleler(int SemtID)
        {

            var MahalleList = db.Quarter.Where(co => co.SemtID == SemtID).Select(co => new IdAd
            {
                CountyID = co.QuarterID,
                CountyName = co.mahalle_ad

            }).ToList();

            return Json(MahalleList);
        }
        #region Session Method
        private AdvertClass GetSessionAdvert()
        {
            return (AdvertClass)Session["advert"];
        }
        private void RemoteAdvert()
        {
            Session.Remove("advert");
        }
        #endregion
        #endregion

        #region İlan Silme
        public ActionResult Delete(int AdvertID)
        {

            sel_Advert_Result DeleteAdvert = db.sel_Advert(AdvertID).FirstOrDefault();
            return View(DeleteAdvert);
        }
        [HttpPost, ActionName("Delete")]
        public ActionResult DeleteProcess(int AdvertID)
        {


            Advert Advert = (from a in db.Advert where a.AdvertID == AdvertID select a).FirstOrDefault();
            db.Advert.Remove(Advert);

            return RedirectToAction("AdvertList");
        }
        #endregion

        #region İlan Listeleme
        public ActionResult AdvertList(string SearchValue)
        {
            IEnumerable List=new List<IEnumerable>();
            if (String.IsNullOrEmpty(SearchValue))
            {
                using (EMLAKDBEntities a = new EMLAKDBEntities())
                {
                    List =(IEnumerable)db.sel_Advert(null).ToList();
                    return View(List);
                }
                //
            }
            else
            {

                 List =(IEnumerable)db.sel_Advert(Convert.ToInt32(SearchValue)).ToList();
                return View(List);
            }
           
           
        }
        #endregion

        public ActionResult GetDistricts(int? Id)
        {
            return Json(db.City.Find(Id).County.OrderBy(p => p.CountyName).Select(p => new { Id = p.CountyID, Name = p.CountyName }).ToList(), JsonRequestBehavior.AllowGet);
        }

        public void ResimleriSil() {
            AdvertClass ad = GetSessionAdvert();
            if (ad.PictureList != null && ad.PictureList.Count > 0)
            {
                foreach (var item in ad.PictureList)
                {
                    if (System.IO.File.Exists(Server.MapPath("~/Images/small/" + item.PictureName)))
                    {
                        System.IO.File.Delete(Server.MapPath("~/Images/small/" + item.PictureName));
                        System.IO.File.Delete(Server.MapPath("~/Images/large/" + item.PictureName));
                    }
                }
            }
        
        
        }

    }
}
