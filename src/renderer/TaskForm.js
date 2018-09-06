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
      itemReq: 0,
      task: '',
      desc: '',
      visible: false,
    };

    this.createTask = this.createTask.bind(this);
    this.addItem = this.addItem.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.changeItemList = this.changeItemList.bind(this);
    this.toggle = this.toggle.bind(this);
    this.removeRow = this.removeRow.bind(this);
  }

  componentDidMount() {
    const names = itemList.map(e => e.name);

    if (names) {
      this.setState({ names });
    }
  }

  toggle(event) {
    console.log('toggle');
    const { name } = event.target;
    let value = this.state[name];

    value = !value;
    this.setState({ [name]: value });
  }

  handleChange(event) {
    const { value, name } = event.target;
    this.setState({ [name]: value });

    console.log('inputform handleChange', name, value);
    this.setState({ [name]: value });
  }

  createTask(event) {
    const {
      itemName, itemQty, itemReq, task, desc, type,
    } = this.state;

    let { items = [] } = this.state;

    // if the fields are not empty, add the last row to item list
    console.log({ itemName, itemQty, itemReq });
    if (itemName !== '' && itemQty && itemReq !== 0) {
      const item = {
        name: itemName,
        qty: itemQty,
        req: itemReq,
      };
  
      items = items.concat(item);
    }

    const { addTask } = this.props;

    console.log('createtask');
    event.preventDefault();
    let newTask = {
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
      newTask = { ...newTask, items };
    }

    addTask(newTask);
  }

  addItem() {
    const { itemName, itemQty, itemReq } = this.state;
    let { items } = this.state;

    const item = {
      name: itemName,
      qty: itemQty,
      req: itemReq,
    };

    items = items.concat(item);

    this.setState({
      items,
      itemName: '',
      itemQty: 0,
      itemReq: 0,
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

  removeRow(i) {
    let { items } = this.state;
    console.log(items.length)
    items.splice(i, 1);
    console.log(items.length)
    this.setState({ items });
  }

  render() {
    const {
      itemName, itemQty, items, type, itemReq, visible,
    } = this.state;

    const inputrow = (
      <div className="inputrow">
        <input name="itemName" type="text" id="itemName" required onChange={this.handleChange} value={itemName} placeholder="Item" />
        <input name="itemQty" type="number" id="itemQty" required onChange={this.handleChange} value={itemQty} placeholder="Have" /> /
        <input name="itemReq" type="number" id="itemReq" required onChange={this.handleChange} value={itemReq} placeholder="Required" />
        <br />
        <button onClick={this.addItem} type="button"> Add new row </button>
      </div>
    );

    const itemsrows = (
      <div>
        {items.map((x, i) => (
          <div key={(x.name, i)}>
            <input type="text" onChange={e => this.changeItemList(e, x, i, 'name')} defaultValue={x.name} />
            <input type="number" onChange={e => this.changeItemList(e, x, i, 'qty')} defaultValue={x.qty} />
            <input type="number" onChange={e => this.changeItemList(e, x, i, 'req')} defaultValue={x.req} />
            <button type="button" name="removeRow" id="removeRow" onClick={() => this.removeRow(i)}>Delete row</button>
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
            <button name="visible" type="button" onClick={this.toggle}>+</button>
            {visible && (
              <div>
                {itemsrows}
                {inputrow}
              </div>)
            }
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
