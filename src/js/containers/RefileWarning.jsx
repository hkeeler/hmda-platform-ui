import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import RefileWarning from '../components/RefileWarning.jsx'
import { createNewSubmission } from '../actions'

export function mapStateToProps(state) {
  const {
   submission
  } = state.app || {
    status: {
      code: 3,
      message: ''
    }
  }

  const {
    types
  } = state.app.edits || {types: {
    syntactical: {edits: []},
    validity: {edits: []},
    quality: {edits: []},
    macro: {edits: []}
  }}

  return {submission, types}
}

export default connect(mapStateToProps)(RefileWarning)
