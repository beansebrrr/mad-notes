import {
  openDatabase,
  addNote,
  getNotes,
  updateNote,
  deleteNote
} from "./indexed-db.js";

const titleInput = document.querySelector("#noteTitle");
const contentInput = document.querySelector("#noteContent");
const noteIdInput = document.querySelector("#noteId");
const notesList = document.querySelector("#notesList");
 
async function displayNotes() {
  const notes = await getNotes();
  notesList.innerHTML = "";
 
  notes.forEach(note => {
    const item = document.createElement("li");
 
    const title = document.createElement("h3");
    title.textContent = note.title;
 
    const content = document.createElement("p");
    content.textContent = note.content;
 
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.addEventListener("click", function () {
      noteIdInput.value = note.id;
      titleInput.value = note.title;
      contentInput.value = note.content;
    });
 
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", async function () {
      await deleteNote(note.id);
      await displayNotes();
    });
 
    item.appendChild(title);
    item.appendChild(content);
    item.appendChild(editButton);
    item.appendChild(deleteButton);
    notesList.appendChild(item);
  });
}
 
document.querySelector("#formNewNote").addEventListener("submit", async function (event) {
  event.preventDefault()
  
  const title = titleInput.value.trim();
  const content = contentInput.value.trim();
  const id = noteIdInput.value;
 
  if (title === "" || content === "") {
    alert("Please enter a title and a note.");
    return;
  }
 
  if (id === "") {
    await addNote(title, content);
    alert("Note saved.");
  } else {
    await updateNote(id, title, content);
    alert("Note updated.");
  }
 
  noteIdInput.value = "";
  titleInput.value = "";
  contentInput.value = "";
 
  await displayNotes();
});
 
document.querySelector("#clearNoteBtn").addEventListener("click", function () {
  noteIdInput.value = "";
  titleInput.value = "";
  contentInput.value = "";
});
 
// Open the database before loading the notes.
async function startNotesApp() {
  try {
    await openDatabase();
    await displayNotes();
  } catch (error) {
    console.error("IndexedDB error:", error);
    alert("Could not open the local notes database.");
  }
}
 
startNotesApp();
