if(process.env.NODE_ENV != 'production'){ require('dotenv').config() }

// dependencies externs
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// dependencies interns
const indexRouter = require('./routes/index')
const authorRouter = require('./routes/authors')
const bookRouter = require('./routes/books')
//app
const app = express();

app.set('view engine', 'ejs');
app.set('views', __dirname+'/views');
app.set('layout', 'layouts/layout');
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }))

app.use(expressLayouts);
app.use(express.static('public'));


mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection
db.on('error', error=>console.log(error))
db.once('open', ()=>console.log('Connected to Mogoose'))

app.use('/', indexRouter)
app.use('/authors', authorRouter)
app.use('/books', bookRouter)

app.listen(process.env.PORT || 3000, console.log('Server in on port 3000'))