import express, { Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json()); // Body-parser for raw JSON, attaches data to req.body
app.use(express.urlencoded({ extended: false })); // For urlencoded

app.get("/api/", (req: Request, res: Response) => {
    res.send("Welcom to the backend");
});


app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

export default app;
