/*global google */
/*global Modernizr */
/*global InfoBox */
/*global googlecode_contact_vars*/

var gmarkers = [];
var map_open=0;
var first_time=1;
var pins='';
var markers='';
var infoBox = null;
var vertical_off=''; 
var map;
var selected_id='';
var width_browser=null;
var infobox_width=null;
var wraper_height=null;
var info_image=null;

 function initialize(){
     "use strict";
        var mapOptions = {
                zoom: parseInt(googlecode_contact_vars.page_custom_zoom),
                scrollwheel: false,
                center: new google.maps.LatLng(googlecode_contact_vars.hq_latitude, googlecode_contact_vars.hq_longitude),
                mapTypeId: google.maps.MapTypeId.ROADMAP
              };
        map = new google.maps.Map(document.getElementById('googleMap'), mapOptions);
        
        if (Modernizr.mq('only all and (max-width: 1025px)')) {
            map.setOptions({'draggable': false});
        }
        
        google.maps.event.addListener(map, 'tilesloaded', function() {
            jQuery('#gmap-loading').remove();
        });
    
                
        pins=googlecode_contact_vars.markers;
        markers = jQuery.parseJSON(pins);
        setMarkers(map, markers);
        google.maps.event.trigger(gmarkers[0], 'click');
       
       
        ////////////////////////////////////////////         close map
        jQuery(document).mouseup(function (e){
            var container = jQuery(".gmap_not_home");
            var container2=jQuery(".search_wrapper");


            if (!$(e.target).hasClass('geolocation-button') && container.has(e.target).length === 0 && container2.has(e.target).length === 0 &&  map_open === 1){
                jQuery('#googleMap').animate({'height': '295px'});
                jQuery('.gmap_wrapper').animate({'height': '295px'});
                jQuery('#gmap-next,#gmap-prev').hide();
                map_open = 0;
       
                jQuery('#gmap-menu').hide();
                hide_advanced_search();

            }
        });

       


       /////////////////////////////////////////////// resize      
       google.maps.event.addDomListener(document.getElementById('openmap'), 'click', function () { 
            var googleMap_h=0;
            var gmapWrapper_h=0;
     
          
            if ( jQuery('#googleMap').height() === 295 )  {           
                jQuery('#gmap-menu').show();
                googleMap_h=590;                  
                if (Modernizr.mq('(max-width: 940px)')) {
                   gmapWrapper_h=590;
                } else {
                   gmapWrapper_h=590;
                }
                jQuery('#gmap-next,#gmap-prev').show();
                show_advanced_search();
                
                
       
            } else {
                jQuery('#gmap-menu').hide();
                googleMap_h=gmapWrapper_h=295;
                jQuery('#gmap-next,#gmap-prev').hide();
                hide_advanced_search();
                vertical_off=150;    
                
            }
                
        
            jQuery('#googleMap').animate({'height': googleMap_h+'px'});
            jQuery('.gmap_wrapper').animate({'height': gmapWrapper_h+'px'},500,function(){
                google.maps.event.trigger(map, "resize");
                map.setOptions({'scrollwheel': true});     
            });
            
       });  
             
                        
 }
 
 
 
 ////////////////////////////////////////////////////////////////////
 /// custom pin function
 //////////////////////////////////////////////////////////////////////
 
 function custompincontact(image){
   "use strict";
    image = {
     url: googlecode_contact_vars.path+'/sale.png', 
     size: new google.maps.Size(59, 59),
     origin: new google.maps.Point(0,0),
     anchor: new google.maps.Point(16,59 )
   };
   return image;
 }
  
 ////////////////////////////////////////////////////////////////////
 /// set markers function
 //////////////////////////////////////////////////////////////////////
 

function setMarkers(map, beach) {
   "use strict";
   var shape = {
       coord: [1, 1, 1, 38, 38, 59, 59 , 1],
       type: 'poly'
   };
   
    var boxText = document.createElement("div");
      var myOptions = {
                      content: boxText,
                      disableAutoPan: true,
                      maxWidth: 500,
                      pixelOffset: new google.maps.Size(-90, -210),
                      zIndex: null,
                      closeBoxMargin: "-13px 0px 0px 0px",
                      closeBoxURL: "",
                      draggable: true,
                      infoBoxClearance: new google.maps.Size(1, 1),
                      isHidden: false,
                      pane: "floatPane",
                      enableEventPropagation: false
              };              
      infoBox = new InfoBox(myOptions);         
                

   
     
     var myLatLng = new google.maps.LatLng(googlecode_contact_vars.hq_latitude, googlecode_contact_vars.hq_longitude);
     var marker = new google.maps.Marker({
         position: myLatLng,
         map: map,
         icon: custompincontact(beach[8]),
         shape: shape,
         title: decodeURIComponent(  beach[0].replace(/\+/g,' ')),
         zIndex: 1,
         image:beach[4],
         price:beach[5],
         type:beach[6],
         type2:beach[7],
         infoWindowIndex : 0 ,
     
     });

   gmarkers.push(marker);


    google.maps.event.addListener(marker, 'click', function() { 
       if(map_open === 0 && first_time === 0){
             map_open=1;
             jQuery('#googleMap').animate({'height': '590px'});
             jQuery('.gmap_wrapper').animate({'height': '590px'},500,function(){ 
                   map.setOptions({'scrollwheel': true});
                   jQuery('#gmap-next,#gmap-prev').show();
                   jQuery('#gmap-menu').show();
                   show_advanced_search('close');
                   google.maps.event.trigger(map, "resize");  
                  
                   
             });                
        }
        first_time=0;
        infoBox.setContent('<div class="contact_info_details"><span id="infocloser" onClick=\'javascript:infoBox.close();\' ></span><h2>'+this.title+'</h2></div>' );
        infoBox.open(map, this);    
        map.setCenter(this.position);      
        map.panBy(100,-120);
         if(mapfunctions_vars.adv_search === '3' || mapfunctions_vars.adv_search === '2' ){          
            
         }
        close_adv_search()
    });


}// end setMarkers

                       
                         
google.maps.event.addDomListener(window, 'load', initialize);