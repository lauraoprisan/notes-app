import { Document } from 'mongoose';
export interface NoteDocument extends Document {
    title?: string;
    content?: string;
}
declare const Post: import("mongoose").Model<NoteDocument, {}, {}, {}, Document<unknown, {}, NoteDocument> & NoteDocument & Required<{
    _id: unknown;
}>, any>;
export default Post;
