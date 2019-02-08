require('dotenv').config()
const express = require('express')
const session = require('express-session')
const {json} = require('body-parser')
const massive = require('massive')


const ctrl = require('./controllers/controller')

const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env

const app = express()
app.use(json())
app.use(session({
    secret:SESSION_SECRET,
    resave:false,
    saveUninitialized:false
}))

massive(CONNECTION_STRING).then((db)=>{
    app.set('db',db)
    console.log('Database Connected')
    app.listen(SERVER_PORT,()=>{console.log(`Magic at ${SERVER_PORT}`)})
})

app.post('/auth/register',ctrl.register)
app.get('/api/posts/:id',ctrl.getPosts)
app.get('/api/post/:id',ctrl.getPost)
app.post('/api/create/post/:id',ctrl.createPost)