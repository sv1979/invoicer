import React from "react";
import { render } from "react-dom";

class Owndata extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      own_name: this.props.ownData.name,
      own_address: this.props.ownData.address,
      own_ird_number: this.props.ownData.ird_number,
      own_gst_number: this.props.ownData.gst_number,
      own_bank_account: this.props.ownData.bank_account,
      own_account_details: this.props.ownData.account_details,
      // own_rate: this.props.ownData.rate,
      own_gst_rate: this.props.ownData.gst_rate
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.handleIrdChange = this.handleIrdChange.bind(this);
    this.handleGstChange = this.handleGstChange.bind(this);
    this.handleBankChange = this.handleBankChange.bind(this);
    this.handleAccDetailsChange = this.handleAccDetailsChange.bind(this);
    // this.handleRateChange = this.handleRateChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setOwndata = this.setOwndata.bind(this);
  }

  handleNameChange(event) {
    this.setState({ own_name: event.target.value });
  }

  handleAddressChange(event) {
    this.setState({ own_address: event.target.value });
  }

  handleIrdChange(event) {
    this.setState({ own_ird_number: event.target.value });
  }

  handleGstChange(event) {
    this.setState({ own_gst_number: event.target.value });
  }

  handleBankChange(event) {
    this.setState({ own_bank_account: event.target.value });
  }
  handleAccDetailsChange(event) {
    this.setState({ own_account_details: event.target.value });
  }
  // handleRateChange(event) {
  //   this.setState({ own_rate: event.target.value });
  // }
  onSelectChanged(event) {
    this.setState({ own_gst_rate: event.target.value });
  }
  setOwndata() {
    let own_data = {
      name: this.state.own_name,
      address: this.state.own_address,
      ird_number: this.state.own_ird_number,
      gst_number: this.state.own_gst_number,
      bank_account: this.state.own_bank_account,
      account_details: this.state.own_account_details,
      // rate: this.state.own_rate,
      gst_rate: this.state.own_gst_rate
    };
    this.props.setOwndata({ own_data });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setOwndata();
  }

  render() {
    return (
      <div>
        <form className="styled_form" onSubmit={this.handleSubmit}>
          <h4>Own details</h4>
          <input
            type="text"
            name="own_name"
            value={this.state.own_name}
            onChange={this.handleNameChange}
          />
          <textarea
            name="own_address"
            value={this.state.own_address}
            onChange={this.handleAddressChange}
          />
          <input
            type="text"
            name="own_ird_number"
            value={this.state.own_ird_number}
            onChange={this.handleIrdChange}
          />
          <input
            type="text"
            name="own_gst_number"
            value={this.state.own_gst_number}
            onChange={this.handleGstChange}
          />
          <input
            type="text"
            name="own_bank_account"
            value={this.state.own_bank_account}
            onChange={this.handleBankChange}
          />
          <textarea
            name="own_account_details"
            value={this.state.own_account_details}
            onChange={this.handleAccDetailsChange}
          />
          {/* <input
            type="text"
            name="own_rate"
            value={this.state.own_rate}
            onChange={this.handleRateChange}
          /> */}
          <select
            name="own_gst_rate"
            value={this.state.own_gst_rate}
            onChange={this.onSelectChanged.bind(this)}
          >
            <option value="15">15%</option>
            <option value="0">0%</option>
          </select>
          <input type="submit" value="Enter own details" />
        </form>
      </div>
    );
  }
}

export default Owndata;
