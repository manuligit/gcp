import React from 'react'

class Task extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div>
        {this.props.task}
      </div>
    )
  }
}
export default Task;