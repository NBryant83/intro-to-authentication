const router = require('express').Router()
const db = require('../models')


router.get('/', (req, res) => {
    res.render('users/new')
})

router.post('/', async(req, res) => {
    const newUser = await db.users.create({
        email: req.body.email,
        password: req.body.password
    })
    res.cookie('userId', newUser.id)
    res.redirect('users/new')
})

router.get('/login', (req, res) => {
    res.render('users/login')
})

router.post('/login', async(req, res) => {
    // res.send('you just submitted a login form')
    // look up the user who has the incoming email
    const user = await models.user.findOne({
            where: { email: req.body.email }
        })
        // check if that user's password matches the incoming password
    if (user.password === req.body.password) {
        // if yes, set cookie userId = user.id
        res.cookie('userId', user.id)
        res.redirect('/')
            // if no, re-render the login form
    } else {
        res.render('users/login')
    }
})

router.get('/logout', (req, res) => {
    res.clearCookie('userId')
    res.redirect('/')
})


module.exports = router