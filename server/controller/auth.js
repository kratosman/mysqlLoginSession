const express = require('express');
const router = express.Router();
const conn = require('../database');


router.get('/verify', (req, res) => {
    res.redirect('/public/isVerify.html');
})

function requireSession(req, res, next) {
    if (req.session && req.session.user) {
        next();
    } else {
        res.redirect('/login');
    }
}

router.get('/login', (req, res) => {
    res.redirect('/public/login.html');
})

router.get('/', requireSession, (req, res) => {
    res.redirect('/public/home.html');
})

router.post('/loginPost', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        
    }

    let sql = 'SELECT * FROM tbl_user WHERE email = ? AND password = ?';
    conn.query(sql, [email,password], (err, results) => {
        if (err) throw err;
        
        if (results.length > 0) {
            const user = results[0];
            let sqlUp = 'UPDATE tbl_user SET isLoggedIn = ? WHERE email = ?';
            conn.query(sqlUp, [1, user.email], (err, updateRes) => {

                if (err) throw err;
                req.session.user = { 'email': user.email, 'id': user.id }
                console.log(req.session.user);
                res.redirect('/')
            } )
            
        }
    })   
})

router.post('/logout', (req, res) => {
    const userEmail = req.session.user ? req.session.user.email : undefined; 
    console.log(userEmail)
    req.session.destroy((err) => {
        if (err) {
            console.error(err);
        } else {
            let sqlUp = 'UPDATE tbl_user SET isLoggedIn = ? WHERE email = ?';
            conn.query(sqlUp, [0, userEmail], (err, results) => {
                if (err) throw err;

                res.redirect('/login');
            })
        }
    })
})

router.get('/data', (req, res) => {
    let sql = 'SELECT * FROM tbl_user';
    conn.query(sql, (err, results) => {
        if (err) throw err;

        res.status(200).json({
            message: results
        })
    })
})
router.get('/user', (req,res) => {
    const userId = req.session.user.id;
    console.log(userId)
    res.json({userId});
})
router.get('/data/:id', (req, res) => {
    const userId = req.params.id;
    let sql = 'SELECT * FROM tbl_user WHERE id = ?';
    conn.query(sql, [userId], (err, results) => {
        if (err) throw err;

        if (results.length > 0) {
            const user = results[0];
            res.json(user)
        } else {
            res.status(400).json({
                message: 'User not found!!'
            })
        }
    })
})
module.exports = router;