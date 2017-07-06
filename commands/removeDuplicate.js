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

function removeDuplicate () {
  console.log('removeDuplicate')

  let path = '/Users/srimko/lab_node/json-xlsx-converter/translation/web-course01/xlsx/xlsxOri/extract.xlsx'

  const workbook = XLSX.readFile(path)
  const sheetNameList = workbook.SheetNames

  let xlsxFile = excelbuilder.createWorkbook('./', 'file.xlsx')
  var sheet1 = xlsxFile.createSheet('sheet1', 4, 1000)

  sheet1.set(1, 1, 'Reference')
  sheet1.set(2, 1, 'Source')
  sheet1.set(3, 1, 'Target')
  sheet1.set(4, 1, 'Clean')

  _.each(sheetNameList, function (JSONsheet, key) {
    let JSONsheetdata = XLSX.utils.sheet_to_json(workbook.Sheets[JSONsheet])

    let duplicate = ''
    // let duplicateObject = {}
    let resetRow = 0
    _.each(JSONsheetdata, function (data, key) {
      if (JSONsheet === 'components') {
        let valueReference = ''
        // let arrayReference = []

        if (key === 0) {
          if (data.Target === JSONsheetdata[key + 1].Target) {
            // duplicate = data.Reference
          } else {
            sheet1.set(1, key + 2 - resetRow, data.Reference)
            sheet1.set(2, key + 2 - resetRow, data.Source)
            sheet1.set(3, key + 2 - resetRow, data.Target)
            sheet1.set(4, key + 2 - resetRow, data.Clean)
          }
        } else if (key > 0 && key < JSONsheetdata.length - 1) {
          valueReference = data.Target

          if (valueReference === JSONsheetdata[key + 1].Target) {
            // Contact ref plus ref next
            if (duplicate !== '') {
              duplicate = duplicate + ',' + JSONsheetdata[key + 1].Reference
            } else {
              duplicate = data.Reference + ',' + JSONsheetdata[key + 1].Reference
            }
            resetRow++
            console.log(resetRow)
          } else {
            if (duplicate !== '') {
              console.log(duplicate)
              sheet1.set(1, key + 2 - resetRow, duplicate)
              sheet1.set(2, key + 2 - resetRow, data.Source)
              sheet1.set(3, key + 2 - resetRow, valueReference)
              sheet1.set(4, key + 2 - resetRow, data.Clean)
            } else {
              sheet1.set(1, key + 2 - resetRow, data.Reference)
              sheet1.set(2, key + 2 - resetRow, data.Source)
              sheet1.set(3, key + 2 - resetRow, data.Target)
              sheet1.set(4, key + 2 - resetRow, data.Clean)
            }
            valueReference = ''
            duplicate = ''
            // sheet1.set(1, key + 2, data.Reference)
            // sheet1.set(2, key + 2, data.Source)
            // sheet1.set(3, key + 2, data.Target)
            // sheet1.set(4, key + 2, data.Clean)
          }

          // if(data.Target === valueReference)
        } else {
          if (duplicate !== '') {
            console.log(duplicate)
            sheet1.set(1, key + 2 - resetRow, duplicate)
            sheet1.set(2, key + 2 - resetRow, data.Source)
            sheet1.set(3, key + 2 - resetRow, valueReference)
            sheet1.set(4, key + 2 - resetRow, data.Clean)
          }
        }
      }
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
