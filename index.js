const fs = require('fs-extra')
const Entities = require('html-entities').AllHtmlEntities
const _ = require('lodash')
const path = require('path')
const htmlToText = require('html-to-text')
const chalk = require('chalk')
const red = chalk.red
const green = chalk.green
const grey = chalk.grey
const blue = chalk.blue
const excelbuilder = require('msexcel-builder')

var log = require('single-line-log').stdout;
// const checkFileExistsSync = require('./tools/checkFileExistsSync')
const init = require('./tools/init')
const checkParameters = require('./tools/checkParameters')

let functionToExecute = checkParameters(process.argv)

switch (functionToExecute.commad) {
  case 'init':
    init()
    break;
  case 'extract':
    extract(functionToExecute.folder)
    break;
  default:
}

_.mixin(require('lodash-deep'))

let folder
if(process.argv[2] !== undefined) {
  folder = process.argv[2]
  if(!fs.existsSync(folder)) {
    console.log(red('The ' + folder + ' folder doesn\'t exist.'))
    process.exit()
  }
} else {
  folder = './json'
}

// fs.readdir(folder, (err, files) => {
//   if (err) throw err
//
//   files = _.filter(files, function(file) {
//     if(/(.json)/.test(file)){
//       return file
//     } else {
//       return false
//     }
//   })
//
//   files.forEach(file => {
//     let fileBasename = path.basename(file, '.json')
//
//     let jsonFile = fs.readJsonSync(__dirname + '/json/' + fileBasename + '.json')
//     let jsonFileCopy = fs.readJsonSync(__dirname + '/jsonNew/' + fileBasename + '.json')
//     let jsonConf = fs.readJsonSync(__dirname + '/config/' + fileBasename + '.conf')
//
//     // Copy
//     fs.createReadStream(jsonFile).pipe(fs.createWriteStream(jsonFileCopy));
//
//     // Make filter
//     let reg = jsonConf.exception.join('|')
//     var regex = new RegExp(reg)
//
//     let paths = []
//     let tags = []
//     let toTranslate = []
//
//     _.deepMapValues(jsonFile, function (value, path) {
//       paths.push(path)
//       tags.push(value)
//       toTranslate.push(value)
//     })
//
//     let workbook = excelbuilder.createWorkbook('./xlsx', fileBasename + '.xlsx')
//     let sheet1 = workbook.createSheet('sheet1', 4, paths.length + 2)
//
//     // Fill some data
//     sheet1.set(1, 1, 'Reference')
//     sheet1.width(1, 25)
//     sheet1.set(2, 1, 'Source')
//     sheet1.width(2, 70)
//     sheet1.set(3, 1, 'Target')
//     sheet1.width(3, 70)
//     sheet1.set(4, 1, 'Clean')
//     sheet1.width(4, 70)
//
//     let resetRow = 1
//     // let witness = 0;
//     _.each(paths, function (value, key) {
//       let rows = key + 3
//
//       let goodPaths = paths[key]
//       if (!/([0-9]*)\./g.test(goodPaths)) {
//         goodPaths = '0.' + goodPaths
//       }
//       // goodPaths = paths[key].replace(/^([0-9]*)\./g, '[$1].')
//       // goodPaths = goodPaths.replace(/\.([0-9]*)\./g, '[$1].')
//       // goodPaths = goodPaths.replace(/(\.([0-9]))/g, '.[$2]')
//
//       let test = regex.test(goodPaths)
//
//       if (test && toTranslate[key] !== '') {
//         log(green(test + ' ' + goodPaths))
//
//         if (toTranslate[key] === null) {
//           toTranslate[key] = 'null'
//         }
//
//         sheet1.set(1, rows - resetRow, goodPaths)
//         sheet1.set(2, rows - resetRow, Entities.decode(toTranslate[key].toString()))
//         sheet1.set(3, rows - resetRow, Entities.decode(toTranslate[key].toString()))
//         sheet1.set(4, rows - resetRow, htmlToText.fromString(Entities.decode(toTranslate[key].toString())))
//       } else {
//         try {
//           log(red(test + ' ' + goodPaths + ' : ' + Entities.decode(toTranslate[key].toString())))
//         } catch (e) {
//           log(red(test))
//         }
//         resetRow++
//       }
//       // witness++;
//     })
//
//     //  Save it
//     workbook.save(function (err) {
//       if (err) throw err
//       else {
//         console.log(green(fileBasename + '.xlsx') +' was created')
//       }
//     })
//   })
// })
