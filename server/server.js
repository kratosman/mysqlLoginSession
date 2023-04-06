const express = require('express');
const app = express();
const session = require('express-session');
const router = require('./controller/auth');

app.use(session({
    resave : false,
    saveUninitialized: false,
    secret: 'MySecret',
    cookie: {
        secure : false,
        maxAge: 60000
    }
}))

app.use(express.json());
app.use(express.static('../client'));
app.use('/', router);

app.listen(3000, () => {
    console.log('Apps listening to port 3k');
})