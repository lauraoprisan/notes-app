import express, { Router, Request, Response } from "express";

const router: Router = express.Router();


import { getNotes,addNote } from '../controllers/notesController.js';


router.get('/', getNotes);

router.post('/', addNote);

export default router;
