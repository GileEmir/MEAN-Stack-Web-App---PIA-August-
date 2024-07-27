import express from 'express'
import BookM from '../models/book'

export class BookController{
    getAll = (req: express.Request, res: express.Response)=>{
        BookM.find({}).sort({pages: 1}).then(books=>{
            res.json(books)
        }).catch((err)=>{
            console.log(err)
        })
    }


}