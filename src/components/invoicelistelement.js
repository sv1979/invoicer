import React from "react";
import { render } from "react-dom";

class InvoiceListElement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render(){
    return(
        <tr className="invoice__tr">
            <td className="invoice__td standard_border">{this.props.job_note}</td>
            <td className="invoice__td standard_border">{this.props.quantity} {this.props.units}</td>
            <td className="invoice__td standard_border">{this.props.rate}</td>
            <td className="invoice__td standard_border">{parseFloat(this.props.quantity) * parseFloat(this.props.rate)}</td>
            <td className="invoice__td no_border">
                {/* <button onClick={this.removeLine} >X</button> */}
            </td>
        </tr>
    )
  }
}
export default InvoiceListElement;
