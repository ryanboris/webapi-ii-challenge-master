require('dotenv').config()
const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const postsRouter = require('./api/postsAPI.js')

const app = express()

//Allow for posts requests (parse req.body)

app.use(express.json())
app.use(helmet())
app.use(cors())

app.use('/api/posts', postsRouter)

// Basic catch-all route - check for sanity

app.get('/', (req, res, next) => {
  res.status(200).send("Yo, I'm sane!")
})

app.listen(process.env.PORT || 5000, () =>
  console.log(`<--- Alive on port ${process.env.PORT}`)
)
