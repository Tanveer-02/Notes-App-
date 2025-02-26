const notesContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector(".btn");
let notes = document.querySelectorAll(".input-box");

function showNotes() {
    notesContainer.innerHTML = localStorage.getItem("notes") || "";
    attachEventsToNotes();
}
showNotes();

function updateStorage() {
    localStorage.setItem("notes", notesContainer.innerHTML);
}

function attachEventsToNotes() {
    notes = document.querySelectorAll(".input-box");
    notes.forEach(note => {
        note.onkeyup = function() {
            updateStorage();
        };
    });
}

createBtn.addEventListener("click", () => {
    let inputBox = document.createElement("p");
    let img = document.createElement("img");
    inputBox.className = "input-box";
    inputBox.setAttribute("contenteditable", "true");
    img.src = "bin.png";
    inputBox.appendChild(img);
    notesContainer.appendChild(inputBox);
    attachEventsToNotes();  // Attach events to the new note
    updateStorage();  // Update storage immediately after adding a new note
});

notesContainer.addEventListener("click", function(e) {
    if(e.target.tagName === "IMG") {
        e.target.parentElement.remove();
        updateStorage();
    } else if(e.target.tagName === "P") {
        attachEventsToNotes();
    }
});

document.addEventListener("keydown", event => {
    if(event.key === "Enter") {
        document.execCommand("insertLineBreak");
        event.preventDefault();
    }
});
