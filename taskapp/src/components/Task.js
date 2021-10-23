const Task = (props) => {
  const handledeleteTask = (id) => {
    fetch(props.baseURL + "/tasks/" + id, {
      method: "DELETE",
    }).then((res) => {
      const findIndex = props.allTasks.findIndex((task) => task._id === id);
      props.deleteTask(findIndex);
    });
  };
  return (
    <tr key={props.task._id}>
      <td>{props.task.name}</td>
      <td>{props.task.dueDate}</td>
      <input type="checkbox" checked={props.task.isComplete} readOnly />
      <button type="submit" onClick={() => handledeleteTask(props.task._id)}>
        Delete
      </button>
    </tr>
  );
};

export default Task;
