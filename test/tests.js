$(document).ready(function() {
  module("Simple drag up and down without options");

  test("drag down", function() {
    $('#sortable').sortable();
    $('#elem1').simulateDragSortable({ move: 1 });
    equal( $('#elem1')[0], $('#sortable li:nth-child(2)')[0], "Element one should have moved to second position" );
    equal( $('#elem2')[0], $('#sortable li:nth-child(1)')[0], "Element two should now have moved to the top" );
    $('#elem1').simulateDragSortable({ move: 2 });
    equal( $('#elem1')[0], $('#sortable li:nth-child(4)')[0], "Element one should have moved to position four" );
    $('#elem1').simulateDragSortable({ move: 2 });
    equal( $('#elem1')[0], $('#sortable li:nth-child(5)')[0], "Element one should have moved to position five (boundary)" );
    $('#elem1').simulateDragSortable({ move: -2 });
    equal( $('#elem1')[0], $('#sortable li:nth-child(3)')[0], "Element one should have moved to position three" );
  });

  test("drag up", function() {
    $('#sortable').sortable();
    $('#elem5').simulateDragSortable({ move: -3 }); // move up 3, to position 2
    equal( $('#elem2')[0], $('#sortable li:nth-child(3)')[0], "Element two should have shifted down to 3rd position" );
    equal( $('#elem1')[0], $('#sortable li:nth-child(1)')[0], "Element one should have remained in position 1" );
    equal( $('#elem5')[0], $('#sortable li:nth-child(2)')[0], "Element five should be in position 2" );
  });

  test("drag up to boundary", function() {
    $('#sortable').sortable();
    var before = $('#sortable li').map(function(e) { return this.id }).get().join(',');
    $('#elem1').simulateDragSortable({ move: -3 }); // move up 3, but at position 1 so nothing should change
    var after = $('#sortable li').map(function(e) { return this.id }).get().join(',');
    equal( before, after, "Order should not have changed" );
  });

  test("drag past theoretical boundary", function() {
    $('#sortable').sortable();
    $('#elem4').simulateDragSortable({ move: 3 }); // move down 3, but at position 4 so can only go to position 5
    equal( $('#elem4')[0], $('#sortable li:nth-child(5)')[0], "Element four should be in position five" );
  });

  test("events are fired", function() {
    var eventLog = {},
        eventsToCapture = 'start stop update change';
        eventCaptureFunction = function(evt) {
          // event type is sortstart, sortend.  ignore sort prefix
          eventLog[evt.type.replace(/^sort/, "")] = true;
        },
        options = {};

    // add events to sortable options
    for (var i = 0, events = eventsToCapture.split(' '); i < events.length; i++) {
      options[events[i]] = eventCaptureFunction;
    }
    $('#sortable').sortable(options);

    $('#elem2').simulateDragSortable({ move: 2 }); // move down 2, should be at position 4
    equal( $('#elem2')[0], $('#sortable li:nth-child(4)')[0], "Element two should have moved to fourth position" );

    // check events have fired
    for (var i = 0, events = eventsToCapture.split(' '); i < events.length; i++) {
      ok(eventLog[events[i]], events[i] + ' event should have fired');
    }
  });

  module("Drag handle");

  test("drag down", function() {
    $('#sortable').sortable({
      handle: '.handle'
    });
    $('#elem1').simulateDragSortable({ move: 3, handle: '.handle' });
    equal( $('#elem1')[0], $('#sortable li:nth-child(4)')[0], "Element one should have moved to fourth position" );
  });

  test("drag up", function() {
    $('#sortable').sortable({
      handle: '.handle'
    });
    $('#elem4').simulateDragSortable({ move: -2, handle: '.handle' });
    equal( $('#elem4')[0], $('#sortable li:nth-child(2)')[0], "Element four should be in position two" );
  });

  module("Restrict drag to items that match a list selector");

  test("drag down", function() {
    $('#sortable').sortable();
    $('#elem3').simulateDragSortable({ move: 3, listItem: '.draggable' });
    equal( $('#elem3')[0], $('#sortable li:nth-child(4)')[0], "Element three should have only moved to position 4 as the 5th item is not .draggable" );
  });

  module("Dragging items with a different sized place holder used in sortable");

  test("drag down", function() {
    $('#sortable').sortable({
      placeholder: 'custom-place-holder'
    });
    $('#elem1').simulateDragSortable({ move: 1, placeHolder: '.custom-place-holder' });
    equal( $('#elem1')[0], $('#sortable li:nth-child(2)')[0], "Element one should have shifted down to position two" );
    $('#elem1').simulateDragSortable({ move: 1, placeHolder: '.custom-place-holder' });
    equal( $('#elem1')[0], $('#sortable li:nth-child(3)')[0], "Element one should have shifted down to position three" );
    $('#elem1').simulateDragSortable({ move: 2, placeHolder: '.custom-place-holder' });
    equal( $('#elem1')[0], $('#sortable li:nth-child(5)')[0], "Element one should have shifted down to position five" );
    $('#elem1').simulateDragSortable({ move: -1, placeHolder: '.custom-place-holder' });
    equal( $('#elem1')[0], $('#sortable li:nth-child(4)')[0], "Element one should have shifted back to position four" );
    $('#elem1').simulateDragSortable({ move: -2, placeHolder: '.custom-place-holder' });
    equal( $('#elem1')[0], $('#sortable li:nth-child(2)')[0], "Element one should have shifted back to position two" );
  });
});