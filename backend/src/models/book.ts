import mongoose from 'mongoose'

const bookSchema = new mongoose.Schema(
    {
        name: String,
        author: String,
        pages: Number
    }
);

export default mongoose.model('BookModel', 
bookSchema, 'books');