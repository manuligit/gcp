import React from 'react';

const Task = ({ task }) => {
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

  if (!task.done) {
    return (
      <div className="task" key={task.task}>
        {basic}
        <div className="check">
          <div onClick={(e) => task.markDone(task.task)}>&#10003;</div>
        </div>
      </div>
    );
  }
  console.log(task.markDone)
  return (
    <div className="task" key={task.task}>
      {basic}
      <div className="check">
        <div onClick={(e) => task.markRedo(task.task)}>&#x21BB;</div>
      </div>
    </div>
  );
};


export default Task;
