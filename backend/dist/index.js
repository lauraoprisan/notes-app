import express from 'express';
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
const MONGO_URI = process.env.MONGO_URI;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';
app.use(cors({
    origin: [FRONTEND_URL],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
    optionsSuccessStatus: 200,
}));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.get("/", (req, res) => {
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
    .catch((error) => {
    console.error("MongoDB connection error:", error);
});
export default app;
//# sourceMappingURL=index.js.map