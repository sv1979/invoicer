import React from "react";
import { render } from "react-dom";

class InvoiceListElement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      job_note: "",
      quantity: "",
      rate: "",
      editmode: false
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    this.setState({
      id: this.props.id,
      job_note: this.props.job_note,
      quantity: parseFloat(this.props.quantity),
      units: this.props.units,
      rate: parseFloat(this.props.rate)
    });
  }
  componentWillReceiveProps(props) {
    console.log('>>>',props);
    // this.setState({
    //   id: this.state.id,
    //   job_note: this.state.job_note,
    //   quantity: parseFloat(this.state.quantity),
    //   units: this.state.units,
    //   rate: parseFloat(this.state.rate)
    // });
    // this.forceUpdate();
  }
  handleInputChange(event) {
    this.setState({ [event.target.name]: event.target.value });
    //this.props.update_line(this.props.id, this.props);
  }
  handleSubmit(){
    this.props.update_line(this.props.id, this.state);
  }
  render() {
    let total_number =
      parseFloat(this.props.quantity) * parseFloat(this.props.rate);

    let removeline = () => {
      this.props.remove_line(this.props.id);
      this.forceUpdate();
    };

    return (
      
      <tr className="invoice__tr" key={this.props.id}>
        <td>{this.props.id}</td>
        <td className="invoice__td standard_border">
          {this.state.editmode ? (
            <input
              type="text"
              name="job_note"
              placeholder={this.props.job_note}
              onChange={this.handleInputChange}
            />
          ) : (
            <span className="invoice__value">{this.props.job_note}</span>
          )}
        </td>
        <td className="invoice__td standard_border">
          {this.props.editmode ? (
            <input
              type="number"
              name="quantity"
              placeholder={this.props.quantity}
              onChange={this.handleInputChange}
            />
          ) : (
            <span className="invoice__value">
              {this.props.quantity} {this.props.units}
            </span>
          )}
        </td>
        <td className="invoice__td standard_border">
          {this.state.editmode ? (
            <input
              type="number"
              name="rate"
              placeholder={this.props.rate}
              onChange={this.handleInputChange}
            />
          ) : (
            <span className="invoice__value">{this.props.rate}</span>
          )}
        </td>
        <td className="invoice__td standard_border">
          {isNaN(total_number) ? 0 : total_number}
        </td>
        <td className="invoice__td no_border">
          <button
            onClick={() => {
              if(this.state.editmode) {
                this.handleSubmit(); 
              }
              this.setState({ editmode: !this.state.editmode })
            } }
          >
            E
          </button>
          <button onClick={removeline}>X</button>
        </td>
      </tr>
    );
  }
}
export default InvoiceListElement;
