import React from 'react';
import TaskList from './TaskList';

const Task = ({ task, markDone, markRedo }) => {
  const basic = (
    <div className="taskText">
      <div className="name">
        {task.task}
      </div>
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
      && (<div className="items">
        <span className="itemlist"> Needed materials: </span>
        {task.items.map((p, i) => (
          <div key={i}> {p.name} <span>{p.qty}</span></div>
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
    <div className="task" key={task.task}>
      {basic}
      <div className="check">
        <button type="button" className="button" onClick={() => markRedo(task)}>&#x21BB;</button>
      </div>
    </div>
  );
};


export default Task;
