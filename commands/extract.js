const fs = require('fs-extra')
const _ = require('lodash')
const path = require('path')
const chalk = require('chalk')
const red = chalk.red
const green = chalk.green
const grey = chalk.grey
const blue = chalk.blue

const Entities = require('html-entities').AllHtmlEntities
const htmlToText = require('html-to-text')
const excelbuilder = require('msexcel-builder')

const prompt = require('prompt')
const log = require('single-line-log').stdout;
const inquirer = require('inquirer')

function extract (folder) {
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
    message: 'What do you want to extract?',
    choices: folders
  }).then(function (answers) {
    workFolder = path.join(folderTranslation, answers.folder)
    workFolderJSON = path.join(workFolder, 'json', 'jsonOri')
    workFolderXLSX = path.join(workFolder, 'xlsx', 'xlsxOri')
    confFolder = path.join(__dirname, '..', 'config')
    // console.log(JSON.stringify(answers, null, '  '));

    let files = fs.readdirSync(workFolderJSON)

    let workbook = excelbuilder.createWorkbook(workFolderXLSX, 'extract.xlsx')

    _.each(files, function(file, key) {
      console.time('extract')
      let fileBasename = path.basename(file, '.json')
      let jsonFile = path.join(workFolderJSON, file)
      let jsonConf = path.join(confFolder, fileBasename + '.conf')

      jsonConf = fs.readJsonSync(jsonConf)

      // Make filter
      let reg = jsonConf.exception.join('|')
      var regex = new RegExp(reg)

      let paths = []
      let tags = []
      let toTranslate = []

      _.deepMapValues(jsonFile, function (value, path) {
        paths.push(path)
        tags.push(value)
        toTranslate.push(value)
      })

      let sheet = workbook.createSheet(fileBasename, 4, paths.length + 2)

      // Fill some data
      sheet.set(1, 1, 'Reference')
      sheet.width(1, 25)
      sheet.set(2, 1, 'Source')
      sheet.width(2, 70)
      sheet.set(3, 1, 'Target')
      sheet.width(3, 70)
      sheet.set(4, 1, 'Clean')
      sheet.width(4, 70)

      let resetRow = 1
      _.each(paths, function (value, key) {
        let rows = key + 3

        let goodPaths = paths[key]
        if (!/([0-9]*)\./g.test(goodPaths)) {
          goodPaths = '0.' + goodPaths
        }
        // goodPaths = paths[key].replace(/^([0-9]*)\./g, '[$1].')
        // goodPaths = goodPaths.replace(/\.([0-9]*)\./g, '[$1].')
        // goodPaths = goodPaths.replace(/(\.([0-9]))/g, '.[$2]')

        let test = regex.test(goodPaths)

        if (test && toTranslate[key] !== '') {
          // log(green(fileBasename + ' : ' + goodPaths))

          if (toTranslate[key] === null) {
            toTranslate[key] = 'null'
          }

          sheet.set(1, rows - resetRow, goodPaths)
          sheet.set(2, rows - resetRow, Entities.decode(toTranslate[key].toString()))
          sheet.set(3, rows - resetRow, Entities.decode(toTranslate[key].toString()))
          sheet.set(4, rows - resetRow, htmlToText.fromString(Entities.decode(toTranslate[key].toString())))
        } else {
          try {
            // log(red(fileBasename + ' : ' + goodPaths))
          } catch (e) {
            // log(red(test))
          }
          resetRow++
        }
      })
    })

    //  Save it
    workbook.save(function (err) {
      if (err) throw err
      else {
        console.log(green('extract.xlsx') +' was created')
        console.timeEnd('extract')
      }
    })

  });
}

module.exports = extract
