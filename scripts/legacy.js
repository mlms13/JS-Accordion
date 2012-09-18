// Name: Accordion Compatibility Layer
// Goal: smoothly transition legacy accordions to the new jQuery plugin
// Author: Michael Martin-Smucker

$(function () {
    var panels = $();

    (function getPanels(open) {
        var i;

        if (open !== null) {
            if (open === '-all') {
                // open all panels if the keyword "-all" is used
                panels = panels.add($('.jsAccordion > ul > li').children('ul, div'));
            } else if (typeof open === 'string') {
                // assume we're working with an id; remove hash if present
                if (open.substr(0, 1) === '#') {
                    open = open.substr(1, open.length);
                }
                panels = panels.add($('.jsAccordion > ul > li').find('#' + open));
            } else if (typeof open === 'number') {
                panels = panels.add($('.jsAccordion > ul > li').children('ul, div').eq(open));
            } else if (open.constructor === Array) {
                for (i = 0; i < open.length; i += 1) {
                    getPanels(open[i]);
                }
            }
        }
    }(visiblePanels));

    $('.jsAccordion').addClass('secondary-nav')
        .children('ul').jsAccordion({openPanels: panels});
});