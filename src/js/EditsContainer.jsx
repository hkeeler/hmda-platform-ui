var React = require('react');
var EditsSyntacticalValidity = require('./EditsSyntacticalValidity.jsx');
var EditsMacro = require('./EditsMacro.jsx');
var EditsHeaderDescription = require('./EditsHeaderDescription.jsx');

var EditsContainer = React.createClass({
  getInitialState: function() {
    return {
    	"edits": {
    		"syntactical": [],
    		"validity": [],
    		"quality": [],
    		"macro": []
    	}
    }
  },

  componentWillMount: function() {
    var _this = this;
    console.log('setting state');
    _this.setState (
      {
        "edits": {
          "syntactical": [
            {
              "loanNumber": "123455",
            	"edits": [
                {
              		"id": 1,
              		"desc": "Here is a desc",
              		"field": "Year",
              		"valueSubmitted": "1967"
              	}, {
              		"id": 2,
              		"desc": "Here is another desc",
              		"field": "Year",
              		"valueSubmitted": "1800"
              	}, {
              		"id": 3,
              		"desc": "Here is another desc",
              		"field": "Year",
              		"valueSubmitted": "1800"
              	}
              ]
            },
            {
              "loanNumber": "09876",
            	"edits": [
                {
              		"id": 1,
              		"desc": "Here is a desc",
              		"field": "Year",
              		"valueSubmitted": "1967"
              	}, {
              		"id": 2,
              		"desc": "Here is another desc",
              		"field": "Year",
              		"valueSubmitted": "1800"
              	}
              ]
            }
          ],
          "validity": [
            {
              "loanNumber": "123455",
            	"edits": [
                {
              		"id": 1,
              		"desc": "Here is a desc",
              		"field": "Year",
              		"valueSubmitted": "1967"
              	}, {
              		"id": 2,
              		"desc": "Here is another desc",
              		"field": "Year",
              		"valueSubmitted": "1800"
              	}, {
              		"id": 3,
              		"desc": "Here is another desc",
              		"field": "Year",
              		"valueSubmitted": "1800"
              	}
              ]
            },
            {
              "loanNumber": "09876",
            	"edits": [
                {
              		"id": 1,
              		"desc": "Here is a desc",
              		"field": "Year",
              		"valueSubmitted": "1967"
              	}, {
              		"id": 2,
              		"desc": "Here is another desc",
              		"field": "Year",
              		"valueSubmitted": "1800"
              	}
              ]
            }
          ],
          "macro": {
            	"edits": [
                {
              		"id": 1,
              		"desc": "Here is a desc",
                  "justification":"",
                  "verified":false
              	}, {
              		"id": 2,
              		"desc": "Here is another desc",
                  "justification": "Why not",
                  "verified": true
              	}
              ]
            }
          }
      }
    )
  },

  render: function() {
    return (
      <div className="EditsContainer container">
        <div className="third">
          <p>Filing progress will go here. It could be in progress or complete or ...</p>
        </div>
        <div className="two-third">
          <EditsHeaderDescription>Syntactical</EditsHeaderDescription>
          <EditsSyntacticalValidity id="syntactical" edits={this.state.edits.syntactical} />

          <EditsHeaderDescription>Validity</EditsHeaderDescription>
          <EditsSyntacticalValidity id="validity" edits={this.state.edits.validity} />

          <EditsHeaderDescription>Macro</EditsHeaderDescription>
          <EditsMacro id="macro" edits={this.state.edits.macro} />
        </div>
      </div>
    )
  }
});

module.exports = EditsContainer;
