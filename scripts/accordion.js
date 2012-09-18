(function ($) {
    $.fn.jsAccordion = function (options) {
        var settings = $.extend({
            className: '',
            openPanels: null
        }, options);

        return this.each(function () {
            var $this = $(this),
                $li = $this.children('ul').children('li'),
                showPanels = function (panels) {
                    if (panels) {
                        panels.show().parent().addClass('expanded');
                    }
                };

            // add the style class to each accordion
            $this.addClass(settings.className);

            // hide all of the accordion's panels
            $li.children('ul, div').each(function () {
                // animation is smoother if the panel's width is set
                // we calculate it automatically based on the parent's width
                var $panel = $(this),
                    padding = parseInt($panel.css('paddingLeft'), 10) + parseInt($panel.css('paddingRight'), 10),
                    border = parseInt($panel.css('borderLeft'), 10) + parseInt($panel.css('borderRight'), 10),
                    margin = parseInt($panel.css('marginLeft'), 10) + parseInt($panel.css('marginRight'), 10),
                    w = $panel.parent().width() - (padding + border + margin);

                $panel.hide().css({width: w});
            });

            // expand the panels that should be open when the page loads
            showPanels(settings.openPanels);

            // find all non-empty, top-level text nodes and wrap them with span tags
            $li.contents().filter(function () {
                return this.nodeType === 3 && $.trim(this.nodeValue) !== '';
            }).wrap('<span />');

            // if an anchor precedes a hidden section, don't treat it as a link
            $li.children('a').each(function () {
                var $a = $(this);

                if ($a.next('ul, div').length > 0) {
                    $a.click(function (e) {
                        e.preventDefault();
                    });
                }
            });

            $li.children('a, span').click(function () {
                var $label = $(this);

                if ($label.next('ul, div').is(':visible')) {
                    // if the corresponding panel is visible, collapse it
                    $label.next('ul, div').slideUp();
                    $label.parent().removeClass('expanded');
                } else {
                    // otherwise, if a panel is being opened, collapse all others
                    $label.parents('.jsAccordion').find('.expanded').removeClass('expanded')
                        .children('ul:visible, div:visible').slideUp();
                    $label.next('ul, div').slideDown();
                    $label.parent().addClass('expanded');
                }
            });
        });
    };
}(jQuery));