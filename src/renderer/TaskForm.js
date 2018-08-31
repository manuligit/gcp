import React from 'react';
import itemList from '../../item_list.json';

class TaskForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      names: [],
      type: 'Once',
      itemName: '',
      itemQty: 0,
      task: '',
      desc: '',
    };

    this.createTask = this.createTask.bind(this);
    this.addItem = this.addItem.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.changeItemList = this.changeItemList.bind(this);
  }

  componentDidMount() {
    const names = itemList.map(e => e.name);

    if (names) {
      this.setState({ names });
    }
  }

  handleChange(event) {
    const { value, name } = event.target;

    console.log('inputform handleChange', name, value);
    this.setState({ [name]: value });
  }

  createTask(event) {
    const {
      task, desc, type, items = [],
    } = this.state;

    const { addTask } = this.props;

    console.log('createtask');
    event.preventDefault();
    let item = {
      task,
      desc,
      type,
      done: false,
    };

    this.setState({
      task: '',
      desc: '',
      type: 'Once',
      items: [],
    });

    if (items.length > 0) {
      item = { ...item, items };
    }

    addTask(item);
  }

  addItem() {
    const { itemName, itemQty } = this.state;
    let { items } = this.state;

    const item = {
      name: itemName,
      qty: itemQty,
    };

    items = items.concat(item);

    this.setState({
      items,
      itemName: '',
      itemQty: 0,
    });
  }

  // this.changeItemList(e,x,i,'qty')
  changeItemList(e, x, i, type) {
    // debugger;
    const { items } = this.state;

    console.log('changeitemlist', x, i);
    let item = items[i];

    console.log(type);
    console.log(e.target.value);

    item = { ...item, [type]: e.target.value };
    items[i] = item;
    this.setState({ items });
  }

  render() {
    const {
      itemName, itemQty, items, type,
    } = this.state;

    const inputrow = (
      <div className="inputrow">
        <input name="itemName" type="text" id="itemName" required onChange={this.handleChange} value={itemName} placeholder="Item" />
        <input name="itemQty" type="number" id="itemQty" required onChange={this.handleChange} value={itemQty} placeholder="Amount" />
        <br />
        <button onClick={this.addItem} type="button"> Add new row </button>
      </div>
    );

    const itemsrows = (
      <div>
        {items.map((x, i) => (
          <div key={i}>
            <input type="text" onChange={e => this.changeItemList(e, x, i, 'name')} defaultValue={x.name} />
            <input type="number" onChange={e => this.changeItemList(e, x, i, 'qty')} defaultValue={x.qty} />
          </div>))}
      </div>
    );

    const form = (
      <div className="form">
        <form>
          <div>
            <label htmlFor="task">
              Name
            </label>
            <input id="task" type="text" name="task" onChange={this.handleChange} required />
          </div>
          <div>
            <label htmlFor="desc">
              Description
            </label>
            <br />
            <textarea id="desc" name="desc" rows="5" cols="40" onChange={this.handleChange} />
          </div>
          <div>
            <label htmlFor="type">
              Type
            </label>
            <select name="type" value={type} onChange={this.handleChange} required>
              <option value="Once">Once</option>
              <option value="Daily">Daily</option>
              <option value="Weekly">Weekly</option>
              <option value="Monthly">Monthly</option>
            </select>
          </div>
          <div>
            <label htmlFor="items">
            Add an item list
            </label>
            {itemsrows}
            {inputrow}
          </div>
          <input onClick={this.createTask} type="submit" value="Submit" />
        </form>
      </div>
    );

    return (
      <div>
        {form}
      </div>
    );
  }
}

export default TaskForm;
