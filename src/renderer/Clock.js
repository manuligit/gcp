import React from 'react';

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      curr: new Date(),
      reset: '',
      hours: '',
      minutes: '',
      seconds: '',
      lastWeekly: '',
      lastMontly: '',
      resetWeekly: '',
      resetMonthly: '',
    };
  }

  componentDidMount() {
    this.resetDaily();
    this.timerID = setInterval(
      () => this.tick(),
      1000,
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  calculateWeeklyReset() {
    let date = new Date();
    //get the date for next Monday:
    // sun = 0 sat = 6
    //monday = 1
    let day = date.getDate();
    
    const nextReset = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), (date.getUTCDate() + 1), (20), 0, 0, 0));
    

  }

  calculateMonthlyReset() {
    let date = new Date();
    const lastMontly = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), 1, (20), 0, 0, 0));
    const resetMontly = new Date(Date.UTC(date.getUTCFullYear(), (date.getUTCMonth() + 1), 1, (20), 0, 0, 0));

    this.setState({ lastMontly, resetMonthly });
  }

  tick() {
    //console.log('tick');
    let { curr, reset } = this.state;
    if (curr < reset) {
      let diff = curr-reset;

      let hours = Math.round(Math.abs(diff / (1000*60*60) % 24));
      let minutes = Math.round(Math.abs(diff / (1000*60) % 60));
      let seconds = Math.round(Math.abs((diff / (1000)) % 60));
      this.setState({ hours, minutes, seconds, curr: new Date() });
    } else {
      console.log('curr', curr);
      console.log('reset', reset);
      this.resetDaily();
    }
  }

  resetDaily() {
    let date = new Date();
    // const nextReset = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), (date.getUTCDate()), (11), 16, 0, 0));
    // const nextReset = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), (date.getUTCDate() + 1), (10), 14, 0, 0));
    const nextReset = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), (date.getUTCDate() + 1), (20), 0, 0, 0));
    //todo: daily/weekly reset

    this.setState({ reset: nextReset });

    //poll the task lists from the tasklist
    //update the date on every task with updateable date

    //for weekly/monthlies, poll last & next reset
    // if curr < last, curr = last
    // if last < curr < next, do nothing
    // if curr > next, curr = next
  }

  updatetasks() {
    
  }



  render() {
    const { curr, reset, hours, minutes, seconds } = this.state;

    return (
      <div>Daily reset in: {hours} hours, {minutes} minutes, {seconds} seconds </div>
    );
  }
}

export default Clock;
