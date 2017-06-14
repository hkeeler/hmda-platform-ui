import React, { Component, PropTypes } from 'react'
import ValidationProgress from './ValidationProgress.jsx'
import Dropzone from 'react-dropzone'
import { UPLOADING } from '../constants/statusCodes.js'

export const renderValidationProgress = (props) => {
  if(props.code < UPLOADING && !props.uploading) return null
  return <ValidationProgress code={props.code} percentUploaded={props.percentUploaded}/>
}

export const renderErrors = (errors) => {
  if(errors.length === 0) return null

  return(
    <div className="usa-alert usa-alert-error" role="alert">
      <div className="usa-alert-body">
        <ul className="usa-alert-text">
          {errors.map((error, i) => {
            return(<li key={i}>{error}</li>)
          })}
        </ul>
      </div>
    </div>
  )
}

export const renderDropText = ({ code, errors, file }, dropzoneContent) => {
  let message = 'Drag your LAR file into this area, or click in this box to select a LAR file to upload.'
  let fileName = null

  if(code >= UPLOADING) {
    message = 'Drag another LAR file to this area, or click in the box to select a LAR file to upload.'
  }

  if(file) {
    message = `${file.name} is ready for upload.`
    if(errors.length > 0) {
      message = `${file.name} can not be uploaded.`
    }

    if(code >= UPLOADING) {
      message = `Submission of ${file.name} currently in progess. You can drag another LAR file to this area, or click in the box to select a LAR file to upload..`
    }
  }

  dropzoneContent.innerHTML = `<p>${message}</p>`
}

export default class Upload extends Component {
  constructor(props) {
    super(props)

    // handle the onDrop to set the file and show confirmation modal
    this.onDrop = acceptedFiles => {
      const {
        code,
        showConfirmModal,
        setFile,
        setNewFile
      } = this.props

      if(code >= UPLOADING) {
        showConfirmModal()
        setNewFile(acceptedFiles)
      } else {
        setFile(acceptedFiles)
      }
    }
  }

  componentDidUpdate() {
    renderDropText(this.props, this.dropzoneContent)
  }

  // keeps the info about the file after leaving /upload and coming back
  componentDidMount() {
    renderDropText(this.props, this.dropzoneContent)
      if(this.props.code > UPLOADING) this.props.pollSubmission()
  }

  render() {
    const isUploadDisabled = (this.props.code >= UPLOADING || this.props.file === null || this.props.errors.length !== 0) ? true : false

    return (
      <div>
        <div className="UploadForm">
          {renderErrors(this.props.errors)}
          <form
            className="usa-form"
            encType="multipart/form-data"
            onSubmit={e => this.props.handleSubmit(e, this.props.file)}>
            <div className="container-upload">
              <Dropzone
                disablePreview={true}
                onDrop={this.onDrop}
                multiple={false}
                className="dropzone">
                <div
                  ref={(node) => {this.dropzoneContent = node}}
                  className="usa-text-small">
                </div>
              </Dropzone>
            </div>
            <input
              disabled={isUploadDisabled}
              className="usa-button"
              id="uploadButton"
              name="uploadButton"
              type="submit"
              value="Upload">
            </input>
          </form>
          {renderValidationProgress(this.props)}
        </div>
      </div>
    )
  }
}

Upload.propTypes = {
  handleSubmit: PropTypes.func,
  setFile: PropTypes.func,
  setNewFile: PropTypes.func,
  showConfirmModal: PropTypes.func,
  pollSubmission: PropTypes.func,
  uploading: PropTypes.bool,
  file: PropTypes.object,
  code: PropTypes.number,
  errors: PropTypes.array
}
