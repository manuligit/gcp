import React from 'react'

class Task extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      done: false,
      repeat: 0,
      desc: ""
    }
  }

  render() {
    return(
      <div className="task" key={this.props.task.task}>
        <div> {this.props.task.task} </div>
        <div> {this.props.task.desc}</div>
        <div>{this.props.task.type}</div>
      </div>
    )
  }
}
export default Task;