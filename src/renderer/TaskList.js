import React from 'react';
import Task from './Task';

class TaskList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [{task:'asdf', desc:'bnm', type:'Once', done: false}],
      done: [],
      type: 'Once'
    }
    this.handleChange = this.handleChange.bind(this);
    this.addTask = this.addTask.bind(this);
    this.markDone = this.markDone.bind(this);
    this.saveToLocalStorage = this.saveToLocalStorage.bind(this);
  }

  handleChange(event) {
    console.log(event.target.value)
    this.setState({type: event.target.value});
  }

  addTask (event) {
    event.preventDefault();
    let item = {
      task: event.target.task.value,
      desc: event.target.desc.value,
      type: this.state.type,
      done: false
    }

    let list = this.state.list.concat(item)

    this.setState({ list: list })
    //console.log(list)
    //Add list to local storage to preserve after refreshing:
    this.saveToLocalStorage(list);
  }

  markDone (task) {
    let tasks = this.state.list.slice();
    tasks = tasks.filter(item => item !== task)

    console.log(tasks)
    let done = this.state.done.concat(task)
    console.log(done)
    this.setState({ list: tasks,
                    done: done })
    //Save lists to local storage:
    this.saveToLocalStorage(tasks);
  }

  saveToLocalStorage(item) {
    localStorage.setItem('getTasks', JSON.stringify(item));
  }

  componentDidMount(){
    let tasks = JSON.parse(localStorage.getItem('getTasks'))
    console.log(tasks)
    if (tasks != null) {
      this.setState({list: tasks})
    }
  }

  render() {
    let task = {
      repeat: 0,
      text: "",
      done: false
    }

    let form = (
      <div className="form">
        <h3> Add a new task </h3>
        <form onSubmit={this.addTask}>
          <div>
            <label htmlFor="task">
              Name
            </label>
            <input id="task" type="text" name="task" required/>
          </div>
          <div>
            <label htmlFor="task">
              Description
            </label>
            <input id="desc" type="text" name="desc" required/>
          </div>
          <div>
            <label htmlFor="type">
              Type
            </label>
            <select value={this.state.type} onChange={this.handleChange} required>
              <option value="Once">Once</option> 
              <option value="Daily">Daily</option> 
              <option value="Weekly">Weekly</option> 
              <option value="Monthly" >Monthly</option> 
            </select>
            <input type="submit" value="Submit" />
          </div>
        </form>
      </div>
    )

    return(
      <div>
        {this.state.list.map(p => 
          <div key={p.task}>
            <Task task={p} markDone={this.markDone}/>
            <div className="divider"></div>
          </div>
        )}
        {form}
        <br />
        <br />
        {this.state.done.toString()}
      </div>
    )
  }
}

export default TaskList;