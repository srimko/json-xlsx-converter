// const fs = require('fs')
const _ = require('lodash')
// const path = require('path')

function checkParameters (params) {
  params = params.slice(2)

  if ((_.indexOf(params, '-init') !== -1) || (_.indexOf(params, '-i') !== -1)) {
    let folder
    if (params[1] === undefined) {
      folder = 'default'
    } else {
      let pathSplited = params[1].split('/')
      _.each(pathSplited, function (value, key) {
        if (pathSplited[key + 1] === 'src') {
          folder = pathSplited[key]
        }
      })
    }

    return {
      'command': 'init',
      'folder': folder,
      'path': params[1]
    }
  } else if ((_.indexOf(params, '-extract') !== -1) || (_.indexOf(params, '-e') !== -1)) {
    if (params[1] === undefined) {
      params[1] = 'default'
    }
    return {
      'command': 'extract',
      'folder': params[1]
    }
  } else if ((_.indexOf(params, '-populate') !== -1) || (_.indexOf(params, '-p') !== -1)) {
    if (params[1] === undefined) {
      params[1] = ''
    }
    return {
      'command': 'populate',
      'language': params[1]
    }
  } else if ((_.indexOf(params, '-removeDuplicate') !== -1) || (_.indexOf(params, '-rd') !== -1)) {
    if (params[1] === undefined) {
      params[1] = ''
    }
    return {
      'command': 'removeDuplicate',
      'language': params[1]
    }
  } else if ((_.indexOf(params, '-hardRemoveDuplicate') !== -1) || (_.indexOf(params, '-rd') !== -1)) {
    if (params[1] === undefined) {
      params[1] = ''
    }
    return {
      'command': 'hardRemoveDuplicate',
      'language': params[1]
    }
  }
}

module.exports = checkParameters
