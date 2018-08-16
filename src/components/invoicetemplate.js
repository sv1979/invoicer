import React from "react";
import { render } from "react-dom";
import Helpers from "../helpers/helpers";
import InvoiceForm from "./invoiceform";
import InvoiceElements from "./invoiceelements";

const helpers = new Helpers();

function TextWithBreaks(props) {
  return props.content.split("\n").map((el, index) => {
    return (
      <p className="m_b_t_5" key={index}>
        {el}
      </p>
    );
  });
}

function CustomerDetails(props) {
  let address =
    props.customer.customerAddress !== "" ? (
      <span>
        <br />Address: {props.customer.customerAddress}
      </span>
    ) : (
      ""
    );
  return (
    <h3>
      Bill to: {props.customer.customerName}
      {address}
    </h3>
  );
}

function BillDetails(props) {
  return (
    <div>
      <h4 className="bold_font">
        Amount due: {props.amount} {props.currency}
      </h4>
      <h4 className="bold_font">Due date: {props.dueDate}</h4>
    </div>
  );
}

function OwnDetails(props) {
  let address =
    props.owndata.own_address !== "" ? (
      <span>
        <br />
        {props.owndata.own_address}
      </span>
    ) : (
      ""
    );
  return (
    <div className="invoice__own_data">
      <h3>
        {props.owndata.own_name}
        {address}
      </h3>
    </div>
  );
}

function BillTotal(props) {
  let invoice_gst = (parseFloat(props.amount) * parseInt(props.gst_rate)) / 100;
  return (
    <div className="invoice__item invoice__total">
      <h4>
        Subtotal : {props.amount} {props.currency}
      </h4>
      <h5>
        Gst {props.gst_rate}% : {invoice_gst} {props.currency}
      </h5>
      <h3 className="bold_font">
        Invoice total: {parseFloat(props.amount) + parseFloat(invoice_gst)}{" "}
        {props.currency}
      </h3>
    </div>
  );
}

function BillItems(props) {
  return (
    <div className="invoice__items">
      <InvoiceForm
        createInvoiceItem={props.createInvoiceItem.bind(this)}
        rate={props.rate}
        currency={props.currency}
      />
      <InvoiceElements elements={props.items} currency={props.currency} />
    </div>
  );
}

class Invoicetemplate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: 90,
      items: [],
      newItem: {}
    };
    this.createInvoiceItem = this.createInvoiceItem.bind(this);
  }

  createInvoiceItem(data) {
    console.log(arguments);
    let new_item = arguments[0].item_data;
    this.setState({
      items: [...this.state.items, new_item]
    });
  }

  render() {
    let total_amount =
      this.state.amount +
      (this.state.amount * parseFloat(this.props.ownData.own_gst_rate)) / 100;

    return (
      <div className="invoice">
        <h2 className="invoice__header">
          Tax Invoice #{this.props.invoiceNumber}
        </h2>
        <div className="invoice__own_data">
          <OwnDetails owndata={this.props.ownData} />
          <h4>
            IRD number:
            {helpers.formatNumber(this.props.ownData.own_ird_number)} <br />
            GST number:
            {helpers.formatNumber(this.props.ownData.own_gst_number)}
          </h4>
          <h5>
            Bank account:
            {this.props.ownData.own_bank_account}
            <br />
            <TextWithBreaks content={this.props.ownData.own_account_details} />
          </h5>
        </div>
        <div className="invoice__own_data">
          <CustomerDetails customer={this.props.customerData} />
          <BillDetails
            amount={total_amount}
            dueDate={this.props.dueDate}
            currency={this.props.customerData.currency}
          />
          <BillItems
            items={this.state.items}
            createInvoiceItem={this.createInvoiceItem}
            rate={this.props.ownData.own_rate}
            currency={this.props.customerData.currency}
          />
          <BillTotal
            amount={this.state.amount}
            gst_rate={this.props.ownData.own_gst_rate}
            currency={this.props.customerData.currency}
          />
        </div>
      </div>
    );
  }
}

export default Invoicetemplate;
