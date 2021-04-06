import Utils from './utils.service'
import typedi from 'typedi'

const utilsService = typedi.get(Utils)

export class Revision {
  verify(proposal, realWord) {
    const normProposal = utilsService.normalize(proposal)
    const normRealWord = utilsService.normalize(realWord)
    return {
      fullyValid: normProposal === normRealWord,
    }
  }
}
