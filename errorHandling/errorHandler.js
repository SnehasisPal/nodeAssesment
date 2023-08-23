// We are handling the error in try catch block previously 
//I just try this for my testing 

module.exports = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Server error' });
};
