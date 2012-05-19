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
    $('#itemToDrag').simulateDragSortable({ move: -1, handle: '.handle });

    // drag item up two positions in the list with support for a place holder
    $('#itemToDrag').simulateDragSortable({ move: -2, placeHolder: '.custom-place-holder' });


Integration with Cucumber
-----
As [discussed on stackoverflow](http://stackoverflow.com/questions/4044327/how-can-i-test-jquery-ui-sortable-with-cucumber), 
capybara's  built in `drag_to` method does not work with jQuery sortable. Instead, you can integrate this script into a 
custom cucumber step. I suggest fetching the script within your step in order to avoid mixing test scripts with production 
scripts. With that in mind, a custom step might look something like:
    
    # Example usage:
    # 
    #   When I drag "10 Testing Tips" down 1 position
    #   When I drag "What's new in BDD" up 2 positions
    # 
    When /^I drag "([^"]*)" (up|down) (\d+) positions?$/ do |post_title, direction, distance|
      post = Post.find_by_title(post_title)
      distance = distance.to_i * -1 if direction == 'up'
      page.execute_script %{
        $.getScript("http://your.bucket.s3.amazonaws.com/jquery.simulate.drag-sortable.js", function() {
          $("li#post_#{post.id}").simulateDragSortable({ move: #{distance.to_i}});
        });
      }
      sleep 1 # Hack to ensure ajax finishes running (tweak/remove as needed for your suite)
    end

Note: This example suggests serving the script from Amazon S3 but it could come from anywhere, including inside your app 
if you prefer. Also, (if it's not obvious) you'll need to set something like `dom_id(@post)` on your draggable list item
in order for the jQuery selectors to work properly.

Gotchas
-----
If you're having trouble moving up/down the correct number of positions (i.e. you've set `move` to `2` but it only moves 
down one position), try adjusting the `tolerance` option. The default usually works properly, but in some cases you may 
need to tweak it a bit, especially if your list items are irregular heights.

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