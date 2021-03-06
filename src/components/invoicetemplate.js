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
        <br />
        Address: {props.customer.customerAddress}
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

class Invoicetemplate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: 90,
      items: [],
      newItem: {},
      newitem_id: 1
    };
    this.createInvoiceItem = this.createInvoiceItem.bind(this);
    this.remove_line = this.remove_line.bind(this);
  }

  createInvoiceItem(data) {
    console.log(arguments);
    let new_item = arguments[0].item_data;
    new_item.id = this.state.newitem_id;

    this.setState({
      newitem_id: this.state.newitem_id + 1,
      items: [...this.state.items, new_item]
    });
  }

  remove_line = id => {
    console.log("remove ", id);
    //var new_items = this.state.items.filter((el)=>{ return el.id !== id });
    //console.log('n',new_items);
    //new_items.splice(id, 1);
    //console.log('n2',new_items);
    const new_items = this.state.items.filter(el => {
      return el.id !== id;
    });
    this.setState({items:[]});
    console.log('scs',this.state.items);
    this.setState({
      items: new_items
    });
    
    console.log('ni:', new_items);

    console.log("w", this.state.items);

  };

  update_line = (id, obj) => {
    console.log(id, obj);
    if(obj){
      var new_items = this.state.items.filter((el)=>{ return el.id !== obj.id });
      new_items[id] = obj;
      this.setState({
        items: new_items
      });
    }
    console.log("z", this.state.items);
  };

  render() {
    let total_amount =
      this.state.amount +
      (this.state.amount * parseFloat(this.props.ownData.own_gst_rate)) / 100;

    let invoice_items = this.state.items;

    return (
      <div className="invoice">
        <h2 className="invoice__header">
          <span className="invoice_number">
            {" "}
            Tax Invoice #{this.props.invoiceNumber}
          </span>
          <span className="invoice_date"> Date: {this.props.invoiceDate}</span>
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
          <div className="invoice__items">
            <InvoiceForm
              createInvoiceItem={this.createInvoiceItem.bind(this)}
              currency={this.props.customerData.currency}
              item_id={this.state.newitem_id}
            />
            <InvoiceElements
              elements={this.state.items}
              currency={this.props.customerData.currency}
              remove_line={this.remove_line}
              update_line={this.update_line}
            />
          </div>
          <BillTotal
            amount={this.state.amount}
            gst_rate={parseFloat(this.props.ownData.own_gst_rate)}
            currency={this.props.customerData.currency}
          />
        </div>
      </div>
    );
  }
}

export default Invoicetemplate;
