//------------------------------------------------------------------------------
// <auto-generated>
//    This code was generated from a template.
//
//    Manual changes to this file may cause unexpected behavior in your application.
//    Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace HarputGayriMenkul.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class AdvertDetail
    {
        public int AdvertID { get; set; }
        public Nullable<int> RoomCountID { get; set; }
        public Nullable<int> HallCount { get; set; }
        public Nullable<short> BathCount { get; set; }
        public Nullable<int> BuildingAge { get; set; }
        public Nullable<int> Floors { get; set; }
        public Nullable<int> OnWhichFloor { get; set; }
        public Nullable<int> HeatingTypeID { get; set; }
        public Nullable<int> StructureConditionID { get; set; }
        public Nullable<int> StructureTypeID { get; set; }
        public Nullable<int> UserStatusID { get; set; }
        public Nullable<int> IsFurnished { get; set; }
        public Nullable<int> IsAvailableCredit { get; set; }
        public string Description { get; set; }
        public string Location { get; set; }
    }
}