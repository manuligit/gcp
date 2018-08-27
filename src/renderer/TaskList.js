import React from 'react';
import Task from './Task';
import TaskForm from './TaskForm';

class TaskList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [{
        task: 'Sample', desc: 'Sample text', type: 'Once', done: false,
      }],
      done: [],
      type: 'Once',
      filter: 'All',
      formItems: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.addTask = this.addTask.bind(this);
    this.markDone = this.markDone.bind(this);
    this.filterList = this.filterList.bind(this);
    this.saveToLocalStorage = this.saveToLocalStorage.bind(this);
    this.markRedo = this.markRedo.bind(this);
    // this.showComponent = this.showComponent.bind(this);
  }

  componentDidMount() {
    const tasks = JSON.parse(localStorage.getItem('getTasks'));
    const done = JSON.parse(localStorage.getItem('getDone'));
    console.log(tasks);
    if (tasks) {
      this.setState({ list: tasks });
    }
    if (done) {
      this.setState({ done });
    }
  }


  handleChange(event) {
    console.log(event.target.value);
    this.setState({ type: event.target.value });
  }

  addTask(item) {
    const list = this.state.list.concat(item);
    this.setState({ list });
    // console.log(list)
    // Add list to local storage to preserve after refreshing:
    this.saveToLocalStorage(list, this.state.done);
  }

  // Mark task as done and move it to the list of done tasks:
  markDone(task) {
    // console.log('markDone disabled')
    let tasks = this.state.list.slice();
    tasks = tasks.filter(item => item !== task);

    console.log(tasks);
    task.done = true;
    let done = this.state.done.concat(task);
    console.log(done);
    this.setState({
      list: tasks,
      done,
    });
    // Save lists to local storage:
    this.saveToLocalStorage(tasks, done);
  }

  // Remove task from done-list back to list of current tasks:
  markRedo(task) {
    task.done = false;
    let tasks = this.state.list.concat(task);
    // console.log(tasks);
    const done = this.state.done.filter(i => i !== task);
    // console.log(done);
    this.setState({
      list: tasks,
      done,
    });
    // Save lists to local storage:
    this.saveToLocalStorage(tasks, done);
  }

  saveToLocalStorage(list, done) {
    window.localStorage.setItem('getTasks', JSON.stringify(list));
    window.localStorage.setItem('getDone', JSON.stringify(done));
  }

  filterList(f) {
    // Filter the list according to the list above:
    console.log('setting filter to ', f);
    this.setState({ filter: f });
  }

  // showComponent() {

  // }

  render() {
    console.log(this.state.done);
    // filter the list of shown entries by type:
    let tasks = this.state.list;
    if (this.state.filter === 'Done') {
      tasks = this.state.done;
      console.log(tasks);
      console.log(tasks.length);
    } else if (this.state.filter !== 'All') {
      tasks = tasks.filter(i => i.type === this.state.filter);
    }

    return (
      <div>
        <div className="header">
          <ul>
            <li onClick={() => this.filterList('All')}>All</li>
            <li onClick={() => this.filterList('Daily')}>Daily</li>
            <li onClick={() => this.filterList('Weekly')}>Weekly</li>
            <li onClick={() => this.filterList('Monthly')}>Monthly</li>
            <li onClick={() => this.filterList('Once')}>Once</li>
            <li onClick={() => this.filterList('Done')}>Done</li>
          </ul>
        </div>
        {!tasks.length && <span>No {this.state.filter} tasks found.</span>}
        {tasks.map(p =>
          <div key={p.task}>
            <Task task={p} markDone={this.markDone} markRedo={this.markRedo}/>
          </div>)}

        <h3> Add a new task </h3>
        <button type="button" className="addButton">+</button>
        <TaskForm addTask={this.addTask} />
      </div>
    );
  }
}

export default TaskList;
