if(process.env.NODE_ENV != 'production'){ require('dotenv').config() }

// dependencies externs
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
// dependencies interns
const indexRouter = require('./routes/index')
//app
const app = express();

app.set('view engine', 'ejs');
app.set('views', __dirname+'/views');
app.set('layout', 'layouts/layout');

app.use(expressLayouts);
app.use(express.static('public'));
app.use('/', indexRouter)

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection
db.on('error', error=>console.log(error))
db.once('open', ()=>console.log('Connected to Mogoose'))

app.listen(process.env.PORT || 3000, console.log('Server in on port 3000'))