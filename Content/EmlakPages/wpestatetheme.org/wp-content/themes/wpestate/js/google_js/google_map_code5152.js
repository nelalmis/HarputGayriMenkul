/*global google */
/*global Modernizr */
/*global InfoBox */
/*global googlecode_regular_vars*/
var gmarkers = [];
var current_place=0;
var actions=[];
var categories=[];
var vertical_pan=-190;
var map_open=0;
var vertical_off=150;
var pins='';
var markers='';
var infoBox = null;
var category=null;
var width_browser=null;
var infobox_width=null;
var wraper_height=null;
var info_image=null;
var map;
var selected_id         =   '';
function initialize(){
    "use strict";

    var mapOptions = {
             flat:false,
             noClear:false,
             zoom: parseInt(googlecode_regular_vars.page_custom_zoom),
             scrollwheel: false,
             draggable: true,
             center: new google.maps.LatLng(googlecode_regular_vars.general_latitude, googlecode_regular_vars.general_longitude),
             mapTypeId: google.maps.MapTypeId.ROADMAP,
             streetViewControl:false
           };
           
           
    if(document.getElementById("googleMap")) {
        map = new google.maps.Map(document.getElementById('googleMap'), mapOptions);
        google.maps.visualRefresh = true;
    }
    else{
        return;
    };       
           
  
    
    
  
    
    google.maps.event.addListener(map, 'tilesloaded', function() {
        jQuery('#gmap-loading').remove();
    });
    
    if (Modernizr.mq('only all and (max-width: 1025px)')) {
        map.setOptions({'draggable': false});
    }

    
    if(googlecode_regular_vars.generated_pins==='0'){
        pins=googlecode_regular_vars.markers;
        markers = jQuery.parseJSON(pins);
    }else{
        if( typeof( googlecode_regular_vars2) !== 'undefined' && googlecode_regular_vars2.markers2.length > 2){          
            pins=googlecode_regular_vars2.markers2;
            markers = jQuery.parseJSON(pins);                 
        }           
    }
    

    
    if (markers.length>0){
        setMarkers(map, markers);
    }
    
    if(googlecode_regular_vars.idx_status==='1'){
        placeidx(map,markers);
    }

    map_cluster();
         
////////////////////////////////////////////////         close map
 /*   jQuery(document).mouseup(function (e){
        var container = jQuery(".gmap_not_home");
        var container2=jQuery(".search_wrapper");

   
         
        var target = jQuery(e.target); 
         if (target.parents('#demo_div_sw').length) {
            return;
         }
            
        if (!jQuery(e.target).hasClass('geolocation-button') && container.has(e.target).length === 0 && container2.has(e.target).length === 0 &&  jQuery('#googleMap').height()!==295 ){
            jQuery('#googleMap').animate({'height': '295px'});
            jQuery('.gmap_wrapper').animate({'height': '295px'});
            jQuery('#gmap-next,#gmap-prev').hide();
            map_open = 0;
            infoBox.close();
            jQuery('#gmap-menu').hide();
            hide_advanced_search();          
        }
    });
*/
          
    /* //////////////////////////////////////////////// resize     */ 
    google.maps.event.addDomListener(document.getElementById('openmap'), 'click', function () { 
        var googleMap_h=0;
        var gmapWrapper_h=0;
        
 
        if( infoBox!== null){
            infoBox.close(); 
        }
    
        if ( jQuery('#googleMap').height()===295 )  {                       
            googleMap_h=590;                                
            if (Modernizr.mq('only all and (max-width: 940px)')) {
               gmapWrapper_h=590;
            } else {
                jQuery('#gmap-menu').show(); 
               gmapWrapper_h=590;
            }
            jQuery('#gmap-next,#gmap-prev').show();
             show_advanced_search();
             vertical_off=0;

        } else {
            jQuery('#gmap-menu').hide();
            jQuery('#advanced_search_map_form').hide();
            googleMap_h=gmapWrapper_h=295;
            jQuery('#gmap-next,#gmap-prev').hide();
            hide_advanced_search();
            vertical_off=150; 
          
        }


        jQuery('#googleMap').animate({'height': googleMap_h+'px'});
        jQuery('.gmap_wrapper').animate({'height': gmapWrapper_h+'px'},500,function(){
            google.maps.event.trigger(map, "resize");
            map.setOptions({'scrollwheel': true});       
            jQuery('.tooltip').fadeOut("fast");
        });

    });  
 
}
 
 
 



 ////////////////////////////////////////////////////////////////////
 /// set markers function
 //////////////////////////////////////////////////////////////////////
 
 
function setMarkers(map, locations) {
   "use strict";

   var shape = {
       coord: [1, 1, 1, 38, 38, 59, 59 , 1],
       type: 'poly'
   };
   
      var boxText = document.createElement("div");
      width_browser= jQuery(window).width();
      infobox_width=700;
      vertical_pan=-215;
      if (width_browser<900){
        infobox_width=500;
      }
      if (width_browser<600){
        infobox_width=400;
      }
      if (width_browser<400){
        infobox_width=200;
      }
 
 
      var myOptions = {content: boxText,
                       disableAutoPan: true,
                       maxWidth: infobox_width,
                       boxClass:"mybox",
                       zIndex: null,			
                       closeBoxMargin: "-13px 0px 0px 0px",
                       closeBoxURL: "",
                       infoBoxClearance: new google.maps.Size(1, 1),
                       isHidden: false,
                       pane: "floatPane",
                       enableEventPropagation: false
                    
              };              
      infoBox = new InfoBox(myOptions);         
                                

   for (var i = 0; i < locations.length; i++) {
        var beach = locations[i];
        var myLatLng = new google.maps.LatLng(beach[1], beach[2]);
        var marker = new google.maps.Marker({
             position: myLatLng,
             map: map,
             icon: custompin(decodeURIComponent ( beach[8]) ),
             shape: shape,
             title: decodeURIComponent(  beach[0].replace(/\+/g,' ')),
             zIndex: beach[3],
             image:decodeURIComponent ( beach[4] ),
             price:decodeURIComponent ( beach[5] ),
             type:decodeURIComponent ( beach[6] ),
             type2:decodeURIComponent ( beach[7] ),
             link:decodeURIComponent ( beach[9] ),
             infoWindowIndex : i ,
             animation: google.maps.Animation.DROP
            });

         
            gmarkers.push(marker);

            google.maps.event.addListener(marker, 'click', function() {
               wraper_height=590;
               if(map_open===0){
                     map_open=1;
                     jQuery('#googleMap').animate({'height': '590px'}); 
                     if (Modernizr.mq('only all and (max-width: 940px)')) {
                         wraper_height=590;
                     }


                     jQuery('.gmap_wrapper').animate({'height': wraper_height+'px'},500,function(){ 
                           map.setOptions({'scrollwheel': true});
                         
                           jQuery('#gmap-next,#gmap-prev').show();

                           if (!Modernizr.mq('only all and (max-width: 960px)')){
                               jQuery('#gmap-menu').show();
                           }
                           google.maps.event.trigger(map, "resize");  
                           show_advanced_search('close');
                          
                          

                     });                
               }
  
         
            jQuery('#search_map_form').hide();
            jQuery('#advanced_search_map_form').hide();
            if(this.image===''){
                 info_image='<img src="' + googlecode_regular_vars.path + '/idxdefault.jpg" alt="image" />';
             }else{
                 info_image=this.image;
             }
            
            var title   =  decodeURIComponent( this.title.replace(/\+/g,' '));
            var type    =   decodeURIComponent ( this.type.replace(/-/g,' ') );
            var type2   =   decodeURIComponent ( this.type2.replace(/-/g,' ') );
            var in_type =   mapfunctions_vars.in_text;
            if(type==='' || type2===''){
                in_type=" ";
            }
            
            var extra_adv_class='';
            if(mapfunctions_vars.adv_search === '3'){
                extra_adv_class='small-info';
            }
            
            
            infoBox.setContent('<div class="info_details '+extra_adv_class+' "><span id="infocloser" onClick=\'javascript:infoBox.close();\' ></span><a href="'+this.link+'">'+info_image+'</a><a href="'+this.link+'" id="infobox_title">'+title+'</a><div class="prop_details"><span id="info_inside">'+type+" "+in_type+" "+type2+this.price+'</span></div>' );
  
            infoBox.open(map, this);    
            map.setCenter(this.position);   

            switch (infobox_width){
              case 700:
                  if(mapfunctions_vars.adv_search === '3'){
                       //190 vs 160 for adv search 3
                       vertical_pan=-175-vertical_off;                
                  }else{
                       vertical_pan=-187-vertical_off;
                  }
                   map.panBy(380,vertical_pan);
                   vertical_off=0;
                   break;
              case 500: 
                   map.panBy(210,-220);
                   break;
              case 400: 
                   map.panBy(100,-220);
                   break;
              case 200: 
                   map.panBy(20,-170); 
                   break;               
             }
             close_adv_search()
  
      });
   }//end for
   // pan to the latest pin for taxonmy and adv search
   
   if(googlecode_regular_vars.generated_pins!=='0'){
        pan_to_last_pin(myLatLng);
   }
  
   
}// end setMarkers


  if (typeof google === 'object' && typeof google.maps === 'object') {                                         
    google.maps.event.addDomListener(window, 'load', initialize);
  }
  
  function  pan_to_last_pin(myLatLng){
         map.setCenter(myLatLng);   
  }