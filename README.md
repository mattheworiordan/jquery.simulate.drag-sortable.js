Simulate Drag on JQuery UI Sortable
================================

Whilst [jquery.simulate.js](https://github.com/eduardolundgren/jquery-simulate) provides functionality
to simulate many JQuery and JQuery UI event, it is unable to simulate a drag event for a JQuery UI Sortable
widget due to the intricate behaviour needed to make the JQuery UI Sortable widget fire the correct events.

This library allows you to simulate Drag events for a [JQuery UI Sortable](http://jqueryui.com/demos/sortable/), which I have found
most useful when doing thorough integration tests.

Features
---
 - You can simulate an item being dragged up or down within a Sortable list by a specified number of items
 - Support for drag handles
 - Support for place holders
 - Support for limiting list to items which match a selector

Known limitations
---
 - Currently does not work with linked lists
 - Does not support horizontally ordered lists
 - beforeStop event does not fire

Usage
-----

Include jquery.simulate.drag-sortable.js file after JQuery has been included.

    // drag item down one position in the list
    $('#itemToDrag').simulateDragSortable({ move: 1 });

    // drag item down one position in the list and only treat elements which match .draggable as part of the list
    $('#itemToDrag').simulateDragSortable({ move: 1, listItem: '.draggable });

    // drag item up one position in the list using the handle .handle
    $('#itemToDrag').simulateDragSortable({ move: 1, handle: '.handle });

    // drag item up two positions in the list with support for a place holder
    $('#itemToDrag').simulateDragSortable({ move: 1, placeHolder: '.custom-place-holder' });

Repository and forking
-----

I welcome feedback and commits to this library.  Please fork me on Github at  [https://github.com/mattheworiordan/jquery.simulate.drag-sortable.js](https://github.com/mattheworiordan/jquery.simulate.drag-sortable.js)

About
-----

This script was written by **Matthew O'Riordan**

 - [http://mattheworiordan.com](http://mattheworiordan.com)
 - [@mattheworiordan](http://twitter.com/#!/mattheworiordan)
 - [Linked In](http://www.linkedin.com/in/lemon)

License
-------

jquery.simulate.drag-sortable.js is Copyright © 2011 Matthew O'Riordan, inc. It is free software, and may be redistributed under the terms specified in the LICENSE file.