/**
 * @fileoverview

A Javascript plugin that presets interactions with primary nav and scrolling
on a single page website.

 * @author David Dales <david.c.dales@gmail.com>
 *
 * @requires jquery
 *
 * @example
   <ul class="scroll-interactor" style="position: fixed">

    <li>
      <a href="#">
        <span class="nav-home">Home</span>
      </a>
    </li>

    <li>
      <a href="#">
        <span class="nav-about">About</span>
      </a>
    </li>

    <li>
      <a href="#">
        <span class="nav-contact">Contact</span>
      </a>
    </li>

  </ul>

  <section id="home"></section>
  <section id="about"></section>
  <section id="contact"></section>
 *
 * @example
  var scrollInteractor = new ScrollInteractor({
    targets: [
      { $navLink: G('.nav-home'), $target: G('#home') },
      { $navLink: G('.nav-about'), $target: G('#about') },
      { $navLink: G('.nav-contact'), $target: G('#contact') },
    ]
  });
  scrollInteractor.init();
 */

define(['jquery'], function(G) {
  function forEach(array, callback, scope) {
    for (var i = 0; i < array.length; i++) {
      callback.call(scope, i, array[i]);
    }
  }

  var ScrollInteractor = function ScrollInteractor(options) {

    this.fixedNav = document.querySelector('.scroll-interactor');

    var defaults = {
      pageYOffset: window.pageYOffset,
      width: window.innerWidth,
      threshWidth: 1400,
      postNavScrollDisplacement: this.fixedNav.getBoundingClientRect().height,
      targets: []
    };

    this.settings = G.extend(defaults, options);

    this.init = function() {
      this.addEventListeners();
    };

    this.refresh = function() {
      var plugin = this;

      if (plugin.settings.width > plugin.settings.threshWidth) {
        plugin.settings.postNavScrollDisplacement = G('.fixed-nav').height();
        plugin.settings.pageYOffset += plugin.settings.postNavScrollDisplacement;

        var tmpTop1 = 0;
        var tmpTop2 = 0;
        var tmpTarget = {};

        // When user has hit the bottom of the page...
        if($(window).scrollTop() + $(window).height() == $(document).height()) {
          plugin.settings.targets.forEach(function(target) {
            // Find all the sections that are below the pageYOffset (scrolled) value
            if (target.top > window.pageYOffset){
              target.$navLink.addClass('current-page');
            }
          });

        // When user is not at the bottom of the page...
        } else {

          plugin.settings.targets.forEach(function(target) {
            if (!target.$target.length) {
              console.error('Target does not exist.');
            }

            // Update coordinates of target sections
            target.top = target.$target.position().top;

            tmpTop2 = target.top;

            if (!G.isEmptyObject(tmpTarget)) {
              tmpTop1 <= plugin.settings.pageYOffset && plugin.settings.pageYOffset < tmpTop2
                ? tmpTarget.$navLink.addClass('current-page')
                : tmpTarget.$navLink.removeClass('current-page');
            }

            // Set values for next itteration through loop:
            tmpTop1 = target.top;
            tmpTarget = target;
          });
        }

        // Make sure the final element is highlighted or unhighlighted properly
        if (tmpTop1 < plugin.settings.pageYOffset) {
          plugin.settings.targets[plugin.settings.targets.length - 1].$navLink.addClass('current-page');
        } else {
          plugin.settings.targets[plugin.settings.targets.length - 1].$navLink.removeClass('current-page');
        }

      } else {
        plugin.settings.postNavScrollDisplacement = 0;

        plugin.settings.targets.forEach(function(target) {
          target.$navLink.removeClass('current-page');
        });
      }
    }


    this.addEventListeners = function() {
      var plugin = this;

      window.addEventListener('resize', function(){
        plugin.settings.width = window.innerWidth;
        plugin.refresh(plugin.settings.pageYOffset, plugin.settings.width);
      });

      window.addEventListener('scroll', function(){
        plugin.settings.pageYOffset = window.pageYOffset;
        plugin.refresh(plugin.settings.pageYOffset, plugin.settings.width);
      });

      plugin.settings.targets.forEach(function(target) {
        target.$navLink.on('click', function(){
          G( 'html, body' ).animate({
            scrollTop: target.$target.offset().top - plugin.settings.postNavScrollDisplacement
          }, 500 );
        });
      });
    };
  };

  return ScrollInteractor;
});
