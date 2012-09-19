(function ($) {
    $.fn.jsAccordion = function (options) {
        var settings = $.extend({
            className: '',
            labelClass: 'accordion-label',
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

            $li.children('a, span').each(function () {
                var $label = $(this);

                // if the `a` or `span` is a link instead of a label, return
                if ($label.next('ul, div').length < 1) {
                    return;
                }

                // each label that expands an accordion panel should be given a special class
                $label.addClass(settings.labelClass);

                // if those labels are links, prevent the links from doing anything
                if ($label.is('a')) {
                    $label.click(function (e) {
                        e.preventDefault();
                    });
                }

                // toggle the expanded/collapsed panel on click
                $label.click(function () {
                    // collapse the panel if it is currently visible
                    if ($label.next('ul, div').is(':visible')) {
                        $label.next('ul, div').slideUp();
                        $label.parent().removeClass('expanded');
                    } else {
                        // if autoCollapse is on, collapse all other panels
                        if (settings.autoCollapse) {
                            $li.filter('.expanded').removeClass('expanded')
                                .children('ul:visible, div:visible').slideUp();
                        }
                        $label.next('ul, div').slideDown();
                        $label.parent().addClass('expanded');
                    }
                });

            });
        });
    };
}(jQuery));