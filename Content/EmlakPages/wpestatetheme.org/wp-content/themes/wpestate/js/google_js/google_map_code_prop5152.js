/*global google */
/*global InfoBox */
/*global googlecode_property_vars*/
var panorama;
var gmarkers = [];
var current_place=0;
var selected_id         =   '';
var curent_gview_lat    =   jQuery('#gmap_wrapper').attr('data-cur_lat');
var curent_gview_long   =   jQuery('#gmap_wrapper').attr('data-cur_long');
var infobox_id=0;
var width_browser;
var infobox_width;
var vertical_pan;
var vertical_off=0;
var pins='';
var markers='';
var infoBox = null;
var info_image=null;
var heading=0;
var map;

function initialize(){
         "use strict";
        var centerPlace = new google.maps.LatLng(googlecode_property_vars.general_latitude,googlecode_property_vars.general_longitude);
        var viewPlace=new google.maps.LatLng(curent_gview_lat,curent_gview_long);
        var mapOptions = {
                zoom: parseInt(googlecode_property_vars.page_custom_zoom),
                scrollwheel: false,
                draggable: true,        
                center: centerPlace,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                streetViewControl: false
              };
        map = new google.maps.Map(document.getElementById('googleMap'), mapOptions);
        
        if (Modernizr.mq('only all and (max-width: 1025px)')) {
           map.setOptions({'draggable': false});
        }
        
        google.maps.event.addListener(map, 'tilesloaded', function() {
        jQuery('#gmap-loading').remove();
        });

        pins=googlecode_property_vars.markers;
        markers = jQuery.parseJSON(pins);
        setMarkers(map, markers);
       

        google.maps.event.trigger(gmarkers[infobox_id], 'click');
        if(googlecode_property_vars.idx_status==='1'){
            placeidx(map,markers);
        }
        
        map_cluster();
        
        panorama = map.getStreetView();
        panorama.setPosition(viewPlace);
        heading  = parseInt(googlecode_property_vars.camera_angle);

        panorama.setPov(/** @type {google.maps.StreetViewPov} */({
           heading: heading,
           pitch: 0
         }));
                            
 }
 
 
////////////////////////////////////////////////////////////////////
/// toogle street view
////////////////////////////////////////////////////////////////////
function toggleStreetView() {
   "use strict";
   panorama.setVisible(true);
}

function closeStreetView(){
   "use strict";
   panorama.setVisible(false);
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
    selected_id         =   parseInt( jQuery('#gmap_wrapper').attr('data-post_id') );

    var boxText = document.createElement("div");
    width_browser= jQuery(window).width();
    infobox_width=700;
    if (width_browser<900){
      infobox_width=500;
    }
    if (width_browser<600){
      infobox_width=400;
    }
    if (width_browser<400){
      infobox_width=200;
    }
    var myOptions = {
                    content: boxText,
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
            icon:  custompin( decodeURIComponent ( beach[8] ) ),
            shape: shape,
            title: decodeURIComponent(  beach[0].replace(/\+/g,' ')),
            zIndex: beach[3],
            image: decodeURIComponent (beach[4]),
            price: decodeURIComponent (beach[5]),
            type: decodeURIComponent (beach[6]),
            type2: decodeURIComponent (beach[7]),
            link: decodeURIComponent (beach[9]),
            infoWindowIndex : i
        });
        
        if(beach[10]===selected_id){           
               infobox_id=beach[3]-1;
        }     
          
        gmarkers.push(marker);
        google.maps.event.addListener(marker, 'click', function() {
             if(this.image===''){
                info_image='<img src="' + googlecode_property_vars.path + '/idxdefault.jpg" alt="image" />';
            }else{
                info_image=this.image;
            }
            var title   =  decodeURIComponent( this.title.replace(/\+/g,' '));
            var type    =  decodeURIComponent( this.type.replace(/-/g,' ') );
            var type2   =  decodeURIComponent( this.type2.replace(/-/g,' ') );
            var in_type =   mapfunctions_vars.in_text;
            if(type==='' || type2===''){
                in_type=" ";
            }
            
  
            infoBox.setContent('<div class="info_details"><span id="infocloser" onClick=\'javascript:infoBox.close();\' ></span><a href="'+this.link+'">'+info_image+'</a><a href="'+this.link+'" id="infobox_title">'+title+'</a><div class="prop_details"><span id="info_inside">'+type+" "+in_type+" "+type2+this.price+'</span></div>' );
            infoBox.open(map, this);    
            map.setCenter(this.position);   

           switch (infobox_width){
             case 700:
                  vertical_pan=-180-vertical_off;
                  map.panBy(380,vertical_pan);
                  vertical_off=0;
                  break;
             case 500: 
                 map.panBy(210,-190);
                  break;
             case 400: 
                  map.panBy(100,-190);
                  break;
             case 200: 
                  map.panBy(20,-190);
                  break;                         
            }   
        });
    }//end for
}// end setMarkers



google.maps.event.addDomListener(window, 'load', initialize);