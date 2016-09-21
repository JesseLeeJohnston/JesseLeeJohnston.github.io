// Smooth State Router
$(function(){
  'use strict';
  var $page = $('#main'),
      options = {
        debug: true,
        prefetch: true,
        cacheLength: 2,
        onStart: {
          duration: 250, // Duration of our animation
          render: function ($container) {
            // Add your CSS animation reversing class
            $container.addClass('is-exiting');
            // Restart your animation
            smoothState.restartCSSAnimations();
          }
        },
        onReady: {
          duration: 0,
          render: function ($container, $newContent) {
            // Remove your CSS animation reversing class
            $container.removeClass('is-exiting');
            // Inject the new content
            $container.html($newContent);
          }
        },
          onAfter: function($container) {
            $container.onPageLoad();
        }
      },
      smoothState = $page.smoothState(options).data('smoothState');
});

// MOBILE NAV BEGINS
(function($) {
    $.fn.onPageLoad = function() {
      // browser window scroll (in pixels) after which the "menu" link is shown
      var offset = -1;

      var navigationContainer = $('#cd-nav'),
        mainNavigation = navigationContainer.find('#cd-main-nav ul');

      //hide or show the "menu" link
      checkMenu();
      $(window).scroll(function(){
        checkMenu();
      });

      //open or close the menu clicking on the bottom "menu" link
      $('.cd-nav-trigger').on('click', function(){
        $(this).toggleClass('menu-is-open');
        //we need to remove the transitionEnd event handler (we add it when scolling up with the menu open)
        mainNavigation.off('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend').toggleClass('is-visible');

      });

      function checkMenu() {
        if( $(window).scrollTop() > offset && !navigationContainer.hasClass('is-fixed')) {
          navigationContainer.addClass('is-fixed').find('.cd-nav-trigger').one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(){
            mainNavigation.addClass('has-transitions');
          });
        } else if ($(window).scrollTop() <= offset) {
          //check if the menu is open when scrolling up
          if( mainNavigation.hasClass('is-visible')  && !$('html').hasClass('no-csstransitions') ) {
            //close the menu with animation
            mainNavigation.addClass('is-hidden').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
              //wait for the menu to be closed and do the rest
              mainNavigation.removeClass('is-visible is-hidden has-transitions');
              navigationContainer.removeClass('is-fixed');
              $('.cd-nav-trigger').removeClass('menu-is-open');
            });
          //check if the menu is open when scrolling up - fallback if transitions are not supported
          } else if( mainNavigation.hasClass('is-visible')  && $('html').hasClass('no-csstransitions') ) {
              mainNavigation.removeClass('is-visible has-transitions');
              navigationContainer.removeClass('is-fixed');
              $('.cd-nav-trigger').removeClass('menu-is-open');
          //scrolling up with menu closed
          } else {
            navigationContainer.removeClass('is-fixed');
            mainNavigation.removeClass('has-transitions');
          }
        } 
      }  
    };
}(jQuery));

$(document).ready(function() {
    $('body').onPageLoad();
});