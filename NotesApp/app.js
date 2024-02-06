// const fs = require('fs')
// let validator = require('validator')
const yargs  = require('yargs')
const note = require('./note.js')

yargs.command({
    command : 'add',
    describe : 'Add a new note!',
    builder : {
        body : {
            value : "This note body",
            demandOption : true,
            type : 'string',
        },  
        title : {
            describe : "Note Title",
            demandOption : true,
            type : 'string'
        }
    },
    handler : function(argv){
        note.addNote(argv.title, argv.body)
    }
})

yargs.command({
    command : 'remove',
    describe : 'Remove a note',
    builder : {
        title : {
            demandOption : true,
            type : 'string'
        }
    },
    handler : function(argv){
        note.removeNote(argv.title)
    },
})

yargs.command({
    command : 'view-note',
    describe : 'View All Notes',
    handler : function (){
        note.viewNote()
    }
})

yargs.command({
    command : 'list-note',
    describe : 'listing the notes!',
    builder : {
        title : {
            describe : 'List note details',
            demandOption : true,
            type : 'string'
        }
    },
    handler : function(argv){
        note.listNotes(argv.title)
    }
})

yargs.parse()