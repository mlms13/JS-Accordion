(function ($) {
    $.fn.jsAccordion = function (options) {
        var settings = $.extend({
            className: '',
            openPanels: null,
            autoCollapse: true
        }, options);

        return this.each(function () {
            var $this = $(this),
                $li = $this.children('li'),
                showPanels = function (panels) {
                    if (panels) {
                        panels.show().parent().addClass('expanded');
                    }
                };

            // add the style class to each accordion
            $this.addClass(settings.className);

            // hide all of the accordion's panels
            $li.children('ul, div').each(function () {
                var $panel = $(this),
                    width = $panel.width();

                // hide panels and make animation smoother by defining a width
                $panel.hide().width(width);
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
                    if (settings.autoCollapse) {
                        // collapse all other panels
                        $li.filter('.expanded').removeClass('expanded')
                            .children('ul:visible, div:visible').slideUp();
                    }
                    $label.next('ul, div').slideDown();
                    $label.parent().addClass('expanded');
                }
            });
        });
    };
}(jQuery));