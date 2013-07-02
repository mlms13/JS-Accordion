JS-Accordion 1.0
================

Description
----------------

JS-Accordion is a lightweight plugin for jQuery 1.7+. It provides vertical accordions for navigation, FAQs, or other expanding/collapsing blocks of content. JS-Accordion is designed to be easy to customize and theme. See the demo HTML files for usage instructions.

License
----------------

The JS-Accordion jQuery plugin and related files -- including styles, images, and any additional scripts -- are freely available under the terms of the MIT license. See the LICENSE document for details.

Changelog
----------------

### v1.1 (July 2, 2013)

- Remove legacy fallback script
- Don't use jQuery's deprecated `bind()` for handling events

### v1.0 (Sept 20, 2012)

- Convert project to a true jQuery plugin
- Rewrite styles using LESS
- Trigger custom events when panels open and close
- New option: allow multiple panels to be open at once
- New option: automatically expand panels mentioned in the url hash
- New option: add a class to each label that toggles a panel

### v0.2

- Update selectors to avoid polluting inner elements
- Fix jumpy animations when expanding accordion panels
- Class for styling accordion is now separate from the accordion class
- Use Modernizr for graceful degredation

### v0.1

- Initial release