const _ = require('lodash');
const strip = require('css-strip-units');

function extractMinWidths(breakpoints) {
  return _.flatMap(breakpoints, breakpoints => {
    if (_.isString(breakpoints)) {
      breakpoints = { min: breakpoints }
    }

    if (!_.isArray(breakpoints)) {
      breakpoints = [breakpoints]
    }

    return _(breakpoints)
      .filter(breakpoint => {
        return _.has(breakpoint, 'min') || _.has(breakpoint, 'min-width')
      })
      .map(breakpoint => {
        return _.get(breakpoint, 'min-width', breakpoint.min)
      })
      .value()
  })
}

module.exports = function(options) {
  return function({addComponents, theme}) {
    const screens = _.get(options, 'screens', theme('screens'))
    const minWidths = extractMinWidths(screens);

    const atRules = _.map(minWidths, minWidth => {
      const unit = strip(minWidth);
      return {
        [`@media (min-width: ${minWidth})`]: {
          '.half-container': {
            'max-width': `${parseInt(minWidth, 10) / 2}${unit}`,
          },
        },
      }
    })
    addComponents([
      {
        '.half-container': Object.assign(
          {'width': '100%'},
          _.get(options, 'center', false) ? { marginRight: 'auto', marginLeft: 'auto' } : { marginLeft: 'auto'},
          _.has(options, 'padding')
            ? { paddingRight: options.padding, paddingLeft: options.padding }
          : {}
        )
      },
      {
        '.half-container--end': Object.assign(
          _.get(options, 'center', false) ? { marginRight: 'auto', marginLeft: 'auto' } : { marginRight: 'auto', marginLeft: 'initial'},
        )
      },
      ...atRules
    ]);
  }
}
