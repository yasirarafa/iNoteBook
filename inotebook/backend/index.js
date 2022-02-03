const connectToMongo = require('./db');
const express = require('express');
const UserRouter  = require('./routes/auth');
// import NotesRouter from './routes/auth';
const app = express();
app.use(express.json())
const port  = 5000;

// Available Routes
app.use('/api/auth', UserRouter)
// app.use('/api/notes', NotesRouter)
app.get('/', (req, res) => {
    res.send('Hello world');
});
app.listen(port, () => {
    console.log(`App is running at http://locahost:${port}`);
})
connectToMongo();
