// We are creating our own function like getall getById etc
//If we are using any orm like sequalize or other  we dont have to create all this because all are predefined 


const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '..', 'data', 'books.json');

let books = [];

function loadData() {
    try {
        const data = fs.readFileSync(DATA_FILE, 'utf-8');
        books = JSON.parse(data);
    } catch (error) {
        books = [];
    }
}

function saveData() {
    fs.writeFileSync(DATA_FILE, JSON.stringify(books, null, 2));
}

loadData();

module.exports = {
    getAll: () => books,
    getById: (id) => books.find(book => book.id === id),
    create: (book) => {
        books.push(book);
        saveData();
    },
    update: (id, updatedBook) => {
        const index = books.findIndex(book => book.id === id);
        if (index !== -1) {
            books[index] = { ...books[index], ...updatedBook };
            saveData();
        }
    },
    remove: (id) => {
        books = books.filter(book => book.id !== id);
        saveData();
    }
};
