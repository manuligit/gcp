import React from 'react';
import Task from './Task';
import TaskForm from './TaskForm';
import Clock from './Clock';

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
      visible: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.addTask = this.addTask.bind(this);
    this.markDone = this.markDone.bind(this);
    this.filterList = this.filterList.bind(this);
    this.saveToLocalStorage = this.saveToLocalStorage.bind(this);
    this.markRedo = this.markRedo.bind(this);
    this.toggle = this.toggle.bind(this);
    this.changeItem = this.changeItem.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.calcPercentage = this.calcPercentage.bind(this);
  }

  componentDidMount() {
    const tasks = JSON.parse(localStorage.getItem('getTasks'));
    const done = JSON.parse(localStorage.getItem('getDone'));
    // console.log(tasks);
    if (tasks) {
      this.setState({ list: tasks });
    }
    if (done) {
      this.setState({ done });
    }

    // Check daily tasks and reset if needed:

    // Set interval to check the tasks every once in a while:
    // this.timerID = setInterval(
    //   () => console.log('snib'),
    //   10000,
    // );
  }

  componentWillUnmount() {
    // clearInterval(this.timerID);
  }

  // Save the time from next reset to state
  // Evaluate the current time vs. the reset, if current>reset run reset function
  // Resetting the timers after returning?

  // Get today's time
  // Convert time zone to japanese
  // check timestamp when the next 0500 am is
  // Japan offset: UTC+9

  checkQuestResets() {
    // Get quests from done (and now since you could have partially done dailies/monthlies)

    // Get time now

    // Get time after the last reset

    // Map through all the quests from the done list and compare to last reset

    // if reset has gone by, add the new timestamp to the quests and add them to active quests

    // Weekly

    // Check if the week has changed since the old timestamp
  }

  

  handleChange(event) {
    console.log(event.target.value);
    this.setState({ type: event.target.value });
  }

  toggle(event) {
    console.log('toggle');
    const { name } = event.target;
    let value = this.state[name];

    value = !value;
    this.setState({ [name]: value });
  }

  addTask(item) {
    let { list } = this.state;
    const { done } = this.state;
    list = list.concat(item);
    this.setState({ list });
    // console.log(list)
    // Add list to local storage to preserve after refreshing:
    this.saveToLocalStorage(list, done);
  }

  // Mark task as done and move it to the list of done tasks:
  markDone(task) {
    // console.log('markDone disabled')
    let { done } = this.state;
    const { list } = this.state;

    const tasks = list.filter(item => item !== task);

    const task2 = { ...task, done: true };
    done = done.concat(task2);

    console.log({ tasks });
    console.log({ done });
    this.setState({
      list: tasks,
      done,
    });
    // Save lists to local storage:
    this.saveToLocalStorage(tasks, done);
  }

  // Remove task from done-list back to list of current tasks:
  markRedo(task) {
    let { list, done } = this.state;
    const task2 = { ...task, done: false };

    const tasks = list.concat(task2);
    // console.log(tasks);
    done = done.filter(i => i !== task);
    // console.log(done);
    this.setState({
      list: tasks,
      done,
    });
    // Save lists to local storage:
    this.saveToLocalStorage(tasks, done);
  }

  changeItem(id, iid, n) {
    const { list, done } = this.state;
    const task = list[id];
    console.log(task);
    // let items = task.items;
    console.log(task.items[iid]);
    if (n) {
      task.items[iid].qty = n;
      list[id] = task;
      this.setState({ list });
    } else {
      // Allow editing of number field without NaN:
      task.items[iid].qty = '';
      list[id] = task;
    }
    console.log(task.items[iid]);
    list[id] = task;
    this.setState({ list });

    this.saveToLocalStorage(list, done);
  }

  deleteTask(id) {
    // Remove task permanently from done-list
    const { list, done } = this.state;
    // console.log(id);
    // console.log(done);
    done.splice(id, 1);
    // console.log(done);
    this.setState({ done });

    this.saveToLocalStorage(list, done);
  }

  calcPercentage(qty, req) {
    if (req === 0) {
      return 0;
    }

    if (qty >= 0) {
      return Math.floor(parseInt(req, 10) / parseInt(qty, 10));
    }

    return 0;
  }

  saveToLocalStorage(list, done) {
    window.localStorage.setItem('getTasks', JSON.stringify(list));
    window.localStorage.setItem('getDone', JSON.stringify(done));
  }

  filterList(f) {
    // Filter the list according to the list above:
    this.setState({ filter: f });
  }

  render() {
    const {
      list, done, filter, visible,
    } = this.state;

    console.log(done);
    // filter the list of shown entries by type:
    let tasks = list;
    if (filter === 'Done') {
      tasks = done;
    } else if (filter !== 'All') {
      tasks = tasks.filter(i => i.type === filter);
    }

    return (
      <div>
        <Clock />
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
        {!tasks.length && <span>No {filter} tasks found.</span>}
        {tasks.map((p, i) => (
          <div key={i}>
            <Task task={p} markDone={this.markDone} markRedo={this.markRedo} changeItem={this.changeItem} deleteTask={this.deleteTask} id={i} calcPercentage={this.calcPercentage} />
          </div>)) }

        <h3> Add a new task </h3>
        <button type="button" className="addButton" name="visible" onClick={this.toggle}>+</button>
        { visible && <TaskForm addTask={this.addTask} />}
        <button type="button" onClick={() => this.saveToLocalStorage([], [])}>RESET EVERYTHING</button>
      </div>
    );
  }
}

export default TaskList;
