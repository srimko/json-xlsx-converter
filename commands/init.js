const fs = require('fs')
const chalk = require('chalk')
const red = chalk.red
const green = chalk.green
const grey = chalk.grey
const blue = chalk.blue

function init () {
  let folderJSON = 'json'
  let folderXLSX = 'xlsx'
  let folderSource = 'souce'

  if(!fs.existsSync(folderJSON)) {
    console.log(green(folderJSON + ' has been created'))
    fs.mkdirSync(folderJSON)
    fs.mkdirSync(folderJSON + '/' + 'jsonOri')
    fs.mkdirSync(folderJSON + '/' + 'jsonTrad')
    fs.mkdirSync(folderJSON + '/' + 'jsonTrad/fr')
    fs.mkdirSync(folderJSON + '/' + 'jsonTrad/en')
    fs.mkdirSync(folderJSON + '/' + 'jsonTrad/es')
    fs.mkdirSync(folderJSON + '/' + 'jsonTrad/de')
    console.log(green(folderJSON + '/' + 'jsonOri'))
    console.log(green(folderJSON + '/' + 'jsonTrad'))

  } else {
    console.log(folderJSON + ' already exist')
  }

  if(!fs.existsSync(folderXLSX)) {
    fs.mkdirSync(folderXLSX)
    fs.mkdirSync(folderXLSX + '/' + 'xlsxOri')
    fs.mkdirSync(folderXLSX + '/' + 'xlsxTrad')
    fs.mkdirSync(folderXLSX + '/' + 'xlsxTrad/fr')
    fs.mkdirSync(folderXLSX + '/' + 'xlsxTrad/en')
    fs.mkdirSync(folderXLSX + '/' + 'xlsxTrad/es')
    fs.mkdirSync(folderXLSX + '/' + 'xlsxTrad/de')
    console.log(green(folderXLSX + ' has been created'))
    console.log(green(folderXLSX + '/' + 'xlsxOri'))
    console.log(green(folderXLSX + '/' + 'xlsxTrad'))
  } else {
    console.log(folderXLSX + ' already exist')
  }
  if(!fs.existsSync(folderSource)) {
    fs.mkdirSync(folderSource)
  } else {
    console.log(folderSource + ' already exist')
  }
}

module.exports = init
