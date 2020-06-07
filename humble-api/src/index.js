const jsdom = require('jsdom')
const puppeteer = require('puppeteer')

const url = 'https://www.humblebundle.com'

const { JSDOM } = jsdom

const fetchHumbleBundle = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(url)

  const dropdownBtn = await page.$('.js-bundle-dropdown')
  await dropdownBtn.click()

  const content = await page.$('.bundle-dropdown-content')
  const result = await content.evaluate(node => node.innerHTML)

  await browser.close()
  return result
}

const parseCard = ({ innerHTML: content, href: url }) => {
  const { document } = (new JSDOM(content)).window

  return {
    title: document.querySelector('.name').textContent,
    description: document.querySelector('.detailed-marketing-blurb').textContent,
    image: document.querySelector('img').attributes['data-src'].textContent,
    url,
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

module.exports = { parsePage, parseCard, fetchHumbleBundle }
