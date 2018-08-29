const express = require('express')
const path = require('path')

const EXPRESS_PORT = process.env.EXPRESS_PORT || process.env.PORT || 8080

const app = express() // run express instance

app.use('/', express.static('build'))
app.use('/static', express.static('build/static'))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/build/index.html'));
  const ip = req.headers['x-real-ip'] || req.headers['x-forwarded-for'] || req.connection.remoteAddress
  console.log('Express:', ip)
})

// 404 error handle
app.use((req, res) => res.status(404).send('[404] Something broke!'))

// 500 error handle
app.use((err, req, res, next) => {
  console.error(err.stack || err.message || err)
  res.status(500).send(err.message || err)
})

app.listen(EXPRESS_PORT, () => {
  console.log('Server listening on: http://localhost:%s', EXPRESS_PORT)
})
