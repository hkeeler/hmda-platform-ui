import requestEdits from './requestEdits.js'
import hasHttpError from './hasHttpError.js'
import receiveError from './receiveError.js'
import receiveEdits from './receiveEdits.js'
import fetchEachEdit from './fetchEachEdit.js'
import { getId } from './Submission.js'
import { getEdits } from '../api/api.js'

export default function fetchEdits() {
  return dispatch => {
    dispatch(requestEdits())
    return getEdits({submission: getId()})
      .then(json => {
        if(hasHttpError(json)) throw new Error(JSON.stringify(dispatch(receiveError(json))))
        dispatch(receiveEdits(json))
        dispatch(fetchEachEdit(json))
        return json
      })
      .catch(err => console.error(err))
  }
}