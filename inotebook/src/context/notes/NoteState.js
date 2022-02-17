import NoteContext from "./noteContext";
import { useState } from "react";
const NoteState = (props) => {
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);
  // Fetch all Notes
  const getNotes = async () => {
    // API Call
    try {
      const response = await fetch(
        "http://localhost:5000/api/notes/fetchAllNotes",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem('token')
          },
        }
      );
      const json = await response.json();
      setNotes(json);
    } catch (error) {
      console.log("Error", error);
    }
  };

  // Add a Note
  const addNote = async (title, description, tag) => {
    console.log("Adding tha new note");
    const response = await fetch(
        "http://localhost:5000/api/notes/addnote",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token":localStorage.getItem('token')
          },
          body: JSON.stringify({ title, description, tag }),
        }
      );
      const json = await response.json()
        console.log('-----add', json);
    setNotes(notes.concat(json));
  };
  // Delete a Note
  const deleteNote = async (id) => {
      try {
        const response = await fetch(
            `http://localhost:5000/api/notes/deletenote/${id}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
              },
            }
          );
          const json = await response.json();
          console.log("Deleting note", json);
          console.log('notes', notes)
          const newNote = notes.filter((note) => {
            return note._id !== id;
          });
          setNotes(newNote);
          
      } catch (error) {
          console.log('Error', error);
      }
  };
  // Edit a Note

  const editNote = async (id, title, description, tag) => {
    // Add API
    const response = await fetch(
      `http://localhost:5000/api/notes/updatenote/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
          },
          body: JSON.stringify({ title, description, tag }),
      }
    );
    const json = await response.json();
    const newNotes = JSON.parse(JSON.stringify(notes))
    console.log('Update newNotes', newNotes);
    // Logic to edit the notes
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  };

  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, getNotes, editNote }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
