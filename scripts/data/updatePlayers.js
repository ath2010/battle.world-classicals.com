const fetchLichess = require('./helpers/fetchLichess')
const hasData = require('./helpers/hasData')
const writeData = require('./helpers/writeData')

module.exports = async function updatePlayers() {
  const playerUsernames = require('../../data/playerUsernames.json')

  let hasUpdated = false
  for (const playerUsername of playerUsernames) {
    const dataPath = `./lichess/players/${playerUsername}.json`
    if (hasData(dataPath)) {
      continue
    }

    console.info(`Updating Lichess Players data for: ${playerUsername}…`)
    hasUpdated = true
    try {
      const lichessPlayer = await fetchLichess(`/user/${playerUsername}`)

      writeData(dataPath, lichessPlayer)
    } catch (err) {
      console.error(`Error: ${err}`)

      break
    }
  }

  if (!hasUpdated) {
    console.info('Lichess Players data is up to date.')
  }
}