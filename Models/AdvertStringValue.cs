using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Web;

namespace HarputGayriMenkul.Models
{
    public class AdvertStringValue
    {

        public AdvertStringValue()
        {
            this.ListAdvert = new List<AdvertStringValue>();
            
        }

        public int AdvertID { get; set; }

        
        [DisplayName("Başlık")]
        public string Title { get; set; }

        
        [DisplayName("Fiyat")]
        public decimal Price { get; set; }

        
        [DisplayName("Metre Kare")]
        public int SquareMeters { get; set; }

        
        [DisplayName("Tarih")]
        public DateTime CreationDate { get; set; }

       
        public string Mahalle { get; set; }


        
        public string Category { get; set; }

        
        public string Variety { get; set; }

        
        public string User { get; set; }
        public Nullable<bool> IsActive { get; set; }


        //AdvertDetail
        [DisplayName("Oda Sayısı")]
        public string RoomCount { get; set; }

        [DisplayName("Salon Sayısı")]
        public Nullable<int> HallCount { get; set; }

        [DisplayName("Banyo Sayısı")]
        public Nullable<int> BathCount { get; set; }

        [DisplayName("Bina Yaşı")]
        public Nullable<int> BuildingAge { get; set; }

        [DisplayName("Kat Sayısı")]
        public Nullable<int> Floors { get; set; }

        [DisplayName("Kaçıncı Kat")]
        public Nullable<int> OnWhichFloor { get; set; }

        [DisplayName("Isıtma Türü")]
        public string Heating { get; set; }

        [DisplayName("Mobilyalı Mı")]
        public string IsFurnished { get; set; }

        [DisplayName("Krediye Uygun Mu")]
        public string IsAvailableCredit{ get; set; }

        [DisplayName("Açıklama")]
        public string Description { get; set; }

        [DisplayName("Adres")]
        public string Location { get; set; }
        
        //ADVERT OWNER
        
        [DisplayName("Adı")]
        public string AdvertOwnerName { get; set; }

        
        [DisplayName("Soyadı")]
        public string AdvertOwnerSurname { get; set; }

        
        [DisplayName("Telefon-1")]
        public string Phone1 { get; set; }


        [DisplayName("Telefon-2")]
        public string Phone2 { get; set; }

        [DisplayName("E-mail")]
        public string E_mail { get; set; }
    
        //ADVERT LOCATİON INFO
       
        public string City { get; set; }

       
        public string County { get; set; }
        
        public string Semt { get; set; }

        public List<AdvertStringValue> ListAdvert { get; set; }
    }
}