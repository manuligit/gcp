import React from 'react'
import itemList from '../../item_list.json'

class TaskForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [{name:'asdf', qty:3 },{name:'bbb', qty:122 }],
      names: [],
      type: 'Once',
      itemName: '',
      itemQty: 0,
    }
    this.createTask = this.createTask.bind(this);
    this.addItem = this.addItem.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.changeItemList = this.changeItemList.bind(this);
  }

  componentDidMount(){
    let names = itemList.map(e => e.name)

    if (names) {
      this.setState({ names: names })
    }
  }

  handleChange(event) {
    //console.log(event.target.value);
    //console.log(event.target.name);
    let value = event.target.value;
    let name = event.target.name;
    //let target = event.target.value;
    //const value = target.type === 'checkbox' ? target.checked : target.value;
    console.log('inputform handleChange', name, value)
    this.setState({ [name]: value });
  }

  createTask(event) {
    event.preventDefault();
    let item = {
      task: event.target.task.value,
      desc: event.target.desc.value,
      type: this.state.type,
      done: false
    }

    if (this.state.items.length > 0) {
      item = { ...item, items: this.state.items}
    }
    this.props.addTask(item);
    
  }

  addItem() { 
    let n = this.state.itemName;
    let q = this.state.itemQty;

    let item = {
      name: n,
      qty: q
    }

    let items = this.state.items.concat(item);

    this.setState({ 
      items: items,
      itemName: '',
      itemQty: 0 
    })
  }


  //this.changeItemList(e,x,i,'qty')
  changeItemList(e,x,i,type) {
    //debugger;
    console.log('changeitemlist', x,i)
    let item = this.state.items[i];

    console.log(type) 
    console.log(e.target.value)

    item = { ...item, [type]: e.target.value }
    let items = this.state.items;
    items[i] = item;
    this.setState({ items: items })
  }

  render() {
    let inputrow = (
      <div className="inputrow">
        <input name="itemQty" type="number" id="itemQty" required onChange={this.handleChange} value={this.state.itemQty} placeholder="Amount"/>
        <input name="itemName" type="text" id="itemName" required onChange={this.handleChange} value={this.state.itemName} placeholder="Item"/>
        <button onClick={this.addItem}> + </button>
      </div>
    )

    let itemsrows = (
      <div>
        {this.state.items.map((x,i) => 
          <div key={i}>
              <input type="number" onChange={e => this.changeItemList(e,x,i,'qty')}  defaultValue={x.qty}/>
              <input type="text" onChange={e => this.changeItemList(e,x,i,'name')} defaultValue={x.name}/>
          </div>
      )}
      </div>
    )

    let form = (
      <div className="form">
        <h3> Add a new task </h3>
        <form onSubmit={this.createTask}>
          <div>
            <label htmlFor="task">
              Name
            </label>
            <input id="task" type="text" name="task" required/>
          </div>
          <div>
            <label htmlFor="task">
              Description
              <br />
            </label>
            <textarea id="desc" name="desc" rows="5" cols="40"></textarea>
          </div>
          <div>
            <label htmlFor="type">
              Type
            </label>
            <select name="type" value={this.state.type} onChange={this.handleChange} required>
              <option value="Once">Once</option> 
              <option value="Daily">Daily</option> 
              <option value="Weekly">Weekly</option> 
              <option value="Monthly" >Monthly</option> 
            </select>
          </div>
          <div>
            <label htmlFor="items">
            Add an item list
            </label>
            {itemsrows}
            {inputrow}
          </div>
          <input type="submit" value="Submit" />
        </form>
      </div>
    )

    return (
      <div>
        {form}
      </div>
    )
  }


}

export default TaskForm;