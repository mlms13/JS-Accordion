/*! JS-Accordion v1.0 - https://github.com/mlms13/JS-Accordion */
// Copyright 2012 Michael Martin-Smucker
// Released under the MIT License

(function ($) {
    $.fn.jsAccordion = function (options) {
        var settings = $.extend({
            accordionClass: 'secondary-nav',
            labelClass: 'accordion-label',
            openPanels: [],
            urlPanels: false,
            autoCollapse: true
        }, options);

        return this.each(function () {
            var $this = $(this),
                $li = $this.children('li'),
                $hash = (window.location.hash === '#') ? null : $this.find(window.location.hash),
                i,
                setPanelWidth = function () {
                    $li.children('ul, div').each(function () {
                        // we use this complex width detection because jQuery's $(el).width() function
                        // isn't reliable for hidden elements. This method always gets an accurate width.
                        var $panel = $(this),
                            padding = parseInt($panel.css('paddingLeft'), 10) + parseInt($panel.css('paddingRight'), 10),
                            border = parseInt($panel.css('borderLeft'), 10) + parseInt($panel.css('borderRight'), 10),
                            margin = parseInt($panel.css('marginLeft'), 10) + parseInt($panel.css('marginRight'), 10),
                            w = $panel.parent().width() - (padding + border + margin);

                        $panel.width(w);
                    });
                };

            // add the style class to each accordion
            $this.addClass(settings.accordionClass);

            // hide all of the accordion's panels
            $li.children('ul, div').hide();
            $(document).trigger('panelCollapsed');

            // if openPanels isn't already an array, make it one
            if (settings.openPanels.constructor !== Array) {
                settings.openPanels = [settings.openPanels];
            }

            // if we should expand panels from the url hash, add them to the array
            if (settings.urlPanels && $hash && $hash.length) {
                if ($hash.is('li')) {
                    settings.openPanels.push($hash.children('ul, div'));
                } else if ($hash.is('a') || $hash.is('span')) {
                    settings.openPanels.push($hash.next('ul, div'));
                } else if ($hash.is('ul') || $hash.is('div')) {
                    settings.openPanels.push($hash);
                }
            }

            // loop through openPanels, expand each panel that should be open when the page loads
            for (i = 0; i < settings.openPanels.length; i += 1) {
                $(settings.openPanels[i]).show().parent().addClass('expanded');
                $(document).trigger('panelExpanded');
            }

            // make animations smoother by defining a width
            setPanelWidth();

            // recalculate width when panels are toggled or the window is resized
            $(document).bind('panelCollapsed', setPanelWidth);
            $(document).bind('panelExpanded', setPanelWidth);
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
                        $label.next('ul, div').slideUp(function () {
                            $(document).trigger('panelCollapsed');
                        });
                        $label.parent().removeClass('expanded');
                    } else {
                        // if autoCollapse is on, collapse all other panels
                        if (settings.autoCollapse) {
                            $li.filter('.expanded').removeClass('expanded')
                                .children('ul:visible, div:visible').slideUp();
                        }
                        $label.next('ul, div').slideDown(function () {
                            $(document).trigger('panelExpanded');
                        });
                        $label.parent().addClass('expanded');
                    }
                });

            });
        });
    };
}(jQuery));