const fs = require('fs-extra')
const XLSX = require('xlsx')
const _ = require('lodash')
const nestedProperty = require("nested-property")
const chalk = require('chalk')
const red = chalk.red
const green = chalk.green
const grey = chalk.grey
const blue = chalk.blue

function populate (language) {
  let traductionFolder = __dirname + '/../xlsx/xlsxTrad/' + language
  let JSONFolderOri = __dirname + '/../json/jsonOri/'
  let JSONFolder = __dirname + '/../json/jsonTrad/' + language
  try {
    let file = fs.readdirSync(traductionFolder)

    if(file.length === 0) {
      console.log(red('No such traduction file inside xlsxTrad foler. Please insert a excel file.'))
      process.exit()
    } else {
      file = file[0]
      const workbook = XLSX.readFile(traductionFolder + '/' +file)
      const sheetNameList = workbook.SheetNames

      _.each(sheetNameList, function(JSONsheet, key) {
        console.time('populate-' + JSONsheet)
        let JSONsheetdata = XLSX.utils.sheet_to_json(workbook.Sheets[JSONsheet])

        let JSONfile = fs.readJsonSync(JSONFolderOri + '/' + JSONsheet + '.json', 'UTF-8')

        _.each(JSONsheetdata, function (value) {
          nestedProperty.set(JSONfile, value.Reference, value.Target)
        })

        fs.copySync(JSONFolderOri + '/' + JSONsheet + '.json', JSONFolder + '/' + JSONsheet + '.json')

        fs.writeJSONSync(JSONFolder + '/' + JSONsheet + '.json', JSONfile)
        console.timeEnd('populate-' + JSONsheet)
      })
    }
  } catch (e) {
    console.log(red(e))
  }
}

module.exports = populate
