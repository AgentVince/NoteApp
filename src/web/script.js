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
    markAsDone();
}

function markAsDone() {

    let allNotes = $("li");

    for (let i = 0; i < allNotes.length; i++) {
        $(allNotes[i]).click(function () {
            
            if (notes[i].checked == true) {
                notes[i].checked = false;
                $(allNotes[i]).removeClass("isCheckedtrue").addClass("isCheckedfalse");
            }
            else if (notes[i].checked == false) {
                notes[i].checked = true;
                $(allNotes[i]).removeClass("isCheckedfalse").addClass("isCheckedtrue");
            }
            updateNote(notes[i]);
        })
    }
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

async function updateNote(note) {

    let noteToUpdate = {
        id: note.id,
        checked: note.checked
    }

    let result = await fetch('/rest/notes/id', {
        method: "PUT",
        body: JSON.stringify(note)
    });
}

getNotes();