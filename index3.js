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
	fs.writeFileSync('result.cson', result, 'utf-8')

	file = fs.readFileSync('result.cson', 'utf-8')

	let re = /\n/

	let fileWhitoutLineFeed = file.split(re)

	console.log(fileWhitoutLineFeed)

	let parentPropoerty = ''
	let prevDeep = 0
	let deep = 0

	for(let i = 0; i < fileWhitoutLineFeed.length; i++) {
		let re = /\t/

		let regex = /\t/

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
}

function getCleanKey (str) {
	return str.replace('\t','').replace(/\s/g, '').split(':')[0]
}
function getCleanValue (str) {
	return str.replace('\t','').replace(/\s/g, '').split(':')[1]
}
