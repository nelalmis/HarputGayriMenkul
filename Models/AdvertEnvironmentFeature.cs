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
    
    public partial class AdvertEnvironmentFeature
    {
        public int ID { get; set; }
        public Nullable<int> EnvironmentFeatureID { get; set; }
        public Nullable<int> AdvertID { get; set; }
    
        public virtual Advert Advert { get; set; }
    }
}