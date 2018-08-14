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
    let basic = (
      <div className="taskText">
          <div className="name"> {this.props.task.task} </div>
          <div className="type">{this.props.task.type}</div>
          <div className="desc"> {this.props.task.desc}</div>
      </div>
    )

    if (!this.props.task.done) {
      return(
        <div className="task" key={this.props.task.task}>
          {basic}
          <div className="check">
            <div onClick={(e) => this.props.markDone(this.props.task)}>&#10003;</div>
          </div>
        </div>
      )
    } else {
      console.log('aaaa')
      return (
        <div className="task" key={this.props.task.task}>
          {basic}
          <div className="check">
            <div onClick={(e) => this.props.markRedo(this.props.task)}>&#x21BB;</div>
          </div>
        </div>
      )
    }
  }
}
export default Task;