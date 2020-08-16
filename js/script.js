console.log("%c Github %c", "background:#333333; color:#ffffff", "", "https://github.com/izhaoo/hexo-theme-zhaoo");

(function ($) {
  "use strict";

  var fn = {
    showMenu: function () {
      $(".menu").addClass("menu-active").fadeIn(300);
      $("body").addClass("lock-screen");
      $("main").addClass("blur");
      $(".preview").addClass("blur");
      $(".footer").addClass("blur");
    },
    hideMenu: function () {
      $(".menu").removeClass("menu-active").fadeOut(300);
      $("body").removeClass("lock-screen");
      $("main").removeClass("blur");
      $(".preview").removeClass("blur");
      $(".footer").removeClass("blur");
    },
    activeFab: function () {
      $(".fab-menu").addClass("fab-menu-active");
      $(".fab-up").addClass("fab-up-active");
      $(".fab-plus").addClass("fab-plus-active");
      $(".fab-daovoice").addClass("fab-daovoice-active");
    },
    freezeFab: function () {
      $(".fab-menu").removeClass("fab-menu-active");
      $(".fab-up").removeClass("fab-up-active");
      $(".fab-plus").removeClass("fab-plus-active");
      $(".fab-daovoice").removeClass("fab-daovoice-active");
    },
    showFab: function () {
      $(".fab").removeClass("fab-hide").addClass("fab-show");
    },
    hideFab: function () {
      $(".fab").addClass("fab-hide").removeClass("fab-show");
    },
    scroolFab: function () {
      var height = $(window).height();
      var scrollTop = $(window).scrollTop();
      if (scrollTop > height) {
        fn.showFab();
      } else {
        fn.freezeFab();
        fn.hideFab();
      }
    },
    scroolToTop: function () {
      $('body,html').animate({
        scrollTop: '0px'
      }, 800);
    }
  }

  var action = {
    smoothScroll: function () {
      $(".smooth-scroll").click(function () { // a[href *=#], area[href *=#]
        if (location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") && location.hostname == this.hostname) {
          var $target = $(this.hash);
          $target = $target.length && $target || $("[name=" + this.hash.slice(1) + "]");
          if ($target.length) {
            var targetOffset = $target.offset().top;
            $("html,body").animate({
              scrollTop: targetOffset
            }, 800);
            return false;
          }
        }
      });
    },
    loading: function () {
      $(".loading").delay(500).fadeOut(300);
      $("body").removeClass("lock-screen");
    },
    fab: function () {
      $(".fab-plus").on("click", function () {
        if ($(this).hasClass("fab-plus-active")) {
          fn.freezeFab();
        } else {
          fn.activeFab();
        }
      });
      $(".fab-menu").on("click", function () {
        if ($(".menu").hasClass("menu-active")) {
          fn.hideMenu();
        } else {
          fn.showMenu();
          if (CONFIG.fab.alwaysShow === false) {
            fn.hideFab();
          }
        }
      });
      $(".fab-daovoice").on("click", function () {
        daovoice('openMessages');
        fn.freezeFab();
      });
      $(".fab-menu, .fab-up .fab-daovoice").on("click", function () {
        fn.freezeFab();
      });
      if (CONFIG.fab.alwaysShow) {
        fn.showFab();
      } else {
        $(window).scroll(fn.scroolFab);
      }
    },
    menu: function () {
      $(".menu-close").on("click", function () {
        fn.hideMenu();
      });
    },
    scroolToTop: function () {
      $(".fab-up").on("click", function () {
        fn.scroolToTop();
      })
    },
    fancybox: function () {
      $(".fancybox").fancybox();
      $(".article .content img").each(function () {
        var e = document.createElement("a");
        $(e).attr("data-fancybox", "images");
        $(e).attr("href", $(this).attr("src"));
        $(this).wrap(e);
      });
    },
    pjax: function () {
      $(function () {
        $(document).pjax("a:not(.menu *)", '#main', {
          fragment: '#main',
          timeout: 6000
        });
      });
      $(document).on('pjax:complete', function () {
        if (CONFIG.fancybox) {
          action.fancybox();
        }
      });
    },
    donate: function () {
      $(".donate .icon").on("mouseover", function () {
        $(".donate .qrcode").show();
      });
      $(".donate .icon").children("a").on("mouseover", function () {
        $(".donate .qrcode img").attr('src', eval('CONFIG.donate.' + $(this).attr('id')))
      });
      $(".donate .icon").on("mouseout", function () {
        $(".donate .qrcode").hide();
      });
    },
    motto: function () {
      var text = CONFIG.motto.default;
      if (CONFIG.motto.api) {
        $.get(CONFIG.motto.api, function (data) {
          if (data) {
            text = data;
          }
        });
      }
      $("#motto").text(text);
    },
    lazyload: function () {
      $("img.lazyload").lazyload({
        effect: "fadeIn",
        threshold: 200,
      });
    },
    fixLazyloadFancybox: function () {
      $(document).find('.article img[data-original]').each(function () {
        $(this).parent().attr("href", $(this).attr("data-original"));
      });
    },
    galleries: function () {
      $("#gallery").justifiedGallery({
        margins: 5,
        rowHeight: 200,
        randomize: true
      });
      $("#galleries").justifiedGallery({
        margins: 10,
        rowHeight: 250,
        lastRow: 'center'
      });
    },
    carrier: function () {
      $(".j-carrier-btn").on("click", ZHAOO.utils.throttle(function () {
        $(".j-carrier-data").select();
        document.execCommand("Copy");
        ZHAOO.zui.message({ text: '已复制到剪切板', type: 'success' });
      }, 3000));
    }
  }

  $(function () {
    action.smoothScroll();
    action.loading();
    action.fab();
    action.menu();
    action.scroolToTop();
    action.motto();
    if (CONFIG.fancybox) {
      action.fancybox();
    }
    if (CONFIG.pjax) {
      action.pjax();
    }
    if (CONFIG.lazyload.enable) {
      action.lazyload();
    }
    if (CONFIG.donate.enable) {
      action.donate();
    }
    if (CONFIG.galleries.enable) {
      action.galleries();
    }
    if (CONFIG.lazyload && CONFIG.fancybox) {
      action.fixLazyloadFancybox();
    }
    if (CONFIG.carrier.enable) {
      action.carrier();
    }
  });

})(jQuery);