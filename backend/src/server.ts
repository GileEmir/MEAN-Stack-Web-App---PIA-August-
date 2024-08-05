import express from 'express';
import cors from 'cors';
import path from 'path';
import userRouter from './routers/user.router';
import mongoose from 'mongoose';

const app = express();

// Configure CORS
app.use(cors({
    origin: 'http://localhost:4200', // Adjust this to match your frontend's URL
    optionsSuccessStatus: 200
}));

app.use(express.json());

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

mongoose.connect("mongodb://127.0.0.1/vasaMastaVasaBasta");
const conn = mongoose.connection;
conn.once('open', () => {
    console.log("DB ok");
});

const router = express.Router();
router.use('/users', userRouter);

app.use("/", router);
app.listen(4000, () => console.log(`Express server running on port 4000`));