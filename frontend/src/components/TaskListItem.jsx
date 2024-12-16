import TaskForm from "./TaskForm";

/**
 * A single task item in the task list.
 */
function TaskListItem({
  task,
  deleteTask,
  openModalForEdit,
  toggleTaskStatus,
}) {
  return (
    <li className="task-list-item">
      <label>
        {/* Bind checkbox state to `task.is_completed` */}
        <input
          type="checkbox"
          checked={task.is_completed}
          onChange={() => toggleTaskStatus(task)}
        />
        <div className="task-content">
          {/* Task title */}
          <span className="task-title">{task.title}</span>
          {/* Task description */}
          <span className="task-details">{task.details}</span>
        </div>
      </label>
      <div className="task-actions">
        <button
          className="task-edit-btn"
          onClick={() => openModalForEdit(task)}
        >
          <span className="material-symbols-outlined">edit</span>
        </button>
        <button className="task-delete-btn" onClick={() => deleteTask(task)}>
          <span className="material-symbols-outlined">delete</span>
        </button>
      </div>
    </li>
  );
}

export default TaskListItem;
