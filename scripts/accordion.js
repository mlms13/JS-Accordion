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
                setPanelWidth = function () {
                    $li.children('ul, div').each(function () {
                        // we use this complex width detection because jQuery's $(el).width() function
                        // isn't reliable for hidden elements. This method always gets an accurate width
                        var $panel = $(this),
                            padding = parseInt($panel.css('paddingLeft'), 10) + parseInt($panel.css('paddingRight'), 10),
                            border = parseInt($panel.css('borderLeft'), 10) + parseInt($panel.css('borderRight'), 10),
                            margin = parseInt($panel.css('marginLeft'), 10) + parseInt($panel.css('marginRight'), 10),
                            w = $panel.parent().width() - (padding + border + margin);

                        $panel.width(w);
                    });
                },
                showPanels = function (panels) {
                    if (panels) {
                        panels.show().parent().addClass('expanded');
                    }
                };

            // add the style class to each accordion
            $this.addClass(settings.className);

            // hide all of the accordion's panels
            $li.children('ul, div').hide();

            // expand the panels that should be open when the page loads
            showPanels(settings.openPanels);

            // make animations smoother by defining a width
            setPanelWidth();
            $(window).resize(setPanelWidth);

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