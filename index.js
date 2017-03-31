const fs = require('fs-extra')
const Entities = require('html-entities').AllHtmlEntities;
const _ = require('lodash')

const htmlToText = require('html-to-text')

const chalk = require('chalk')
const red = chalk.red
const green = chalk.green
const grey = chalk.grey
const blue = chalk.blue

const excelbuilder = require('msexcel-builder');

const checkFileExistsSync = require('./tools/checkFileExistsSync')

fs.readdir('./json', (err, files) => {
  files.forEach(file => {
    console.log(file);
  });
})

_.mixin(require("lodash-deep"));

let jsonToExtract = fs.readJsonSync(__dirname + '/json/course.json')

let config = fs.readJsonSync(__dirname + '/config/course.conf')

// Make filter
let reg = config.exception.join('|')
var regex = new RegExp(reg);

let paths = []
let tags = []
let toTranslate = []

_.deepMapValues(jsonToExtract, function(value, path){
  paths.push(path)
  tags.push(value)
  toTranslate.push(value)
});


let workbook = excelbuilder.createWorkbook('./xlsx', 'course.xlsx')

let sheet1 = workbook.createSheet('sheet1', 4, paths.length + 2);

// Fill some data
sheet1.set(1, 1, 'Reference')
sheet1.width(1, 25)
sheet1.set(2, 1, 'Source')
sheet1.width(2, 70)
sheet1.set(3, 1, 'Target')
sheet1.width(3, 70)
sheet1.set(4, 1, 'Clean')
sheet1.width(4, 70)

let resetRow = 1
// let witness = 0;
_.each(paths, function(value, key) {
  let rows = key + 3

  let goodPaths = paths[key]
  // if(!/([0-9]*)\./g.test(goodPaths)) {
  //   goodPaths = '0.' + goodPaths
  // }
  // goodPaths = paths[key].replace(/^([0-9]*)\./g, '[$1].')
  // goodPaths = goodPaths.replace(/\.([0-9]*)\./g, '[$1].')
  // goodPaths = goodPaths.replace(/(\.([0-9]))/g, '.[$2]')


  let test = regex.test(goodPaths)

  console.log(red(test), green(toTranslate[key] !== ""), goodPaths)
  if(test && toTranslate[key] !== "") {
    // console.log(green(test + ' ' + goodPaths))

    if(toTranslate[key] === null) {
      toTranslate[key] = 'null'
    }

    sheet1.set(1, rows - resetRow, goodPaths)
    sheet1.set(2, rows - resetRow, Entities.decode(toTranslate[key].toString()))
    sheet1.set(3, rows - resetRow, Entities.decode(toTranslate[key].toString()))
    sheet1.set(4, rows - resetRow, htmlToText.fromString(Entities.decode(toTranslate[key].toString())))

  } else {
    // console.log(red(test + ' ' + goodPaths + ' : ' + Entities.decode(toTranslate[key].toString())))
    resetRow++
  }
  // witness++;
})


console.log(regex)
 // Save it
 workbook.save(function(err){
   if (err)
     throw err;
   else
     console.log('congratulations, your workbook created');
 });
