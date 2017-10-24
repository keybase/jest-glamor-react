'use strict';

var replaceClassNames = function replaceClassNames(selectors, styles, code) {
  var remap = selectors.map(function (s) {
    return { idx: styles.indexOf(s), s };
  });
  selectors = remap.sort(function (a, b) {
    return a.idx - b.idx;
  }).map(function (item) {
    return item.s;
  });

  var index = 0;
  return selectors.reduce(function (acc, className) {
    if (className.indexOf('.css-') === 0) {
      var escapedRegex = new RegExp(className.replace('.', '').replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&'), 'g');
      return acc.replace(escapedRegex, `glamor-${index++}`);
    }
    return acc;
  }, `${styles}\n\n${code}`);
};

module.exports = { replaceClassNames };