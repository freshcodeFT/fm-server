const express = require('express')
const app = express()

app.use(express.json())

const PORT = 3000

app.get(
  '/',
  (req, res, next) => {
    req.test = true
    console.log('First cb')
    next()
  },
  (req, res, next) => {
    console.log('Second cb')
    next()
  },
  (req, res, next) => {
    console.log('Third cb')
    console.log(req.test)
    next()
  },
  (req, res, next) => {
    res.send('Hello world!')
  }
)

app.get('*', (req, res) => {
  res.send('ERROR 404')
})

app.post('/', (req, res) => {
  console.log(req.body)
})

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT} port`)
})
