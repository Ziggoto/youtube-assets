#!/usr/bin/env node
const { fetchHumbleBundle, parsePage, parseCard } = require('./src')

fetchHumbleBundle()
  .then(parsePage)
  .then(console.log)
