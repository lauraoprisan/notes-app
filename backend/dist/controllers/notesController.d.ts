import { Request, Response } from 'express';
declare const getNotes: (req: Request, res: Response) => Promise<void>;
declare const addNote: (req: Request, res: Response) => Promise<void>;
export { getNotes, addNote, };
