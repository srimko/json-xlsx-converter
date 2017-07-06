// const fs = require('fs-extra')
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

// const inquirer = require('inquirer')
// const path = require('path')

function hardRemoveDuplicate () {
  console.log('hardRemoveDuplicate')

  let path = '/Users/srimko/lab_node/json-xlsx-converter/translation/web-course03/xlsx/xlsxOri/extract-course03.xlsx'

  const workbook = XLSX.readFile(path)
  const sheetNameList = workbook.SheetNames

  let newXLSX = excelbuilder.createWorkbook('./', 'extract-course03-light.xlsx')

  let newFile = []

  _.each(sheetNameList, function (JSONsheet, key) {
    let sheet = newXLSX.createSheet(JSONsheet, 4, 1000)

    sheet.set(1, 1, 'Reference')
    sheet.width(1, 25)
    sheet.set(2, 1, 'Source')
    sheet.width(2, 70)
    sheet.set(3, 1, 'Target')
    sheet.width(3, 70)
    sheet.set(4, 1, 'Clean')
    sheet.width(4, 70)
    let JSONsheetdata = XLSX.utils.sheet_to_json(workbook.Sheets[JSONsheet])

    newFile = _.uniqBy(JSONsheetdata, 'Target')

    _.each(newFile, function (value, key) {
      sheet.set(1, key + 2, value.Reference)
      sheet.set(2, key + 2, value.Source)
      sheet.set(3, key + 2, value.Target)
      sheet.set(4, key + 2, value.Clean)
    })
  })

  newXLSX.save(function (err) {
    if (err) throw err
    else {
      console.log(green('new.xlsx') + ' was created')
    }
  })
}

module.exports = hardRemoveDuplicate
