import React, { Component } from 'react';
import './VehicleCard.css'
import { Modal, Button } from 'react-bootstrap';

export default class VehicleCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false
    };
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  render() {

    return (
      <div className = "VehicleCard">
       <h5> {this.props.year} {this.props.make} {this.props.model} </h5>
       <img
        id="frontPhoto"
        alt="frontPhoto"
        src={"http://www.suusigmachi.com/uploads/2/5/8/5/25853504/s717179518631806229_p1_i3_w400.jpeg"}
        onClick={this.handleShow.bind(this)} />
        <div className="VehicleInformation">
          <p> Lot: {this.props.lot} </p>
          <p> Reason: {this.props.reason} </p>
          <p> Keys: {this.props.keys === 'K' ? 'Yes' : 'No'} </p>
          <p> VIN: {this.props.vin}</p>
        </div>
        <div className="Buttons">
          <Button> Click This! </Button>
        </div>

        <Modal show={this.state.show} onHide={this.handleClose.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title> Back Photo </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img
             id="backPhoto"
             alt="backPhoto"
             src={"http://www.suusigmachi.com/uploads/2/5/8/5/25853504/s717179518631806229_p1_i3_w400.jpeg"} />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleClose.bind(this)}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}
