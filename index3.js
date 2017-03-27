const fs = require('fs-extra')
const CSON = require('cson')
const _ = require('lodash')
const chalk = require('chalk')
const red = chalk.red
const green = chalk.green
const grey = chalk.grey
const blue = chalk.blue

const DEBUG = require('debug')('index')

let jsonToExtract = fs.readJsonSync(__dirname + '/json/file.json')

var result = CSON.createCSONString(jsonToExtract )
if ( result instanceof Error ) {
	console.log(result.stack)
} else {
	console.log(result)
}

fs.writeFileSync('result.cson', result, 'utf-8')

file = fs.readFileSync('result.cson', 'utf-8')

// console.log(file)




let re = /\n/
//
let fileWhitoutLineFeed = file.split(re)

// _.each(file.split(re), function(val) {
// 	// let re = /\t/
// 	// if(re.test(val)) {
// 	// 	console.log('yes', val)
// 	// } else {
// 	// 	console.log('no', val)
// 	// }
//
//
// 	let re = /\t/
// 	if(!re.test(val)) {
// 		console.log('no', val)
// 		// I will create a new line in my xlsx file
// 	} else {
// 		console.log('yes', val)
// 	}
// })

let parentPropoerty = ''
let prevDeep = 0
let deep = 0

for(let i = 0; i < fileWhitoutLineFeed.length; i++) {
	let re = /\t/

	let regex = /\t/

	// console.log(fileWhitoutLineFeed[i].split(regex).length)

	deep = fileWhitoutLineFeed[i].split(regex).length

	console.log(red('---'))

	if(!re.test(fileWhitoutLineFeed[i])) {
		parentPropoerty = getCleanKey(fileWhitoutLineFeed[i])

		console.log(grey(parentPropoerty) + ':' + green(getCleanValue(fileWhitoutLineFeed[i])))

	} else {
		if(prevDeep === deep) {
			let oldParentPropoerty = parentPropoerty.split('.')

			let tempProperty = oldParentPropoerty

			let v = tempProperty.pop()
			tempProperty.push(getCleanKey(fileWhitoutLineFeed[i]))

			parentPropoerty = tempProperty.join('.')

			console.log(grey(parentPropoerty) + ':' + green(getCleanValue(fileWhitoutLineFeed[i])))
		} else {
			parentPropoerty = parentPropoerty + '.' + getCleanKey(fileWhitoutLineFeed[i])
			console.log(grey(parentPropoerty) + ':' + green(getCleanValue(fileWhitoutLineFeed[i])))
		}
	}

	prevDeep = deep

}

function getCleanKey (str) {
	return str.replace('\t','').replace(/\s/g, '').split(':')[0]
}
function getCleanValue (str) {
	return str.replace('\t','').replace(/\s/g, '').split(':')[1]
}
