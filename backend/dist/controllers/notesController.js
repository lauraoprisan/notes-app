import Note from '../models/NoteModel.js';
const getNotes = async (req, res) => {
    try {
        const userId = req.user?._id;
        if (!userId) {
            return res.status(401).json({ error: 'User not authenticated' });
        }
        const notes = await Note.find({ userId: userId }).sort({ createdAt: -1 });
        res.status(200).json(notes);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server Error' });
    }
};
const addNote = async (req, res) => {
    try {
        const userId = req.user?._id;
        if (!userId) {
            return res.status(401).json({ error: 'User not authenticated' });
        }
        const { title, content, backgroundColor } = req.body;
        const note = await Note.create({
            userId,
            title,
            content,
            backgroundColor
        });
        res.status(200).json(note);
    }
    catch (err) {
        console.error(err);
        res.status(400).json({ error: err.message });
    }
};
const updateNote = async (req, res) => {
    try {
        // console.log("updateNote called")
        const noteId = req.params.id;
        const { title, content, backgroundColor } = req.body;
        const note = await Note.findByIdAndUpdate(noteId, { title, content, backgroundColor }, { new: true });
        if (!note) {
            return res.status(404).json({ error: 'Note not found' });
        }
        res.status(200).json(note);
    }
    catch (err) {
        console.error(err);
        res.status(400).json({ error: err.message });
    }
};
// const updateNoteBackground = async (req: Request, res: Response) => {
//     try {
//         const noteId = req.params.id;
//         const { backgroundColor } = req.body;
//         console.log("tryong updateNoteBg ")
//         console.log("noteId : " + noteId)
//         console.log("backgroundColor : " + backgroundColor)
//         if (!backgroundColor) {
//             return res.status(400).json({ error: 'Background color is required' });
//         }
//         const note = await Note.findByIdAndUpdate(noteId, { backgroundColor }, { new: true });
//         if (!note) {
//             return res.status(404).json({ error: 'Note not found' });
//         }
//         res.status(200).json(note);
//     } catch (err: any) {
//         console.error(err);
//         res.status(400).json({ error: err.message });
//     }
// };
const deleteNote = async (req, res) => {
    try {
        // console.log("deleteNote controller called")
        const noteId = req.params.id;
        const note = await Note.findByIdAndDelete(noteId);
        if (!note) {
            return res.status(404).json({ error: 'Note not found' });
        }
        res.status(200).json("Note deleted");
    }
    catch (err) {
        console.error(err);
        res.status(400).json({ error: err.message });
    }
};
export { getNotes, addNote, updateNote, deleteNote, };
//# sourceMappingURL=notesController.js.map