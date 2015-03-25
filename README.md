# bedrock-angular-selector

A [bedrock][] [AngularJS][] module that provides a base directive for building
custom UIs for selecting a particular item from a set of items.

This base directive provides:
* A customizable display for the selected item
* A UI for bringing up a modal to change the selection
* A customizable display within that modal for displaying the other choices
* A UI for triggering a customizable display for adding a new item to choose

## Writing a Custom Selector

In this example, we'll be creating a selector to pick an image from a list
of images. Creating a custom selector is typically a three step process:

1. Create an "inner" selector directive that extends the `brSelector` base
  directive. This "inner" directive will require `brSelector` and provide
  most of the custom selection implementation. An "outer" directive will
  supply the `brSelector`, hiding this implementation detail.

  ```js
  var module = angular.module('example', ['bedrock.selector']);

  module.directive('imageSelectorInner', {
    restrict: 'A',
    require: 'brSelector',
    link: function(scope, element, attrs, brSelector) {
      // watch the images list for changes and, if there's no current
      // selection, pick the first image in the list
      scope.$watch(scope.images, function(images) {
        if(!scope.selected && images.length !== 0) {
          scope.selected = images[0];
        }
      }, true);

      // configure brSelector and make its API available via the scope
      scope.brSelector = brSelector;
      // show "Select Image" in the selection title
      brSelector.itemType = 'Image';
      // set the items to choose from
      brSelector.items = scope.images;
      // set the behavior when the base selector's "Add" button is clicked
      brSelector.addItem = function() {
        scope.showAddImageModal = true;
      };

      // add a new image to choose from
      scope.addImage(image) {
        scope.images.push(image);
      };
    }
  });
  ```

2. Create the "outer" selector directive. This is the directive that will
  be used in your application.

  ```js
  angular.module('example').directive('imageSelector', {
    restrict: 'EA',
    scope: {
      selected: '=',
      images: '='
    },
    templateUrl: '/selectors/image-selector.html'
  });
  ```

  The HTML template:

  ```html
  <!-- Create the br-selector directive and our inner directive; br-selected
    is an express that gets evaluated whenever the selection is changed, so
    set our `selected` variable to the new selection (brSelector.selected)
    when this happens. -->
  <br-selector br-selected="selected=brSelector.selected" image-selector-inner>
    <!-- Define the HTML to display the selected item by specifying
      name="br-selector-selected"; br-selector will look for this value to
      perform transclusion. You can optionally specify `br-lazy-compile`, if
      you've included it (bedrock-angular-lazy-compile), to prevent angular
      from doing any unnecessary compiling until the first selection is
      made. -->
    <div name="br-selector-selected" br-lazy-compile="selected">
      <img ng-src="{{selected}}"/>
    </div>
    <!-- Define the HTML to display the items available for selection by
      specifying name="br-selector-choices"; br-selector will look for this
      value to perform transclusion. You can optionally specify
      `br-lazy-compile` here as well. -->
    <div name="br-selector-choices" br-lazy-compile="brSelector.showChoices">
      <!-- This could be a grid display, involve pagination, or whatever is
        appropriate for showing items for selection. -->
      <ul class="list-unstyled">
        <li class="br-item-hover well" ng-repeat="image in images"
          ng-click="brSelector.select(image)">
          <img ng-src="{{image}}"/>
        </li>
      </ul>
    </div>
  </br-selector>
  <!-- When "Add" is clicked in the base selector UI, open this modal. When
    the modal closes, if there was no error, change the selection by
    selecting the result (which will be the new image). -->
  <stackable-modal stackable="showAddImageModal"
    stackable-closed="!err && brSelector.select(result)"
    br-lazy-compile="showAddImageModal">
    <!-- Modal contents with UI to add an image. -->
    <div class="modal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <a class="close stackable-cancel">&times;Close</span></a>
            <h3 class="modal-title">New Image</h3>
          </div>
          <div class="modal-body">
            <form class="well form-horizontal">
              <fieldset>
                <br-input br-model="image"
                  br-options="{
                    icon: 'globe',
                    name: 'badge.alignment.{{$index}}.url',
                    label: 'URL',
                    type: 'url',
                    placeholder: 'URL'
                  }">
                  Enter the URL for the image.
                </br-input>
              </fieldset>
            </form>
          </div>
          <div class="modal-footer">
            <span>
              <button type="button" class="btn btn-primary"
                ng-click="addImage(image)">Add</button>
              <button type="button"
                class="btn btn-default stackable-cancel">Cancel</button>
            </span>
          </div>
        </div><!-- /.modal-content -->
      </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->
  </stackable-modal>
  ```

3. Use your selector directive in your application.

  ```html
  <image-selector images="images" selected="selected"/>
  ```

## Setup

```
bower install bedrock-angular-selector
```

Installation of the module followed by a restart of your [bedrock][] server
is sufficient to make the module available to your application.

To manually add **bedrock-angular-selector** as a dependency:

```js
angular.module('myapp', ['bedrock.selector']);
```


[bedrock]: https://github.com/digitalbazaar/bedrock
[bedrock-angular]: https://github.com/digitalbazaar/bedrock-angular
[AngularJS]: https://github.com/angular/angular.js
