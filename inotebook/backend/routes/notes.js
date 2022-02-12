const express = require("express");
const router = express.Router();
const fetchUser = require("../middleware/fetchuser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");

// Get all the notes using: GET "/api/notes/fetchAllNotes. Login Required
router.get("/fetchAllNotes", fetchUser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// Add the Notes using: POST "/api/notes/addNote. Login Required
router.post(
  "/addnote",
  [
    body("title", "Enter the valid title").isLength({ min: 3 }),
    body("description", "Description must be atleast 5 character").isLength({
      min: 5,
    }),
  ],
  fetchUser,
  async (req, res) => {
    try {
      // IF THERE ARE ERRORS
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { title, description, tag } = req.body;

      // ADD NEW NOTES
      const note = await Notes.create({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const saveNotes = await note.save();
      res.json(saveNotes);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

// Update an existing Notes using: PUT "/api/notes/updatenote. Login Required
router.put("/updatenote/:id", fetchUser, async (req, res) => {
    try {
        
        const { title, description, tag } = req.body;
        // create a newnote object;
        const newNote = {};
        if (title) {
          newNote.title = title;
        }
        if (description) {
          newNote.description = description;
        }
        if (tag) {
          newNote.tag = tag;
        }
      
        // Find the note to be updated and update it
        let note = await Notes.findById(req.params.id);
        console.log("find note", note);
        if (!note) {
          return res.status(404).send("Not found");
        }
        if (note.user.toString() !== req.user.id) {
          return res.status(401).send("Not Allowed");
        }
      
        note = await Notes.findByIdAndUpdate(
          req.params.id,
          { $set: newNote },
          { new: true }
        );
        console.log("Update note", note);
        res.json(note);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
      }
});

// Delete an existing Notes using: DELETE "/api/notes/deletenote. Login Required
router.delete("/deletenote/:id", fetchUser, async (req, res) => {
  console.log('---------inside delete');

    try {
        // Find the note to be deleted and delete it
        let note = await Notes.findById(req.params.id);
        if (!note) {
          return res.status(404).send("Not found");
        }
        if (note.user.toString() !== req.user.id) {
          return res.status(401).send("Not Allowed");
        }
      
        note = await Notes.findByIdAndDelete(req.params.id);
        res.json({"Success": "Note has been deleted", note: note});
        
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
      }
  });

module.exports = router;
