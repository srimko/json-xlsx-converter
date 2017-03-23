'use strict'

let fs = require('fs-extra')
let _ = require('lodash')
let debug = require('debug')('index')

let chalk = require('chalk')

let jsonToExtract = fs.readJsonSync(__dirname + '/json/file.json')

let allKeys = []
let keys
// Get all keys at this step
// console.log(Object.getOwnPropertyNames(jsonToExtract))
// keys = Object.getOwnPropertyNames(jsonToExtract)
// allKeys.push(keys)
// let ret = jsonToExtract[allKeys[0][0]]
// // console.log(ret)
//
// // Get all keys at this step
// // console.log(Object.getOwnPropertyNames(ret))
// keys = Object.getOwnPropertyNames(ret)
// allKeys.push(keys)
// for(let i = 0; i < keys.length; i++) {
//   let ret = Object.getOwnPropertyNames(jsonToExtract[allKeys[0]][keys[i]])
//   let ret2 = Object.keys(jsonToExtract[allKeys[0]][keys[i]])
//   // console.log(keys[i])
//   // console.log(ret)
//   // console.log('######')
//   // console.log(ret2)
//
//   // var mmm = ret.filter(function(key) {
//   //   console.log(key)
//   //   var indexInEnum = ret2.indexOf(key)
//   //   if (indexInEnum == -1) {
//   //     // non trouvée dans enum_uniquement indique
//   //     // que la clé est non-énumérable, on la
//   //     // garde donc dans le filtre avec true
//   //     return false;
//   //   } else {
//   //     return true;
//   //   }
//   // });
//   //
//   // console.log(mmm)
//
//   allKeys.push(ret)
// }
var paths = ''

scan(jsonToExtract)


function scan(obj, deep = 0)
{
    let k;
    let path = ''
    let i = 0;
    if (obj instanceof Object) {
        for (k in obj){

            let tab = ''
            for(let j=0; j < deep; j++)(
              tab += '\t'
            )
            if (obj.hasOwnProperty(k)){
              // console.log('scanning property ' + path)
              // console.log(chalk.red(k))
              // paths += '.' + k
              // Les fins des objets
              // console.log(typeof parseInt(k))
              // console.log((typeof parseInt(k) === "number"))
              // console.log(typeof parseInt(k))

              if(i === 0 && isNaN(parseInt(k))) {
                // console.log(chalk.magenta(typeof parseInt(k)))
                console.log(tab + chalk.blue(k))
                if(typeof obj[k] !== "object")
                  console.log(tab + '\t' + chalk.cyan(obj[k]))
                i++;
              } else {
                console.log(tab + chalk.blue(k))
                // debug(tab + obj[k])
                // console.log(tab + obj[k])
                // console.log(chalk.red(typeof obj[k]))
                // console.log(chalk.red(obj[k]))
                if(typeof obj[k] === "object") {
                  // console.log(obj[k])
                }
                else {
                  console.log(chalk.cyan(tab + '\t\t' + obj[k]))
                }
                i++;
              }
              deep = i;
              scan(obj[k], deep);

              // allKeys.push(k)
            }
            else {
              console.log('me')
            }
        }
    } else {
        // console.log('found value : ' + chalk.green(obj) + ' in ' + chalk.red(key))
    }

};

// getKeys(jsonToExtract)

function getKeys (json) {
  _.each(jsonToExtract, function (value, key) {
    // debug(typeof value)
    console.log(getObjectSize(value))
    _.each(value, function (val) {
      getKeys(val)
    })
    // console.log(value)
    // getKeys()
  })
}

function getObjectSize (obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};
