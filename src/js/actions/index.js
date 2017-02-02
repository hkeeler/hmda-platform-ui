import {
  getInstitution,
  getInstitutions,
  getFiling,
  getFilingFromUrl,
  getSubmission,
  getLatestSubmission,
  createSubmission,
  getUploadUrl,
  getEdits,
  postEdit,
  getIRS,
  getSignature,
  postSignature,
  getSummary,
  setAccessToken,
  getAccessToken,
  getParseErrors,
  getEditsOfType
} from '../api'
import * as types from '../constants'
import fileSaver from 'file-saver'

let latestSubmissionId
let currentFilingPeriod

export function updateStatus(status) {
  return {
    type: types.UPDATE_STATUS,
    status: status
  }
}

export function requestInstitutions() {
  return {
    type: types.REQUEST_INSTITUTIONS
  }
}

export function receiveInstitutions(data) {
  return {
    type: types.RECEIVE_INSTITUTIONS,
    institutions: data.institutions
  }
}

export function requestInstitution() {
  return {
    type: types.REQUEST_INSTITUTION
  }
}

export function receiveInstitution(data) {
  return {
    type: types.RECEIVE_INSTITUTION,
    institution: data
  }
}

export function requestEditPost() {
  return {
    type: types.REQUEST_EDIT_POST
  }
}

export function receiveEditPost(data) {
  return {
    type: types.RECEIVE_EDIT_POST,
    data: data
  }
}

export function requestFiling() {
  return {
    type: types.REQUEST_FILING
  }
}

export function receiveFiling(data) {
  return {
    type: types.RECEIVE_FILING,
    filing: data
  }
}

export function updateFilingPeriod(filingPeriod) {
  filingPeriod = filingPeriod + ''
  currentFilingPeriod = filingPeriod

  return {
    type: types.UPDATE_FILING_PERIOD,
    filingPeriod: filingPeriod
  }
}

export function receiveSubmission(data) {
  latestSubmissionId = data.id.sequenceNumber

  return {
    type: types.RECEIVE_SUBMISSION,
    ...data
  }
}

export function requestCSV() {
  return {
    type: types.REQUEST_CSV
  }
}
export function requestEditsByType() {
    return {
      type: types.REQUEST_EDITS_BY_TYPE
    }
}

export function requestEditsByRow() {
    return {
      type: types.REQUEST_EDITS_BY_ROW
    }
}

export function receiveEditsByType(data) {
  return {
    type: types.RECEIVE_EDITS_BY_TYPE,
    edits: data
  }
}

export function receiveEditsByRow(data) {
  return {
    type: types.RECEIVE_EDITS_BY_ROW,
    edits: data
  }
}

export function clearFilings() {
  return {
    type: types.CLEAR_FILINGS
  }
}

export function selectFile(file) {
  return {
    type: types.SELECT_FILE,
    file
  }
}

export function showConfirm(show) {
  return {
    type: types.SHOW_CONFIRM,
    showConfirm: show
  }
}



export function uploadStart() {
  return {
    type: types.UPLOAD_START
  }
}

export function uploadComplete(xhrLoadEvent) {
  return {
    type: types.UPLOAD_COMPLETE,
    xhrLoadEvent
  }
}

export function uploadError() {
  return {
    type: types.UPLOAD_ERROR
  }
}

export function requestIRS() {
  return {
    type: types.REQUEST_IRS
  }
}

export function receiveIRS(data) {
  return {
    type: types.RECEIVE_IRS,
    msas: data.msas
  }
}

export function fetchIRS() {
  return dispatch => {
    dispatch(requestIRS())
    return getIRS(latestSubmissionId)
      .then(json => {
        dispatch(receiveIRS(json))
        dispatch(updateStatus(
          {
            code: json.status.code,
            message: json.status.message
          }
        ))
      })
      .catch(err => console.error(err))
  }
}

/*
this is just to set the isFetching value to true
*/
export function requestSignature() {
  return {
    type: types.REQUEST_SIGNATURE
  }
}

export function receiveSignature(data) {
  return {
    type: types.RECEIVE_SIGNATURE,
    timestamp: data.timestamp,
    receipt: data.receipt
  }
}

export function requestSignaturePost() {
  return {
    type: types.REQUEST_SIGNATURE_POST
  }
}

export function receiveSignaturePost(data) {
  return {
    type: types.RECEIVE_SIGNATURE_POST,
    timestamp: data.timestamp,
    receipt: data.receipt
  }
}

/* this is only to track if the signature checkbox is checked or not */
export function checkSignature(checked) {
  return {
    type: types.CHECK_SIGNATURE,
    checked: checked.checked
  }
}

export function fetchSignature() {
  return dispatch => {
    dispatch(requestSignature())
    return getSignature(latestSubmissionId)
      .then(json => {
        dispatch(receiveSignature(json))
        dispatch(updateStatus(
          {
            code: json.status.code,
            message: json.status.message
          }
        ))
      })
      .catch(err => console.error(err))
  }
}

export function updateSignature(signed) {
  return dispatch => {
    dispatch(requestSignaturePost())
    return postSignature(latestSubmissionId, signed)
      .then(json => {
        dispatch(receiveSignaturePost(json))
        dispatch(updateStatus(
          {
            code: json.status.code,
            message: json.status.message
          }
        ))
      })
      .catch(err => console.error(err))
  }
}

export function pickSort(groupByRow) {
  return {
    type: types.PICK_SORT,
    groupByRow
  }
}

export function triggerPickSort(groupByRow) {
  return dispatch => {
    dispatch(pickSort(groupByRow))
    let editAction = fetchEditsByType
    if(groupByRow) editAction = fetchEditsByRow
    dispatch(editAction())
  }
}

export function requestSummary() {
  return {
    type: types.REQUEST_SUMMARY
  }
}

export function receiveSummary(data) {
  return {
    type: types.RECEIVE_SUMMARY,
    respondent: data.respondent,
    file: data.file
  }
}

export function fetchSummary() {
  return dispatch => {
    dispatch(requestSummary())
    return getSummary(latestSubmissionId)
      .then(json => dispatch(receiveSummary(json)))
      .catch(err => console.error(err))
  }
}

export function requestParseErrors() {
  return {
    type: types.REQUEST_PARSE_ERRORS
  }
}

export function receiveParseErrors(data) {
  return {
    type: types.RECEIVE_PARSE_ERRORS,
    transmittalSheetErrors: data.transmittalSheetErrors,
    larErrors: data.larErrors
  }
}

export function fetchParseErrors() {
  return dispatch => {
    dispatch(requestParseErrors())
    return getParseErrors(latestSubmissionId)
      .then(json => dispatch(receiveParseErrors(json)))
      .catch(err => console.error(err))
  }
}

// downloading the csv edit reports, no reducer required
export function fetchCSV(institutionId, filing, submissionId) {
  return dispatch => {
    dispatch(requestCSV())
    return getEdits({
      id: institutionId,
      filing: filing,
      submission: submissionId,
      params: {
        format: 'csv'
      }
    })
      .then(csv => {
        fileSaver.saveAs(new Blob([csv], {type: 'text/csv;charset=utf-16'}), `${submissionId}-full-edit-report.csv`)
      })
  }
}

export function fetchCSVByType(type) {
  return dispatch => {
    dispatch(requestCSV())
    return getEdits({
      suffix: `/edits/${type}`,
      submission: latestSubmissionId,
      params: {
        format: 'csv'
      }
    })
      .then(csv => {
        fileSaver.saveAs(new Blob([csv], {type: 'text/csv;charset=utf-16'}), `${latestSubmissionId}-${type}-edit-report.csv`)
      })
  }
}

/*
 * Wire upload together with xhr so progress can be tracked
 */
export function requestUpload(file) {
  return dispatch => {
    var data = new FormData()
    data.append('file', file)

    var xhr = new XMLHttpRequest()

    xhr.addEventListener('load', e => {
      const uploadResponse = JSON.parse(e.target.response)

      dispatch(updateStatus({
        code: uploadResponse.status.code,
        message: uploadResponse.status.message
      }))

      if(e.target.status !== 202) {
        return dispatch(uploadError())
      }

      dispatch(uploadComplete(e))

      dispatch(pollForProgress())
    })

    xhr.open('POST', getUploadUrl(latestSubmissionId));
    xhr.setRequestHeader('Cache-Control', 'no-cache');
    xhr.setRequestHeader('Authorization', 'Bearer ' + getAccessToken());
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.send(data);

    dispatch(uploadStart())
    return Promise.resolve()
  }
}

/*
 * Signal that submission state should be wiped and a new submission should be created
 */
export function createNewSubmission(id, period) {
  return dispatch => {
    dispatch(selectFile())
    return dispatch(fetchNewSubmission(id, period))
  }
}

/*
 * Signal the creation of a new submission which will be used for subsequent actions
 */

export function fetchNewSubmission(id, period) {
  return dispatch => {
    return createSubmission(id, period)
      .then(json => dispatch(receiveSubmission(json)))
      .catch(err => console.error(err))
  }
}

/*
 * Get the latest submission via the api and dispatch an action with the results
 */
export function fetchSubmission() {
  return dispatch => {
    dispatch(requestFiling())
    return getFilingFromUrl().then(json => {
        dispatch(receiveFiling(json))

        const latestSubmission = json.submissions.reduce((prev, curr) => {
            return +curr.id.sequenceNumber > +prev.id.sequenceNumber ? curr : prev
          }, {id: {sequenceNumber: 0}})

        if(latestSubmission.id.sequenceNumber !== 0){
          return dispatch(receiveSubmission(latestSubmission))
        }else{
          return createSubmission(json.filing.institutionId, json.filing.period).then(submission => {
              dispatch(receiveSubmission(submission))
            })
        }

      })
      .catch(err => console.error(err))
  }
}

export function pollForProgress() {
  const poller = dispatch => {
    return getLatestSubmission()
      .then(json => dispatch(receiveSubmission(json)))
      .then(json => {
        if(json.status.code < 8 && json.status.code !== 5){
          setTimeout(() => poller(dispatch), 500)
        }
      })
      .catch(err => console.error(err))
  }
  return poller
}

/*
 * Get progress by fetching submission data at /institution/<id>/filings/<id>/submissions/<id>
 * This may be replaced by a call for just the status and not all of the submission data
 */
export function fetchProgress(id) {
  return dispatch => {
    return getSubmission(id)
      .then(json => dispatch(receiveSubmission(json)))
      .catch(err => console.error(err))
  }
}

/*
 * Get high level institution data at /institutions
 * Then get filing data for each institution at /institutions/<id>
 */
export function fetchInstitutions() {
  return dispatch => {
    dispatch(requestInstitutions())
    return getInstitutions()
      .then(json => dispatch(receiveInstitutions(json)))
      .then(receiveAction => {
        dispatch(fetchEachInstitution(receiveAction.institutions))
      })
      .catch(err => console.error(err))
  }
}

/*
 * Given a list of institutions, dispatch fetch instructions for each of them
 */
export function fetchEachInstitution(institutions) {
  return dispatch => {
    dispatch(clearFilings())
    return Promise.all(
      institutions.map( institution => {
        dispatch(fetchInstitution(institution))
      })
    )
  }
}

/*
 * Given a list of institutions, dispatch fetch instructions for the filings of each institution
 */
export function fetchEachFiling(institutions) {
  return dispatch => {
    dispatch(clearFilings())
    return Promise.all(
      institutions.map( institution => {
        dispatch(fetchFiling(institution))
      })
    )
  }
}

/*
 * Fetch an institution via the api and dispatch an action with the results
 */
export function fetchInstitution(institution) {
  return dispatch => {
    dispatch(requestInstitution())
    return getInstitution(institution.id)
      .then(json => {
        dispatch(receiveInstitution(json))
        if(json && json.filings){
          json.filings.forEach((filing) => {
            if(filing.period === currentFilingPeriod){
              dispatch(fetchFiling(institution))
            }
          })
        }
      })
      .catch(err => console.error(err))
  }
}

/*
 * Fetch the filing for the current filing period given an institution
 * and dispatch an action with the results
 */
export function fetchFiling(institution) {
  return dispatch => {
    dispatch(requestFiling())
    return getFiling(institution.id, currentFilingPeriod)
      .then(json => dispatch(receiveFiling(json)))
      .catch(err => console.error(err))
  }
}

export function fetchEditsByType() {
  return dispatch => {
    dispatch(requestEditsByType())
    return getEdits({submission: latestSubmissionId})
      .then(json => {
        dispatch(receiveEditsByType(json))
      })
      .catch(err => console.error(err))
  }
}

export function fetchEditsByRow() {
  return dispatch => {
    dispatch(requestEditsByRow())
    return getEdits({submission: latestSubmissionId, params: {sortBy: 'row'}})
      .then(json => dispatch(receiveEditsByRow(json)))
      .catch(err => console.error(err))
  }
}

export function justifyUpdate(data) {
  return dispatch => {
    dispatch(requestEditPost())
    return postEdit(latestSubmissionId, data)
      .then(() => dispatch(receiveEditPost(data)))
      .catch(err => console.error(err))
  }
}
