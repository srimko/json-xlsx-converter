const fs = require('fs-extra')
const XLSX = require('xlsx')
const _ = require('lodash')
const nestedProperty = require("nested-property")
const chalk = require('chalk')
const red = chalk.red
const green = chalk.green
const grey = chalk.grey
const blue = chalk.blue
const yellow = chalk.yellow

const inquirer = require('inquirer')
const path = require('path')

function populate (language) {
  let folderTranslation = 'translation'
  let workFolder
  let workFolderJSON
  let workFolderXLSX

  let folders = fs.readdirSync(folderTranslation)
  folders = _.filter(folders, function(folder) {
    if(!/(.DS_Store)/.test(folder)){
      return true
    }
  })

  inquirer.prompt({
    type: 'list',
    name: 'folder',
    message: 'What do you want to populate?',
    choices: folders
  }).then(function (answers) {
    workFolder = path.join(__dirname, '..', folderTranslation, answers.folder)
    workFolderJSONOri = path.join(workFolder, 'json', 'jsonOri')
    workFolderJSON = path.join(workFolder, 'json', 'jsonTrad')
    workFolderXLSX = path.join(workFolder, 'xlsx', 'xlsxTrad')

    let folders =  fs.readdirSync(workFolderXLSX)

    folders = _.filter(folders, function(folder) {
      let pathFolder = path.join(workFolderXLSX, folder)
      if(!fs.statSync(pathFolder).isDirectory()) return false
      let files = fs.readdirSync(pathFolder)
      if(files.length) return true
    })

    if(folders.length !== 0) {
      inquirer.prompt({
        type: 'list',
        name: 'folder',
        message: 'Which language?',
        choices: folders
      }).then(function (answers) {
        let files = fs.readdirSync(path.join(workFolderXLSX, answers.folder))
        let extractFile = path.join(workFolderXLSX, answers.folder, files[0])
        let jsonTradFolder = path.join(workFolderJSON, answers.folder)

        const workbook = XLSX.readFile(extractFile)
        const sheetNameList = workbook.SheetNames

        _.each(sheetNameList, function(JSONsheet, key) {
          console.time('populate-' + JSONsheet)
          let JSONsheetdata = XLSX.utils.sheet_to_json(workbook.Sheets[JSONsheet])

          let JSONFilePathOri = path.join(workFolderJSONOri, JSONsheet + '.json')
          // let JSONfile = path.join(JSONFilePathOri)
          let JSONfile = fs.readJsonSync(JSONFilePathOri, 'UTF-8')

          _.each(JSONsheetdata, function (value) {
            nestedProperty.set(JSONfile, value.Reference, value.Target)
          })

          fs.copySync(JSONFilePathOri, path.join(jsonTradFolder, JSONsheet + '.json'))

          fs.writeJSONSync(path.join(jsonTradFolder, JSONsheet + '.json'), JSONfile)
          console.timeEnd('populate-' + JSONsheet)
        })
      })
    } else {
      console.log(yellow('Please don\'t forget to put a file in language directory'))
    }

  })
}

module.exports = populate
