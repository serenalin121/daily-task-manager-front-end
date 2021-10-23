const Task = (props) => {
  return (
    <tr key={props.task._id}>
      <td>{props.task.name}</td>
      <td>{props.task.dueDate}</td>
      <input type="checkbox" checked={props.task.isComplete} readOnly />
    </tr>
  );
};

export default Task;
