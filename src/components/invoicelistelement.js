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
       quantity: parseFloat(this.props.quantity),
       units: this.props.units,
       rate: parseFloat(this.props.rate),
       });
  }
  componentWillReceiveProps(props) {
    console.log(props);
  }
  handleInputChange(event) {
    this.setState({ [event.target.name]: event.target.value });
    this.props.update_line(this.props.index, this.state);
  }

  render() {

    let total_number = parseFloat(this.state.quantity) * parseFloat(this.state.rate);

    let removeline = () => { 
      this.props.remove_line(this.props.index);
      this.forceUpdate();
     }

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
          {isNaN(total_number) ? 0 : total_number}
        </td>
        <td className="invoice__td no_border">
          <button
            onClick={() => this.setState({ editmode: !this.state.editmode })}
          >
            E
          </button>
          <button onClick={ removeline }>
            X
          </button>
        </td>
      </tr>
    );
  }
}
export default InvoiceListElement;
