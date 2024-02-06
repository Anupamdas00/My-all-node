const fs = require('fs')
let chalk = require('chalk')


function customMsg(){
    return 'Hello this from notejs module'
}

const addNote = function(title, body){
    const notes = loadNotes();
    
    const duplicateNote = notes.find((note) => {
        return note.title === title
    })

    if(!duplicateNote){
        notes.push({
            title : title,
            body : body
        })
        saveNotes(notes)
        console.log(chalk.bgGreen.bold('Note Added Successfully!'));    
    }else {
        console.log(chalk.bgRed.bold('The title has been already taken!'))
    }
}

const removeNote = function(title){
    let notes = loadNotes()
    const notesToKeep = notes.filter((note) => note.title !== title );




    if(notes.length > notesToKeep.length){
        console.log(chalk.bgGreen.bold('Note has been removed successfully!'));
        saveNotes(notesToKeep)
    }else{
        console.log(chalk.bgRed.bold('Note title does not Exist'));
    }
    saveNotes(notesToKeep)
}

const viewNote = () => {
    const notes = loadNotes();
    console.log(notes);
}

const saveNotes = function(data){
    const dataJson = JSON.stringify(data);
    fs.writeFileSync('notes.json', dataJson)
}

const listNotes = (title) => {
    const notes = loadNotes()
    const note = notes.find((note) => {
        return note.title == title;
    })
    console.log(note);
    if(note){
        console.log(note.title);
        console.log(chalk.bgYellow.bold(note.body))
    }else{
        console.log(chalk.red('Enter note does not exist!'))
    }

}

const getNote = function(){

}

const loadNotes = function(){
    try{
        const dataBuffer = fs.readFileSync('notes.json');
        const jsonData = dataBuffer.toString();
        return JSON.parse(jsonData)
    }catch(e){
        return []
    }
}

module.exports = {
    getNote , 
    addNote , 
    removeNote , 
    viewNote , 
    listNotes,
}