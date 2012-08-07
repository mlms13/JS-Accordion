var visiblePanels = null; // each page can set this to control which sections are open by default (see html documentation)

function Accordion() {
    this.initialize = function() {
        // add the style class to each accordion
        $('.jsAccordion').addClass('secondary-nav');
        // hide all sub-links
        $('.jsAccordion > ul > li').children('ul, div').each(function () {
            var padding = parseInt($(this).css('paddingLeft'), 10) + parseInt($(this).css('paddingRight'), 10),
                border = parseInt($(this).css('borderLeft'), 10) + parseInt($(this).css('borderRight'), 10),
                margin = parseInt($(this).css('marginLeft'), 10) + parseInt($(this).css('marginRight'), 10),
                w = $(this).parent().width() - (padding + border + margin);

            $(this).hide().css({width: w});
        });
        
        // find all non-empty, top-level text nodes and wrap them with span tags
        $('.jsAccordion > ul > li').contents().filter(function() {
            return this.nodeType === 3 && $.trim(this.nodeValue) !== '';
        }).wrap('<span></span>');

        // if an anchor precedes a hidden section, don't treat it as a link
        $('.jsAccordion > ul > li > a').each(function() {
            if ($(this).next('ul, div').length > 0) {
                $(this).click(function(e) {
                    e.preventDefault();
                });
            }
        });
        
        $('.jsAccordion > ul > li > a, .jsAccordion > ul > li > span').click(function() {
            if ($(this).next('ul, div').is(':visible')) {
                // if you're closing a panel, don't hide all other panels
                // (this lets you close one panel without closing all panels if multiple are open)
                $(this).next('ul, div').slideUp();
                $(this).parent().removeClass('expanded');
            }
            else {
                // if you're opening a panel, it's safe to hide other panels in the same accordion
                $(this).parents('.jsAccordion').find('.expanded').removeClass('expanded')
                    .children('ul:visible, div:visible').slideUp();
                $(this).next('ul, div').slideDown();
                $(this).parent().addClass('expanded');
            }
        });
    };
    // determine which panels should be shown when the page loads
    this.showPanels = function(openPanels) {
        var i = 0;
        if (openPanels !== null) {
            if (openPanels === '-all') {
                $('.jsAccordion ul ul, .jsAccordion ul div').show();
                $('.jsAccordion ul>li').addClass('expanded');
            }
            else if (typeof openPanels === 'string') {
                // if there's a hash in front of the id, remove it
                if (openPanels.substr(0, 1) === '#') {
                    openPanels = openPanels.substr(1, openPanels.length);
                }
                $('.jsAccordion ul #' + openPanels).show().parent().addClass('expanded');
            }
            else if (typeof openPanels === 'number') {
                $('.jsAccordion ul ul, .jsAccordion ul div').eq(openPanels).show().parent().addClass('expanded');
            }
            // if openPanels contains an array of items, loop through it and handle each one individually
            else if (openPanels.constructor === Array) {
                for (i = 0; i < openPanels.length; i++) {
                    this.showPanels(openPanels[i]);
                }
            }
        }
    };
}
$(document).ready(function() {
    var accordion = new Accordion();
    accordion.initialize();
    accordion.showPanels(visiblePanels);
});
