import { CONSTANTS } from './constants.js'

export function getArcana (arcanaName) {
  return CONSTANTS.ARCANA[arcanaName] || CONSTANTS.ARCANA_MISSING
}