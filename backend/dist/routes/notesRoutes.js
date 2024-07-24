import express from "express";
import requireAuth from '../middleware/requireAuth.js';
const router = express.Router();
router.use(requireAuth); //all routes here require the auth of an user
import { getNotes, addNote, updateNote, deleteNote, updateNoteBackground } from '../controllers/notesController.js';
router.get('/', getNotes);
router.post('/', addNote);
router.put('/:id', updateNote);
router.put('/:id/updateNoteBackground', updateNoteBackground);
router.delete('/:id', deleteNote);
export default router;
//# sourceMappingURL=notesRoutes.js.map