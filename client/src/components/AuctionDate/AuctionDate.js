import React from 'react';
import moment from 'moment';
import './AuctionDate.css'

export default class AuctionDate extends React.Component {
  render() {

    let currentYear = moment().year();
    let currentMonth = moment().month()

    const getThirdTuesday = (year, month) => {
      let myMonth = moment({year: year, month: month});
      let thirdTuesday = myMonth.weekday(2);
      let nWeeks = 2;

      if (thirdTuesday.month() !== month) nWeeks++;

      return thirdTuesday.add(nWeeks, 'weeks').format("MMMM DD YYYY");
    }

    return (
      <div className="AuctionDate">
        Next Auction: {getThirdTuesday(currentYear, currentMonth)}
      </div>
    );
  }
}
