const fs = require('fs-extra')
const XLSX = require('xlsx')
const excelbuilder = require('msexcel-builder')
const _ = require('lodash')
// const nestedProperty = require('nested-property')
const chalk = require('chalk')
const red = chalk.red
const green = chalk.green
const grey = chalk.grey
const blue = chalk.blue
// const yellow = chalk.yellow

// const inquirer = require('inquirer')
const path = require('path')


function removeDuplicate () {
  console.log("removeDuplicate")

  let path = "/Users/srimko/lab_node/json-xlsx-converter/translation/web-course01/xlsx/xlsxOri/extract.xlsx"

  const workbook = XLSX.readFile(path)
  const sheetNameList = workbook.SheetNames

  let xlsxFile = excelbuilder.createWorkbook('./', 'file.xlsx')
  var sheet1 = xlsxFile.createSheet('sheet1', 4, 1000);

  sheet1.set(1, 1, 'Reference')
  sheet1.set(2, 1, 'Source')
  sheet1.set(3, 1, 'Target')
  sheet1.set(4, 1, 'Clean')


  // sheet1.set(3, 1, 'Target')

  _.each(sheetNameList, function (JSONsheet, key) {
    let JSONsheetdata = XLSX.utils.sheet_to_json(workbook.Sheets[JSONsheet])

    let duplicate = ""
    let duplicateObject = {}
    _.each(JSONsheetdata, function (data, key) {
      if(JSONsheet === "components") {
        if(key > 0) {
          if(data.Target !== "true" && data.Target !== "false") {

            if(data.Target === JSONsheetdata[key - 1].Target) {
              if(duplicate === "") {
                duplicate = JSONsheetdata[key - 1].Reference + ","+ data.Reference
              } else {
                duplicate += "," + data.Reference
              }
            } else {
              duplicate = ""
              // console.log(data.Target)
            }


            if(duplicate !== "") {
              duplicateObject = {path: duplicate, value: data.Target}
              sheet1.set(1, key + 2, duplicateObject.path)
            } else {
              sheet1.set(1, key + 2, data.Reference)
            }
            sheet1.set(2, key + 2, data.Source)
            sheet1.set(3, key + 2, data.Target)
            sheet1.set(4, key + 2, data.Clean)
          }
        }
      }
    })

  })

  xlsxFile.save(function (err) {
    if (err) throw err
    else {
      console.log(green('extract.xlsx') + ' was created')
      console.timeEnd('extract')
    }
  })

}

module.exports = removeDuplicate
