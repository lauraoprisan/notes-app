import { Request, Response } from 'express';
import Note, { NoteDocument } from '../models/NoteModel.js';

const getNotes = async (req: Request, res: Response) => {
    try {
        const notes: NoteDocument[] = await Note.find({}).sort({ createdAt: -1 });
        res.status(200).json(notes);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server Error' });
    }
};

const addNote = async (req: Request, res: Response) => {
    try {
        const { title, content } = req.body;
        const note: NoteDocument = await Note.create({
            title,
            content,
        });

        res.status(200).json(note);
    } catch (err: any) {
        console.error(err);
        res.status(400).json({ error: err.message });
    }
};

const updateNote = async (req: Request, res: Response) => {
    try {
        const noteId = req.params.id;
        const { title, content } = req.body;

        const note: NoteDocument | null = await Note.findByIdAndUpdate(
            noteId,
            { title, content },
            { new: true }
        );

        if (!note) {
            return res.status(404).json({ error: 'Note not found' });
        }

        res.status(200).json(note);

    } catch (err: any) {
        console.error(err);
        res.status(400).json({ error: err.message });
    }
};

const deleteNote = async (req: Request, res: Response) => {
    try {
        const noteId = req.params.id;
        const { title, content } = req.body;

        const note: NoteDocument | null = await Note.findByIdAndDelete(
            noteId
        );

        if (!note) {
            return res.status(404).json({ error: 'Note not found' });
        }

        res.status(200).json("Note deleted");

    } catch (err: any) {
        console.error(err);
        res.status(400).json({ error: err.message });
    }
};
export {
    getNotes,
    addNote,
    updateNote,
    deleteNote
};
