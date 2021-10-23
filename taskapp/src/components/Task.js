import { useState } from "react";
import EditForm from "./EditForm";

const Task = (props) => {
  const [isInEditMode, setIsInEditMode] = useState(false);

  const handledeleteTask = (id) => {
    fetch(props.baseUrl + "/tasks/" + id, {
      method: "DELETE",
    }).then((res) => {
      const findIndex = props.allTasks.findIndex((task) => task._id === id);
      props.deleteTask(findIndex);
    });
  };

  const toggleEditFrom = () => {
    setIsInEditMode(!isInEditMode);
  };

  const saveUpdateTask = (enteredTask) => {
    props.updateTask(enteredTask);
    setIsInEditMode(!isInEditMode);
  };
  return (
    <tr key={props.task._id}>
      <td>{props.task.name}</td>
      <td>{props.task.dueDate}</td>
      <input type="checkbox" checked={props.task.isComplete} readOnly />
      <td>
        {isInEditMode ? (
          <EditForm
            key={props.task._id}
            task={props.task}
            baseUrl={props.baseUrl}
            updateTask={saveUpdateTask}
          />
        ) : null}{" "}
      </td>
      <button key={props.task._id} onClick={toggleEditFrom}>
        {!isInEditMode ? "Edit" : "Cancel"}
      </button>
      <button type="submit" onClick={() => handledeleteTask(props.task._id)}>
        Delete
      </button>
    </tr>
  );
};

export default Task;
