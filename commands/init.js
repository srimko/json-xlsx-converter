const fs = require('fs-extra')
const chalk = require('chalk')
const red = chalk.red
const green = chalk.green
const grey = chalk.grey
const blue = chalk.blue
const path = require('path')
const _ = require('lodash')

function init (projectFolder, projectPath) {
  let folderTranslation = 'translation'
  let folderDefault = 'default'
  let folderJSON = 'json'
  let folderXLSX = 'xlsx'

  // Crating folder translation
  if(!fs.existsSync(folderTranslation)) {
    console.log(green('Folder ' + folderTranslation + ' was created...'))
    fs.mkdirSync(folderTranslation)
  }

  // We create projectFolder into translation folder
  let pathFolder = path.join(folderTranslation, projectFolder)
  if(!fs.existsSync(pathFolder)) {
    console.log(green('Folder ' + pathFolder + ' was created...'))
    fs.mkdirSync(pathFolder)

    // Json folder work
    fs.mkdirSync(path.join(pathFolder, folderJSON))
    fs.mkdirSync(path.join(pathFolder, folderJSON, 'jsonOri'))
    fs.mkdirSync(path.join(pathFolder, folderJSON, 'jsonTrad'))
    fs.mkdirSync(path.join(pathFolder, folderJSON, 'jsonTrad', 'fr'))
    fs.mkdirSync(path.join(pathFolder, folderJSON, 'jsonTrad', 'en'))
    fs.mkdirSync(path.join(pathFolder, folderJSON, 'jsonTrad', 'es'))
    fs.mkdirSync(path.join(pathFolder, folderJSON, 'jsonTrad', 'de'))

    // XLSX folder work
    fs.mkdirSync(path.join(pathFolder, folderXLSX))
    fs.mkdirSync(path.join(pathFolder, folderXLSX, 'xlsxOri'))
    fs.mkdirSync(path.join(pathFolder, folderXLSX, 'xlsxTrad'))
    fs.mkdirSync(path.join(pathFolder, folderXLSX, 'xlsxTrad', 'fr'))
    fs.mkdirSync(path.join(pathFolder, folderXLSX, 'xlsxTrad', 'en'))
    fs.mkdirSync(path.join(pathFolder, folderXLSX, 'xlsxTrad', 'es'))
    fs.mkdirSync(path.join(pathFolder, folderXLSX, 'xlsxTrad', 'de'))
  }

  if(projectFolder === 'default') {
    console.log('Don\'t forget to copy your json files ')
  } else {
    let files = fs.readdirSync(projectPath)

    _.each(files, (file, key) => {
      if(/(.json)/.test(file)){
        let pathTofile = path.join(projectPath, file)
        let pathToTranslateFile = path.join(pathFolder, folderJSON, 'jsonOri', file)
        fs.copySync(pathTofile, pathToTranslateFile)
      }
    })
  }
}

module.exports = init
