/*jQuery:false */
/*global Modernizr */

    
jQuery(window).resize(function() {
     "use strict";

    jQuery('#image_full').imagesLoaded(function() {
        if (Modernizr.mq('(max-width: 1200px)')) {
            var googleheight = jQuery('#image_full').height();

            if (googleheight === 0) {
                googleheight = 590;
            }
            jQuery('#googleMap').css('height', googleheight + 'px');
            jQuery('.gmap_wrapper').css('height', googleheight + 'px');
        }
    });
});



    
  //   $('#geolocation-button').hide();
  //  $('#tooltip-geolocation').hide();


jQuery(document).ready(function($) {
    "use strict";
    var googleheight;
    var window_width = jQuery(window).width();
    
    
    
    jQuery('#image_full').imagesLoaded(function() {
        if (Modernizr.mq('(max-width: 1200px)')) {
            googleheight = jQuery('#image_full').height();

            if (googleheight === 0) {
                googleheight = 590;
            }
            jQuery('#googleMap').css('height', googleheight + 'px');
            jQuery('.gmap_wrapper').css('height', googleheight + 'px');
        }
    });


    var offset_img = 0;
    var image_index = 1;
    var total_images;
    var $preview = $('#image_full');
    var img_pos ;
    var offset_gmap;
    //show or hide the google street 
    if ($('.thumbs_row').has('#gview').length > 0) {
        img_pos = 320;
        total_images = $('.thumbs_row img').length - 2;
        offset_gmap=0;

    } else {
        img_pos = 160;
        $('.image_thumbs_row').css('left', img_pos + 'px');
        total_images = $('.thumbs_row img').length - 1;
        offset_gmap=1;
    }
    offset_img = total_images - 4;


    //property gallery
    $('.thumbs_row a,#property a').click(function(event) {
        event.preventDefault();
    });
    
    
    $('.thumbs_row img').click(function() {
        var tip = $(this).attr('data-tip');
        $('.thumbs_row img').removeClass('current-thumb');
        $('#play_video').removeClass('current-thumb');
        $(this).addClass('current-thumb');

        if (tip === 'gmap') {
            $('#pictureMap').hide();
            $('#gmap-next-picture').hide();
            $('#gmap-prev-picture').hide();
            $('#gmap-next').show();
            $('#gmap-prev').show();
            
            if (Modernizr.mq('only all and (max-width: 1023px)')) {
                 $('#mobile-geolocation-button').removeClass('geohide');
                 $('#mobile-geolocation-button').show();
            }else{
                 $('#geolocation-button').removeClass('geohide');
                 $('#geolocation-button').show();
            }


            if (Modernizr.mq('(max-width: 1200px)')) {
                jQuery('#googleMap').css('height', '590px');
                jQuery('.gmap_wrapper').css('height', '590px');
            }
        }

        if (tip === 'gview') {
            $('#pictureMap').hide();
            $('#gmap-next-picture').hide();
            $('#gmap-prev-picture').hide();
            $('#gmap-next').hide();
            $('#gmap-prev').hide();
            $('#geolocation-button').addClass('geohide');
            $('#geolocation-button').hide();
            $('#tooltip-geolocation').hide();
            $('#mobile-geolocation-button').addClass('geohide').hide();
            if (Modernizr.mq('(max-width: 1200px)')) {
                jQuery('#googleMap').css('height', '590px');
                jQuery('.gmap_wrapper').css('height', '590px');
            }
        }

        if (tip === 'imag') {
            if (window_width < 1200) {
                $('#googleMap').css('height', googleheight + 'px');
            }

            image_index=$(this).index();
            $('#video_node_wrapper').remove();// remove any prev embed videos
            $('#video_node').remove();// remove any prev embed videos
            $('#pictureMap').show();
            $('#gmap-next-picture').show();
            $('#gmap-prev-picture').show();
            $('#gmap-next').hide();
            $('#gmap-prev').hide();
            $('#geolocation-button').addClass('geohide');
            $('#geolocation-button').hide();
            $('#tooltip-geolocation').hide();
            $('#mobile-geolocation-button').addClass('geohide').hide();
            var full_img = $(this).attr('data-full');
            var original_img = $(this).attr('data-original');
            $('#preview_link').attr('href', original_img);

            load_image(full_img);
        }
    });


 



    function load_image(full_img) {
        $('.image_loader').show();
        //$preview.hide();

        $('#video_node_wrapper').remove();// remove any prev embed videos
        $('#video_node').remove();// remove any prev embed videos

        $preview.attr('src', full_img);

        $preview.imagesLoaded(function() {
            if (Modernizr.mq('(max-width: 1200px)')) {

                googleheight = jQuery('#image_full').height();
                jQuery('#googleMap').css('height', googleheight + 'px');
                jQuery('.gmap_wrapper').css('height', googleheight + 'px');

            }
            $preview.show('10', function() {
                setTimeout(function() {
                    $('.image_loader').hide();
                }, 1000);
            });

        });
    }



    //property gallery
    $('#play_video').click(function() {
        var video_node,video_node_wrapper;
        $('.thumbs_row img').removeClass('current-thumb');
        $(this).addClass('current-thumb');

        $('#pictureMap').show();
        $('#gmap-next-picture').hide();
        $('#gmap-prev-picture').hide();
        $('#gmap-next').hide();
        $('#gmap-prev').hide();
        $('#geolocation-button').addClass('geohide');
        $('#geolocation-button').hide();
        $('#tooltip-geolocation').hide();
        $('#mobile-geolocation-button').addClass('geohide').hide();
            
        $('#video_node_wrapper').remove();// remove any prev embed videos
        $('#video_node').remove();// remove any prev embed videos
        var video_id = $(this).attr('data-video_id');
        var video_type = $(this).attr('data-video_data');

        if (video_type === "vimeo") {
            video_node = '<div id="video_node" style="max-width:801px;max-height:450px;" class="video"><div class="fluid-width-video-wrapper" style="padding-top: 56.2%;" ><iframe id="player_1" src="http://player.vimeo.com/video/' + video_id + '?api=1&player_id=player_1"  webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen=""></iframe></div></div>';
        } else {
            video_node = '<div id="video_node" style="max-width:801px;max-height:450px;" class="video"><div class="fluid-width-video-wrapper" style="padding-top: 56.2%;" ><iframe id="player_2" title="YouTube video player" src="http://www.youtube.com/embed/' + video_id + '"   allowfullscreen></iframe></div></div>';
        }

        video_node_wrapper = '<div id="video_node_wrapper"></div>';
        $('#image_full').before(video_node);
        $('#image_full').before(video_node_wrapper);


        // adjust play area size
        if (Modernizr.mq('(max-width: 1200px)')) {
            var video_height = window_width / 1.78;
            $('#googleMap').css('height', video_height + 'px');
            $('.gmap_wrapper').css('height', video_height + 'px');
        }
    });



    // next image 
    $('#gmap-next-picture').click(function() {
        var next_image,full_img,original_img;
           
        $('#video_node_wrapper').remove();// remove any prev embed videos
        $('#video_node').remove();// remove any prev embed videos
        image_index++;
        if (image_index > total_images) {
            image_index = total_images;
        }else{
            next_image = $('.image_thumbs_row img:eq(' + (image_index-1) + ')');
            $('.thumbs_row img').removeClass('current-thumb');
            $('#play_video').removeClass('current-thumb');
            next_image.addClass('current-thumb');
            full_img = next_image.attr('data-full');
            original_img = next_image.attr('data-original');
            $preview.attr('src', full_img);
            $('#preview_link').attr('href', original_img);

            load_image(full_img);
            if (total_images > 4 ) {
                if (offset_img >= 0+offset_gmap) {
                    offset_img--;
                    img_pos = img_pos - 160;
                    $('.image_thumbs_row').animate({'left': img_pos}, 500);
                }
            }
        }
    });



    // prev image 
    $('#gmap-prev-picture').click(function() {
        var next_image,full_img,original_img;
        
        $('#video_node_wrapper').remove();// remove any prev embed videos
        $('#video_node').remove();// remove any prev embed videos
        image_index--;
        if (image_index < 1) {
            image_index = 1;
        }
        else{
            next_image = $('.image_thumbs_row img:eq(' + (image_index-1) + ')');
            $('.thumbs_row img').removeClass('current-thumb');
            $('#play_video').removeClass('current-thumb');
            next_image.addClass('current-thumb');
            full_img = next_image.attr('data-full');
            original_img = next_image.attr('data-original');
            $preview.attr('src', full_img);
            $('#preview_link').attr('href', original_img);
            load_image(full_img);

             if (total_images > 4) {
                if (total_images !== 4 + offset_img) {
                    offset_img++;
                    img_pos = img_pos + 160;
                    $('.image_thumbs_row').animate({'left': img_pos}, 500);
                }
            }
        }
    });




    // sliding menu
    var first_block=0;
    $(window).scroll(function() {
        var new_top,menu_offset;
        if ($(this).scrollTop() > 200) {

            new_top = $(this).scrollTop() + 105 - 420;
            if (new_top < 105) {
                new_top = 105;
            }
            var p = $(".anchor-bord");
            var position = p.offset();
            var b=$('#menu_stopper');
            var breadx=b.offset();    
            $(".anchor-bord li:first-child").val(position.top);       
            menu_offset=position.top+205+100;
            if(menu_offset<breadx.top){           
                 $('.anchor-bord').css('top', new_top + 'px');
            }else{
                if(first_block===0){
                    first_block=new_top;
                }        
            }

          if(new_top<first_block){
               $('.anchor-bord').css('top', new_top + 'px');
           }    
        }
    });


// end jquery
});