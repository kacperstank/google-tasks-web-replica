/**
 * A form for adding or editing tasks.
 */
function TaskForm({
  taskTitle,
  setTaskTitle,
  taskDetails,
  setTaskDetails,
  onSubmit,
}) {
  return (
    <form className="task-form" onSubmit={onSubmit}>
      <div className="task-form-row">
        <label htmlFor="task-title">Title</label>
        <input
          type="text"
          id="task-title"
          placeholder="Enter Task Title"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          required
        />
      </div>
      <div className="task-form-row">
        <label htmlFor="task-details">
          <span className="material-symbols-outlined form-icon">notes</span>
          Details
        </label>
        <textarea
          id="task-details"
          placeholder="Enter Task Details"
          rows="3"
          value={taskDetails}
          onChange={(e) => setTaskDetails(e.target.value)}
        ></textarea>
      </div>
    </form>
  );
}

export default TaskForm;
