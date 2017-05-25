import receiveFiling from './receiveFiling.js'
import receiveError from './receiveError.js'
import hasHttpError from './hasHttpError.js'
import requestFiling from './requestFiling.js'
import { getFiling } from '../api/api.js'

export default function fetchFiling(filing) {
  return dispatch => {
    dispatch(requestFiling())
    return getFiling(filing.institutionId, filing.period)
      .then(json => {
        if(hasHttpError(json)) throw new Error(JSON.stringify(dispatch(receiveError(json))))
        return dispatch(receiveFiling(json))
      })
      .catch(err => console.error(err))
  }
}