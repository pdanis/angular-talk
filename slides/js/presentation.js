var presentation = angular.module('presentation', []);

presentation.controller('PresentationController', function($scope, $location, keyboard) {
  var RIGHT_ARROW = 39;
  var LEFT_ARROW = 37;
  var PAGE_UP = 33;
  var PAGE_DOWN = 34;

  /*
    activeSlide = zero based number of current slide
    $location.path contains 1 based number of current slide
  */

  keyboard.on([RIGHT_ARROW, PAGE_DOWN], function() {
    if ($scope.activeStep < $scope.totalSteps) {
      $scope.activeStep++;
    } else if ($scope.activeSlide < $scope.totalSlides - 1) {
      $location.path('/slides/' + ($scope.activeSlide + 2));
    } else if ($scope.activeSlide === $scope.totalSlides - 1) {
      $location.path('/slides/end');
    }
  });

  keyboard.on([LEFT_ARROW, PAGE_UP], function() {
    if (-1 < $scope.activeSlide) {
      $location.path('/slides/' + ($scope.activeSlide || ''));
    }
  });

  $scope.$watch(function() { return $location.path(); }, function(value) {
    var match = /\/slides\/(.*)/.exec(value);

    if (!match) {
      $location.path('/slides/');
    } else if (match[1] === '') {
      $scope.activeStep = 0;
      $scope.activeSlide = -1;
    } else if (match[1] === 'end') {
      $scope.activeStep = 0;
      $scope.activeSlide = $scope.totalSlides;
    } else {
      var i = parseInt(match[1], 10);
      if (1 <= i && i <= $scope.totalSlides) {
        $scope.activeStep = ($scope.activeSlide > i - 1) ? Number.MAX_VALUE : 0;
        $scope.activeSlide = i - 1;
      } else {
        $location.path('/slides/');
      }
    }
  });

  $scope.isInsideDeck = function() {
    return !this.isBefore() && !this.isAfter();
  };

  $scope.isBefore = function() {
    return $scope.activeSlide === 0;
  };

  $scope.isAfter = function() {
    return $scope.activeSlide >= $scope.totalSlides;
  };
});

presentation.factory('keyboard', function($rootScope) {
  return {
    on: function(keyCodes, callback) {
      keyCodes = angular.isArray(keyCodes) ? keyCodes : [keyCodes];

      $(window).keydown(function(e) {
        if (keyCodes.indexOf(e.keyCode) !== -1) {
          $rootScope.$apply(callback);
        }
      });
    }
  };
});

presentation.directive('deck', function() {
  return {
    restrict: 'E',
    link: function(scope, element, attr) {
      var slides = element.find('slide');

      scope.$eval(attr.total + ' = ' + slides.length);

      slides.each(function(i, slide) {
        $(slide).scope().$index = i;
      });

      scope.$watch(attr.current, function(value) {
        scope.totalSteps = 0;
        slides.each(function(i, slide) {
          $(slide).removeClass('previous current next');
          if (i < value) {
            $(slide).addClass('previous');
          } else if (i == value) {
            $(slide).addClass('current');
            scope.totalSteps = $(slide).scope().totalSteps || 0;
          } else {
            $(slide).addClass('next');
          }
        });

        // restack
        slides.each(function(i, slide) {
          slide.style.zIndex = 'auto';
          if ($(slide).hasClass('next')) {
            slide.style.zIndex = -i;
          }
        });
      });
    }
  };
});

presentation.directive('slide', function() {
  return {
    restrict: 'E',
    scope: true,
    compile: function(tpl, attr) {

      if (!tpl.hasClass('non-center')) {
        tpl.children().wrapAll('<div class="center-wrapper"><div class="center-cell"></div></div>');
        tpl.addClass('center');
      }

      if(attr.title) {
        tpl.prepend('<h2 class="title">' + attr.title + '</h2>');
      }
    }
  };
});

presentation.directive('step', function() {
  return function(scope, elm, attr) {
    var step = parseInt(attr.step, 10);

    scope.totalSteps = Math.max(scope.totalSteps || 0, step);

    scope.$watch('activeStep', function(activeStep) {
      if (scope.activeSlide === scope.$index) {
        elm.css('visibility', step <= activeStep ? 'visible' : 'hidden');
      } else if (scope.activeSlide < scope.$index) {
        elm.css('visibility', 'hidden');
      } else {
        elm.css('visibility', 'visible');
      }
    });
  }
})

presentation.directive('slideCode', function() {
  return {
    terminal: true,
    link: function(scope, element, attr) {
      element.addClass('brush: js; toolbar: false;');
      if (attr.slideCode !== 'js') {
        element.addClass('html-script: true;');
      }
    }
  };
});
