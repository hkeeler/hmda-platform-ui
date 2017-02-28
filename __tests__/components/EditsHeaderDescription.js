jest.unmock('../../src/js/components/EditsHeaderDescription.jsx')

import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import Wrapper from '../Wrapper.js'
import EditsHeaderDescription, {
  getText,
  renderCSVLink
} from '../../src/js/components/EditsHeaderDescription.jsx'

describe('EditsHeaderDescription', function() {
  const onDownloadClick = jest.fn()
  const header = TestUtils.renderIntoDocument(
    <Wrapper>
      <EditsHeaderDescription
        type="syntactical"
        count={1}
        onDownloadClick={onDownloadClick}
      />
    </Wrapper>
  )
  const headerNode = ReactDOM.findDOMNode(header)

  it('renders the header', function(){
    expect(headerNode).toBeDefined()
  })

  it('sets the prop appropriately', function(){
    expect(header.props.children.props.type).toEqual('syntactical')
    expect(header.props.children.props.count).toEqual(1)
  })

  it('calls the download function on click', () => {
    const link = TestUtils.scryRenderedDOMComponentsWithTag(header, 'a')[0]
    TestUtils.Simulate.click(link)
    expect(onDownloadClick).toBeCalled()
  })

  it('render the text-secondary class', () => {
    expect(TestUtils.scryRenderedDOMComponentsWithClass(header, 'text-secondary').length).toBe(1)
    expect(TestUtils.scryRenderedDOMComponentsWithClass(header, 'text-green').length).toBe(0)
  })

  const headerNoEdits = TestUtils.renderIntoDocument(
    <Wrapper>
      <EditsHeaderDescription
        type="syntactical"
        count={0}
        onDownloadClick={onDownloadClick}
      />
    </Wrapper>
  )

  it('render the text-green class', () => {
    expect(TestUtils.scryRenderedDOMComponentsWithClass(headerNoEdits, 'text-secondary').length).toBe(0)
    expect(TestUtils.scryRenderedDOMComponentsWithClass(headerNoEdits, 'text-green').length).toBe(1)
  })
})

describe('getText', () => {
  it('throws error if bad type', () => {
    try {
      getText('thisIsNotAType', 1)
    } catch(err) {
      expect(err.message).toEqual('Unexpected edit type. Unable to create edit description')
    }
  })

  it('throws error if missing type', () => {
    try {
      getText('', 1)
    } catch(err) {
      expect(err.message).toEqual('Unexpected edit type. Unable to create edit description')
    }
  })

  const syntacticalDesc = 'Edits that check whether the loan/application register is in the correct format and whether the data covers the correct filing year. The loan/application register cannot be filed until the filer corrects all syntactical edit errors and reuploads the updated loan/application register to the HMDA Platform.'

  it('returns syntactical with 1 edit', () => {
    const returned = getText('syntactical', 1)
    expect(returned).toEqual({
      id: 'syntactical',
      title: 'Syntactical Edit',
      desc: syntacticalDesc
    })
  })

  it('returns syntactical with 0 edits', () => {
    const returned = getText('syntactical', 0)
    expect(returned).toEqual({
      id: 'syntactical',
      title: 'Syntactical Edits',
      desc: syntacticalDesc
    })
  })

  const validityDesc = 'Edits that check whether there are valid values in each data field. The loan/application register cannot be filed until the filer corrects all validity edit errors and reuploads the updated loan/application register to the HMDA Platform.'

  it('returns validity with 1 edit', () => {
    const returned = getText('validity', 1)
    expect(returned).toEqual({
      id: 'validity',
      title: 'Validity Edit',
      desc: validityDesc
    })
  })

  it('returns validity with 0 edits', () => {
    const returned = getText('validity', 0)
    expect(returned).toEqual({
      id: 'validity',
      title: 'Validity Edits',
      desc: validityDesc
    })
  })

  const qualityDesc = 'Edits that check whether entries in the individual data fields or combinations of data fields conform to expected values. The loan/application register cannot be filed until the filer either confirms the accuracy of all values flagged by quality edits in the HMDA Platform, or corrects the flagged values and reuploads the updated loan/application register to the HMDA Platform.'
  it('returns quality with 1 edit', () => {
    const returned = getText('quality', 1)
    expect(returned).toEqual({
      id: 'quality',
      title: 'Quality Edit',
      desc: qualityDesc
    })
  })

  it('returns quality with 0 edits', () => {
    const returned = getText('quality', 0)
    expect(returned).toEqual({
      id: 'quality',
      title: 'Quality Edits',
      desc: qualityDesc
    })
  })

  const macroDesc = 'Edits that check whether the submitted loan/application register as a whole conforms to expected values. The loan/application register cannot be filed until the filer either confirms the accuracy of all the values flagged by the macro quality edits in the HMDA Platform or corrects the flagged values and reuploads the updated loan/application register to the HMDA Platform.'
  it('returns macro with 1 edit', () => {
    const returned = getText('macro', 1)
    expect(returned).toEqual({
      id: 'macro',
      title: 'Macro Edit',
      desc: macroDesc
    })
  })

  it('returns macro with 0 edits', () => {
    const returned = getText('macro', 0)
    expect(returned).toEqual({
      id: 'macro',
      title: 'Macro Edits',
      desc: macroDesc
    })
  })

  // uses the qualityDesc
  it('returns quality, by row, with 1 edit', () => {
    const returned = getText('rowsquality', 1)
    expect(returned).toEqual({
      id: 'quality',
      title: 'Row of Quality Edits',
      desc: qualityDesc
    })
  })

  it('returns quality, by row, with 0 edits', () => {
    const returned = getText('rowsquality', 0)
    expect(returned).toEqual({
      id: 'quality',
      title: 'Rows of Quality Edits',
      desc: qualityDesc
    })
  })

  const rowsSynValidDesc = 'Edits that check whether the loan/application register is in the correct format, whether the data covers the correct filing year, and whether there are valid values in each data field. The loan/application register cannot be filed until the filer corrects all syntactical edit errors and reuploads the updated loan/application register to the HMDA Platform.'
  it('returns syntactical and validity, by row, with 1 edit', () => {
    const returned = getText('rowssyntacticalvalidity', 1)
    expect(returned).toEqual({
      id: 'rowheader',
      title: 'Row of Syntactical and Validity Edits',
      desc: rowsSynValidDesc
    })
  })

  it('returns syntactical and validity, by row, with 0 edits', () => {
    const returned = getText('rowssyntacticalvalidity', 0)
    expect(returned).toEqual({
      id: 'rowheader',
      title: 'Rows of Syntactical and Validity Edits',
      desc: rowsSynValidDesc
    })
  })
})

describe('renderCSVLink', () => {
  it('render the correct text for the link for syntactical', () => {
    const onDownloadClick = jest.fn()
    const props = {
      count: 2,
      onDownloadClick: onDownloadClick,
      type: 'syntactical'
    }
    const rendered = renderCSVLink(props)
    expect(rendered.props.children.props.children[1]).toBe('syntactical')
  })

  it('renders NULL if count is 0', () => {
    const onDownloadClick = jest.fn()
    const props = {
      count: 0,
      onDownloadClick: onDownloadClick,
      type: 'syntactical'
    }
    const rendered = renderCSVLink(props)
    expect(rendered).toBe(null)
  })

  it('renders NULL if grouped by row', () => {
    const onDownloadClick = jest.fn()
    const props = {
      count: 0,
      onDownloadClick: onDownloadClick,
      type: 'rowssyntacticalvalidity'
    }
    const rendered = renderCSVLink(props)
    expect(rendered).toBe(null)
  })
})
