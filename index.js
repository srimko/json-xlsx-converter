// const fs = require('fs-extra')
// const Entities = require('html-entities').AllHtmlEntities
const _ = require('lodash')
// const path = require('path')
// const htmlToText = require('html-to-text')
// const chalk = require('chalk')
// const red = chalk.red
// const green = chalk.green
// const grey = chalk.grey
// const blue = chalk.blue
// const excelbuilder = require('msexcel-builder')

// var log = require('single-line-log').stdout;
// const checkFileExistsSync = require('./tools/checkFileExistsSync')
const init = require('./commands/init')
const extract = require('./commands/extract')
const populate = require('./commands/populate')
const checkParameters = require('./tools/checkParameters')

let functionToExecute = checkParameters(process.argv)

_.mixin(require('lodash-deep'))

switch (functionToExecute.command) {
  case 'init':
    init(functionToExecute.folder, functionToExecute.path)
    break
  case 'extract':
    extract(functionToExecute.folder)
    break
  case 'populate':
    populate(functionToExecute.language)
    break
  default:
    console.log('Bad commands')
    process.exit()
}
