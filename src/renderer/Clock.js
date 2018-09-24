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
    //const nextReset = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), (date.getUTCDate()), (11), 16, 0, 0));
    //const nextReset = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), (date.getUTCDate() + 1), (10), 14, 0, 0));
    const nextReset = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), (date.getUTCDate() + 1), (20), 0, 0, 0));
    this.setState({ reset: nextReset });
  }


  render() {
    let { curr, reset, hours, minutes, seconds } = this.state;

    return (
      <div>Resets in: {hours} hours, {minutes} minutes, {seconds} seconds </div>
    );
  }
}

export default Clock;
