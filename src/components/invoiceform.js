import React from "react";
import { render } from "react-dom";

class InvoiceForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        job_note: '',
        quantity: ''
    };
    this.handleJobNote = this.handleJobNote.bind(this);
    this.handleQuantity = this.handleQuantity.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setItem = this.setItem.bind(this);

  }

handleJobNote(event){
    this.setState({ job_note: event.target.value })
}

handleQuantity(event){
    this.setState({ quantity: event.target.value })
}

handleSubmit(event) {
    event.preventDefault();
    this.setItem();
  }

setItem(){
    let item_data = {
      job_note: this.state.job_note,
      quantity: this.state.quantity
    };
    this.props.createInvoiceItem({ item_data });
    this.setState({
        job_note: '',
        quantity: ''
    });
}

  render(){
    let total = Math.round(parseFloat(this.props.rate)*parseFloat(this.state.quantity)*100) / 100;
    total = total ? total : 0;
    
    return (
        <div className="invoice__item">
            <form onSubmit={this.handleSubmit} className="invoice__form">
                <div className="invoice__form_element">
                    <input type='text' onChange={this.handleJobNote} value={this.state.job_note} placeholder="Description" />
                </div>
                <div className="invoice__form_element">
                    <input type='text' onChange={this.handleQuantity} value={this.state.quantity} placeholder="Quantity" />
                    <span>Rate: {this.props.rate}{this.props.currency}</span>
                </div>
                <div className="invoice__form_element">
                    <span>Total: {total}</span>
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
