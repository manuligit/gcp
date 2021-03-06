import React from 'react';

const Task = ({
  task, markDone, markRedo, changeItem, id, deleteTask, calcPercentage,
}) => {
  const progress = {
    backgroundColor: 'black'
  };

  const basic = (
    <div className="taskText">
      <div className="name">
        {task.task} {task.date}
      </div>
      {task.items && task.items.length > 0 && <span style={progress}>a</span>}
      <div className="type">
        {task.type}
      </div>
      <div className="desc">
        {task.desc}
      </div>
    </div>
  );

  const itemlist = (
    <div className="itemlist">
      {task.items && (task.items.length > 0)
      && (
      <div className="items">
        <div className="itemlist"> Needed materials: </div>
        {task.items.map((p, i) => (
          <div key={i}> {p.name}
            <span>
              <input className="nr" type="number" onChange={e => changeItem(id, i, parseInt(e.target.value, 10))} value={p.qty} />
              {p.req != null && `/ ${p.req}`}
            </span>
            <button type="button" className="increment" onClick={() => changeItem(id, i, (parseInt((p.qty), 10) + 1))}>+</button>
            <button type="button" className="decrement" onClick={() => changeItem(id, i, (parseInt((p.qty), 10) - 1))}>-</button>
            <button type="button" className="markDone" onClick={() => changeItem(id, i, p.req)}>&#10003;</button>
          </div>
        ))}
      </div>
      )}
    </div>
  );

  if (!task.done) {
    return (
      <div>
        <div className="task">
          <div className="taskrow" key={task.task}>
            {basic}
            <div className="check">
              <button type="button" className="button" onClick={() => markDone(task)}>&#10003;</button>
            </div>
          </div>
          {itemlist}
        </div>
      </div>
    );
  }

  return (
    <div className="task">
      <div className="taskrow" key={task.task}>
        {basic}
        <div className="check">
          <button type="button" className="button" onClick={() => markRedo(task)}>&#x21BB;</button>
        </div>g
        <div className="check">
          <button type="button" className="button" onClick={() => deleteTask(id)}>x</button>
        </div>
      </div>
    </div>
  );
};


export default Task;
