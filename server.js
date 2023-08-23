// server.js

const express = require('express');
const bodyParser = require('body-parser');
const booksRoutes = require('./api/routes/booksRoutes');
const errorHandler = require('./errorHandling/errorHandler');
const app = express();

app.use(bodyParser.json());

app.use('/books', booksRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
