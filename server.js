import express from 'express'
import mongoose from 'mongoose'
import Cors from 'cors'
import Cards from './modals/dbCards.js'
import dotenv from 'dotenv'
dotenv.config()

// App Config
const app = express()
const port = process.env.PORT || 8001

// Middlewares
app.use(express.json())
app.use(Cors())

// DB condig
mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(() => console.log("Database Connected"))

// API Endpoints
app.get('/', (req ,res) => {
    res.status(200).send("Hello")
})

app.post('/tiner/cards', (req, res) => {
    const dbCard = req.body
    Cards.create(dbCard, (err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(201).send(data)
        }
    })
})

app.get('/tiner/cards', (req, res) => {
    Cards.find((err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data)
        }
    }) 
})

// Listener
app.listen(port, () => console.log(`Listining on port ${port}`))