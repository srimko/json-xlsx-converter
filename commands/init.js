const fs = require('fs')
const chalk = require('chalk')
const red = chalk.red
const green = chalk.green
const grey = chalk.grey
const blue = chalk.blue

function init () {
  let folderJSON = 'json'
  let folderXLSX = 'xlsx'

  if(!fs.existsSync(folderJSON)) {
    console.log(green(folderJSON + ' has been created'))
    fs.mkdirSync(folderJSON)
    fs.mkdirSync(folderJSON + '/' + 'jsonOri')
    fs.mkdirSync(folderJSON + '/' + 'jsonTrad')
    console.log(green(folderJSON + '/' + 'jsonOri'))
    console.log(green(folderJSON + '/' + 'jsonTrad'))

  } else {
    console.log(folderJSON + ' already exist')
  }

  if(!fs.existsSync(folderXLSX)) {
    fs.mkdirSync(folderXLSX)
    fs.mkdirSync(folderXLSX + '/' + 'xlsxOri')
    fs.mkdirSync(folderXLSX + '/' + 'xlsxTrad')
    console.log(green(folderXLSX + ' has been created'))
    console.log(green(folderXLSX + '/' + 'xlsxOri'))
    console.log(green(folderXLSX + '/' + 'xlsxTrad'))
  } else {
    console.log(folderXLSX + ' already exist')
  }
}

module.exports = init
