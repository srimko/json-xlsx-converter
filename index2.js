'use strict'

let fs = require('fs-extra')
let _ = require('lodash')
let debug = require('debug')('index')

let chalk = require('chalk')

let jsonToExtract = fs.readJsonSync(__dirname + '/json/file.json')

// var paths = ''


// console.log(typeof jsonToExtract)
// console.log(Object.getOwnPropertyNames(jsonToExtract))

let properties = Object.getOwnPropertyNames(jsonToExtract)

let paths

paths = getKeys2(jsonToExtract)

function getKeys2(jsonToExtract) {
  let paths = []
  for (let k in jsonToExtract){

    if (jsonToExtract.hasOwnProperty(k)){
      paths.push(k)
    }
  }
  return paths
}

console.log(paths)

// me(paths)

// paths = getKeys(properties)

function getKeys(properties) {

  let paths = []

  if(properties.length <= 1) {
    // Si il y a un seul element donc tableau ou objet
    let path = ''
    path = properties[0]

    paths.push(path)

  } else {
    // Si il y a plus d'un seul element donc tableau ou objet
    let path = []

    // console.log(properties)

    for (var val in properties) {
      if (properties.hasOwnProperty(val)) {
        paths.push(properties[val])
      }
    }

    // paths.push(path)
  }


  me(paths)
  return paths
  // for (var value in paths) {
  //   if (paths.hasOwnProperty(value)) {
  //     console.log(paths[value])
  //     getKeys(paths)
  //   }
  // }
}


// let properties2 = Object.getOwnPropertyNames(jsonToExtract[paths[0]])

// console.log(properties2)

// console.log(jsonToExtract)

// for(let i = 0; i < paths.length; i++) {
//   getKeys(properties2, paths[i])
// }


function me (paths) {
  for(let i = 0; i < paths.length; i++) {
    if(typeof jsonToExtract[paths[i]] === "string") {
      console.log(paths[i] + ':' + jsonToExtract[paths[i]])
    } else {
      console.log(paths[i])
      console.log(jsonToExtract[paths[i]])
      // console.log('\tobject')

      // let p = Object.getOwnPropertyNames(jsonToExtract[paths[i]])

      // console.log('\t\t\t' + p)
      console.log(getKeys2(jsonToExtract[paths[i]]))
    }
  }

}








// console.log(paths)
// console.log(jsonToExtract)

// console.log(jsonToExtract[paths[0]])

// getKeys(jsonToExtract[paths[0]])

// console.log(paths)


// scan(jsonToExtract)

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
