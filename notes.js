const fs=require('fs')
const chalk=require('chalk')

const addNote=(title,body) => {
	const note=loadNotes()
	const duplicateNotes = note.find((note) => note.title===title)
	if(!duplicateNotes) {
		note.push({
		title: title,
		body: body
		})
		saveNotes(note)
		console.log(chalk.green.inverse('New note added!'))
	}
	else {
		console.log(chalk.red.inverse('Note title taken!'))
	}
}

const removeNote=(title) => {
	const note=loadNotes()
	const NotesToKeep = note.filter((note) => note.title!==title)
	if(NotesToKeep.length!==note.length) {
		saveNotes(NotesToKeep)
		console.log(chalk.green.inverse('Note removed!'))
	}
	else {
		console.log(chalk.red.inverse('Note not found!'))
	}
}

const listNotes=()=> {
	const note=loadNotes()
	note.forEach((note) => {
		console.log(note.title)
	})
}

const readNote=(title)=> {
	const note=loadNotes()
	const Notes = note.find((note) => note.title===title)
	if(Notes) {
	console.log(chalk.grey.inverse(Notes.title))
	console.log(Notes.body)
	}
	else {
		console.log('No note with given title found!')
	}
}

const saveNotes = (note) => {
	const dataJSON = JSON.stringify(note)
	fs.writeFileSync('notes.json',dataJSON)
}

const loadNotes=() => {
try {
	const dataBuffer=fs.readFileSync('notes.json')
	const dataJSON=dataBuffer.toString()
	return JSON.parse(dataJSON)
} catch(e) {
	return []
}
}

module.exports= {
	addNote: addNote,
	removeNote: removeNote,
	listNotes: listNotes,
	readNote: readNote
}