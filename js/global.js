/*-------------------------------------------------------------------------------------------------------------------------------*/
/*This is main JS file that contains custom style rules used in this template*/
/*-------------------------------------------------------------------------------------------------------------------------------*/
/* Template Name: "Modesto"*/
/* Version: 1.0 Initial Release*/
/* Build Date: 06-02-2016*/
/* Author: LionStyle*/
/* Website: http://moonart.net.ua/modesto/ 
/* Copyright: (C) 2016 */
/*-------------------------------------------------------------------------------------------------------------------------------*/

/*--------------------------------------------------------*/
/* TABLE OF CONTENTS: */
/*--------------------------------------------------------*/
/* 01 - VARIABLES */
/* 02 - page calculations */
/* 03 - function on document ready */
/* 04 - function on page load */
/* 05 - function on page resize */
/* 06 - function on page scroll */
/* 07 - swiper sliders */
/* 08 - buttons, clicks, hovers */


$(function() {

    "use strict";

    /*================*/
    /* 01 - VARIABLES */
    /*================*/
    var swipers = [], winW, winH, winScr, footerTop, _isresponsive, _ismobile = navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i);

    /*========================*/
    /* 02 - page calculations */
    /*========================*/
    function pageCalculations(){
        winW = $(window).width();
        winH = $(window).height();
        footerTop = ($('footer').length)?$('footer').offset().top : 0;
        if($('.portfolio-detail-related-entry').length) footerTop = $('.portfolio-detail-related-entry').offset().top;
        if($('.is-mobile').is(':visible')) _isresponsive = true;
        else _isresponsive = false;
        $('.page-height').css({'height':winH, 'min-height':(winH<480)?480:winH});
        if(winH<=600) $('body').addClass('min-height');
        else $('body').removeClass('min-height');
        $('.rotate').each(function(){
            $(this).css({'width':$(this).parent().height()});
        });

        /*flex align - fix IE*/
        if(!_isresponsive){
            $('.flex-js').each(function(){
                if(winH<$(this).height()){
                    $(this).css('height','100%');    
                }else{
                    $(this).css('height',winH); 
                }
            });
        }   
        /*flex align - fix IE*/
    }

    /*=================================*/
    /* 03 - function on document ready */
    /*=================================*/
            $('.fancy_title').each(function(){
                var str = $(this).text(), regex1 = /\S+/g, regex2 = /./g;
              var result = str.replace(regex1, function(a) {
               a = a.replace(regex2, function(a) {
                   return "<span>" + a + "</span>";
               });
                  return "<span class='word'>" + a + "</span>";
              });
              $(this).html(result);
             });

            setTimeout(function(){
                //loader
                $('#loader-wrapper').fadeOut();
                //progress bar
                if($('.progress-wrapper').length){
                 $('.progress-wrapper').viewportChecker({
                  classToAdd: 'counted',
                  offset: 100,
                  callbackFunction: function(elem, action){
                   elem.find('.count').countTo();
                   
                   elem.find('.progress-block').not('.counted').each(function(){
                    $(this).addClass('counted');
                    var $progress_bar = $(this).find('.progress-bar')
                    var speed = parseInt($progress_bar.attr("data-speed"));
                    var to = $progress_bar.attr("data-to");   
                    $progress_bar.animate({width: to+"%"}, {duration: speed});     
                   });   
                  }  
                 });
             }
            },2000);


            /*skill circle*/
            if($('.circle').length > 0){
                $("#circle-75").circliful({
                    animateInView: true,
                    animationStep: 5,
                    foregroundBorderWidth: 4,
                    backgroundBorderWidth: 4,
                    percent: 75,
                    fontColor: '#222',
                    foregroundColor: '#95a55e',
                    backgroundColor:'#fff',
                    percentageTextSize: 20,
                });
                $("#circle-81").circliful({
                    animateInView: true,
                    animationStep: 5,
                    foregroundBorderWidth: 4,
                    backgroundBorderWidth: 4,
                    percent: 81,
                    fontColor: '#222',
                    foregroundColor: '#95a55e',
                    backgroundColor:'#fff',
                    percentageTextSize: 20,
                });
                $("#circle-100").circliful({
                    animateInView: true,
                    animationStep: 5,
                    foregroundBorderWidth: 4,
                    backgroundBorderWidth: 4,
                    percent: 100,
                    fontColor: '#222',
                    foregroundColor: '#95a55e',
                    backgroundColor:'#fff',
                    percentageTextSize: 20,
                });
                $("#circle-82").circliful({
                    animateInView: true,
                    animationStep: 5,
                    foregroundBorderWidth: 4,
                    backgroundBorderWidth: 4,
                    percent: 82,
                    fontColor: '#222',
                    foregroundColor: '#95a55e',
                    backgroundColor:'#fff',
                    percentageTextSize: 20,
                });
            }


    $('.input').each(function(){
        if($(this).val()!=='') $(this).parent().addClass('focus');
    });
    if(_ismobile) $('body').addClass('mobile');
    pageCalculations();

    /*============================*/
    /* 04 - function on page load */
    /*============================*/
    $(window).load(function(){

        
        $('.fixed-menu .nav-fix-a').each(function(){
             var index_start = $('.fixed-menu .nav-fix-a').index(this);
             if($(this).attr('data-link') ===  window.location.hash){
                $('.fixed-menu .nav-fix-a').eq(index_start).click();
             }
        });

        initSwiper();

        $('body').addClass('loaded');
            setTimeout(function(){
                pageCalculations();
                scrollCall();
            },0);

        /*masonry*/
        if($('.sorting-container').length > 0){
        var $container = $('.sorting-container').isotope({
            itemSelector: '.sorting-item',
            masonry: {
                columnWidth: '.grid-sizer'
            }
        });
        $('.sorting-menu a').click(function() {
            if($(this).hasClass('active')) return false;
            $(this).parent().parent().find('.active').removeClass('active');
            $(this).addClass('active');
            $(this).closest('.sorting-menu').find('.responsive-filtration-title .text').text($(this).text());
            var filterValue = $(this).attr('data-filter');
            $container.isotope({ filter: filterValue });
        });
        }

        /*lightbox*/
        if($('.lightbox').length > 0){
            $(function(){
                var lightbox = $('.lightbox').simpleLightbox({
                    disableScroll: false
                });
            });
        }

    });


    /*==============================*/
    /* 05 - function on page resize */
    /*==============================*/
    function resizeCall(){
        pageCalculations();
    }
    if(!_ismobile){
        $(window).resize(function(){
            resizeCall();
        });
    } else{
        window.addEventListener("orientationchange", function() {
            resizeCall();
        }, false);
    }

    /*==============================*/
    /* 06 - function on page scroll */
    /*==============================*/
    $(window).scroll(function(){

            /*for presentation*/
            if($('.container-full').length > 0){
            if($(window).scrollTop()>=$('.container-full').offset().top){
                $('.container-full').addClass('active');
            }else{
                $('.container-full').removeClass('active');
            }
        }

    });

    function scrollCall(){
        winScr = $(window).scrollTop();
        if(winScr>((winW>=992)?100:50)) $('header.fixed').addClass('scrolled');
        else $('header.fixed').removeClass('scrolled');
        if($('.homepage-4-slider-navigation').length){
            if(winScr + winH - 115 >= footerTop) $('.homepage-4-slider-navigation .rotate').css({'margin-top': (-1)*(winScr + winH - footerTop -115)});
            else $('.homepage-4-slider-navigation .rotate').css({'margin-top':'0px'});
        }
    }

    /*=====================*/
    /* 07 - swiper sliders */
    /*=====================*/

    function initSwiper(){
        var initIterator = 0;
        $('.swiper-container').each(function(){                               
            var $t = $(this);                                 

            var index = 'swiper-unique-id-'+initIterator;

            $t.addClass('swiper-'+index+' initialized').attr('id', index);
            $t.find('.swiper-pagination').addClass('swiper-pagination-'+index);

            if($t.find('.swiper-button').length>=1){
                $t.find('.swiper-button-prev').addClass('swiper-button-prev-'+index);
                $t.find('.swiper-button-next').addClass('swiper-button-next-'+index);
            }else if($t.parent().find('.swiper-button').length>=1){
                $t.parent().find('.swiper-button-prev').addClass('swiper-button-prev-'+index);
                $t.parent().find('.swiper-button-next').addClass('swiper-button-next-'+index);
            }

            if($t.find('.swiper-slide').length<=1) $('.slider-click[data-pagination-rel="'+$t.data('pagination-rel')+'"]').addClass('disabled');

            var slidesPerViewVar = ($t.data('slides-per-view'))?$t.data('slides-per-view'):1,
                loopVar = ($t.data('loop'))?parseInt($t.data('loop'), 10):0;
            if(slidesPerViewVar!='auto') slidesPerViewVar = parseInt(slidesPerViewVar, 10);

            swipers['swiper-'+index] = new Swiper('.swiper-'+index,{
                pagination: '.swiper-pagination-'+index,
                paginationClickable: true,
                nextButton: '.swiper-button-next-'+index,
                prevButton: '.swiper-button-prev-'+index,
                slidesPerView: slidesPerViewVar,
                autoHeight: ($t.data('auto-height'))?parseInt($t.data('auto-height'), 10):0,
                loop: loopVar,
                autoplay: ($t.data('autoplay'))?parseInt($t.data('autoplay'), 10):0,
                centeredSlides: ($t.data('center'))?parseInt($t.data('center'), 10):0,
                breakpoints: ($t.data('breakpoints'))? { 767: { slidesPerView: parseInt($t.attr('data-xs-slides'), 10) }, 991: { slidesPerView: parseInt($t.attr('data-sm-slides'), 10) }, 1199: { slidesPerView: parseInt($t.attr('data-md-slides'), 10) } } : {},
                initialSlide: ($t.data('ini'))?parseInt($t.data('ini'), 10):0,
                watchSlidesProgress: true,
                speed: ($t.data('speed'))?parseInt($t.data('speed'), 10):500,
                parallax: ($t.data('parallax'))?parseInt($t.data('parallax'), 10):0,
                slideToClickedSlide: true,
                keyboardControl: true,
                mousewheelControl: ($t.data('mousewheel'))?parseInt($t.data('mousewheel'), 10):0,
                mousewheelReleaseOnEdges: true,
                spaceBetween: ($t.data('space'))?parseInt($t.data('space'), 10):0,
                direction: ($t.data('direction'))?$t.data('direction'):'horizontal',
                onProgress: function(swiper, progress){
                    watchSwiperProgress($t,swiper,swiper.activeIndex);
                },
                onSlideChangeStart: function(swiper){
                    var activeIndex = (loopVar===1)?swiper.activeLoopIndex:swiper.activeIndex;
                    watchSwiperProgress($t,swiper,activeIndex);
                },
                onTransitionEnd: function(swiper){
                    var activeIndex = (loopVar===1)?swiper.activeLoopIndex:swiper.activeIndex;
                    if($('.slider-click[data-pagination-rel="'+$t.data('pagination-rel')+'"]').length){
                        var updateLeftNum = $('.slider-click.left[data-pagination-rel="'+$t.data('pagination-rel')+'"]'),
                            updateRightNum = $('.slider-click.right[data-pagination-rel="'+$t.data('pagination-rel')+'"]');
                        if(loopVar!=1){
                            if(activeIndex<1) updateLeftNum.addClass('disabled');
                            else updateLeftNum.removeClass('disabled').find('.left').text(activeIndex);
                            if(activeIndex+2>swiper.slides.length) updateRightNum.addClass('disabled');
                            else updateRightNum.removeClass('disabled').find('.left').text(activeIndex+2);
                            updateLeftNum.find('.preview-entry.active').removeClass('active');
                            updateLeftNum.find('.preview-entry[data-rel="'+(activeIndex-1)+'"]').addClass('active');
                            updateRightNum.find('.preview-entry.active').removeClass('active');
                            updateRightNum.find('.preview-entry[data-rel="'+(activeIndex+1)+'"]').addClass('active');
                        }
                    }
                    //slider number change
                    // $('.prev-slide').text(activeIndex);
                    // if(activeIndex===0){
                    //     $('.prev-slide').text(1);
                    // }
                    // $('.next-slide').text(activeIndex+2);
                    // if(activeIndex===$('.left-right .swiper-container .swiper-slide').length-1){
                    //     $('.next-slide').text(activeIndex+1);
                    // }
                }
            });
            swipers['swiper-'+index].update();
            initIterator++;
        });
        $('.swiper-container.swiper-control-top-js').each(function(){
            swipers['swiper-'+$(this).attr('id')].params.control = swipers['swiper-'+$(this).closest('.swipers-couple-wrapper').find('.swiper-control-bottom-js').attr('id')];
        });
        $('.swiper-container.swiper-control-bottom-js').each(function(){
            swipers['swiper-'+$(this).attr('id')].params.control = swipers['swiper-'+$(this).closest('.swipers-couple-wrapper').find('.swiper-control-top-js').attr('id')];
        });

    }


    function watchSwiperProgress(container, swiper, index){
        if($('.homepage-1-backgrounds[data-pagination-rel="'+container.data('pagination-rel')+'"]').length){
            $('.homepage-1-backgrounds .entry.active').removeClass('active');
            $('.homepage-1-backgrounds .entry[data-rel='+index+']').addClass('active');
        }
        if($('.slider-click-label[data-pagination-rel="'+container.data('pagination-rel')+'"]').length){
            $('.slider-click-label[data-pagination-rel="'+container.data('pagination-rel')+'"]').removeClass('active prev next');
            $('.slider-click-label[data-pagination-rel="'+container.data('pagination-rel')+'"][data-slide-to="'+index+'"]').addClass('active');
        }
        if($('.pagination-slider-wrapper[data-pagination-rel="'+container.data('pagination-rel')+'"]').length){
            var foo = $('.pagination-slider-wrapper[data-pagination-rel="'+container.data('pagination-rel')+'"]');
            foo.css({'top':(-1)*parseInt(foo.find('.active').attr('data-slide-to'), 10)*foo.parent().height()});
        }        
    }

    var slide_index = 1;
    $('.all-slides').text($('.left-right .swiper-container.my-bg-swiper .swiper-slide').length);
    $('.prev-slide').text(slide_index);
    $('.next-slide').text(slide_index+1);

    $('.slider-click.left').on('click', function(){
        if($(this)[0].hasAttribute('data-pagination-rel')){
            swipers['swiper-'+$('.swiper-container[data-pagination-rel="'+$(this).data('pagination-rel')+'"]').attr('id')].slidePrev();
            $(this).find('.preview-entry').removeClass('active');
        }
    });

    $('.slider-click.right').on('click', function(){
        if($(this)[0].hasAttribute('data-pagination-rel')){
            swipers['swiper-'+$('.swiper-container[data-pagination-rel="'+$(this).data('pagination-rel')+'"]').attr('id')].slideNext();
            $(this).find('.preview-entry').removeClass('active');
        }
    });

    $('.slider-click-label').on('click', function(){
        swipers['swiper-'+$('.swiper-container[data-pagination-rel="'+$(this).data('pagination-rel')+'"]').attr('id')].slideTo($(this).data('slide-to'));
    });




    /*==============================*/
    /* 08 - buttons, clicks, hovers */
    /*==============================*/

    //open overlay popup
    $('.open-overlay').on('click', function(){
        var $this = $(this);
        $('.overlay[data-rel="'+$(this).data('rel')+'"]').addClass('active');
        if($(this).hasClass('open-video')) setTimeout(function(){$('.overlay[data-rel="'+$this.data('rel')+'"] iframe').attr('src', $this.data('src'));}, 500);
        if(_ismobile) setTimeout(function(){$('html').addClass('overflow-hidden');}, 500);
    });

    //close overlay popup
    $('.overlay .button-close').on('click', function(){
        $(this).closest('.video-popup').find('iframe').attr('src', '');
        if($('.overlay.active').length===1) $('html').removeClass('overflow-hidden');
        $(this).closest('.overlay').removeClass('active');
    });

    //toggle side navigation
    $('.open-navigation, header .close-layer').on('click', function(){
        $('body').toggleClass('open-menu');
        $('header .close-layer').toggleClass('active');
    });

    //responsive menu nested lists
    $('.toggle-icon').on('click', function(){
        $(this).toggleClass('active').next().slideToggle().prev().prev().toggleClass('selected');
    });

    //input animations on focus
    $('.input').on('focus', function(){
        $(this).parent().addClass('focus');
    });

    $('.input').on('blur', function(){
        if($(this).val()==='') $(this).parent().removeClass('focus');
    });

    //index 6 mousewheel event on slider captions
    $('.pagination-slider-wrapper').on('mousewheel', function(event) {      
        if(event.deltaY>0) {
            swipers['swiper-'+$('.swiper-container[data-pagination-rel="'+$(this).find('.slider-click-label').data('pagination-rel')+'"]').attr('id')].slidePrev();
        }
        else{
            swipers['swiper-'+$('.swiper-container[data-pagination-rel="'+$(this).find('.slider-click-label').data('pagination-rel')+'"]').attr('id')].slideNext();
        }
    });

    //index 9 mousewheel event on slider
    $('.boxgallery').on('mousewheel', function(event) {     
        event.preventDefault();
        if(event.deltaY>0) {
            $(this).find('.slider-click.left').click();
        }
        else{
            $(this).find('.slider-click.right').click();
        }
    });

    //click on button, that scrolls page
    $('.scroll-button').on('click', function(){
        $('body, html').animate({'scrollTop':($('.full-size-banner-entry, .full-size').height())});
        return false;
    });


    //responsive filtration block
    $('.responsive-filtration-title').on('click', function(){
        $(this).toggleClass('active');
    });

    //article likes click
    $('.article-likes-title').on('click', function(){
        $(this).toggleClass('active');
    });

    //tabulation
    $('.tab-menu').on('click', function() {
        if($(this).hasClass('active')) return false;
        var $this = $(this);
        $(this).parent().parent().find('.active').removeClass('active');
        $(this).addClass('active');
        $(this).closest('.sorting-menu').find('.responsive-filtration-title .text').text($(this).text());
        $('.tab-entry[data-tab-menu="'+$this.data('tab-menu')+'"]:visible').animate({'opacity':'0'}, function(){
            $(this).hide();
            var tab = $('.tab-entry[data-tab-menu="'+$this.data('tab-menu')+'"][data-tab="'+$this.data('tab')+'"]');
            tab.show();
            tab.animate({'opacity':'1'});
            swipers['swiper-'+tab.find('.swiper-container').attr('id')].update();
        });
    });

    $('.nice-slider-container .swiper-button-next').on('click', function(){

    });


    /*==============================*/
    /* 09 - Bloom */
    /*==============================*/
    var scroll_index = 0;

//portfolio menu
    var nav_index  = 0;
    $('.nav-a').on('click', function(){
        nav_index = $('.nav-a').index(this);
        $('.nav-a').removeClass('active');
        $(this).addClass('active');
        $('.my-multi-swiper').removeClass('active');
        $('.my-multi-swiper').eq(nav_index).addClass('active');
        return false;
    });

//portfolio drop-menu
     $('.drop-menu').on('click', function(){
        if($(this).hasClass('active')){
            $(this).removeClass('active');
            $('.drop-list').removeClass('active');
            $('#portfolioCaret').addClass('fa-angle-down');
            $('#portfolioCaret').addClass('fa-angle-up');
        }else{
            $(this).addClass('active');
            $('.drop-list').addClass('active');
            $('#portfolioCaret').addClass('fa-angle-up');
            $('#portfolioCaret').removeClass('fa-angle-down');
        }
        return false;
    });
    
//portfolio drop-menu: active nav-a
    $('.nav-a').on('click', function(){
        if($('.drop-menu').hasClass('active')){ //for responsive only
            $('.drop-menu').html($(this).html()+' <i id="portfolioCaret" class="fa fa-angle-up" aria-hidden="true"></i></a>');
        } 
    });

   
    /*window scroll*/

//top-menu
var stop_scroler = 0;
    var scroll_hover = 1;
    $(window).scroll(function() {
        scrollCall();
        
        
        if ($(this).scrollTop() > 30){  
            $('.header-style').addClass('scrolled');
        }
        else{
            $('.header-style').removeClass('scrolled');
        }
        
    });



//pages scroll (.nav-fix-a; .scroll-animate)

var scrollingAnimate = 0;

$('.nav-fix-a').on('click', function(){
    if(scrollingAnimate) return false;
  scrollingAnimate = 1;
    var index = $(this).parent().find('.nav-fix-a').index(this);
    $('body, html').animate({'scrollTop':$('.scroll-animate').eq(index).offset().top}, function(){scrollingAnimate = 0;});
  $(this).addClass('active').parent().find('.active').not(this).removeClass('active');
  window.location.hash = $(this).attr('data-link');
});

$('.scroll-animate').on('mousewheel', function(event) {
    if(!_isresponsive){
        var thisH = $(this).height(),
            winH = $(window).height(),
        thisTop = $(this).offset().top,
        winScr = $(window).scrollTop();

        if(event.deltaY<0) {
            if(thisH>winH && (thisH+thisTop)>(winH+winScr)){
        
            }
            else{
                if($('.nav-fix-a.active').next().hasClass('nav-fix-a')){
                    event.preventDefault();
                    $('.nav-fix-a.active').next().click();
                }
            
          }
        }
        else {
            if(thisH>winH && (thisTop)<(winScr)){
        
            }
            else{
                event.preventDefault();
                if(thisTop<winScr) $('.nav-fix-a.active').click();
                else $('.nav-fix-a.active').prev().click();
          }
        }
    }     
});

var  stop_out;
       
$.fn.scrollStopped = function(callback) {
    if(!_isresponsive){      
        $(this).scroll(function(){
            var self = this, $this = $(self);
            if ($this.data('scrollTimeout')) {
                stop_out = $this.data('scrollTimeout');
                clearTimeout($this.data('scrollTimeout'));
            }
            $this.data('scrollTimeout', setTimeout(callback,500,self));
        });
    }
};
var index_h_s = 0;

$(window).scrollStopped(function(){
    if(!_isresponsive){
        $('.scroll-animate').each(function(index, element){
            if($(element).offset().top<($(window).scrollTop()+$(window).height()*0.5) && ($(this).height()+$(this).offset().top) > ($(window).scrollTop()+$(window).height()*0.5)){
                if(!$('.nav-fix-a').eq(index).hasClass('active'))$('.nav-fix-a').eq(index).click();
            }
        });
    }
});


    //overlay hamburger-icon
    $('.hamburger-icon').on('click', function(){
        $('.overlay-wrapper').addClass('active');
    });
    //overlay btn-close
    $('.btn-close').on('click', function(){
        $('.overlay-wrapper').removeClass('active');
    });
    
    //overlay plus
   $('.dropdown-plus span').on('click', function(){
        var overmenu_index = $('.dropdown-plus span').index(this);
        if($('.dropdown-plus').eq(overmenu_index).hasClass('active clicked')){
            $('.dropdown-plus').eq(overmenu_index).removeClass('active clicked');
        } else{
            $('.dropdown-plus').eq(overmenu_index).addClass('active clicked'); 
        }
    });

    
    /*input-style*/
    $('.input-style input').on('focus',function(){
        var input_index = $('.input-style input').index(this);
         $('.input-style').eq(input_index).addClass('focus');
         return false;
     });
    $('.input-style input').on('focusout',function(){
        var input_index = $('.input-style input').index(this);
        if($(this).val()==""){
            $('.input-style').eq(input_index).removeClass('focus');
        }
         return false;
    });

    /*textarea-style*/
    $('.textarea-style textarea').on('focus',function(){
        var input_index = $('.textarea-style textarea').index(this);
         $('.textarea-style').eq(input_index).addClass('focus');
         return false;
    });

    $('.textarea-style textarea').on('focusout',function(){
        var input_index = $('.textarea-style textarea').index(this);
        if($(this).val()==""){
            $('.textarea-style').eq(input_index).removeClass('focus');
        }
         return false;
    });

    /*accordion*/
    $('.tt-accordion-title').on( 'click', function() {
        if($(this).hasClass('active')){
            $(this).siblings('.tt-accordion-body').slideUp();
            $(this).removeClass('active');
        } else{
            $(this).closest('.tt-accordion').find('.tt-accordion-title.active').removeClass('active');
            $(this).closest('.tt-accordion').find('.tt-accordion-body').slideUp('slow');
            $(this).toggleClass('active');
            $(this).siblings('.tt-accordion-body').slideToggle('slow');
        }
    });

    /*quote-nav click*/
    $('.quote-nav').on( 'click', function() {
        var quote_index = $('.quote-nav').index(this);
        $('.quote-nav').removeClass('active');
        $(this).addClass('active');
        $(this).closest('.quote').find('article.active').removeClass('active');
        $(this).closest('.quote').find('article').eq(quote_index).addClass('active')
    });

    //our models category
    var category_index  = 0;
    $('.category-mod').on('click', function(){
        category_index = $('.category-mod').index(this);
        $('.category-mod').removeClass('active');
        $(this).addClass('active');

        var toggle_text = $(this).attr('data-text');
        $('.category-toggle span').text(toggle_text);

        $('.swiper-style-10').removeClass('active');
        $('.swiper-style-10').eq(category_index).addClass('active');
        return false;
    });

    /*category-toggle*/
    // $('.category-toggle').on( 'click', function() {
    //     $(".category").slideToggle(300);
    //     if($(this).hasClass('active')){
    //         $(this).removeClass('active');
    //     } else $(this).addClass('active');
    // });
    $('.category-toggle').on( 'click', function() {
        $(".category").slideToggle(300);
        if($(this).hasClass('active')){
            $(this).removeClass('active');
        } else $(this).addClass('active');
    });





});