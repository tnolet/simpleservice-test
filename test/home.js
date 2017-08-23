const Lab = require('lab')
const lab = exports.lab = Lab.script()
const describe = lab.describe
const it = lab.it
const expect = Lab.expect

const server = require('../')

describe('home', () => {
  it('serves the homepage with hero text and a nice coloured background', (done) => {
    server.inject({ method: 'GET', url: '/' }, response => {
      expect(response.statusCode ).to.equal(200)
      expect(response.result).to.contain('h1')
      expect(response.result).to.contain('background-color:')
      done()
    })
  })
})