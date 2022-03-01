using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace HarputGayriMenkul.Models
{
    [Serializable]
    public class AdvertClass
    {
        EMLAKDBEntities db = new EMLAKDBEntities();
        public AdvertClass() {

            this.CategoryList = db.Category.ToList();
            this.VarietyList = db.Variety.ToList();
            this.CityList = db.City.ToList();
            this.CountyList = new List<County>();
            this.SemtList = new List<tbl_semt>();
            this.QuarterList = new List<Quarter>();
            this.RoomCountList = new List<RoomCount>();

            this.BathList = new List<string>() { 
                "1",
                "2",
                "3",
                "4",
                "5",
                "6+"
            
            };
            this.ExteriorListID = new List<int>();
            this.InternalListID = new List<int>();
            this.ExteriorList = db.ExteriorFeatures.ToList();
            this.InternalList = db.InternalFeatures.ToList();
            this.EnvironmentListID = new List<int>();
        }

        public int AdvertID { get; set; }

        [Required(ErrorMessage = "Lütfen ilan başlığı giriniz")]
        [DisplayName("Başlık")]
        public string Title { get; set; }

        [Required(ErrorMessage = "Lütfen fiyat giriniz")]
        [DisplayName("Fiyat")]
        [DataType(DataType.Currency)]
        [RegularExpression(@"^\$?\d+(\.(\d{2}))?$")]
        public decimal Price { get; set; }

        [Required]
        [DisplayName("Metre Kare")]
        public int SquareMeters { get; set; }

        [Required]
        [DisplayName("Tarih")]
        public System.DateTime CreationDate { get; set; }

        [Required(ErrorMessage = "Lütfen ilan mahallesini seçiniz")]
        public int QuarterID { get; set; }
        public String QuarterStr { get; set; }

        [Required(ErrorMessage = "Lütfen bir  kategori seçiniz")]
        public int CategoryID { get; set; }
        public string CategoryStr { get; set; }
        [Required(ErrorMessage = "Lütfen ilan tipini seçiniz")]
        public int VarietyID { get; set; }
        public String VarietyStr { get; set; }

        [Required]
        public int UserID { get; set; }
        public Nullable<bool> IsActive { get; set; }


        //AdvertDetail
        [DisplayName("Oda Sayısı")]
        public Nullable<int> RoomCountID { get; set; }
        public string RoomCount { get; set; }

        [DisplayName("Salon Sayısı")]
        public Nullable<int> HallCount { get; set; }

        [DisplayName("Banyo Sayısı")]
        public Nullable<short> BathCount { get; set; }

        [DisplayName("Bina Yaşı")]
        public Nullable<int> BuildingAge { get; set; }

        [DisplayName("Kat Sayısı")]
        public Nullable<int> Floors { get; set; }

        [DisplayName("Kaçıncı Kat")]
        public Nullable<int> OnWhichFloor { get; set; }

        [DisplayName("Isıtma Türü")]
        public int HeatingID { get; set; }
        public string HeatingStr { get; set; }
        [DisplayName("Mobilyalı Mı")]
        public Nullable<int> IsFurnishedID { get; set; }
        public string IsFurnishedStr { get; set; }
        [DisplayName("Krediye Uygun Mu")]
        public Nullable<int> IsAvailableCreditID { get; set; }
        public string IsAvailableCreditStr { get; set; }
        [DisplayName("Açıklama")]
        public string Description { get; set; }

        [DisplayName("Adres")]
        public string Location { get; set; }
        
        //ADVERT OWNER
        [Required(ErrorMessage = "Lütfen bir ad giriniz")]
        [DisplayName("Adı")]
        public string AdvertOwnerName { get; set; }

        [Required(ErrorMessage = "Lütfen soyadı giriniz")]
        [DisplayName("Soyadı")]
        public string AdvertOwnerSurname { get; set; }

        [Required(ErrorMessage = "Lütfen bir telefon numarası giriniz")]
        [DisplayName("Telefon-1")]
        public string Phone1 { get; set; }


        [DisplayName("Telefon-2")]
        public string Phone2 { get; set; }

        [DisplayName("E-mail")]
        public string E_mail { get; set; }
    
        //ADVERT LOCATİON INFO
        [Required(ErrorMessage = "Lütfen ilan ilini seçiniz")]
        public short CityID { get; set; }
        public string CityStr { get; set; }
        [Required(ErrorMessage = "Lütfen ilan ilçesini seçiniz")]
        public short CountyID { get; set; }
        public string CountyStr { get; set; }

         [Required(ErrorMessage = "Lütfen ilan semtini seçiniz")]
        public short SemtID { get; set; }
         public string SemtStr { get; set; }


        //PİCTURE
        public List<Picture> PictureList { get; set; }


        //GEREKLİ LİSTELER
        public virtual List<RoomCount> RoomCountList { get; set; }
        public virtual List<Category> CategoryList { get; set; }
        public virtual List<Variety> VarietyList { get; set; }
        public virtual List<City> CityList { get; set; }
        public virtual List<County> CountyList { get; set; }
        public virtual List<tbl_semt> SemtList { get; set; }
        public virtual List<Quarter> QuarterList { get; set; }
        public virtual List<String> BathList { get; set; }
        public virtual List<Int32> ExteriorListID {get;set;}
        public virtual List<Int32> InternalListID { get; set; }
        public virtual List<Int32> EnvironmentListID { get; set; }
        public virtual List<ExteriorFeatures> ExteriorList { get; set; }
        public virtual List<InternalFeatures> InternalList { get; set; }
    }
}