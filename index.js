const express = require('express')
const app = express()
const port = 5000;
var cors = require('cors')
app.use(cors())



app.get('/', (req, res) => {
  res.send('Todo Manager Ready!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})