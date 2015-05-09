/** @jsx React.DOM */
;(function(React, undefined) {
  var inputs = [
    {
      name: "start",
      label: "Starting amount",
      val: "0",
      calc(inputs) {
        return inputs["start"].val||0.0; /* Nothing to calculate - this is the Principal amount. */
      }
    },
    {
      name: "apr",
      label: "Interest rate (APR)",
      val: "0.0",
      calc(inputs) {
        var apr;
        if (inputs["apr"].val) {
          apr = inputs["apr"].val / 100;
        }
        else {
          apr = (inputs["start"] - inputs["min"]) / parseFloat(inputs["term"])
        }
        return apr;
      }
    },
    {
      name: "term",
      label: "Term (months)",
      val: "60",
      calc(inputs) {
        var term = parseInt(inputs["min"])
        return;
      }
    },
    {
      name: "min",
      label: "Minimum monthly payment",
      val: "0",
      calc(inputs) {
        val = parseFloat(val);
        return;
      }
    },
    {
      name: "monthly",
      label: "Final monthly payment",
      val: "0",
      calc(inputs) {
        return;
      }
    }
  ];

  var CalcLoan = React.createClass({
    getInitialState() {
      return {
        inputs: []
      };
    },
    componentWillMount() {
      this.setState({
        inputs: this.props.inputs
      });
    },
    calculateClick(event) {
      event.preventDefault();
      this.setState({
        apr: this.state.inputs.apr.calc(this.state.inputs),
        min: this.state.inputs.min.calc(this.state.inputs),
        term: this.state.inputs.term.calc(this.state.inputs),
        monthly: this.state.inputs.monthly.calc(this.state.inputs)
      });
    },
    calculateChange(event) {
      var el = event.eventTarget,
        val = el.value,
        name = el.id,
        index = el.getAttribute("data-index");
    },
    render() {
      var i = 0,
        total = this.state.inputs.length,
        fields = [];
      for (; i < total; ++i) {
        fields[i] = (
          <Input
            key={i}
            onChange={}
            label={this.state.inputs[i].label}
            name={this.state.inputs[i].name}
            val={this.state.inputs[i].val} />
        );
      }
      return (
        <form ref="calcLoan" className="row">
          <fieldset className="four columns">
            <legend>
              {this.props.label}
            </legend>
            <ul>
              {fields}
            </ul>
            <button
              className="medium primary button calc"
              type="button"
              id="calc-loan-btn"
              onClick={this.calculateClick}>Calculate
            </button>
          </fieldset>
          <div
            id="results"
            className="eight columns">
            <h2>Minimum payment generation:</h2>
            <blockquote id="min-gen">
              (% APR / 12 months/year * $Principal) / Term
            </blockquote>
            <h3>Total:</h3>
            <blockquote id="total">
              $XX,XXX.XX
            </blockquote>
          </div>
        </form>
      );
    }
  });

  var Input = React.createClass({
    getInitialState() {
      return {
        val: ""
      }
    },
    componentWillMount() {
      this.setState({
        val: this.props.val
      });
    },
    render() {
      return (
        <li>
          <label forHtml={this.props.name}>Starting amount</label>
          <input ref={this.props.name} type="text" id={this.props.name} name={this.props.name} defaultValue={this.state.val} />
        </li>
      );
    }
  });
  React.render( <CalcLoan inputs={inputs} label="Calculate loan" />, document.getElementById("add-loan") );
})(React);
