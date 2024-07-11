import { Schema, model, Document } from 'mongoose';

export interface NoteDocument extends Document {
    title?: string;
    content?: string;
}

const noteSchema = new Schema<NoteDocument>({
    title: {
        type: String,
        required: false
    },
    content: {
        type: String,
        required: false
    },
}, { timestamps: true });

const Note = model<NoteDocument>('Note', noteSchema);

export default Note;
