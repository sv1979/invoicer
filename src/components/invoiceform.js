import React from "react";
import { render } from "react-dom";

class InvoiceForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        job_note: '',
        quantity: '',
        rate: '',
        units: 'hours'
    };
    this.handleJobNote = this.handleJobNote.bind(this);
    this.handleQuantity = this.handleQuantity.bind(this);
    this.handleRate = this.handleRate.bind(this);
    this.handleUnits = this.handleUnits.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setItem = this.setItem.bind(this);

  }

handleJobNote(event){
    this.setState({ job_note: event.target.value })
}

handleQuantity(event){
    this.setState({ quantity: event.target.value })
}

handleRate(event){
    this.setState({ rate: event.target.value })
}

handleUnits(event){
    this.setState({ units: event.target.value })
}

handleSubmit(event) {
    event.preventDefault();
    this.setItem();
  }

setItem(){
    let item_data = {
      job_note: this.state.job_note,
      quantity: this.state.quantity,
      rate: this.state.rate,
      units: this.state.units
    };
    if(this.state.job_note && this.state.quantity && this.state.rate) {
        this.props.createInvoiceItem({ item_data });
        this.setState({
            job_note: '',
            quantity: '',
        });
    }
}

  render(){

    let placeholder_rate = "Rate, " + this.props.currency;
    
    return (
        <div className="invoice__item">
            <form onSubmit={this.handleSubmit} className="invoice__form">
                <div className="invoice__form_element">
                    <input type='text' onChange={this.handleJobNote} value={this.state.job_note} placeholder="Description" />
                </div>
                <div className="invoice__form_element">
                    <input type='text' onChange={this.handleQuantity} value={this.state.quantity} placeholder="Quantity" />
                </div>
                <div className="invoice__form_element">
                    {/* <input type='text' onChange={this.handleUnits} value={this.state.units} placeholder="Units" /> */}
                    <select onChange={this.handleUnits} value={this.state.units}>
                        <option value="hours">Hours</option>
                        <option value="pcs">Pieces</option>
                        <option value="times">Times</option>
                        <option value="">--</option>
                    </select>
                </div>
                <div className="invoice__form_element">
                    <span>
                        <input type='number' onChange={this.handleRate} value={this.state.rate} placeholder={placeholder_rate} />
                    </span>
                </div>
                <div className="invoice__form_element">
                    <button type="submit" value="Add">+</button>
                </div>
            </form>
        </div>
    );
  }
}

export default InvoiceForm;
