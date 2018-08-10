import React from "react";
import ReactDOM from "react-dom";
import { render } from "react-dom";

import Helpers from "./helpers/helpers";

import "./styles.scss";

import Customers from "./components/customers.js";
import Owndata from "./components/owndata.js";
import Invoicetemplate from "./components/invoicetemplate.js";

const helpers = new Helpers();

let all_customers = {
  //TODO: get data from database
  customer_base: [
    {
      name: "AASS",
      address: "31",
      currency: "NZD"
    },
    {
      name: "DDDD",
      address: "28",
      currency: "USD"
    }
  ]
};

let own_data = {
  //TODO: get data from database
  name: "John Doe",
  address: "1 White road, Swanson, NY",
  ird_number: "111235654",
  gst_number: "345567876",
  bank_account: "42144445566543",
  account_details: "ANZ Bank New Zealand Limited\n SWIFT code: ANZBNZ22",
  rate: 40,
  gst_rate: 15
};

let invoice_number = 11 // TODO: get latest number from database
let invoice_date = new Date();
let due_date = new Date();
due_date.setDate(invoice_date.getDate()+10);

const formattedDate = (datestring) => datestring.toString().split(' ').splice(1,3).join(' ');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customer: {
        customerName: "",
        customerAddress: "",
        currency: "NZD"
      },
      own: {
        own_name: own_data.name,
        own_address: own_data.address,
        own_ird_number: own_data.ird_number,
        own_gst_number: own_data.gst_number,
        own_bank_account: own_data.bank_account,
        own_account_details: own_data.account_details,
        own_rate: own_data.rate,
        own_gst_rate: own_data.gst_rate
      }
    };
    this.setupCustomer = this.setupCustomer.bind(this);
    this.setupOwndata = this.setupOwndata.bind(this);
  }

  setupCustomer(data) {
    this.setState(
      {
        customer: {
          customerName: arguments[0].customer_data.name,
          customerAddress: arguments[0].customer_data.address,
          currency: arguments[0].customer_data.currency
        }
      },
      () => {}
    );
    //TODO: create or update data in database
  }

  setupOwndata(data) {
    this.setState(
      {
        own: {
          own_name: arguments[0].own_data.name,
          own_address: arguments[0].own_data.address,
          own_ird_number: helpers.formatNumber(arguments[0].own_data.ird_number),
          own_gst_number: helpers.formatNumber(arguments[0].own_data.gst_number),
          own_bank_account: arguments[0].own_data.bank_account,
          own_account_details: arguments[0].own_data.account_details,
          own_rate: arguments[0].own_data.rate,
          own_gst_rate: arguments[0].own_data.gst_rate
        }
      },
      () => {}
    );
    //TODO: create or update data in database
  }

  render() {
    return (
      <main className="wrapper">
        <Customers
          setCustomer={this.setupCustomer}
          customerBase={all_customers.customer_base}
        />
        <Invoicetemplate
          ownData={this.state.own}
          customerData={this.state.customer}
          invoiceNumber={invoice_number + 1}
          invoiceDate={formattedDate(invoice_date)}
          dueDate={formattedDate(due_date)}
          currency={this.state.currency}
        />
        <Owndata setOwndata={this.setupOwndata} ownData={own_data} />
        <div>cc</div>
      </main>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
