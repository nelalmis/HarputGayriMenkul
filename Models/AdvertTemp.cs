using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace HarputGayriMenkul.Models
{
    public class AdvertTemp
    {
        EMLAKDBEntities db = new EMLAKDBEntities();
        public AdvertTemp()
        {
            this.Advert = new Advert();
            this.AdvertOwner = new AdvertOwner();
            this.Category = new Category();
            this.City = new City();
            this.County = new County();
            this.Semt = new tbl_semt();
            this.User = new User();
            this.AdvertDetail = new AdvertDetail();
            this.PictureList = new List<Picture>();
            this.ExteriorFeatureList = new List<ExteriorFeatures>();
            this.InternalFeatureList = new List<InternalFeatures>();
            this.InternalFeatureListID = new List<short>();
            this.ExteriorFeatureListID = new List<short>();
            this.CategoryList = db.Category.ToList();
            this.VarietyList = db.Variety.ToList();
            this.CityList = db.City.ToList();
            this.CountyList = db.County.ToList();
            this.SemtList = new List<tbl_semt>();
            this.QuarterList = new List<Quarter>();
            this.AdvertExteriorList = new List<AdvertExteriorFeature>();
            this.BathList = new List<string>() { 
                "1",
                "2",
                "3",
                "4",
                "5",
                "6+"
            
            };
        }

        public virtual Advert Advert { get; set; }
        public virtual Category Category { get; set; }
        public virtual User User { get; set; }
        public virtual Variety Variety { get; set; }
        public virtual AdvertDetail AdvertDetail { get; set; }
        public virtual AdvertOwner AdvertOwner { get; set; }
        public virtual City City { get; set; }
        public virtual County County { get; set; }
        public virtual tbl_semt Semt { get; set; }
        public virtual List<Picture> PictureList { get; set; }
        public virtual List<ExteriorFeatures> ExteriorFeatureList { get; set; }
        public virtual List<InternalFeatures> InternalFeatureList { get; set; }
        public virtual List<AdvertExteriorFeature> AdvertExteriorList { get; set; }
        public virtual List<Int16> InternalFeatureListID { get; set; }
        public virtual List<Int16> ExteriorFeatureListID { get; set; }
        public virtual List<Category> CategoryList { get; set; }
        public virtual List<Variety> VarietyList { get; set; }
        public virtual List<City> CityList { get; set; }
        public virtual List<County> CountyList { get; set; }
        public virtual List<tbl_semt> SemtList { get; set; }
        public virtual List<Quarter> QuarterList { get; set; }
        public virtual List<String> BathList { get; set; }
       
        

    }
}