const express = require('express');
const morgan = require('morgan');
const bodyPaser = require('body-parser');
const mongoose = require('mongoose');
const port = process.env.PORT || 5000;

const app = express()

app.use(morgan('dev'));
app.use(bodyPaser.json());


mongoose.Promise = global.Promise;

mongoose.connect('mongodb+srv://adeoluwa1:adeoluwa1@nodehash.6cg74.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(() => {
    console.log('database successfully connected')
}).catch(err => {
    console.log('databse not connected');
    process.exit();
})

require('./routes')(app)

app.listen(port, () => {
    console.log('App is running on port', port)
})