import NoteContext from './noteContext';
import { useState } from 'react';
const NoteState = (props) =>{
    const notesInitial = [
        {
            "_id": "61fcef3f6271b7d530c54e78",
            "user": "61fbac7f699e4adf01b4518f",
            "title": "Yasir",
            "description": "My personal opinioun",
            "tag": "General",
            "date": "2022-02-04T09:17:51.418Z",
            "__v": 0
        },
        {
            "_id": "61fcef3f6271b7d530c54e78",
            "user": "61fbac7f699e4adf01b4518f",
            "title": "Great",
            "description": "You are great",
            "tag": "General",
            "date": "2022-02-04T09:17:51.418Z",
            "__v": 0
        }
    ]
    const [notes, setNotes] = useState(notesInitial)
    
    return (
        <NoteContext.Provider value={{notes, setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )

}

export default NoteState;