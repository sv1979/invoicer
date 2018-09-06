import React from "react";
import { render } from "react-dom";

import InvoiceListElement from "./invoicelistelement";

class InvoiceElements extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // remove_line = id => {
  //   console.log('---',id);
  // };

  render() {
    let allElements = this.props.elements.map((el, idx) => {
      return (
        <InvoiceListElement
          index={el.id}
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
