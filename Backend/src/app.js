import mongoose from 'mongoose'
import express from 'express'
import bodyParser from 'body-parser'
import { envVariables } from './config/env'
import cors from 'cors'

mongoose
  .connect(envVariables.db_string, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DB Connected')
  })
  .catch((err) => {
    console.log('Error connecting to muxdb' + err.stack)
  })

const port = 8000
const app = express()
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }))
app.use(bodyParser.json({ limit: '50mb' }))
app.options('*', cors())

var api = express.Router()
api.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  next()
})
require('./routes/api.js')(api)
app.use('/api', api)
var auth = express.Router()
auth.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  next()
})
require('./routes/auth.js')(auth)
app.use('/auth', auth)

app.listen(port, () => {
  console.log(`server listening on PORT ${port}`)
})
