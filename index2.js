const fs = require('fs-extra')
const XLSX = require('xlsx')
const _ = require('lodash')
const nestedProperty = require("nested-property");

let fileName = './xlsx/articles.xlsx'

const workbook = XLSX.readFile(fileName)
const sheetNameList = workbook.SheetNames

let JSONsheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetNameList[0]])
let file = fs.readJsonSync('./json/articles.json', 'UTF-8')

_.each(JSONsheet, function (value) {
  nestedProperty.set(file, value.Reference, value.Target)
})

console.log(file)
