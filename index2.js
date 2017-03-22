'use strict'

let fs = require('fs-extra')
let _ = require('lodash')
let debug = require('debug')('index')

let chalk = require('chalk')

let jsonToExtract = fs.readJsonSync(__dirname + '/json/file.json')

var paths = ''

scan(jsonToExtract)

function scan(obj, parent = '')
{
  let k
  if (obj instanceof Object) {
    for (k in obj){
      if (obj.hasOwnProperty(k)){
        if(parent === ''){
          console.log(chalk.green(k))
          parent = k
        }
        // else {
        //   if(isNaN(parseInt(k))) {
        //     console.log(chalk.red(parent + '.'+ k))
        //     parent = parent + "."+ k
        //   } else {
        //     console.log(chalk.red(parent + '.['+ k +']'))
        //     parent = parent + '.['+ k +']'
        //   }
        // }
        // scan(obj[k], parent)
      }
    }
  } else {

  }
}
