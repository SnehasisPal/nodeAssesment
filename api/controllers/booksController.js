// Basically we are creating the api function in this file

const bookModel = require('../models/booksModel');
exports.getAllBooks = (req, res) => {
    //We are handling the error in try catch block
    try {
        const books = bookModel.getAll();
        res.json(books);
    } catch (error) {
        res.json(error)
    }
};

exports.getBookById = (req, res) => {
    try {
        const book = bookModel.getById(req.params.id);
        if (!book) {
            res.status(404).json({ error: 'Book not found' });
        } else {
            res.json(book);
        }
    } catch (error) {
        res.json(error);
    }
};

exports.addBook = (req, res) => {
    try {
        const book = bookModel.getById(req.body.id);
        if (book) {
            res.status(404).json({ success: false, error: 'Book id should be unique' });
        } else {
            const newBook = req.body;
            bookModel.create(newBook);
            res.status(201).json(newBook);
        }

    } catch (error) {
        res.json(error);
    }
};

exports.updateBook = (req, res) => {
    try {
        const book = bookModel.getById(req.params.id);
        if (!book) {
            res.status(404).json({ error: 'Book not found' });
        } else {
            const updatedBook = req.body;
            bookModel.update(req.params.id, updatedBook);

            res.json({ success: true, message: "Update book succesfully", updatedBook });
            // res.json(book);
        }
    } catch (error) {
        res.json(error.message);
    }

};


exports.deleteBook = (req, res) => {
    try {
        const book = bookModel.getById(req.params.id);
        if (!book) {
            res.status(404).json({ error: 'Book not found' });
        } else {
            bookModel.remove(req.params.id);
            res.json({ message: 'Book deleted' });
        }


    } catch (error) {
        res.json(error);
    }
};
