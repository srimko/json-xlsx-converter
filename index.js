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
scan(jsonToExtract)

function scan(obj, key)
{
    var k;
    let path = ''
    if (obj instanceof Object) {
        for (k in obj){
            if (obj.hasOwnProperty(k)){
                path += '.' + k
                console.log('scanning property ' + path)
                scan( obj[k] ,path);
                allKeys.push(k)
            }
        }
    } else {
        console.log('found value : ' + chalk.green(obj) + ' in ' + chalk.red(key))
    };

};


// debug(allKeys)

  fs.writeJSONSync('test.json',allKeys)
// ret[Object.getOwnPropertyNames(jsonToExtract)]



// var obj = { 0: "a", 1: "b", 2: "c"};
// console.log(Object.getOwnPropertyNames(obj).sort());

// _.each(jsonToExtract, function (key, value) {
//   debug(value)
// })

// console.log(getObjectSize(jsonToExtract))
//
// objectSize = getObjectSize(jsonToExtract)
//
// for(let i = 0; i < objectSize; i++) {
//   console.log(i)
//   console.log(jsonToExtract.key)
// }



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
