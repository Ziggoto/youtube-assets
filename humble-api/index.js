#!/usr/bin/env node
const express = require('express')
const { fetchHumbleBundle, parsePage } = require('./src')

const app = express()

app.get('/', (_, res) => void(res.send('It`s working')))

app.get('/get-bundles', (_, res) => fetchHumbleBundle()
  .then(parsePage)
  .then(data => void(res.send(data)))
)

app.listen(8888, () => void(console.log('Server running on port 8888')))
