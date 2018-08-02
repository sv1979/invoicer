import React from "react";
import { render } from "react-dom";

class Invoicetemplate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
      }

      render() {
        return (
            <div className="invoicetemplate">
                <header>Invoice #</header>
            </div>
        )};
}

export default Invoicetemplate;