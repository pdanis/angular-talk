basePath = '../';

port = 8088;

files = [
  JASMINE,
  JASMINE_ADAPTER,
  'lib/angular.js',
  'lib/angular-mocks.js',
  'lib/moment.js',
  'js/*.js',
  'test/unit/*.js',
  'js/puzzle/*.js',
  'test/unit/puzzle/*.js'
];

exclude = ['js/routing.js', 'js/ngx.js'];

autoWatch = true;
autoWatchInterval = 1;
browsers = ['Firefox'];
logLevel = LOG_INFO;
logColors = true;
reporter = 'dots';
