import React from "react";
import { render } from "react-dom";

function CustomerSelector(props) {
  return props.customers.map((el, index) => {
    return (
      <option key={index} data-address={el.address} value={index}>
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
      newCustomerAddress: ""
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setCustomer = this.setCustomer.bind(this);
  }

  handleNameChange(event) {
    this.setState({ newCustomerName: event.target.value });
  }
  handleAddressChange(event) {
    this.setState({ newCustomerAddress: event.target.value });
  }
  onSelectChanged(event) {
    this.setState({
      newCustomerName: this.props.customerBase[event.target.value].name,
      newCustomerAddress: this.props.customerBase[event.target.value].address
    });
  }

  setCustomer() {
    let customer_data = {
      name: this.state.newCustomerName,
      address: this.state.newCustomerAddress
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
          />
          <textarea
            name="customer_address"
            value={this.state.newCustomerAddress}
            onChange={this.handleAddressChange}
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
