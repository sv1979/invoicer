import React from "react";
import { render } from "react-dom";

class InvoiceListElement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      job_note: '',
      quantity: '',
      rate: '',
      editmode: false
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  componentDidMount(){
    this.setState({
       job_note: this.props.job_note,
       quantity: this.props.quantity,
       rate: this.props.rate,
       });
  }

  handleInputChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    return (
      <tr className="invoice__tr" key={this.props.index}>
        <td className="invoice__td standard_border">
          {this.state.editmode ? (
            <input type="text" name="job_note" placeholder={this.state.job_note} onChange={this.handleInputChange}/>
          ) : (
            <span className="invoice__value">{this.state.job_note}</span>
          )}
        </td>
        <td className="invoice__td standard_border">
          {this.state.editmode ? (
            <input type="number" name="quantity" placeholder={this.state.quantity} onChange={this.handleInputChange}/>
          ) : (
            <span className="invoice__value">{this.state.quantity} {this.props.units}</span> 
          )}
           
        </td>
        <td className="invoice__td standard_border">
          {this.state.editmode ? (
            <input type="number" name="rate" placeholder={this.state.rate} onChange={this.handleInputChange}/>
          ) : (
            <span className="invoice__value">{this.state.rate}</span>
          )}
        </td>
        <td className="invoice__td standard_border">
          {parseFloat(this.props.quantity) * parseFloat(this.props.rate)}
        </td>
        <td className="invoice__td no_border">
          <button
            onClick={() => this.setState({ editmode: !this.state.editmode })}
          >
            E
          </button>
          <button onClick={() => this.props.remove_line(this.props.index)}>
            X
          </button>
        </td>
      </tr>
    );
  }
}
export default InvoiceListElement;
