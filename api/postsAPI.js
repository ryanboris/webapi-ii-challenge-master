const express = require('express')
const router = express.Router()
const db = require('../data/db.js')

router.get('/', async (req, res) => {
  try {
    const posts = await db.find()
    res.status(200).json(posts)
  } catch (e) {
    console.log(e)
    res.status(500).json({
      message:
        '500 <-> Internal Server Error, An error has occuried in the server, please try the request again.'
    })
  }
})

router.put('/:id', async (req, res) => {
  const { id } = req.params
  if (req.body.title || req.body.contents) {
    res.status(400).json({
      message:
        '400 <-- Bad request, please provide a new title or new contents to update the post.'
    })
  }
  else {
    //title, contents -> what if at least one isn't sent with the req.body? (OR)

    try {
      const resp = await db.update(id, req.body)
      //Response is not a 1 indicating a successful put operation
      res.status(200).json(resp)
    } catch (e) {
      res.status(500).json({
        message:
          '500 <-> Internal Server Error, An error has occuried in the server, please try the request again.'
      })
    }
  }
})

module.exports = router
