#!/usr/bin/env node
const jsdom = require('jsdom')
const puppeteer = require('puppeteer')

const url = 'https://www.humblebundle.com'

const { JSDOM } = jsdom

const fetchHumbleBundle = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(url)
  await page.$('.js-bundle-dropdown').then(btn => btn.click())

  const content = await page.$('.bundle-dropdown-content')
  const result = await content.evaluate(node => node.innerHTML)

  await browser.close()
  return result
}

const parseCard = card => {
  const { document } = (new JSDOM(card.innerHTML)).window

  return {
    title: document.querySelector('.name').textContent,
    description: document.querySelector('.detailed-marketing-blurb').textContent,
    image: document.querySelector('img').attributes['data-src'].textContent,
    url: card.href,
    timeLeft: document.querySelector('.js-days').textContent,
    highlights: [...document.querySelectorAll('.highlight')].map(h => h.textContent)
  }
}

const parsePage = page => {
  const { document } = (new JSDOM(page)).window

  const humbleCards = [...document.querySelectorAll('a.simple-tile-view')]
    .map(parseCard)

  return humbleCards;
}

fetchHumbleBundle()
  .then(parsePage)
  .then(console.log)
