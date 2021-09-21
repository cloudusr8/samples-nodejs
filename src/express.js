const express = require('express')
const cors = require('cors')
const router = require('./expressRouter')

const app = express()
const port = 3000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/recipes/step', router)

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})
