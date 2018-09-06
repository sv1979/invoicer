import React from "react";
import { render } from "react-dom";

import InvoiceListElement from "./invoicelistelement";

class InvoiceElements extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      elements: []
    };
  }
  componentDidMount() {
    this.state = {
      elements: this.props.elements
    };
  }

  // remove_line = id => {
  //   console.log('---',id);
  // };

  componentWillReceiveProps(props) {
    console.log('p2',props);
    this.setState({
      elements: props.elements
    });
    //this.forceUpdate();
  }

  componentDidMount(){
    this.setState({
      elements: this.state.elements
    });
  }

  render() {
    let allElements = this.state.elements.map((el, idx) => {
      return (
        <InvoiceListElement
          id={el.id}
          quantity={el.quantity}
          units={el.units}
          rate={el.rate}
          key={idx}
          job_note={el.job_note}
          remove_line={this.props.remove_line}
          update_line={this.props.update_line}
        />
      );
    });

    if (allElements.length > 0) {
      return (
        <table className="invoice__table">
          <thead>
            <tr>
              <th></th>
              <th className="standard_border">Description</th>
              <th className="standard_border">Quantity</th>
              <th className="standard_border">Rate, {this.props.currency}</th>
              <th className="standard_border">Total, {this.props.currency}</th>
              <th className="no_border" />
            </tr>
          </thead>
          <tbody>{allElements}</tbody>
        </table>
      );
    } else {
      return <span>Enter data to the form</span>;
    }
  }
}
export default InvoiceElements;
