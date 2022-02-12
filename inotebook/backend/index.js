const connectToMongo = require('./db');
const express = require('express');
var cors = require('cors')
const UserRouter  = require('./routes/auth');
const NotesRouter = require ('./routes/notes');
const app = express();
const port  = 5000;

app.use(cors())
app.use(express.json())

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
