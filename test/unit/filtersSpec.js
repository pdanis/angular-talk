describe('Filters', function() {

    describe('filtersApp', function() {
        beforeEach(module('filtersApp'));

        it('should camelize string', inject(function($filter) {
            var camelize = $filter('camelize');
            expect(camelize('Lorem ipsum dolor sit amet')).toBe('loremIpsumDolorSitAmet');
        }));
    });

    describe('dateApp', function() {
        beforeEach(module('dateApp'));

        var data = [
            { date: '01/05/2011', stamp: 1304200800, format: 'DD/MM/YYYY' },
            { date: '2.10.2001', stamp: 1001973600, format: 'D.M.YYYY' }
        ];

        it('should convert date to stamp', inject(function($filter) {
            var date2stamp = $filter('date2stamp');
            angular.forEach(data, function(item) {
                expect(date2stamp(item.date, item.format)).toBe(item.stamp);
            });
        }));

        it('should convert stamp to date', inject(function($filter) {
            var stamp2date = $filter('stamp2date');
            angular.forEach(data, function(item) {
                expect(stamp2date(item.stamp, item.format)).toBe(item.date);
            });
        }));

    });

});