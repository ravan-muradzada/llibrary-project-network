const express = require('express');
const app = express();
const path = require('path');
require('./db/mongoose');
const Book = require('./models/book-model');

const port = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));


app.get('/', (req, res) => {
    try {
        // Links to other router should be here!
        res.status(200).json({ message: 'Hello World' });
    } catch(e) {
        res.status(400).json({
            success: false,
            message: 'Something went wrong!'
        });
    }
})

app.post('/add-new-book', async (req, res) => {
    try {
        const { bookName, authorName, genre } = req.body;

        if (!bookName || !authorName || !genre) {
            return res.status(400).json({ 
                success: false, 
                error: 'Book name, author name and genre required!'
            });
        }

        const book = new Book({ bookName, authorName, genre });
        await book.save();
        
        res.status(201).json({ 
            success: true,
            message: 'A book created successfully!',
            book
        });
    } catch(e) {
        console.log(`Error occurred! ${e.message}`);
        res.status(400).json({ 
            success: false, 
            error: 'Something wrong while adding a new book!' 
        });
    }
});

app.get('/get-all-books', async (req, res) => {
    try {
        const books = await Book.find({});

        res.status(200).json({ 
            success: true,
            books 
        });
    } catch(e) {
        res.status(400).json({
            success: false,
            message: 'Something went wrong while fetching all books!'
        });
    }
})

app.get('/get-a-book/:id', async (req, res) => {
    try {
        const inputId = req.params.id;

        const book = await Book.findById(inputId);

        if (!book) {
            return res.status(404).json({ 
                success: false,
                message: 'The book not found!'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Book has been found!',
            book
        });
    } catch(e) {
        res.status(400).json({
            success: false,
            message: 'Something went wrong while fetching the book!'
        });
    }
})

app.patch('/update-a-book/:id', async (req, res) => {
    try {
        const inputId = req.params.id;
        const { bookName, authorName, genre } = req.body;
        const book = await Book.findById(inputId);

        if (!book) {
            return res.status(404).json({ 
                success: false,
                message: 'The book not found!'
            });
        }

        if (bookName) {
            book.bookName = bookName;
        }

        if (authorName) {
            book.authorName = authorName;
        }

        if (genre) {
            book.genre = genre;
        }

        await book.save();

        res.status(200).json({
            success: true,
            message: 'The book updated successfully!',
            book
        });
    } catch(e) {
        res.status(400).json({
            success: false,
            message: 'Something went wrong while updating the book!'
        });
    }
})

app.delete('/delete-a-book/:id', async (req, res) => {
    try {
        const inputId = req.params.id;
        const book = await Book.findById(inputId);

        if (!book) {
            return res.status(404).json({ 
                success: false,
                message: 'The book not found!'
            });
        }

        await book.deleteOne();

        res.status(200).json({
            success: true,
            message: 'The book deleted successfully!',
            book
        })
    } catch(e) {
        res.status(400).json({
            success: false,
            message: 'Something went wrong while deleting the book!'
        });
    }
}) 

app.listen(port, () => console.log(`Server started at http://localhost:${port}`));