// Compatibility Layer
// This compatibility script provides backwards compatibility with legacy accordions.
// Include this script in your project if you have accordions that do not use
// the jQuery plugin syntax: $(el).jsAccordion();

$(function () {
    var panels = [];

    (function getPanels(open) {
        var i;

        if (open !== null  && open !== undefined) {
            if (open === '-all') {
                // open all panels if the keyword "-all" is used
                panels.push($('.jsAccordion > ul > li').children('ul, div'));
            } else if (typeof open === 'string') {
                // assume we're working with an id; remove hash if present
                if (open.substr(0, 1) === '#') {
                    open = open.substr(1, open.length);
                }
                panels.push($('.jsAccordion > ul > li').find('#' + open));
            } else if (typeof open === 'number') {
                panels.push($('.jsAccordion > ul > li').children('ul, div').eq(open));
            } else if (open.constructor === Array) {
                for (i = 0; i < open.length; i += 1) {
                    getPanels(open[i]);
                }
            }
        }
    }(window.visiblePanels));

    $('.jsAccordion').addClass('secondary-nav')
        .children('ul').jsAccordion({openPanels: panels});
});