const express = require('express')
const app = express()
const rowdy = require('rowdy-logger')
const models = require('./models')
const cookieParser = require('cookie-parser')


// middleware
const rowdyRes = rowdy.begin(app)
app.use(require('morgan')('tiny'))
app.set('view engine', 'ejs')
app.use(require('express-ejs-layouts'))
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())


app.use(async(req, res, next) => {
    const user = await models.user.findByPk(req.cookies.userId)

    res.user = user

    next()
})

// routes
app.get('/', async(req, res) => {
    //console.log(req.cookies)
    // res.user set in upstream function
    console.log(res.user)

    res.render('index')
})

app.get('/users/new', (req, res) => {
    res.render('users/new')
})

app.use('/users', require('./controllers/usersController'))



const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log('server started!');
    rowdyRes.print()
})