files = [
  JASMINE,
  JASMINE_ADAPTER,
  '*.coffee'
];

exclude = [];

autoWatch = true;

browsers = ['Chrome'];

preprocessors = {
  '**/*.coffee': 'coffee'
};

plugins = ['coffee-preprocessor'];
