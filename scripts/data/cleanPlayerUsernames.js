const R = require('ramda')

const writeData = require('./helpers/writeData')

module.exports = async function cleanPlayerUsernames() {
  console.info(`Cleaning Player Results data…`)
  const playerResults = require('../../data/playerResults.json')
  const activePlayerUsernames = R.map(R.prop('username'))(playerResults)

  const activePlayerUsernamesNormalized = R.sortBy(R.prop(0))(activePlayerUsernames)

  writeData('./playerUsernames.json', activePlayerUsernamesNormalized)
}
