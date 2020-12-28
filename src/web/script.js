let notes = [];

async function getNotes() {

    let result = await fetch('/rest/notes');
    notes = await result.json();

    renderNotes();
}

function renderNotes() {

    let noteList = $("ul");
    noteList.empty();

    for (everyNote of notes) {
        noteList.append(`<li class=isChecked${everyNote.checked}> ${everyNote.text} <span class="deleteButton"> X </span></li>`);
    }

    deleteNote();
    // Add a mark function for marking things in the list.

}

function addNote() {

    let userInput = $("#input-field").val();

    if (userInput.length > 0 ) {

        let note = {
            text: userInput,
            checked: false
        }
        notes.push(note);
        addNoteToDB(note);
    }
    else {
        alert("You need to fill in the text field!");
    }
    renderNotes();
}

async function addNoteToDB(note) {

    let result = await fetch('/rest/notes', {
        method: "POST",
        body: JSON.stringify(note)
    });
}

function deleteNote(note) {

    let allDeleteButtons = $(".deleteButton");

    allDeleteButtons.empty();

    for (let i = 0; i < allDeleteButtons.length; i++) {
        $(allDeleteButtons[i]).click(function() {
            let parentElement = this.parentElement;
            parentElement.style.display = "none";
            deleteNoteFromDB(notes[i]);
            notes.splice(i, 1);
        })
    }
}

async function deleteNoteFromDB(note) {

    let noteToDelete = {
        id: note.id,
        text: note.text,
        checked: note.checked
    }

    let result = await fetch('/rest/notes/id', {
        method: "DELETE",
        body: JSON.stringify(noteToDelete)
    });
}

getNotes();