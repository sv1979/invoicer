import React from "react";
import { render } from "react-dom";

function CustomerSelector(props) {
  return props.customers.map((el, index) => {
    return (
      <option
        key={index}
        data-address={el.address}
        value={index}
        data-currency={el.currency}
      >
        {el.name}
      </option>
    );
  });
}

class Customers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newCustomerName: "",
      newCustomerAddress: "",
      newCustomerCurrency: ""
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.handleCurrencyChange = this.handleCurrencyChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setCustomer = this.setCustomer.bind(this);
  }

  handleNameChange(event) {
    this.setState({ newCustomerName: event.target.value });
  }
  handleAddressChange(event) {
    this.setState({ newCustomerAddress: event.target.value });
  }
  handleCurrencyChange(event) {
    this.setState({ newCustomerCurrency: event.target.value });
  }
  onSelectChanged(event) {
    this.setState({
      newCustomerName: this.props.customerBase[event.target.value].name,
      newCustomerAddress: this.props.customerBase[event.target.value].address,
      newCustomerCurrency: this.props.customerBase[event.target.value].currency
    });
  }

  setCustomer() {
    let customer_data = {
      name: this.state.newCustomerName,
      address: this.state.newCustomerAddress,
      currency: this.state.newCustomerCurrency
    };
    this.props.setCustomer({ customer_data });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setCustomer();
  }

  render() {
    return (
      <div>
        <form className="styled_form" onSubmit={this.handleSubmit}>
          <h4>Customer details</h4>
          <input
            type="text"
            name="customer_name"
            value={this.state.newCustomerName}
            onChange={this.handleNameChange}
            placeholder="Name"
          />
          <textarea
            name="customer_address"
            value={this.state.newCustomerAddress}
            onChange={this.handleAddressChange}
            placeholder="Address"
          />
          <input
            type="text"
            name="customer_currency"
            value={this.state.newCustomerCurrency}
            onChange={this.handleCurrencyChange}
            placeholder="Currency"
          />
          <input type="submit" value="Enter customer" />

          <select onChange={this.onSelectChanged.bind(this)}>
            <option value=" " disabled selected>
              Select customer from the list
            </option>
            <CustomerSelector customers={this.props.customerBase} />
          </select>
        </form>
      </div>
    );
  }
}

export default Customers;
