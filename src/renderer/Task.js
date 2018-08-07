import React from 'react'

class Task extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      done: false,
      repeat: 0
    }
  }

  render() {
    return(
      <div className="task">
        {this.props.task}
      </div>
    )
  }
}
export default Task;