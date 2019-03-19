const express = require('express')
const router = express.Router()
const db = require('../data/db.js')

router.use(express.json())

router.get('/', async (req, res) => {
  try {
    const posts = await db.find()
    res.status(200).json(posts)
  } catch {
    res.status(500).json({
      message: '500 <-> Internal Server Error',
    })
  }
})

router.get('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const post = await db.findById(id)
    post.length === 0
      ? res.status(404).json({ message: '404 <-> Not Found' })
      : res.status(200).json(post)
  } catch  {
    res.status(500).json({
      message: '500 <-> Internal Server Error',
    })
  }
})

router.post('/', async (req, res) => {
  const { title, contents } = req.body
  if (!title || !contents) {
    res.status(400).json({ message: '400 <-> Bad Request' })
  }
  else {
    try {
      const posts = await db.insert(req.body)
      res.status(201).json(posts)
    } catch {
      res.status(500).json({
        message: '500 <-> Internal Server Error',
      })
    }
  }
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const numDeleted = await db.remove(id)
    numDeleted > 0
      ? res.status(200).json(numDeleted)
      : res.status(404).json({ message: '404 <-> Not Found' })
  } catch  {
    res.status(500).json({
      message: '500 <-> Internal Server Error',
    })
  }
})

router.put('/:id', async (req, res) => {
  const { id } = req.params
  if (!req.body.title && !req.body.contents) {
    res.status(400).json({ message: '400 <-> Bad Request' })
  }
  else {
    try {
      const updateCount = await db.update(id, req.body)
      updateCount === 1
        ? res.status(200).json(updateCount)
        : res.status(404).json({ message: '404 <-> Not Found' })
    } catch  {
      res.status(500).json({
        message: '500 <-> Internal Server Error'
      })
    }
  }
})

module.exports = router
