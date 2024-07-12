import express, { Router, Request, Response } from "express";

const router: Router = express.Router();


import {
    getNotes,
    addNote,
    updateNote,
    deleteNote
} from '../controllers/notesController.js';


router.get('/', getNotes);
router.post('/', addNote);
router.put('/:id', updateNote)
router.delete('/:id', deleteNote)

export default router;
