import TaskListItem from "./TaskListItem";

/**
 * The list of tasks.
 */
function TaskList({ tasks, deleteTask, openModalForEdit, toggleTaskStatus }) {
  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskListItem
          key={task.id}
          task={task}
          deleteTask={deleteTask}
          openModalForEdit={openModalForEdit}
          toggleTaskStatus={toggleTaskStatus}
        />
      ))}
    </ul>
  );
}

export default TaskList;
