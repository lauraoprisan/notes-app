import { Schema, model, Document } from 'mongoose';

export interface NoteDocument extends Document {
    userId: string
    title?: string;
    content?: string;
}

const noteSchema = new Schema<NoteDocument>({
    userId: {
        type:String,
        required:true
    },
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
