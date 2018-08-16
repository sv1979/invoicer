import React from "react";
import { render } from "react-dom";

import InvoiceListElement from "./invoicelistelement";


class InvoiceElements extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
      }
      
      render() {
        let allElements = this.props.elements.map((el, idx)=>{
            return (<InvoiceListElement job_note={el.job_note} quantity={el.quantity} units={el.units} rate={el.rate} key={idx}/>)
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
                        <th className="no_border"></th>
                    </tr>
                </thead>
                <tbody>
                    { allElements }
                </tbody>
                </table>
            )
        } else {
            return (<span>Enter data to the form</span>);
        }

      }
}
export default InvoiceElements;