import express from 'express';
import cors from 'cors'
import userRouter from './routers/user.router';
import mongoose from 'mongoose'
import bookRouter from './routers/book.router';

const app = express();

app.use(cors())
app.use(express.json())

mongoose.connect("mongodb://127.0.0.1/vasaMastaVasaBasta")
const conn = mongoose.connection
conn.once('open', ()=>{
    console.log("DB ok")
})

const router = express.Router()
router.use('/users', userRouter)
router.use('/books', bookRouter)

app.use("/" ,router)
app.listen(4000, () => console.log(`Express server running on port 4000`));