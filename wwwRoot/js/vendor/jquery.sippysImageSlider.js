/*
 *  Project: NAT-FrontEnd
 *  Description: An image carousel slider
 *  Author: John R. Sippy
 *  License: Its pretty standard stuff, feel free to copy it
 */
;(function ($, window, document, undefined) {
    var pluginName = "sippysImageSlider";
    var defaults = {
        animateDots: false,
        imageWaitTime: 5,
        imageAnimDuration: 3,
        dotWaitTime: 4.5,
        dotAnimDuration: 0.5
    };
    var totalUniqueImages = 0;
    var animRuns = 0;
    var oDots;

    // The actual plugin constructor
    function Plugin(element, options) {
        this.element = element;
        this.options = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    Plugin.prototype = {
        init: function () {
            this.setupCarousel(this.element);
            this.animateCarousel(this.element, this.options);
        },
        setupCarousel: function (elem) {
            var nWidth = 0;
            $(elem).find(':first-child').clone().appendTo(elem);
            $(elem).children().each(function(){ nWidth += $(this).outerWidth(); });
            $(elem).css('width',nWidth);
            this.totalUniqueImages = ($(elem).children()).length;
            this.setupDots(elem, this.oDots, this.totalUniqueImages, this.animRuns);
        },
        setupDots: function (elem, oDots, totalUniqueImages, animRuns) {
            if(oDots == undefined){
                oDots = '<div class="dots" />';
                $(elem).parent().append($(oDots));
                for(var i = 1; i < totalUniqueImages; i++){
                    $(oDots).append('<div class="dot ir" />');
                }
                this.oDots=oDots;
            }
            $(oDots).children().each(function(){ $(this).removeClass('on'); });
            $(oDots).children().find(':nth-child('+animRuns+')').addClass('on');
        },
        animateCarousel: function (elem, options) {
            if(this.animRuns < this.totalUniqueImages - 1){
                var nStartPos = ($(elem).position()).left;
                var nEndPos = nStartPos - ($(elem).outerWidth() / this.totalUniqueImages);
                if(options['animateDots']){
                    $(this.oDots).delay(options['dotWaitTime']*1000).fadeOut(options['dotAnimDuration']*1000);
                }
                $(elem).delay(options['imageWaitTime']*1000).animate({left:nEndPos},options[this.imageAnimDuration]*1000,function(){
                    if(options['animateDots']){
                        $(this.oDots).fadeIn(options['dotAnimDuration']*1000);
                    }
                    this.animateCarousel(elem, options);
                });
                this.animRuns++;
                this.setupDots(elem, this.oDots, this.totalUniqueImages, this.animRuns);
            } else {
                $(elem).css('left',0);
                this.animRuns = 0;
                this.animateCarousel(elem, options);
            }
        }
    };

    $.fn[pluginName] = function (options) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new Plugin(this, options));
            }
        });
    };

})(jQuery, window, document);
