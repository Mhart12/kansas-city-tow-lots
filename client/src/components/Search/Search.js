import React, { Component } from 'react';
import { Form, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
import axios from 'axios';
import Vehicles from '../Vehicles/Vehicles'
import './Search.css'

export default class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchQuery: [],
      data: [],
      loading: true,
      year: undefined,
      make: undefined,
      model: undefined,
      reason: undefined,
      car_keys: undefined
    }
  }

  // handle drop items on change
  handleProp = (prop) => {
    return (e) => {
      this.setState({
        [prop]: e.target.value
      })
    }
  }

  // when the form is submitted, send selected search items to backend for filtering
  handleSubmit = e => {
    e.preventDefault();

    const { year, make, model, reason, car_keys } = this.state;

    axios.post('/current_vehicles', { year, make, model, reason, car_keys })
      .then(res => {
        this.setState({data: res.data.sort((a,b) => a.lot - b.lot )});
      })
  }

  componentWillMount() {
    axios.post('/current_vehicles')
      .then(({data})=> {
        this.setState({
          data: data.sort((a,b) => a.lot - b.lot),
          searchQuery: data,
          loading: false
        });
    }).catch((err)=> {
      console.log(err)
    })
  }

  render() {

    const { searchQuery } = this.state;

    if (this.state.year === '') {
      this.setState({ year: undefined });
    }
    if (this.state.make === '') {
      this.setState({ make: undefined });
    }
    if (this.state.model === '') {
      this.setState({ model: undefined });
    }
    if (this.state.reason === '') {
      this.setState({ reason: undefined });
    }
    if (this.state.car_keys=== '') {
      this.setState({ car_keys: undefined });
    }

    // create of array of available arrays and sort biggest to smallest
    let years = searchQuery.map((e, key) => e.year)
    years = years.filter((e, key) => years.indexOf(e) === key).sort((a,b) => b-a)
    years.splice(0, 0, "");

    // create of array of available makes and sort alphabetically
    let makes = searchQuery.map((e, key) => e.make)
    makes = makes.filter((e, key) => makes.indexOf(e) === key).sort((a, b) => {
       if (b > a) return -1;
       else if (b < a) return 1;
       return 0;
    });
    makes.splice(0, 0, "");

    // create of array of available models and sort alphabetically
    let models = searchQuery.map((e, key) =>  e.model)
    models = models.filter((e, key) => models.indexOf(e) === key).sort((a, b) => {
       if (b > a) return -1;
       else if (b < a) return 1;
       return 0;
    });
    models.splice(0, 0, "");

    return (
      <div className="Search">
        <div className="SearchForm">
          <Form onSubmit={this.handleSubmit} inline>

            <FormGroup controlId="formControlsSelect">
              <ControlLabel> Year </ControlLabel>{' '}
              <FormControl componentClass="select" name="year" placeholder="select" onChange={this.handleProp('year').bind(this)}>
                {years.map((e, key) => {
                    return <option key={key} value={e}>{e}</option>
                })}
              </FormControl>
            </FormGroup>{' '}

            <FormGroup controlId="formControlsSelect">
              <ControlLabel> Make </ControlLabel>{' '}
              <FormControl componentClass="select" name="make" placeholder="select" onChange={this.handleProp('make').bind(this)}>
                {makes.map((e, key) => {
                    return <option key={key} value={e}>{e}</option>
                })}
              </FormControl>
            </FormGroup>{' '}

            <FormGroup controlId="formControlsSelect">
              <ControlLabel> Model </ControlLabel>{' '}
              <FormControl componentClass="select" name="model" placeholder="select" onChange={this.handleProp('model').bind(this)}>
                {models.map((e, key) => {
                    return <option key={key} value={e}>{e}</option>
                })}
              </FormControl>
            </FormGroup>{' '}

            <FormGroup controlId="formControlsSelect">
              <ControlLabel> Reason </ControlLabel>{' '}
              <FormControl componentClass="select" name="reason" placeholder="select" onChange={this.handleProp('reason').bind(this)}>
                <option value=""> </option>
                <option value="ABANDONED"> Abandoned </option>
                <option value="ACCIDENT"> Accident </option>
                <option value="ARREST"> Arrest </option>
                <option value="ILLEGALLY PARKED"> Illegally Parked </option>
                <option value="STOLEN"> Stolen </option>
                <option value="OTHER"> Other </option>
              </FormControl>
            </FormGroup>{' '}

            <FormGroup controlId="formControlsSelect">
              <ControlLabel> Keys </ControlLabel>{' '}
              <FormControl componentClass="select" name="key" placeholder="select" onChange={this.handleProp('car_keys').bind(this)}>
                <option value=""> </option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </FormControl>
            </FormGroup>{' '}

            <Button type="submit">Submit</Button>
          </Form>
        </div>
        <Vehicles data={this.state.data} loading={this.state.loading} />
      </div>
    )
  }
}
