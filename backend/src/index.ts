import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import mongoose from 'mongoose'; // Importing mongoose as an ES module
import notesRoutes from './routes/notesRoutes.js';

dotenv.config();

const app = express();

//implementing helmet

const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI as string; // Ensure MONGO_URI is defined in your .env file



// Configure CORS
const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200, // Some legacy browsers choke on 204
};
app.use(cors(corsOptions));
app.use(helmet())

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/api/", (req: Request, res: Response) => {
    res.send("Welcome to the backend");
});

app.use("/api/notes", notesRoutes);

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log("The app is connected to MongoDB");
        app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`);
        });
    })
    .catch((error: any) => {
        console.error("MongoDB connection error:", error);
    });

export default app;
