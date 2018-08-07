import React from 'react';
import Task from './Task';

class TaskList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: ['asdf','bnm', 'cvb'],
      done: []
    }
  }




  addTask() {

  }

  render() {
    let task = {
      repeat: 0,
      text: "",
      done: false
    }

    return(
      <div>
        {this.state.list.map(p => 
          <div key={p}>
            <Task task={p} />
            <div className="divider"></div>
          </div>
        )}
      </div>
    )
  }
}

export default TaskList;