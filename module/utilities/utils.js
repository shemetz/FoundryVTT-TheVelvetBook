import constants from '../constants.js'

export function getArcana (arcanaName) {
  return constants.ARCANA[arcanaName] || constants.ARCANA_MISSING
}