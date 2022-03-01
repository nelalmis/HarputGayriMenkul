/*jQuery:false */
/*global Modernizr */
/*global control_vars */
var adv_search4=1;
var adv_search2=1;
var adv_search3=1;
var adv_search5=1;


jQuery(window).scroll(function ($) {
    "use strict";
    var scroll = jQuery(window).scrollTop();
    if (scroll >= 75) {
        if (!Modernizr.mq('only all and (max-width: 1024px)')) {
           jQuery("#branding").addClass("branding_fixed");
           jQuery("#geolocation-button").hide();              
       }
    } else {
        if (!Modernizr.mq('only all and (max-width: 1024px)')) {          
            jQuery("#branding").removeClass("branding_fixed");
            jQuery("#search_wrapper").show(500);
            if( !jQuery("#geolocation-button").hasClass('geohide') ){
                jQuery("#geolocation-button").show(500);
            }
        }

    }
    if (scroll >= 130) {
        jQuery("#search_wrapper").hide(); 
    }
});



jQuery(window).resize(function() {
    "use strict";
    
     jQuery('#mobile_menu').hide('1');
    
    jQuery('#brsize').html(jQuery(window).width());
    if (!jQuery(".fullwhite")[0]){
       if (!Modernizr.mq('only all and (max-width: 960px)')) {
           jQuery('.anchor-bord').css("top","105px");
           sizeContent();
       }else{
           jQuery('#post').removeAttr('style');
       }
    }

});



jQuery(window).load(function() {
    "use strict";
    jQuery('.sub-menu li').has('ul').addClass('haschildren');
    if (!jQuery(".fullwhite")[0])  {
        if (!Modernizr.mq('only all and (max-width: 960px)')) {
            sizeContent();
        }
    }
});


function sizeContent() {
    "use strict";
    var post_height ='';
    var wrapper='';
    jQuery("#primary").imagesLoaded(function($images, $proper, $broken) {
        var main_height = jQuery('#primary').outerHeight(true)  ;
        post_height = jQuery('#post').outerHeight(true);
     
        wrapper=jQuery('#wrapper').outerHeight(true);        
        if (main_height > post_height) {
            main_height=main_height;
            jQuery('#post').css("height", main_height + "px");
        }
    });
}




jQuery(document).ready(function($) {
  "use strict";
  $('#brsize').html($(window).width());
  
  
  
      jQuery('#advanced_submit_mobile').click(function(event){
        var val_from, val_to,form_submit;
       // event.preventDefault();
        val_from    =   jQuery('#check_in_mobile').val();
        val_to      =   jQuery('#check_out_mobile').val();
        form_submit =   jQuery('#advanced_booking_form')
        
        if ( val_from !== '' &&  val_to !== '' ){
            form_submit.submit();
        }else{
            if (val_from ===''){
                jQuery('#check_in_mobile').css('border-color','red');
            }else{
                jQuery('#check_in_mobile').css('border-color','#e5e5e5');
            }
            
            if (val_to ===''){
                jQuery('#check_out_mobile').css('border-color','red');
            }else{
                jQuery('#check_out_mobile').css('border-color','#e5e5e5');
            }
        }
    });
  
  
  
 /* 
    jQuery('#advanced_submit_5').click(function(event){
        var val_from, val_to,form_submit;
       // event.preventDefault();
        val_from    =   jQuery('#check_in').val();
        val_to      =   jQuery('#check_out').val();
        form_submit =   jQuery('#advanced_booking_form_mobile')
         form_submit.submit();
       /* if ( val_from !== '' &&  val_to !== '' ){
            form_submit.submit();
        }else{
            if (val_from ===''){
                jQuery('#check_in').css('border-color','red');
            }else{
                jQuery('#check_in').css('border-color','#e5e5e5');
            }
            
            if (val_to ===''){
                jQuery('#check_out').css('border-color','red');
            }else{
                jQuery('#check_out').css('border-color','#e5e5e5');
            }
        }
        
    });*/
  
    var citylist=jQuery.parseJSON(control_vars.autocity);
    jQuery( "#booking_location" ).autocomplete({
       source: citylist
    });
    
    jQuery( "#booking_location_mobile" ).autocomplete({
       source: citylist
    });
    
    jQuery( "#booking_location_widget" ).autocomplete({
       source: citylist
    });
    
    jQuery( "#booking_location_shortcode" ).autocomplete({
       source: citylist
    });
    
    
  ////////////////////////////////////////////////////////////////////////////////////////////
  /// Stripe change value
  ///////////////////////////////////////////////////////////////////////////////////////////
 
    $('#pack_select').change(function(){
        var stripe_pack_id,stripe_ammount,the_pick;
        $( "#pack_select option:selected" ).each(function() {
            stripe_pack_id=$(this).val();
            stripe_ammount=parseFloat( $(this).attr('data-price'))*100;
            the_pick=$(this).attr('data-pick');
        });
        console.log("pack_id: "+stripe_pack_id+" ammount: "+stripe_ammount);
        $('#pack_id').val(stripe_pack_id);
        $('#pay_ammout').val(stripe_ammount);
        $('#stripe_form').attr('data-amount',stripe_ammount);
        
       $('.stripe_buttons').each(function(){
           $(this).hide();
           if( $(this).attr('id') === the_pick){
                $(this).show();
           }
       })

    });
 
 
    $('#pack_recuring').click(function () {
        if( $(this).attr('checked') ) {
            $('#stripe_form').append('<input type="hidden" name="stripe_recuring" id="stripe_recuring" value="1">');
        }else{
            $('#stripe_recuring').remove();
        }
    });

 
  ////////////////////////////////////////////////////////////////////////////////////////////
  /// new controls for upload pictures
  ///////////////////////////////////////////////////////////////////////////////////////////
   
    jQuery('#imagelist i').click(function(){
          var curent='';  
          jQuery(this).parent().remove();
          
          jQuery('#imagelist .uploaded_images').each(function(){
             curent=curent+','+jQuery(this).attr('data-imageid'); 
          });
          jQuery('#attachid').val(curent); 
         
          
      });
      
    jQuery('#imagelist img').click(function(){
    
        jQuery('#imagelist .uploaded_images .thumber').each(function(){
            jQuery(this).remove();
        });

        jQuery(this).parent().append('<i class="fa thumber fa-star"></i>')
        jQuery('#attachthumb').val(   jQuery(this).parent().attr('data-imageid') );
    });   
    
  
 ////////////////////////////////////////////////////////////////////////////////////////////
  /// property anchor menu links
  ///////////////////////////////////////////////////////////////////////////////////////////
   
  $('.anchor-bord a').click(function(event){
       event.preventDefault();
       var scrollto= $(this).attr('href');
       
       var p = $(scrollto);
       var offset = p.offset();
       var scroll=offset.top -470;
  
       $('html, body').animate({scrollTop: scroll+'px'}, 800);
  });

    
  ////////////////////////////////////////////////////////////////////////////////////////////
  /// switch from tel to callto  
  ///////////////////////////////////////////////////////////////////////////////////////////
    if (!jQuery.browser.mobile) {
        jQuery('body').on('click', 'a[href^="tel:"]', function() {
                jQuery(this).attr('href', 
                    jQuery(this).attr('href').replace(/^tel:/, 'callto:'));
        });
    }
  ////////////////////////////////////////////////////////////////////////////////////////////
  /// adding total for featured listings  
  ///////////////////////////////////////////////////////////////////////////////////////////
  $('.extra_featured').change(function(){
      
     var parent= $(this).parent();
     
     var price_regular  = parseFloat( parent.find('.submit-price-no').text(),10 );
     var price_featured = parseFloat( parent.find('.submit-price-featured').text(),10 );
     var total= price_regular+price_featured;
  
     if( $(this).is(':checked') ){
        parent.find('.submit-price-total').text(total)
        $('#stripe_form_simple').hide();
        $('#stripe_form_featured').show();
         
     }else{
        //substract from total
        parent.find('.submit-price-total').text(price_regular)
        $('#stripe_form_featured').hide(); 
        $('#stripe_form_simple').show();
     }
      
      
  });

  ////////////////////////////////////////////////////////////////////////////////////////////
  /// resend for approval  
  ///////////////////////////////////////////////////////////////////////////////////////////
  
    $('.resend_pending').click(function(){
          var prop_id = $(this).attr('data-listingid');
          resend_for_approval(prop_id,$(this));
    });
    
    
    function  resend_for_approval(prop_id,selected_div){
        var ajaxurl      =   control_vars.admin_url+'admin-ajax.php';     

        $.ajax({    
            type: 'POST',
            url: ajaxurl, 
        data: {
            'action'        :   'ajax_resend_for_approval',
            'propid'        :   prop_id, 
        },
        success:function(data) {  
            if(data==='pending'){
                selected_div.parent().empty().append('<span class="featured_prop">Sent for approval</span>'); 
                var normal_list_no =parseInt( $('#normal_list_no').text(),10 );
                $('#normal_list_no').text(normal_list_no-1);
            }else{
               selected_div.parent().empty().append(data);   
            }
            
        },
        error: function(errorThrown){

        }
  
        });//end ajax
    }
    
  
  ///////////////////////////////////////////////////////////////////////////////////////////  
  //////// listing pay via paypal
  ///////////////////////////////////////////////////////////////////////////////////////////  
  
    $('.listing_submit_normal').click(function(){
         var prop_id = $(this).attr('data-listingid');
         var featured_checker=$(this).parent().find('input');
         var is_featured=0;
         var is_upgrade=0;
         
         if( featured_checker.prop('checked') ){
             is_featured=1;
         }else{
             is_featured=0;
         }
         
         listing_pay(prop_id,$(this),is_featured,is_upgrade);
    });
    
    
    $('.listing_upgrade').click(function(){
          var is_upgrade=1;
          var is_featured=0;
          var prop_id = $(this).attr('data-listingid');
          listing_pay(prop_id,$(this),is_featured,is_upgrade);
    });
    
    
    
    function  listing_pay(prop_id,selected_div,is_featured,is_upgrade){
        var ajaxurl      =   control_vars.admin_url+'admin-ajax.php';     

        $.ajax({    
            type: 'POST',
            url: ajaxurl, 
        data: {
            'action'        :   'ajax_listing_pay',
            'propid'        :   prop_id,
            'is_featured'   :   is_featured,
            'is_upgrade'    :   is_upgrade    
        },
        success:function(data) {  
            window.location.href = data;         
        },
        error: function(errorThrown){

        }
  
        });//end ajax
    }
    
    
    

  ///////////////////////////////////////////////////////////////////////////////////////////  
  ////////  set featured inside membership
  ///////////////////////////////////////////////////////////////////////////////////////////  
  $('.make_featured').click(function(){
    var prop_id = $(this).attr('data-postid');
    make_prop_featured(prop_id,$(this));
    $(this).unbind( "click" );
      
  });

  function make_prop_featured(prop_id,selectedspan){
       var ajaxurl      =   control_vars.admin_url+'admin-ajax.php';     
   
    
        $.ajax({    
            type: 'POST',
            url: ajaxurl, 
        data: {
            'action'        :   'ajax_make_prop_featured',
            'propid'        :   prop_id
        },
        success:function(data) {  
            if(data==='done'){
                selectedspan.empty().text('Property is featured');
                var featured_list_no =parseInt( $('#featured_list_no').text(),10 );
                $('#featured_list_no').text(featured_list_no-1);
            }else{
                selectedspan.empty().removeClass('make_featured').addClass('featured_exp').text(control_vars.used_all);
            }
          
        },
        error: function(errorThrown){

        }
  
        });//end ajax
  }


  ///////////////////////////////////////////////////////////////////////////////////////////  
  ////////  pack upgrade via paypal    
  ///////////////////////////////////////////////////////////////////////////////////////////  
    $('#pick_pack').click(function(){
        if ($('#pack_recuring').is(':checked')) {
            recuring_pay_pack_via_paypal();
        } else {
            pay_pack_via_paypal();
        } 
    });
    
    
    
    
    function recuring_pay_pack_via_paypal(){
    
       var ajaxurl      =   control_vars.admin_url+'admin-ajax.php';     
       var packName     =   $('#pack_select :selected').text();
       var packId       =   $('#pack_select :selected').val(); 
    
        $.ajax({    
            type: 'POST',
            url: ajaxurl, 
        data: {
            'action'        :   'ajax_paypal_pack_recuring_generation',
            'packName'      :   packName,
            'packId'        :   packId
        },
        success:function(data) {             
          window.location.href =data;
        },
        error: function(errorThrown){

        }
  
    
        });//end ajax
    
    }
    
    
    
    
    
    
    
    
    
    function pay_pack_via_paypal(){
       var  ajaxurl         =  control_vars.admin_url+'admin-ajax.php';     
       var packName = $('#pack_select :selected').text();
       var packId =   $('#pack_select :selected').val();
      
      
       
       $.ajax({    
        type: 'POST',
        url: ajaxurl, 
        data: {
            'action'        :   'ajax_paypal_generation',
            'packName'      :   packName,
            'packId'        :   packId
        },
        success:function(data) {             
          window.location.href =data;
        },
        error: function(errorThrown){

        }
  
    
        });//end ajax
    
    }
    
    
    
  ///////////////////////////////////////////////////////////////////////////////////////////  
  ////////  login via facebook conect    
  ///////////////////////////////////////////////////////////////////////////////////////////  
  
    $('#facebooklogin, #facebookloginsidebar').click(function(){
        login_via_facebook( $(this) );
    })
    
      function   login_via_facebook(button){     
       var  ajaxurl         =  control_vars.admin_url+'admin-ajax.php';     
       var login_type       =  'facebook';  
        
        $.ajax({    
        type: 'POST',
        url: ajaxurl, 
        data: {
            'action'            :   'ajax_facebook_login',
            'login_type'        :   login_type
        },
        success:function(data) {             
          window.location.href =data;
        },
        error: function(errorThrown){

        }
  
    
        });//end ajax
     
    }
    
    
    
  
  ///////////////////////////////////////////////////////////////////////////////////////////  
  ////////  open id login - via google
  //////////////////////////////////////////////////////////////////////////////////////////// 
  
    $('#yahoologin,#aollogin,#yahoologinsidebar').click(function(){
        login_via_google( $(this) );
    })
    
    function   login_via_google(button){     
       var  ajaxurl         =  control_vars.admin_url+'admin-ajax.php';     
       var login_type       =  button.attr('data-social');  
        
        $.ajax({    
        type: 'POST',
        url: ajaxurl, 
        data: {
            'action'            :   'ajax_google_login',
            'login_type'        :   login_type
        },
        success:function(data) {             
          window.location.href =data;
        },
        error: function(errorThrown){

        }
  
    
        });//end ajax
     
    }
    
    
    $('#googlelogin,#googleloginsidebar').click(function(){
        login_via_google_oauth();
    })
    
    function login_via_google_oauth() {
        "use strict";
        var ajaxurl, login_type;
        ajaxurl         =  control_vars.admin_url + 'admin-ajax.php';

        jQuery.ajax({
            type: 'POST',
            url: ajaxurl,
            data: {
                'action'            :   'wpestate_ajax_google_login_oauth'
            },
            success: function (data) {
                console.log(data);
                window.location.href = data;
            },
            error: function (errorThrown) {
            }
        });//end ajax
    }

    
    
    
  ///////////////////////////////////////////////////////////////////////////////////////////  
  ////////  property listing listing
  ////////////////////////////////////////////////////////////////////////////////////////////    
    $( '#advanced_city_listing' ).dropdown( {
    });

    $( '#advanced_area_listing' ).dropdown( {
    });
      
    $( '#listing_filter_div' ).dropdown( {
    });
         
         
    $('.listing_filters .checker label').click(function(event){    
       $(this).parent().toggleClass('checker-click');
       start_filtering();
    });
  
    $('.listing_advanced_area_div li').click(function(){  
        start_filtering();
    });
    
    $('.listing_filter_div li').click(function(){
        start_filtering();
    });
    
    function block_form(){
         $('.listing_filters').css('pointer-events', 'none');
    }
    
    function un_block_form(){
         $('.listing_filters').css('pointer-events', 'auto');
    }
    
    function  start_filtering(){
        
        block_form();
        
       // get action vars
        var action_array=new Array();
        $('.action_filter .checker-click input').each(function(){
            action_array.push( $(this).val() );
        });
       // get category vars
        var category_array=new Array();
        $('.type-filters .checker-click input').each(function(){
            category_array.push( $(this).val() );
        });
       // get city
       var city=$('.listing_advanced_city_div input').val();
       // get area
       var area=$('.listing_advanced_area_div input').val();
       // get order
       var order=$('.listing_filter_div input').val(); 
       
     
       
       var  ajaxurl         =  control_vars.admin_url+'admin-ajax.php'; 
       // dataType: 'json',
         
        $('#listing_ajax_container').empty();
        $('#listing_loader').show();
        
        
        $.ajax({    
        type: 'POST',
        url: ajaxurl, 
        data: {
            'action'            :   'ajax_filter_listings',
            'action_array'      :   action_array,
            'category_array'    :   category_array,
            'city'              :   city,
            'area'              :   area,
            'order'             :   order
        },
        success:function(data) {             
            $('#listing_loader').hide();
            $('#listing_ajax_container').append(data);
            $('#post').removeAttr('style');
            $('.pagination').empty();
       
            restart_js_after_ajax();
            un_block_form();
        },
        error: function(errorThrown){

        }
        });//end ajax
     
    }
    
   
          
     $('#list_view').click(function(){
         $('.property_listing').addClass('listview')       
     })
     
     $('#grid_view').click(function(){
         $('.property_listing').removeClass('listview')       
     })

  ///////////////////////////////////////////////////////////////////////////////////////////  
  ////////  Ajax add to favorites on listing
  ////////////////////////////////////////////////////////////////////////////////////////////        
   $('.icon-fav').click(function(){
       var icon=$(this);
       add_remove_favorite(icon);
   });
   
  function add_remove_favorite(icon){
       var  post_id         =  icon.attr('data-postid'); 
       var  securitypass    =  $('#security-pass').val();
       var  ajaxurl         =  control_vars.admin_url+'admin-ajax.php'; 
     
  
       if (parseInt(control_vars.userid)===0){
           show_login_form();
       }else{
            icon.toggleClass('icon-fav-off');
            icon.toggleClass('icon-fav-on');

            $.ajax({    
             type: 'POST',
             url: ajaxurl,
             dataType: 'json',
             data: {
                 'action'            :   'ajax_add_fav',
                 'post_id'           :   post_id,

             },
             success:function(data) {             
                 if(data.added){
                      icon.removeClass('icon-fav-off').addClass('icon-fav-on');
                 }else{
                      icon.removeClass('icon-fav-on').addClass('icon-fav-off');
                 }
             },
             error: function(errorThrown){

             }
             });//end ajax
      }// end login use
    }
 
 
        // remove from fav listing on user profile
       $('.icon-fav-on-remove').click(function(){      
           $(this).parent().parent().parent().remove();
           $('.property_listing').each(function(){
               $(this).removeClass('is_last').css('margin-right','14px');
           })
       });
                
  ///////////////////////////////////////////////////////////////////////////////////////////  
  ////////  Ajax add to favorites on propr
  ////////////////////////////////////////////////////////////////////////////////////////////        
 
  $('#add_favorites').click(function(){
       var  post_id         =  $('#add_favorites').attr('data-postid'); 
       var  securitypass    =  $('#security-pass').val();
       var  ajaxurl         =  control_vars.admin_url+'admin-ajax.php'; 
  
 
    if (parseInt(control_vars.userid)===0){
         show_login_form();
    }else{
        $('#add_favorites').text(control_vars.saving_text);
        $.ajax({    
        type: 'POST',
        url: ajaxurl,
        dataType: 'json',
        data: {
            'action'            :   'ajax_add_fav',
            'post_id'           :   post_id,
        
        },
        success:function(data) {

            if(data.added){
                 $('#add_favorites').text(control_vars.favorite_text).removeClass('isnotfavorite').addClass('isfavorite');
            }else{
                 $('#add_favorites').text(control_vars.add_favorite_text).removeClass('isfavorite').addClass('isnotfavorite');
            }
        },
        error: function(errorThrown){
     
        }
        }); //end ajax
    }// end check login
  });
 
 
    function show_login_form(){
      
        var  ajaxurl         =  control_vars.admin_url+'admin-ajax.php'; 
        $.ajax({    
            type: 'POST',
            url: ajaxurl,
             data: {
                'action'            :   'ajax_show_login_form',        
             },
            success:function(data) {
          
                 $('#page').append(data);
                  enable_actions_modal();
            },
            error: function(errorThrown){
   
            }
        }); //end ajax
        
    }
 
 
 
 
 
 
     function enable_actions_modal(){
               $('#facebooklogin').click(function(){
                  $('#cover').hide();
                  login_via_facebook( $(this) );
                  
               });
              
               $('#googlelogin,#yahoologin').click(function(){
                  $('#cover').hide();
                   login_via_google( $(this) );
               })
    
                $('#closeadvancedlogin').click(function(){
                      $('#ajax_login_container').remove();
                      $('#cover').remove();
                });
         
                $('#reveal_register').click(function(){
                    $('#ajax_login_div').fadeOut(400, function() {
                            $('#ajax_register_div').fadeIn();
                            });
                                     
                })
         
                $('#reveal_login').click(function(){
                    $('#ajax_register_div').fadeOut(400,function() {
                             $('#ajax_login_div').fadeIn() ; 
                    });
                                   
                })
         
         
                $('#wp-login-but').click(function(){
                      wpestate_login();
                 });

                 $('#login_pwd, #login_user').keydown(function(e){
                     if(e.keyCode == 13){
                       e.preventDefault();
                       wpestate_login();
                     }    
                 });
         
         
                $('#wp-submit-register').click(function(){
                    wpestate_register();
                 });

                 $('#user_email_register, #user_login_register').keydown(function(e){
                     if(e.keyCode == 13){
                       e.preventDefault();
                       wpestate_register();
                     }

                 });
                 
             
         
     }   
  ///////////////////////////////////////////////////////////////////////////////////////////  
  ////////  Ajax update password
  //////////////////////////////////////////////////////////////////////////////////////////// 
       $('#oldpass,#newpass,#renewpass').keydown(function(e){
                     if(e.keyCode == 13){
                        e.preventDefault();
                        wpestate_change_pass_profile();
                     }

                 });
                 
        $('#change_pass').click(function(){
            wpestate_change_pass_profile();
        });        
     
       function wpestate_change_pass_profile(){
            var  oldpass         =  $('#oldpass').val(); 
            var  newpass         =  $('#newpass').val(); 
            var  renewpass       =  $('#renewpass').val(); 
            var  securitypass    =  $('#security-pass').val();
            var  ajaxurl         =  control_vars.admin_url+'admin-ajax.php'; 

             $.ajax({    
             type: 'POST',
             url: ajaxurl,
             data: {
                 'action'            :   'ajax_update_pass',
                 'oldpass'           :   oldpass,
                 'newpass'           :   newpass,
                 'renewpass'         :   renewpass,   
                 'security-pass'     :   securitypass
             },

             success:function(data) {
                $('#profile_pass').append('<div class="login-alert">'+data+'<div>');
                $('#oldpass,#newpass,#renewpass').val('');

             },
             error: function(errorThrown){

             }
          }); 
    }
       
  ///////////////////////////////////////////////////////////////////////////////////////////  
  ////////  update profile
  ////////////////////////////////////////////////////////////////////////////////////////////   
   
   $('#update_profile').click(function(){
       var  firstname       =  $('#firstname').val(); 
       var  secondname      =  $('#secondname').val();
       var  useremail       =  $('#useremail').val();
       var  userphone       =  $('#userphone').val();
       var  userskype       =  $('#userskype').val();
       var  usertitle       =  $('#usertitle').val();
       var  description     =  $('#userbio').val();
       var  ajaxurl         =  control_vars.admin_url+'admin-ajax.php'; 
       var  securityprofile =  $('#security-profile').val();
       var  aboutme         =  $('#about_me').val();
       var  mobile          =  $('#usermobile').val();
       var  profile_image_id  = $('#profile-image_id').val();
       var  profile_image_url  = $('#profile-image').attr('data-profileurl');
       var upload_picture = $('#profile-image').css('background-image');
       upload_picture = upload_picture.replace('url(','').replace(')','');
       
       
   
       $.ajax({    
        type: 'POST',
        url: ajaxurl,
        data: {
            'action'            :   'ajax_update_profile',
            'firstname'         :   firstname, 
            'secondname'        :   secondname, 
            'useremail'         :   useremail, 
            'userphone'         :   userphone, 
            'userskype'         :   userskype, 
            'usertitle'         :   usertitle, 
            'description'       :   description, 
            'upload_picture'    :   upload_picture,
            'profile_image_id'  :   profile_image_id,
            'profile_image_url' :   profile_image_url,
            'aboutme'           :   aboutme,
            'mobile'            :   mobile, 
            'security-profile'  :   securityprofile
        }, 
        
         success:function(data) {
           $('#profile_message').append('<div class="login-alert">'+data+'<div>');                     
        },
        error: function(errorThrown){

        }
        });  
   })
   
   function progressHandlingFunction(e){
    if(e.lengthComputable){
        $('#profile_message').attr({value:e.loaded,max:e.total});
    }
    }
     
   ///////////////////////////////////////////////////////////////////////////////////////////  
  ////////  forgot pass  ajax
  ////////////////////////////////////////////////////////////////////////////////////////////
   $('#wp-forgot-but').click(function(){
      wpestate_forgot();
  });
  
  $('#forgot_email').keydown(function(e){
      if(e.keyCode == 13){
        e.preventDefault();
         wpestate_forgot();
      }
     
  });
  
  
  
    function wpestate_forgot(){
       var  forgot_email          =  $('#forgot_email').val(); 
       var  securityforgot        =  $('#security-forgot').val();
       var  postid                =  $('#postid').val();
       var  ajaxurl               =  control_vars.admin_url+'admin-ajax.php'; 
   
        $.ajax({    
        type: 'POST',
        url: ajaxurl,
        data: {
            'action'            :   'ajax_forgot_pass',
            'forgot_email'      :   forgot_email, 
            'security-login'    :   securityforgot,
            'postid'            :   postid
        },
        
        success:function(data) {
           $('#forgot_email').val('');
           $('#forgot_pass_area').empty().append('<div class="login-alert">'+data+'<div>');            
        },
        error: function(errorThrown){
        }
     });  
    }
    
    
        
   ///////////////////////////////////////////////////////////////////////////////////////////  
  ////////  login/forgot password  actions
  ////////////////////////////////////////////////////////////////////////////////////////////  
     
     $('#forgot_pass').click(function(event){
         event.preventDefault();
         $("#login-div").hide();
         $("#forgot-pass-div").show();
      
     })
     
     $('#return_login').click(function(event){
         event.preventDefault();
         $("#forgot-pass-div").hide();
         $("#login-div").show();
    
     })
     
  ///////////////////////////////////////////////////////////////////////////////////////////  
  //////// WIDGET  login/forgot password  actions
  ////////////////////////////////////////////////////////////////////////////////////////////   
     
     
     $('#widget_register_sw').click(function(event){
        event.preventDefault();
        $('.loginwd_sidebar #login-div').hide();
        $('.loginwd_sidebar #register-div').show();    
        $('.loginwd_sidebar #login-div-title').hide();
        $('.loginwd_sidebar #register-div-title').show();  
     });
     
     
      $('#widget_login_sw').click(function(event){
        event.preventDefault();
        $('.loginwd_sidebar #register-div').hide();    
        $('.loginwd_sidebar #login-div').show();
        $('.loginwd_sidebar #register-div-title').hide();    
        $('.loginwd_sidebar #login-div-title').show();
     });
     
     
  ///////////////////////////////////////////////////////////////////////////////////////////  
  ////////  login  ajax
  ////////////////////////////////////////////////////////////////////////////////////////////
   
    $('#wp-login-but').click(function(){
      wpestate_login();
  });
  
  $('#login_pwd, #login_user').keydown(function(e){
      if(e.keyCode == 13){
        e.preventDefault();
         wpestate_login();
      }
     
  });
  
    function wpestate_login(){
       var  login_user          =  $('#login_user').val(); 
       var  login_pwd           =  $('#login_pwd').val(); 
       var  security            =  $('#security-login').val();
       var  ispop               =  $('#loginpop').val();
       var  ajaxurl             =  control_vars.admin_url+'admin-ajax.php'; 

       $('#login_message_area').empty().append('<div class="login-alert">'+control_vars.login_loading+'</div>');
        $.ajax({    
        type: 'POST',
        dataType: 'json',
        url: ajaxurl,
        data: {
            'action'            :   'ajax_loginx_form',
            'login_user'        :   login_user,
            'login_pwd'         :   login_pwd,
            'ispop'             :   ispop,
            'security-login'    :   security,
        },
        
        success:function(data) {
           $('#login_message_area').empty().append('<div class="login-alert">'+data.message+'<div>');
                     
                if (data.loggedin == true){
                  
                    if(parseInt(data.ispop) === 1){
                        control_vars.userid=data.newuser;
                        $('#ajax_login_container').remove();
                        $('#cover').remove();
                    }else{
                        document.location.href = control_vars.login_redirect;
                    }
                    
                    $('#user_not_logged_in').hide();
                    $('#user_logged_in').show();
                    
                }else{
                    $('#login_user').val(''); 
                    $('#login_pwd').val(''); 
                }
                
        },
        error: function(errorThrown){
       
        }
     });  
    }
    
  ///////////////////////////////////////////////////////////////////////////////////////////  
  ////////  WIDGET login  ajax
  ////////////////////////////////////////////////////////////////////////////////////////////
   
    $('#wp-login-but-wd').click(function(){
      wpestate_login_wd();
  });
  
  $('#login_pwd_wd, #login_user_wd').keydown(function(e){
      if(e.keyCode == 13){
        e.preventDefault();
         wpestate_login_wd();
      }
     
  });
  
    function wpestate_login_wd(){
       var  login_user          =  $('#login_user_wd').val(); 
       var  login_pwd           =  $('#login_pwd_wd').val(); 
       var  security            =  $('#security-login').val();
       var  ispop               =  $('#loginpop_wd').val();
       var  ajaxurl             =  control_vars.admin_url+'admin-ajax.php'; 




       $('#login_message_area_wd').empty().append('<div class="login-alert">'+control_vars.login_loading+'</div>');
        $.ajax({    
        type: 'POST',
        dataType: 'json',
        url: ajaxurl,
        data: {
            'action'            :   'ajax_loginx_form',
            'login_user'        :   login_user,
            'login_pwd'         :   login_pwd,
            'ispop'             :   ispop,
            'security-login'    :   security,
        },
        
        success:function(data) {
           $('#login_message_area_wd').empty().append('<div class="login-alert">'+data.message+'<div>');
                     
                if (data.loggedin == true){
                  
                    if(parseInt(data.ispop) === 1){
                        control_vars.userid=data.newuser;
                        $('#ajax_login_container').remove();
                    }else{
                        document.location.href = control_vars.login_redirect;
                    }
                    
                    $('#user_not_logged_in').hide();
                    $('#user_logged_in').show();
                    
                }else{
                    $('#login_user').val(''); 
                    $('#login_pwd').val(''); 
                }
                
        },
        error: function(errorThrown){
         
        }
     });  
    }
    
     ///////////////////////////////////////////////////////////////////////////////////////////  
  ////////  WIDGET Register ajax
  ////////////////////////////////////////////////////////////////////////////////////////////
  $('#wp-submit-register_wd').click(function(){
      wpestate_register_wd();
  });
  
  $('#user_email_register_wd, #user_login_register_wd').keydown(function(e){
      if(e.keyCode == 13){
        e.preventDefault();
        wpestate_register_wd();
      }
     
  });
  
    function wpestate_register_wd (){
       var  user_login_register =  $('#user_login_register_wd').val(); 
       var  user_email_register =  $('#user_email_register_wd').val(); 
       var  nonce               =  $('#security-register').val();
       var  ajaxurl             =   control_vars.admin_url+'admin-ajax.php'; 
       
      
        $.ajax({
        type: 'POST', 
        url: ajaxurl,
        data: {
            'action'                    :   'ajax_register_form',
            'user_login_register'       :   user_login_register,
            'user_email_register'       :   user_email_register,
            'security-register'         :   nonce
          
        },
        
        success:function(data) {
           // This outputs the result of the ajax request
           $('#register_message_area_wd').empty().append('<div class="login-alert">'+data+'</div>');
           $('#user_login_register_wd').val(''); 
           $('#user_email_register_wd').val(''); 
        },
        error: function(errorThrown){
        }
     });  
    }
    
    
    
   ///////////////////////////////////////////////////////////////////////////////////////////  
  ////////  Register ajax
  ////////////////////////////////////////////////////////////////////////////////////////////
  $('#wp-submit-register').click(function(){
      wpestate_register();
  });
  
  $('#user_email_register, #user_login_register').keydown(function(e){
      if(e.keyCode == 13){
        e.preventDefault();
        wpestate_register();
      }
     
  });
  
    function wpestate_register (){
       var  user_login_register =  $('#user_login_register').val(); 
       var  user_email_register =  $('#user_email_register').val(); 
       var  nonce               =  $('#security-register').val();
       var  ajaxurl             =   control_vars.admin_url+'admin-ajax.php'; 
       
      
        $.ajax({
        type: 'POST', 
        url: ajaxurl,
        data: {
            'action'                    :   'ajax_register_form',
            'user_login_register'       :   user_login_register,
            'user_email_register'       :   user_email_register,
            'security-register'         :   nonce
          
        },
        
        success:function(data) {
           // This outputs the result of the ajax request
           $('#register_message_area').empty().append('<div class="login-alert">'+data+'</div>');
           $('#user_login_register').val(''); 
           $('#user_email_register').val(''); 
        },
        error: function(errorThrown){
        }
     });  
    }
    
    ///////////////////////////////////////////////////////////////////////////////////////////
    /////// Property page  + ajax call on contact
    ///////////////////////////////////////////////////////////////////////////////////////////
    
    $('#agent_submit').click(function(){
        var contact_name    =   $('#agent_contact_name').val();
        var contact_email   =   $('#agent_user_email').val();
        var contact_phone   =   $('#agent_phone').val();
        var contact_coment  =   $('#agent_comment').val();
        var agent_email     =   $('#agent_email').val();
        var property_id     =   $('#agent_property_id').val();
        
        
        var nonce           =   $('#agent_property_ajax_nonce').val();
        var ajaxurl         =   control_vars.admin_url+'admin-ajax.php';
      
        
        $.ajax({
        type: 'POST', 
        dataType: 'json',
        url: ajaxurl,
        data: {
            'action'    :   'ajax_agent_contact_form',
            'name'      :   contact_name,
            'email'     :   contact_email,
            'phone'     :   contact_phone,
            'comment'   :   contact_coment,
            'agentemail':   agent_email,
            'propid'    :   property_id,
             nonce      :   nonce
        },
        success:function(data) {
           // This outputs the result of the ajax request
           if(data.sent){
                $('#agent_contact_name').val(control_vars.adv_contact_name);
                $('#agent_user_email').val(control_vars.adv_email);
                $('#agent_phone').val(control_vars.adv_phone);
                $('#agent_comment').val(control_vars.adv_comment);
           }
           $('#alert-agent-contact').empty().append(data.response);
        },
            error: function(errorThrown){ 
        }
     });       
    });
            
    
    
    
    ///////////////////////////////////////////////////////////////////////////////////////////
    /////// Advanced Search 3 + ajax call on contact
    ///////////////////////////////////////////////////////////////////////////////////////////
    
    $('#adv_contact_submit').click(function(){
        var contact_name    =   $('#adv_contact_name').val();
        var contact_email   =   $('#adv_email').val();
        var contact_phone   =   $('#adv_phone').val();
        var contact_coment  =   $('#adv_comment').val();
        var nonce           =   $('#contact_ajax_nonce').val();
        var ajaxurl         =   control_vars.admin_url+'admin-ajax.php';
      
        
        $.ajax({
        type: 'POST', 
        url: ajaxurl,
        data: {
            'action'    :   'ajax_contact_form',
            'name'      :   contact_name,
            'email'     :   contact_email,
            'phone'     :   contact_phone,
            'comment'   :   contact_coment,
             nonce      :   nonce
        },
        success:function(data) {
            // This outputs the result of the ajax request
         
           $('#replay_area').empty().append(data);
            
            if (data.indexOf("<span>") >= 0){
               $('#adv_contact_submit,#adv_search_internal_full_adv_comment,#adv_search_internal_phone,#adv_search_internal_email,#adv_search_internal_contact_name').remove();
               $('#replay_area').css({
                   'margin-top': '30%',
                   'text-align': 'center'
               });
            }else{
                // errors-  resize div
                
              
                var error_height=$('#replay_area').height();
              
                var new_height=error_height+290;
                $('#adv-contact-3').css('height',new_height+'px');
            }
        },
        error: function(errorThrown){ 
        }
     });       
    });
            
            

     $('#adv-search-header-4').click(function(){    
           
         if(adv_search4===1){
             adv_search4=0;
             $('#adv-search-4').fadeOut(50,function(){
                $('#search_wrapper').animate({
                    top:112+"px"
                    },200);
             });
              $(this).addClass('adv4_close');
         }else{
                adv_search4=1;
                $('#adv-search-4').fadeIn(50,function(){
                    $('#search_wrapper').animate({
                    top:200+"px"
                    },200);
                });    
                 $(this).removeClass('adv4_close');
              
                 infoBox.close();
         }
     });
    
    ///////////////////////////////////////////////////////////////////////////////////////////
    /////// Advanced Search 3 
    ///////////////////////////////////////////////////////////////////////////////////////////
    
    $('#adv-search-header-3,#adv-search-header-contact-3').click(function(){        
        if(adv_search3===1){
            adv_search3=0;
            open_contact_search();           
        }else{
            adv_search3=1;
            open_advaced_search();
        }     
    });
    
 
    
    function open_advaced_search(){  
            $('#adv-search-header-3').removeClass('adv3_close');
            $('#adv-search-header-contact-3').addClass('adv3_close');
            
            $('#adv-search-3').css( 'overflow','visible');
            $('#adv-search-3').animate({
                'height':272+"px",
                'padding-top':8+"px"
            },200); 
          
           
            $('#adv-contact-3').animate({
                'height':0+"px",
                'padding-top':0+"px"
            },200); 
    }
    
    function open_contact_search(){
         $('#adv-search-header-3').addClass('adv3_close');
         $('#adv-search-header-contact-3').removeClass('adv3_close');
         
         $('#adv-search-3').css( 'overflow','hidden');
         $('#adv-search-3').animate({
                'height':0+"px",
                'padding-top':0+"px"
            },200); 
            
           
            $('#adv-contact-3').animate({
                'height':277+"px",
                'padding-top':3+"px"
            },200); 
    }
    
    ///////////////////////////////////////////////////////////////////////////////////////////
    /////// Advanced Search 2 
    ///////////////////////////////////////////////////////////////////////////////////////////
    

     $('#adv-search-header-2').click(function(){   
       
         
         if(adv_search2===1){
             adv_search2=0;
             $('#adv-search-2').fadeOut(50,function(){
                $('#search_wrapper').animate({
                    top:112+"px"
                    },200);     
                  
             });           
               $(this).addClass('adv2_close');
         }else{
                adv_search2=1;
                $('#adv-search-2').fadeIn(50,function(){
                    $('#search_wrapper').animate({
                    top:200+"px"
                    },200);
                });        
                $(this).removeClass('adv2_close');
                  infoBox.close();
         }
     });
    ///////////////////////////////////////////////////////////////////////////////////////////
    /////// Advanced Search 2 
    ///////////////////////////////////////////////////////////////////////////////////////////
    
    $('#adv_5_closer').click(function(){
        if(adv_search5===1){
            adv_search5=0;
            $('#search_wrapper').animate({
                top:3+"px"
             },200);     
            
            $('#adv-search-5').animate({
                width:200+"px"              
            },200)
                    
            $('#adv_5_closer').empty().append('<i class="fa fa-chevron-down"></i>');      
            $('.adv5_label').show();
            $('.adv5_hider').hide();
        }else{
            adv_search5=1;
            $('#search_wrapper').animate({
                top:200+"px"
            },200);  
            
            $('#adv-search-5').animate({
                width:928+"px",
            },200)
            
            $('#adv_5_closer').empty().append('<i class="fa fa-chevron-up"></i>');  
            $('.adv5_label').hide();
            $('.adv5_hider').show();
            infoBox.close();
        }
        
    })
    
    
    
    ///////////////////////////////////////////////////////////////////////////////////////
    ////// Geolocation
    /////////////////////////////////////////////////////////////////////////////////////////
     
     $("#geolocation-button").hover(
            function () {
              $('#tooltip-geolocation').fadeIn();
              $('.tooltip').fadeOut("fast");
            },
            function () {
              $('#tooltip-geolocation').fadeOut();
            }
        );
     

   
     /////////////////////////////////////////////////////////////////////////////////////////
     ////// form upload
     /////////////////////////////////////////////////////////////////////////////////////////
       
      $('#form_submit_2,#form_submit_1 ').click(function(){
         window.scrollTo(0, 0);
         $('#cover').fadeIn();
         $('#upload_progress').fadeIn();
          
      });
       
       
       $('#add-new-image').click(function(){
           $('<p><label for="file">New Image:</label><input type="file" name="upload_attachment[]" id="file_featured"></p> ').appendTo('#files_area');
       })
       
       
       
      
  

   var icons_array=control_vars.hovericons;
   var hover_icons = jQuery.parseJSON(icons_array);
   
   var icons_array=control_vars.icons;
   var normal_icons = jQuery.parseJSON(icons_array);
   
     $('.checker').hover(function(){
         var imgicon    = $(this).find('img');
         var iconname   = $(this).find('input').attr('id');
         iconname=iconname.replace('_listing','');
         iconname=iconname.replace('search_','');
         imgicon.attr('src', hover_icons[iconname]);
     },function(){
         var imgicon    = $(this).find('img');
         var iconname   = $(this).find('input').attr('id');
         iconname=iconname.replace('_listing','');
         iconname=iconname.replace('search_','');
         imgicon.attr('src', normal_icons[iconname]);
     }) ;

     /////////////////////////////////////////////////////////////////////////////////////////
     ////// mouse over map tooltip
     /////////////////////////////////////////////////////////////////////////////////////////
       

        $('#googleMap').bind('mousemove', function(e){
           $('.tooltip').css({'top':e.pageY,'left':e.pageX, 'z-index':'1'});
        });
        
        setTimeout(function(){  $('.tooltip').fadeOut("fast");},10000)


     /////////////////////////////////////////////////////////////////////////////////////////
     ////// idx widget 
     /////////////////////////////////////////////////////////////////////////////////////////
     
     $('.dsidx-controls a').click(function(){
         sizeContent();         
     });

    ///////////////////////////////////////////////////////////////////////////////////////////
    /////// Search widget
    ///////////////////////////////////////////////////////////////////////////////////////////
    $('#searchform input').focus(function(){
       $(this).val(''); 
    }).blur(function(){
    
    });



    ///////////////////////////////////////////////////////////////////////////////////////////
    /////// Menu for mobile and tablets 
    ///////////////////////////////////////////////////////////////////////////////////////////  
   var build_menu ='<div id="mobile_display"> <span>Menu ...</span> <i class="fa fa-bars"></i></div> <ul id="mobile_menu">';
    $('#access a').each(function() {
        var el = $(this);
      
        
        if ($(el).parents('.sub-menu .sub-menu').length >= 1) {
            build_menu=build_menu+'<li class="second_level"><a href="'+ el.attr('href')+'">-- '+ el.text()+'</a></li>';
        }
        else if ($(el).parents('.sub-menu').length >= 1) {
             build_menu=build_menu+'<li class="first_level"><a href="'+ el.attr('href')+'">- '+ el.text()+'</a></li>';
        }
        else {
             build_menu=build_menu+'<li><a href="'+ el.attr('href')+'">'+ el.text()+'</a></li>';
        }

    });
  build_menu =build_menu+"</ul>";
  $('.header_control').append(build_menu);
  
  $('#mobile_display').click(function(){
     $('#mobile_menu').toggle('400'); 
  });
  
  
   $('#mobile_menu li').click(function(){
      var new_location=$(this).find('a').attr('href');
       window.open(new_location, '_self');
   });
  
  
  
  



    // Create the dropdown base
  /*  $('<select id="select_menu" />').appendTo('.header_control');

    // Create default option 'Go to...'
    $('<option />', {
        'selected': 'selected',
        'value': '',
        'text': 'Go to...'
    }).appendTo('#branding #select_menu');


    // Populate dropdown with menu items from main menu
    $('#access a').each(function() {
        var el = $(this);

        if ($(el).parents('.sub-menu .sub-menu').length >= 1) {
            $('<option />', {
                'value': el.attr('href'),
                'text': '-- ' + el.text()
            }).appendTo('#branding #select_menu');
        }
        else if ($(el).parents('.sub-menu').length >= 1) {
            $('<option />', {
                'value': el.attr('href'),
                'text': '- ' + el.text()
            }).appendTo('#branding #select_menu');
        }
        else {
            $('<option />', {
                'value': el.attr('href'),
                'text': el.text()
            }).appendTo('#branding #select_menu');
        }
    });

    $('#branding select').change(function() {
        window.location = $(this).find('option:selected').val();
    });
*/

    if ($('.gmap-menu').height() < 50) {
        $('.gmap-menu').css('bottom', '34px');
    }

    


    ///////////////////////////////////////////////////////////////////////////////////////////
    /////// add class for menus with children
    ///////////////////////////////////////////////////////////////////////////////////////////
    $('.sub-menu li').has('ul').addClass('haschildren');

    ///////////////////////////////////////////////////////////////////////////////////////////
    /////// control search and advanced search
    ///////////////////////////////////////////////////////////////////////////////////////////
   
 /* 
    var search_label='';
    $('.adv_search_internal input').focus(function(){
          search_label= $(this).val(); 
          $(this).val(''); 
    }).focusout(function(){
        var value_field=$(this).val();
        if (value_field===''){
             $(this).val(search_label);
        }
    });
*/ 



    $('#gmap-mobile-filters').click(function() {
        $('.gmap-menu,#closefilters').toggle(200);
        $('.gmap-menu').css('opacity','1');
        $(this).css('opacity','0');
        $(this).css( 'pointer-events','none');
        
    });

    $('#closefilters').click(function(){
        $('.gmap-menu,#closefilters').hide(200);
        $('#gmap-mobile-filters').css('opacity','1');
        $('#gmap-mobile-filters').css( 'pointer-events','auto');
    });

     if (Modernizr.mq('only all and (max-width: 960px)')){
        $('.gmap-menu').hide();
    }
 
    $('.gmap-menu').hover(function() {
        $('.gmap-menu').css('opacity','1');
     }, function() {
         if (!Modernizr.mq('only all and (max-width: 960px)')){
              $('.gmap-menu').css('opacity','0.3');
         }
         
    });



  
    ///////////////////////////////////////////////////////////////////////////////////////////
    /////// simple search action 
    ///////////////////////////////////////////////////////////////////////////////////////////
    
    var search_value;
    $('#search_map_button').click(function() {

        $('#advanced_search_map_form').hide(200);
        search_value = $('#map_simple_search').val();

        if (search_value === control_vars.searchtext2 || search_value === '') {
            // no search - show form
           
            $('#search_map_form').toggle(200);
        } else {
            // have something - submit form
            $('#header_searchform').trigger('submit');
        }
    });

    $('#closeadvanced').click(function(){
     $('#advanced_search_map_form').hide(200);
    });
    
      $('#closeadvancedmobile').click(function(){
        $('#adv-search-mobile').hide(200);
    });

    $('#map_simple_search').blur(function(){
        if (this.value === '') {
            this.value = control_vars.searchtext2;
        }
    });
    
    $('#map_simple_search').focus(function(){
        if (this.value === control_vars.searchtext2) {
            this.value = '';
        }
    });


    ///////////////////////////////////////////////////////////////////////////////////////////
    /////// advanced search action
    ///////////////////////////////////////////////////////////////////////////////////////////

    $('#advanced_search_map_button').click(function() {
        $('#advanced_search_map_form').toggle(200);
        
        
    });

   $('#advanced_search_map_button_mobile').click(function() {
        $('#adv-search-mobile').toggle(200);    
    });
  
   
   
    $( '#advanced_city' ).dropdown( {
      gutter : 40 ,
      stack : false   
    });

    $( '#advanced_area' ).dropdown( {
      gutter : 40,
      stack : false   
    });
    

    ///////////////////////////////////////////////////////////////////////////////////////////
    /////// advanced search widget
    ///////////////////////////////////////////////////////////////////////////////////////////   
    
    $( '#filter_search_action_sidebar' ).dropdown( {
    });

    $( '#filter_search_type_sidebar' ).dropdown( {               
    });
    
    $( '#advanced_city_sidebar' ).dropdown( {
    });

    $( '#advanced_area_sidebar' ).dropdown( {
    });
    
    $( '#booking_guest_widget' ).dropdown( {
    });
    
    $( '#booking_guest_shortcode' ).dropdown( {
    });
  
    ///////////////////////////////////////////////////////////////////////////////////////////
    /////// advanced search version 2
    ///////////////////////////////////////////////////////////////////////////////////////////    
    
    
    
    $( '#advanced_city_2' ).dropdown({
         gutter : 0,
         stack : false   
    });

    $( '#advanced_area_2' ).dropdown( {
        gutter : 0,
        stack : false
    });
    
    $( '#adv_categ_2' ).dropdown( {
       gutter : 0 ,
       stack : false
    });
    
    $( '#adv_actions_2' ).dropdown( {
        gutter : 0 ,
        stack : false   
    });
  
    
    
     $( '#advanced_city_2_internal' ).dropdown({
         gutter : 42,
         stack : false   
    });

    $( '#advanced_area_2_internal' ).dropdown( {
        gutter : 42,
        stack : false
    });
    
    $( '#adv_categ_2_internal' ).dropdown( {
       gutter : 42 ,
       stack : false
    });
    
    $( '#adv_actions_2_internal' ).dropdown( {
        gutter : 42 ,
        stack : false   
    });
    
    
    
    
    
    
    
    $( '#advanced_city_2_mobile' ).dropdown({
          gutter : 40,
          stack : false   
    });

    $( '#advanced_area_2_mobile' ).dropdown( {
        gutter : 40,
        stack : false
    });
    
    $( '#adv_categ_2_mobile' ).dropdown( {
       gutter : 40 ,
       stack : false
    });
    
    $( '#adv_actions_2_mobile' ).dropdown( {
        gutter : 40 ,
        stack : false   
    });
    
    
    
        
    $( '#advanced_city_2_shortcode').dropdown({
          gutter : 0,
          stack : false   
    });

    $( '#advanced_area_2_shortcode').dropdown( {
        gutter : 0,
        stack : false
    });
    
    $( '#adv_categ_2_shortcode').dropdown( {
       gutter : 0 ,
       stack : false
    });
    
    $( '#adv_actions_2_shortcode').dropdown( {
        gutter : 0 ,
        stack : false   
    });
    
    
    
    
      
    $( '#booking_guest' ).dropdown({
       gutter : 0,
       stack : false   
    });
    
    $( '#booking_guest_internal' ).dropdown({
       gutter : 40,
       stack : false   
    });
    
  
      $( '#booking_guest_mobile' ).dropdown({
       gutter : 40,
       stack : false   
    });
    
      $('.advanced_area_div li').click(function(){
          $(this).trigger('click.dropdown');
      });
    
    
    /*   */
    $('#property_city_submit').dropdown( {
        gutter : 0 ,
        stack : false   
    });
    
   $('#property_area_submit').dropdown( {
        gutter : 0 ,
        stack : false   
    });
    
    
    $('.advanced_city_div li').click(function(){           
       var selected_city=$(this).find('span').text();     
       issue_redo(selected_city,'advanced_area_div');          
    });
    
    
    
     $('.advanced_city_div_mobile li').click(function(){           
       var selected_city=$(this).find('span').text();     
       issue_redo(selected_city,'advanced_area_div_mobile');        
    });
    
     $('.sidebar_advanced_city_div li').click(function(){           
       var selected_city=$(this).find('span').text();     
       issue_redo(selected_city,'sidebar_advanced_area_div');          
    })
    
    var on_listing_advanced_city_div=0;
    
    $('.listing_advanced_city_div li').click(function(){           
       var selected_city=$(this).find('span').text();     
       on_listing_advanced_city_div=1;
       issue_redo(selected_city,'listing_advanced_area_div');  
       
    })
    
    
   $('.sidebar_advanced_area_div span,.advanced_area_2_mobile span, .advanced_area_div span, .listing_advanced_area_div span').click(function(){
    var parentspan;
    parentspan=$(this).parent();

    if( parentspan.hasClass('cd-active') && on_listing_advanced_city_div===1 ){
       parentspan.removeClass('cd-active');
       parentspan.find('ul').css("height","0px");
       on_listing_advanced_city_div=0;
    }
    
   });
    
    
    function issue_redo(selected_city,area_div){
        
        var parentcity;
        var counter=-1;
        $('.'+area_div+' div').addClass('cd-active');
       // $('.'+area_div+' div').trigger('mousedown.dropdown');
        
        $('.'+area_div+' div').click(function(){
             $('.'+area_div+' .scroller').removeAttr('style').css('top','42px');
        });
        
        selected_city=selected_city.toLowerCase();
         
         
        $('#page .'+area_div+':last li').each(function(){
            parentcity=$(this).attr('data-city').toLowerCase();
          
            if(selected_city!=='All Cities'.toLowerCase() ){               
                if(selected_city!==parentcity && parentcity!=='*'){
                   $(this).hide();
                }else{
                    counter++;
                    $(this).css('top',counter*42+'px');
                    $(this).show();
                }
            }else{   
                 counter++;
                 $(this).css('top',counter*42+'px');
                 $(this).show();
            }
       
        }) // end each
        
        
         if(selected_city!=='All Cities'.toLowerCase() ){
              $('.'+area_div+' .scroller').hide();
             
         }else{
              $('.'+area_div+' .scroller').show();
         }
        
          if(counter<6){
              $('.'+area_div+' ul').css('height',(counter+1)*42+'px');
          }else{
                $('.'+area_div+' ul').css('height','294px');
          }
          
    
    }



    ///////////////////////////////////////////////////////////////////////////////////////////
    /////// tagline link
    ///////////////////////////////////////////////////////////////////////////////////////////
    var tagline_link = null;
    $('.tagline-container').click(function() {
        tagline_link = $(this).attr('data-url');
        window.open(tagline_link, '_self');
    });

    ///////////////////////////////////////////////////////////////////////////////////////////
    /////// agent link
    ///////////////////////////////////////////////////////////////////////////////////////////
    
    var agent_link = null;
    $('.featured_agent_image').click(function() {
        agent_link = $(this).attr('data-agentlink');
       if(typeof(agent_link)!=='undefined'){
        window.open(agent_link, '_self');
       }
    });
    
    
     ///////////////////////////////////////////////////////////////////////////////////////////
    /////// latest listing widget link
    ///////////////////////////////////////////////////////////////////////////////////////////
    
    var listing_link = null;
    $('.widget_latest_internal').click(function(event) {
        event.stopPropagation();
        listing_link = $(this).attr('data-link');
        window.open(listing_link, '_self');
    });
    
    ///////////////////////////////////////////////////////////////////////////////////////////
    /////// listings link
    ///////////////////////////////////////////////////////////////////////////////////////////
    
    var figcaption_link = null;
    $('figcaption').click(function(event) {
        event.stopPropagation();
        figcaption_link = $(this).attr('data-link');
        window.open(figcaption_link, '_self');
    });
    
    $('figure').click(function(event) {
        event.stopPropagation();
        figcaption_link = $(this).attr('data-link');
        window.open(figcaption_link, '_self');
    });
    
    ///////////////////////////////////////////////////////////////////////////////////////////
    /////// resise colums on container
    ///////////////////////////////////////////////////////////////////////////////////////////
    $('.article_container').each(function() {
        var cols = $(this).find('.col').length;
        var cols_last = $(this).find('.last').length;
        if (cols_last===0){
		cols_last=1;
		}
        var rows=Math.floor(cols/cols_last);
        $(this).addClass('keeper-' + rows);
    });


    ///////////////////////////////////////////////////////////////////////////////////////////
    ///////  resise colums on compare page
    ///////////////////////////////////////////////////////////////////////////////////////////

    $('.compare_wrapper').each(function() {
        var cols = $(this).find('.compare_item_head').length;
        $(this).addClass('compar-' + cols);
    });


    ///////////////////////////////////////////////////////////////////////////////////////////
    ///////   listing filters
    ///////////////////////////////////////////////////////////////////////////////////////////
    // removed in 1.9 - filster is made by clasic input button
    /*
    $('.listing_filters input').click(function() {
        $('#form_filters').trigger('submit');
    });
    */  
    
    ///////////////////////////////////////////////////////////////////////////////////////////
    ///////   compare action
    ///////////////////////////////////////////////////////////////////////////////////////////

    $('.compare-action').click(function(e) {
        e.preventDefault();
        $('.prop-compare').show();

        var post_id = $(this).attr('data-pid');
        var post_image = $(this).attr('data-pimage');

        var to_add = '<div class="items_compare"><img src="' + post_image + '" alt="compare_thumb"><input type="hidden" value="' + post_id + '" name="selected_id[]" /></div>';
        $('div.items_compare:first-child').css('background', 'red');
        if (parseInt($('.items_compare').length,10) > 3) {
            $('.items_compare:first').remove();
        }
        $('#submit_compare').before(to_add);
        resize_post(101);

    });

    $('#submit_compare').click(function() {
        $('#form_compare').trigger('submit');
    });

    ///////////////////////////////////////////////////////////////////////////////////////////
    ///////   toogle
    ///////////////////////////////////////////////////////////////////////////////////////////

    $(".toggle").click(function() {
        if ($(this).hasClass('active')) {
            $(this).removeClass("active");
        } else {
            $(this).addClass("active");
        }

        return false;
    });

    $(".toggle").click(function() {
        
        var size_content;
        $(this).next(".toggle-content").slideToggle("400",function(){
            size_content=$(this).height();
            resize_post2(size_content);
            //alert(size_content)
        });
        
        
        
    });

    ///////////////////////////////////////////////////////////////////////////////////////////
    ///////   widget morgage calculator
    ///////////////////////////////////////////////////////////////////////////////////////////
    $('#morg_compute').click(function() {
        
        var intPayPer  = 0;
        var intMthPay  = 0;
        var intMthInt  = 0;
        var intPerFin  = 0;
        var intAmtFin  = 0;
        var intIntRate = 0;
        var intAnnCost = 0;
        var intVal     = 0;
        var salePrice  = 0;

        salePrice = $('#sale_price').val();
        intPerFin = $('#percent_down').val() / 100;

        intAmtFin = salePrice - salePrice * intPerFin;
        intPayPer =  parseInt ($('#term_years').val(),10) * 12;
        intIntRate = parseInt ($('#interest_rate').val(),10);
        intMthInt = intIntRate / (12 * 100);
        intVal = raisePower(1 + intMthInt, -intPayPer);
        intMthPay = intAmtFin * (intMthInt / (1 - intVal));
        intAnnCost = intMthPay * 12;

        $('#am_fin').html("<strong>"+control_vars.morg1+"</strong><br> " + (Math.round(intAmtFin * 100)) / 100 + " ");
        $('#morgage_pay').html("<strong>"+control_vars.morg2+"</strong><br> " + (Math.round(intMthPay * 100)) / 100 + " ");
        $('#anual_pay').html("<strong>"+control_vars.morg3+"</strong><br> " + (Math.round(intAnnCost * 100)) / 100 + " ");
        $('#morg_results').show();
        resize_post_morg(250);
    });


    function raisePower(x, y) {
        return Math.pow(x, y);
    }
    
    
    ///////////////////////////////////////////////////////////////////////////////////////////
    ///////   custom-elastslider -single page top slider
    ///////////////////////////////////////////////////////////////////////////////////////////

    $('#main-carusel').fitVids();
    $('#closer').hide();
    var sw='';
    var video_id = '';
    var video_type = '';
    var video_node = '';
    var full_img = '';
    var real_height = '';
 
    var current_pos = -1;
    var current = 0,
            $preview = $('#preview'),
            $preview_link = $('#preview_link'),
            $carouselEl = $('#main-carusel'),
            $carouselItems = $carouselEl.children(),
            carousel = $carouselEl.elastislide({
        current: current,
        minItems: 1,
        start: 0,
        easing: 'ease-in-out',
        orientation: 'horizontal',
        speed: 500,
        onClick: function(el, pos, evt) {
            current_pos = -1;
            changeImage(el, pos);
            evt.preventDefault();
        },
         onReady : function() {
            if($("#property-slider").length !== 0) {
               var newEl = $("#main-carusel li:first-child");
                changeImage( newEl, 0 );
            }
        }

    });

    sw = $('#main-carusel li:last-child');
    if(sw.hasClass('video_thumb_force')){
          $('#main-carusel').prepend(sw);
    }
  

    var post_resize=0;
    var morg_resize=0;
    real_height=0;
    //////// change image when click
 
    
    
    function changeImage(el, pos) {
        $('#video_node').remove();// remove any prev embed videos
        video_id = el.attr('data-video_id');
        video_type = el.attr('data-video_data');
        full_img = el.attr('data-preview');
        if (current_pos === -1) {
            current_pos = pos + 1;
        } else {
            current_pos = pos;
        }


        if (typeof video_id !== 'undefined') {
            $preview.hide();

            if (video_type === "vimeo") {
                video_node = '<div id="video_node" style="max-width:950px;max-height:528px;" class="video"><div class="fluid-width-video-wrapper" style="padding-top: 56.2%;" ><iframe id="player_1" src="http://player.vimeo.com/video/' + video_id + '?api=1&player_id=player_1" frameborder="0" webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen=""></iframe></div></div>';
            } else {
                video_node = '<div id="video_node" style="max-width:950px;max-height:500px;" class="video"><div class="fluid-width-video-wrapper" style="padding-top: 56.2%;" ><iframe id="player_2" title="YouTube video player" src="http://www.youtube.com/embed/' + video_id + '"  frameborder="0" allowfullscreen></iframe></div></div>';
            }
            $('#control_prev').before(video_node);
            real_height = $('#video_node').height();
            $('#img-preview').animate({"height": real_height + "px", "margin-top": "4px"});
            $('#closer').show();
            $('#control_next').css("display", "block");
            $('#control_prev').css("display", "block");
            resize_post(real_height);


        } else {
            $preview.hide();
            $preview.attr('src', full_img);
            $preview_link.attr('href', full_img);
            $('.image_loader').show();

            $preview.imagesLoaded(function() {
                real_height = $('#preview').height();       
                $('#img-preview').css({"height": real_height + "px", "margin-top": "4px"});
                $('.image_loader').hide();
                $('.image_loader').removeClass('initial_loader');              
                $preview.fadeIn('fast');
                $('#closer').show();
                $('#control_next').css("display", "block");
                $('#control_prev').css("display", "block");
                resize_post(real_height);
            });
            carousel.setCurrent(pos);
        }
           
        $carouselItems.removeClass('current-img');
        el.addClass('current-img');
    }


    $('#closer').click(function() {
        $('#video_node').slideUp();
        $('#img-preview').animate({height: "0px", "margin-top": "0px"});
        $('#video_node').remove();// remove any prev embed videos		
        $('#control_prev').css("display", "none");
        $('#control_next').css("display", "none");
        $preview.slideUp();
        $('#closer').hide();
        $('.image_loader').addClass('initial_loader');
    });



    $('#control_prev').click(function() {
        var newEl='';
        current_pos = current_pos - 1;
        if (current_pos < 1) {
            current_pos = 1;
            return;
        }
        newEl = $("#main-carusel li:nth-child(" + current_pos + ")");
        changeImage(newEl, current_pos);
    });


    $('#control_next').click(function() {
        var how_many='';
        var newEl='';
        
        current_pos = current_pos + 1;
        how_many = $('#main-carusel li').size();
        if (current_pos > how_many) {
            current_pos = how_many;
            return;
        }
        newEl = $("#main-carusel li:nth-child(" + current_pos + ")");
        changeImage(newEl, current_pos);
    });


    ///////////////////////////////////////////////////////////////////////////////////////////
    ///////   resize post
    ///////////////////////////////////////////////////////////////////////////////////////////	
    
    function resize_post(extra){
          if (post_resize===0){
                post_resize=1;
                if( jQuery('#post').attr('style')){
                    var new_post_height = jQuery('#post').height()+extra;
                    jQuery('#post').css("height", new_post_height + "px");   
                }

            }
    }
  
    function resize_post2(extra){
        var new_post_height ;
        var old_height 
        if( jQuery('#post').attr('style')){
            new_post_height =   jQuery('#post').height()+extra;
            old_height  =   jQuery('#post').height();
        
            if( new_post_height > old_height ){
                jQuery('#post').css("height", new_post_height + "px");   
            }
        
        }

            
    }

    function resize_post_morg(extra){
          if (morg_resize===0){
                morg_resize=1;
                var new_post_height = jQuery('#post').height()+extra;
                jQuery('#post').css("height", new_post_height + "px");                  
            }
    }

    ///////////////////////////////////////////////////////////////////////////////////////////
    ///////    add pretty photo
    ///////////////////////////////////////////////////////////////////////////////////////////	
    //$(" a[data-pretty='prettyPhoto']").prettyPhoto();
     $("a[rel^='prettyPhoto']").prettyPhoto();

    var mediaQuery = 'has_pretty_photo';
    if (Modernizr.mq('only screen and (max-width: 600px)') || Modernizr.mq('only screen and (max-height: 520px)')) {
        mediaQuery = 'no_pretty_photo';
        //$("a[data-pretty^='prettyPhoto']").unbind('click');
        $("a[rel^='prettyPhoto']").unbind('click');
    }

    //   pretty photo on / off
    mediaQuery = 'has_pretty_photo';

    if ((Modernizr.mq('only screen and (max-width: 600px)') || Modernizr.mq('only screen and (max-height: 520px)')) && mediaQuery === 'has_pretty_photo') {
       // jQuery("a[data-pretty='prettyPhoto']").unbind('click');
         jQuery("a[rel^='prettyPhoto']").unbind('click');
        mediaQuery = 'no_pretty_photo';
    } else if (!Modernizr.mq('only screen and (max-width: 600px)') && !Modernizr.mq('only screen and (max-height: 520px)') && mediaQuery === 'no_pretty_photo') {
        //$("a[data-pretty='prettyPhoto']").prettyPhoto();
          $("a[rel^='prettyPhoto']").prettyPhoto();
        mediaQuery = 'has_pretty_photo';
    }




function restart_js_after_ajax(){
  
     

    
       $('.compare-action').click(function(e) {
        e.preventDefault();
        $('.prop-compare').show();

        var post_id = $(this).attr('data-pid');
        var post_image = $(this).attr('data-pimage');

        var to_add = '<div class="items_compare"><img src="' + post_image + '" alt="compare_thumb"><input type="hidden" value="' + post_id + '" name="selected_id[]" /></div>';
        $('div.items_compare:first-child').css('background', 'red');
        if (parseInt($('.items_compare').length,10) > 3) {
            $('.items_compare:first').remove();
        }
        $('#submit_compare').before(to_add);
        resize_post(101);

    });

    $('#submit_compare').click(function() {
        $('#form_compare').trigger('submit');
    });
    
    $('.icon-fav').click(function(){
       var icon=$(this);
       add_remove_favorite(icon);
    });
    
    var figcaption_link = null;
    $('figcaption').click(function(event) {
        event.stopPropagation();
        figcaption_link = $(this).attr('data-link');
        window.open(figcaption_link, '_self');
    });
 
     $('#post').removeAttr('style');
     var sidebar_height=$('#primary').height();        
     var curent_height=$('#post').height();
     if (curent_height<sidebar_height){
         $('#post').height(sidebar_height+50); 
     }else{
          $('#post').removeAttr('style');
          $('#post').height(curent_height+50); 
     }
}








});




///////////////////////////////  vimeo player 
jQuery(document).ready(function($) {
    "use strict";
    var has_video;
    function addEvent(element, eventName, callback) {
        (element.addEventListener) ? element.addEventListener(eventName, callback, false) : element.attachEvent(eventName, callback, false);
    }

    function ready(player_id) {
        var froogaloop = $f(player_id);
        froogaloop.addEvent('play', function(data) {
            $('.flexslider').flexslider("pause");
        });
        froogaloop.addEvent('pause', function(data) {
            $('.flexslider').flexslider("play");
        });
    }

    var player = document.getElementById('player_1');
    if (player !== null) {
        has_video = 1;
        $f(player).addEvent('ready', ready);
    } else {
        has_video = 0;
    }

    $(".flexslider")
            .fitVids()
            .flexslider({
        slideshowSpeed: 10000,
        animation: "slide",
        pauseOnAction: true,
        touch: true,
        useCSS: false,
        animationLoop: true,
        smoothHeight: true,
        prevText: "Previous",
        nextText: "Next",
        start: function(slider) {
            $('body').removeClass('loading');
        },
        before: function(slider) {
            if (has_video !== 0) {
                //$f(player).api('pause');
            }
        }
    });






$('.scroller_controler').draggable({
    axis: 'y',
    containment: 'parent',   
    grid: [ 20,20 ], 
    drag: function() {
         dragging($(this))
    }
})


$('.scrolldown').click(function(){
    up_down_scroll( $(this) ,15 );
});

$('.scrollup').click(function(){
    up_down_scroll( $(this) ,-15 );
});

$('.cd-dropdown ul').bind('mousewheel', function (event, delta) {     
   
        var parent      =   $(this).parent();
        var scrollup    =   parent.find('.scrollup');
        var scrolldown  =   parent.find('.scrolldown');
        
        if (delta < 0) {
             up_down_scroll(scrollup ,15 );
        } else {
             up_down_scroll( scrolldown ,-15 );
        }
         event.stopPropagation();
    });




function up_down_scroll(scrollbut,value){
  var list_parent       =   scrollbut.parent().parent();
  var li_height         =   list_parent.find('li:first').height();
  var min_list_height   =   6*li_height-5;
  var max_list_height   =   list_parent.find('li').size()*li_height; 
  var my_scoller        =   list_parent.find('.scroller_controler');
  var current_top       =   parseInt ( my_scoller.css('top') , 10);
  
  current_top=current_top+value;
  
  if(current_top < 15){
      current_top = 15;
  }
 
  if(current_top > min_list_height-20){
      current_top=min_list_height-20;
  }
  
  my_scoller.css('top',current_top+'px');
  
  var new_top=(current_top*(max_list_height-min_list_height))/min_list_height;

  moving_list_elements(list_parent,li_height,new_top)
}








function dragging(scc){     
  var list_parent =scc.parent().parent();
  var li_height=list_parent.find('li:first').height();
  var min_list_height=6*li_height-5;
  var max_list_height= list_parent.find('li').size()*li_height;
  var scrPos = parseInt ( scc.css('top'),10);   
  scc.css('top',scrPos+'px');
  var new_top=(scrPos*(max_list_height-min_list_height))/min_list_height;
  moving_list_elements(list_parent,li_height,new_top)
}


function moving_list_elements(list_parent,li_height,new_top){
    var new_el_top;
    var list_pos=0;
    list_parent.find('li').each(function(){
        list_pos++; 
        new_el_top =(list_pos*li_height-new_top);
        $(this).css({'top':new_el_top});
    });
}



});