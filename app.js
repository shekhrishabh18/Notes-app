//validator is an npm package used to validate email, URL etc.
//const validator = require('validator')

//To install a package named example run command npm install example@<version number> on terminal

//chalk is a npm module used to modify appearance of text on terminal screen
//yargs is a npm module used to obtain inputs from command line
const chalk = require('chalk')
const yargs = require('yargs')
const np=require('./notes.js')

//process.argv gives a vector of arguments passed to the command line while running the code
//const command = process.argv

//yargs can also be used to create custom commands that can be run using command line

// Creating add note command
yargs.command({
	//command is used to specify the name of the command that will be used during command line input
	command: 'add',
	//describe is used to know the functionality of the command when help is used
	describe: 'Add a new note',
	//builder used to specify additional arguments that need to be provided
	builder: {
		//specifying the name and properties of the additional arguments
		title: {
			//to know the fuctionality during help describe is used
			describe: 'Note Title',
			//to specify whether a property is required mandatorily or not 
			demandOption: true,
			//to specify the input type
			type: 'string'
		},
		body: {
			describe: 'Note Body',
			demandOption: true,
			type: 'string'
		}
	},
	handler(argv) {
		np.addNote(argv.title, argv.body)
	}
})

// Creating remove note command
yargs.command({
	command: 'remove',
	describe: 'Remove an existing note',
	builder: {
		title: {
			describe: 'Note Title',
			demandOption: true,
			type: 'string'
		}
	},
	handler(argv) {
		np.removeNote(argv.title)
	}
})

//Creating list note command
yargs.command({
	command: 'list',
	describe: 'List all notes',
	handler() {
		console.log(chalk.blue('Listing title of all notes'))
		np.listNotes()
	}
})

//Creating read note command
yargs.command({
	command: 'read',
	describe: 'Read a notes',
	builder: {
		title: {
			describe: 'Note Title',
			demandOption: true,
			type: 'string'
		}
	},
	handler(argv) {
		np.readNote(argv.title)
	}
})

yargs.parse()
// console.log(yargs.argv)
