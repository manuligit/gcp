import React from 'react';
import Task from './Task';

class TaskList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: ['asdf','bnm', 'cvb']
    }
  }


  render() {
    return(
      <div>
        {this.state.list.map(p => 
          <div key={p}>
            <Task task={p} />
          </div>
        )}
      </div>
    )
  }
}

export default TaskList;