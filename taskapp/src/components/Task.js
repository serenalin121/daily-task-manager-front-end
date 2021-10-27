import { useState } from "react";
import EditForm from "./EditForm";
import { Button } from "react-bootstrap";

const Task = (props) => {
  const [isInEditMode, setIsInEditMode] = useState(false);

  const handledeleteTask = (id) => {
    fetch(props.baseUrl + "/tasks/" + id, {
      method: "DELETE",
      credentials: "include"
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
      {!isInEditMode && (
        <>
          <td>{props.task.name}</td>
          <td>{props.task.dueDate}</td>
          <td>
            <input type="checkbox" checked={props.task.isComplete} readOnly />
          </td>
        </>
      )}
      {isInEditMode && (
        <EditForm
          variant="outline-dark"
          key={props.task._id}
          task={props.task}
          baseUrl={props.baseUrl}
          updateTask={saveUpdateTask}
        />
      )}
      <td>
        <Button
          variant="outline-dark"
          key={props.task._id}
          onClick={toggleEditFrom}
        >
          {!isInEditMode ? "Edit" : "Cancel"}
        </Button>
      </td>
      {!isInEditMode && (
        <td>
          <Button
            variant="outline-danger"
            type="submit"
            onClick={() => handledeleteTask(props.task._id)}
          >
            Delete
          </Button>
        </td>
      )}
    </tr>
  );
};

export default Task;
