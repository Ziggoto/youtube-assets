const fs = require('fs')
const path = require('path')
const { fetchHumbleBundle, parsePage } = require('../src')

const mockedPage = fs.readFileSync(path.resolve(__dirname, 'mockedPage.html'), { encoding: 'utf8' })

describe('Main application', () => {
  const parsedPage = parsePage(mockedPage)

  describe('fetchHumbleBundle', () => {
    it('should return a string', async (done) => {
      const sourceCode = await fetchHumbleBundle()

      expect(sourceCode).toEqual(expect.any(String))
      done()
    }, 10 * 1000)
  })

  describe('parseCard', () => {
    const card = parsedPage[0]

    it('card should have a title', () => {
      expect(card.title).toBeDefined()
    })

    it('card should have a description', () => {
      expect(card.description).toBeDefined()
    })

    it('card should have a image', () => {
      expect(card.image).toBeDefined()
    })

    it('card should have a url', () => {
      expect(card.url).toBeDefined()
    })

    it('card should have a timeLeft', () => {
      expect(card.timeLeft).toBeDefined()
    })

    it('card should have a highlights', () => {
      expect(card.highlights).toBeDefined()
    })

    describe('highlights', () => {
      const highlights = card.highlights

      it('highlights should be an array', () => {
        expect(highlights).toEqual(expect.any(Array))
      })

      it('highlights should have 3 elements', () => {
        expect(highlights).toHaveLength(3)
      })
    })
  })

  describe('parsePage', () => {
    it('should an array', () => {
      expect(parsedPage).toEqual(expect.any(Array))
    })
  })
})
