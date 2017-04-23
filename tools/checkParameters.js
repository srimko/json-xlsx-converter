const fs = require('fs')
const _ = require('lodash')

function checkParameters (params) {
  params = params.slice(2)

  if ((_.indexOf(params, '-init') !== -1) || (_.indexOf(params, '-i') !== -1)) {
    return {
      "command": 'init',
      "param": '',
    }
  } else if ((_.indexOf(params, '-extract') !== -1) || (_.indexOf(params, '-e') !== -1)) {
    if (params[1] === undefined) {
      params[1] = ''
    }
    return {
      "command": 'extract',
      "folder": params[1],
    }
  } else if ((_.indexOf(params, '-populate') !== -1) || (_.indexOf(params, '-p') !== -1)) {
    if (params[1] === undefined) {
      params[1] = ''
    }
    return {
      "command": 'populate',
      "language": params[1],
    }
  }
}

module.exports = checkParameters
