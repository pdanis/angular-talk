(function(angular) {

    var geomapModule = angular.module('geomap', []);

    /**
     * Geomap configuration
     */
    geomapModule.value('geomapConfig', {
        type: 'base',
        zoom: 13
    });

    /**
     * Geomap service
     */
    geomapModule.factory('geomap', function(geomapConfig) {
        return function(element, type) {
            var smap = new SMap(element);
            smap.addDefaultLayer(SMap['DEF_' + (type ? type : geomapConfig.type).toUpperCase()]).enable();

            return {
                setCenterZoom: function(coords, zoom) {
                    smap.setCenterZoom(SMap.Coords.fromWGS84(coords[0], coords[1]), zoom ? parseInt(zoom) : geomapConfig.zoom);
                }
            };
        }
    });

    /**
     * Geomap directive
     */
    geomapModule.directive('geomap', function(geomap) {
        return {
            restrict: 'E',
            replace: true,
            template: '<div class="geomap"></div>',
            compile: function(element, attrs) {
                var map = geomap(element[0], attrs.type);

                return function(scope, element, attrs) {
                    attrs.$observe('coords', function(coords) {
                        coords = coords.split(',');
                        map.setCenterZoom(coords, attrs.zoom);
                    });
                }
            }
        }
    });

    angular.module('geomapApp', ['geomap'])
        .run(function(geomapConfig) {
            geomapConfig.type = 'ophoto';       // override default geomap type in app
        });

})(angular);
