const Task = (props) => {
  return (
    <tr key={props.task._id}>
      <td>{props.task.name}</td>
      <td>{props.task.dueDate}</td>
      <td>{props.task.isComplete}</td>
    </tr>
  );
};

export default Task;
