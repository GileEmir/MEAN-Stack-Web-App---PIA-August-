import express from 'express'
import { BookController } from '../controllers/book.controller'

const bookRouter = express.Router()

bookRouter.route("/getAll").get(
    (req,res)=>new BookController().getAll(req,res)
)

export default bookRouter;