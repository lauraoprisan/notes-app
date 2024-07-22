import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import mongoose from 'mongoose';
import notesRoutes from './routes/notesRoutes.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config();

const app = express();

//implementing helmet

const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI as string;




// Configure CORS
const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200, // Some legacy browsers choke on 204
};
app.use(cors(corsOptions));
app.use(helmet())

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req: Request, res: Response) => {
    res.send("Welcome to the backend");
});


app.use("/api/notes", notesRoutes);
app.use("/api/auth", authRoutes);

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
