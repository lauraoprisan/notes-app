import { Schema, model } from 'mongoose';
const noteSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: false
    },
    content: {
        type: String,
        required: false
    },
    backgroundColor: {
        type: String,
        required: false
    }
}, { timestamps: true });
const Note = model('Note', noteSchema);
export default Note;
//# sourceMappingURL=NoteModel.js.map