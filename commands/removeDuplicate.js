const fs = require('fs-extra')
const XLSX = require('xlsx')
const excelbuilder = require('msexcel-builder')
const _ = require('lodash')
// const nestedProperty = require('nested-property')
const chalk = require('chalk')
// const red = chalk.red
const green = chalk.green
// const grey = chalk.grey
// const blue = chalk.blue
// const yellow = chalk.yellow

const inquirer = require('inquirer')
const path = require('path')

function removeDuplicate () {
  console.log('removeDuplicate')

  let folderTranslation = 'translation'
  let workFolder
  let workFolderXLSXOri
  let workFolderXLSXOriLanguage

  let folders = fs.readdirSync(folderTranslation)
  folders = _.filter(folders, function (folder) {
    if (!/(.DS_Store)/.test(folder)) {
      return true
    }
  })

  inquirer.prompt({
    type: 'list',
    name: 'folder',
    message: 'Select a folder :',
    choices: folders
  }).then(function (answers) {
    console.log(answers)
    workFolder = path.join(__dirname, '..', folderTranslation, answers.folder)
    // let workFolderJSONOri = path.join(workFolder, 'json', 'jsonOri')
    // workFolderJSON = path.join(workFolder, 'json', 'jsonTrad')
    workFolderXLSXOri = path.join(workFolder, 'xlsx', 'xlsxOri')

    let languages = fs.readdirSync(workFolderXLSXOri)
    languages = _.filter(languages, function (folder) {
      if (!/(.DS_Store)/.test(folder)) {
        return true
      }
    })

    inquirer.prompt({
      type: 'list',
      name: 'file',
      message: 'Select a file :',
      choices: languages
    }).then(function (answers) {
      let file = answers.file
      workFolderXLSXOriLanguage = path.join(workFolderXLSXOri, file)
      remove(workFolderXLSXOriLanguage , workFolderXLSXOri)
    })
  })
}

function remove (file, path) {
  console.log(file)
  // let path = '/Users/srimko/lab_node/json-xlsx-converter/translation/web-course01/xlsx/xlsxOri/extract.xlsx'

  const workbook = XLSX.readFile(file)
  const sheetNameList = workbook.SheetNames

  let xlsxFile = excelbuilder.createWorkbook(path, 'extract-clean.xlsx')

  _.each(sheetNameList, function (JSONsheet, key) {
    let duplicateToExport = []
    let JSONsheetdata = XLSX.utils.sheet_to_json(workbook.Sheets[JSONsheet])

    var sheet = xlsxFile.createSheet(JSONsheet, 4, 1000)
    sheet.set(1, 1, 'Reference')
    sheet.width(1, 25)
    sheet.set(2, 1, 'Source')
    sheet.width(2, 70)
    sheet.set(3, 1, 'Target')
    sheet.width(3, 70)
    sheet.set(4, 1, 'Clean')
    sheet.width(4, 70)

    _.each(JSONsheetdata, function (data, key) {
      let duplicateObject = {reference: '', target: ''}
      _.each(JSONsheetdata, function (data1, key1) {
        if (data.Target === data1.Target) {
          // console.log(data.Reference + ' ' + data1.Reference)
          if (duplicateObject.reference !== '') {
            duplicateObject.reference = duplicateObject.reference + '/' + data1.Reference
            duplicateObject.source = data1.Source
            duplicateObject.target = data1.Target
            duplicateObject.clean = data1.Clean
          } else {
            duplicateObject.reference = data1.Reference
            duplicateObject.source = data1.Source
            duplicateObject.target = data1.Target
            duplicateObject.clean = data1.Clean
          }
        }
      })

      // console.log(duplicateObject)
      duplicateToExport.push(duplicateObject)
    })
    duplicateToExport = _.uniqBy(duplicateToExport, 'reference')

    _.each(duplicateToExport, function (data, key) {
      sheet.set(1, key + 2, data.reference)
      sheet.set(2, key + 2, data.source)
      sheet.set(3, key + 2, data.target)
      sheet.set(4, key + 2, data.clean)
    })
  })

  xlsxFile.save(function (err) {
    if (err) throw err
    else {
      console.log(green('file.xlsx') + ' was created')
    }
  })
}

module.exports = removeDuplicate
