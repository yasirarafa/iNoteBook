const connectToMongo = require('./db');
const express = require('express');
const UserRouter  = require('./routes/auth');
const NotesRouter = require ('./routes/notes');
const app = express();
app.use(express.json())
const port  = 5000;

// Available Routes
app.use('/api/auth', UserRouter)
app.use('/api/notes', NotesRouter)
app.get('/', (req, res) => {
    res.send('Hello world');
});
app.listen(port, () => {
    console.log(`App is running at http://locahost:${port}`);
})
connectToMongo();
