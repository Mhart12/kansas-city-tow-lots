import React, { Component } from 'react';
import { Grid, Row, Col, Pagination } from 'react-bootstrap';
import { BeatLoader } from 'react-spinners';
import VehicleCard from './VehicleCard/VehicleCard'
import './Vehicle.css'

export default class Vehicles extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPage: 1,
      vehiclesPerPage: 10
    }
  }

  // handle click for pagination component and show new set of vehicles
  handleClick = e => {
    this.setState({
      currentPage: Number(e.target.id)
    });
    window.scrollTo(0, 0)
  }

  render() {
    const { currentPage, vehiclesPerPage } = this.state;
    const { data } = this.props;

    // pagination logic
    const indexOfLastVehicle = currentPage * vehiclesPerPage;
    const indexOfFirstVehicle = indexOfLastVehicle - vehiclesPerPage;
    const currentVehicles = data.slice(indexOfFirstVehicle, indexOfLastVehicle);
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(data.length / vehiclesPerPage); i++) {
      pageNumbers.push(i);
    }

    return (
      <div className="Vehicle">
        <br />
        <p style={{textAlign:'center'}}> {data.length} records found </p>
        <Grid>
          <Row>
            {this.props.loading === true ?
            <div className="Loader">
              <BeatLoader
                color={'#99e6ff'}
                loading={this.props.loading} />
              </div> :
              currentVehicles.map((e, key) => {
                return (
                  <Col key={key} xs={12} md={6}>
                    <VehicleCard
                      key={key}
                      year = {e.year}
                      make = {e.make}
                      model = {e.model}
                      vin = {e.vin}
                      lot = {e.lot}
                      reason = {e.reason}
                      tow_reference = {e.tow_reference}
                      vehicle_id = {e.vehicle_id}
                      comments = {e.comments}
                      car_keys = {e.k}
                      front_pic = {e.front_pic}
                      back_pic = {e.back_pic} />
                  </Col>
                )
            })}
          </Row>
        </Grid>
        <div className="Pagination">
        <Pagination>
         {pageNumbers.map((number) => {
            return (
              <Pagination.Item id={number} onClick={this.handleClick.bind(this)}> {number} </Pagination.Item>
            )
          })}
        </Pagination>
        </div>
      </div>
    )
  }
}
