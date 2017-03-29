const fs = require('fs-extra')
const Entities = require('html-entities').AllHtmlEntities;
const _ = require('lodash')

const chalk = require('chalk')
const red = chalk.red
const green = chalk.green
const grey = chalk.grey
const blue = chalk.blue


const excelbuilder = require('msexcel-builder');
_.mixin(require("lodash-deep"));

let jsonToExtract = fs.readJsonSync(__dirname + '/json/file.json')

let paths = []
let tags = []
let toTranslate = []

_.deepMapValues(jsonToExtract, function(value, path){
  paths.push(path)
  tags.push(value)
  toTranslate.push(value)
});

let workbook = excelbuilder.createWorkbook('./xlsx', 'sample.xlsx')

let sheet1 = workbook.createSheet('sheet1', 3, paths.length + 2);

// Fill some data
sheet1.set(1, 1, 'Reference')
sheet1.set(2, 1, 'Source')
sheet1.set(3, 1, 'Target')

_.each(paths, function(value, key) {
  let rows = key + 2

  sheet1.set(1, rows, paths[key])
  sheet1.set(2, rows, tags[key])
  sheet1.set(3, rows, Entities.decode(toTranslate[key]))
})


 // Save it
 workbook.save(function(err){
   if (err)
     throw err;
   else
     console.log('congratulations, your workbook created');
 });
