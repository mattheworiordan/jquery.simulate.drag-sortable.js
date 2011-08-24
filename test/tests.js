$(document).ready(function() {
  module("Simple drag up and down without options");

  test("drag down", function() {
    $('#sortable').sortable();
    $('#elem1').simulateDragSortable({ move: 1 });
    equal( $('#elem1')[0], $('#sortable li:nth-child(2)')[0], "Element one should have moved to second position" );
    equal( $('#elem2')[0], $('#sortable li:nth-child(1)')[0], "Element two should now have moved to the top" );
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
});