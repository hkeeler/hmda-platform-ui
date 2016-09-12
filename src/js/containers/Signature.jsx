import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchSignature, updateSignature } from '../actions'
import Signature from '../components/Signature.jsx'

class SignatureContainer extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.dispatch(fetchSignature())
  }

  render() {
    console.log('SignatureContainer - render')
    return <Signature {...this.props} />
  }
}

function mapStateToProps(state) {
  const {
    isFetching,
    timestamp,
    receipt
  } = state.app.sign || {
    isFetching: false,
    timestamp: null,
    receipt: null
  }

  return {
    isFetching,
    timestamp,
    receipt
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onSignatureClick: function(signed) {
      dispatch(updateSignature(signed))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignatureContainer)
