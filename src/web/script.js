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

    // Add a delete function + for database (delete to database).
    // Add a mark function for marking things in the list.

}

getNotes();