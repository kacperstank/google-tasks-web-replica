import { useState, useEffect } from "react";

import {
  fetchTasks,
  addTask as apiAddTask,
  deleteTask as apiDeleteTask,
  saveTask as apiSaveTask,
  undoDelete as apiUndoDelete,
} from "./utils/api";

import { filterCompletedTasks, resetForm, toggleState } from "./utils/helpers";

import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import Modal from "./components/Modal";
import Toast from "./components/Toast";

/**
 * Main App Component
 * Manages task creation, editing, deletion, and status updates,
 * as well as UI elements like modals, forms, and notifications.
 */
export default function App() {
  /* ==================== State Management ==================== */

  // Task form state
  const [showForm, setShowForm] = useState(false); // Visibility of the "Add Task" form
  const [newTask, setNewTask] = useState(""); // Title of the new task
  const [newTaskDetails, setNewTaskDetails] = useState(""); // Details of the new task

  // Task management state
  const [tasks, setTasks] = useState([]); // List of tasks from the API
  const [deletedTask, setDeletedTask] = useState(null); // Most recently deleted task for undo functionality

  // Modal and notification state
  const [showModal, setShowModal] = useState(false); // Visibility of the task editing modal
  const [currentTask, setCurrentTask] = useState(null); // Task being edited in the modal
  const [showToast, setShowToast] = useState(false); // Visibility of the toast notification
  const [toastMessage, setToastMessage] = useState(""); // Content of the toast notification

  // UI toggles
  const [showCompletedTasks, setShowCompletedTasks] = useState(false); // Visibility of the completed tasks list

  /* ==================== Fetch Tasks ==================== */

  // Load tasks from the API when the component mounts
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const data = await fetchTasks();
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    loadTasks();
  }, []);

  /* ==================== Handlers: Task Actions ==================== */

  // Handle adding a new task
  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    try {
      const createdTask = await apiAddTask({
        title: newTask,
        details: newTaskDetails,
        is_completed: false,
      });
      setTasks((prev) => [...prev, createdTask]);
      resetForm([setNewTask, setNewTaskDetails]); // Reset form fields
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  // Handle deleting a task
  const handleDeleteTask = async (task) => {
    setDeletedTask(task); // Save task for undo
    setShowToast(true);
    setToastMessage("Task deleted successfully!");

    try {
      await apiDeleteTask(task.id);
      setTasks((prev) => prev.filter((t) => t.id !== task.id)); // Remove from state
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Handle undoing the last deleted task
  const handleUndoDelete = async () => {
    if (!deletedTask) return;

    try {
      const restoredTask = await apiUndoDelete(deletedTask);
      setTasks((prev) => [...prev, restoredTask]); // Add back to state
      setDeletedTask(null);
    } catch (error) {
      console.error("Error undoing delete:", error);
    }
  };

  // Handle saving edits to a task
  const handleSaveTask = async () => {
    if (!currentTask) return;

    try {
      const updatedTask = await apiSaveTask(currentTask.id, {
        title: newTask,
        details: newTaskDetails,
        is_completed: currentTask.is_completed,
      });
      setTasks((prev) =>
        prev.map((task) => (task.id === currentTask.id ? updatedTask : task))
      ); // Update state
      closeModal();
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  // Toggle the completion status of a task
  const toggleTaskStatus = async (task) => {
    try {
      const updatedTask = { ...task, is_completed: !task.is_completed };
      await apiSaveTask(task.id, updatedTask); // API call to update
      setTasks((prev) => prev.map((t) => (t.id === task.id ? updatedTask : t))); // Update state
    } catch (error) {
      console.error("Error toggling task status:", error);
    }
  };

  /* ==================== Utility Handlers ==================== */

  // Toggle visibility of the "Add Task" form
  const toggleForm = () => toggleState(setShowForm);

  // Toggle visibility of the completed tasks list
  const toggleCompletedTasks = () => toggleState(setShowCompletedTasks);

  // Open the modal to edit a task
  const openModalForEdit = (task) => {
    setCurrentTask(task);
    setNewTask(task.title);
    setNewTaskDetails(task.details);
    setShowModal(true);
  };

  // Close the modal and reset related states
  const closeModal = () => {
    setShowModal(false);
    resetForm([setNewTask, setNewTaskDetails, setCurrentTask]);
  };

  // Close the toast notification
  const closeToast = () => {
    setShowToast(false);
    setToastMessage("");
  };

  /* ==================== Render ==================== */

  // Filter the list of completed tasks
  const completedTasks = filterCompletedTasks(tasks);

  return (
    <div className="main-container">
      {/* Add Task Button */}
      <div className="task-header">
        <button className="add-task-link" onClick={toggleForm}>
          <span className="material-symbols-outlined add-task-icon">
            add_task
          </span>
          <span className="add-task-text">Add a task</span>
        </button>
      </div>

      {/* Task Form */}
      {/* Task Form */}
      <div
        className={`task-form-container ${
          showForm ? "task-form-container-visible" : ""
        }`}
        aria-hidden={!showForm} // Accessibility attribute
      >
        <TaskForm
          taskTitle={newTask}
          setTaskTitle={setNewTask}
          taskDetails={newTaskDetails}
          setTaskDetails={setNewTaskDetails}
          onSubmit={handleAddTask}
        />
      </div>

      {/* Task List (My Tasks) */}
      <h2 className="task-list-header">My Tasks</h2>
      {tasks.filter((task) => !task.is_completed).length > 0 ? (
        <TaskList
          tasks={tasks.filter((task) => !task.is_completed)} // Show only incomplete tasks
          deleteTask={handleDeleteTask}
          openModalForEdit={openModalForEdit}
          toggleTaskStatus={toggleTaskStatus}
        />
      ) : (
        <div className="no-tasks-placeholder">
          <img
            src="https://www.gstatic.com/tasks/all-tasks-completed-light.svg"
            alt="All tasks completed"
            className="no-tasks-image"
          />
          <p className="no-tasks-text">All tasks complete!</p>
        </div>
      )}

      {/* Completed Task List Toggle */}
      <div
        className={`completed-tasks-container ${
          showCompletedTasks ? "expanded" : ""
        }`}
        onClick={toggleCompletedTasks}
      >
        <span className="completed-tasks-icon material-symbols-outlined">
          play_arrow
        </span>
        <span>Completed ({completedTasks.length})</span>
      </div>

      {/* Completed Tasks */}
      <div
        className={`completed-tasks-list ${
          showCompletedTasks ? "completed-tasks-list-visible" : ""
        }`}
      >
        <TaskList
          tasks={completedTasks}
          deleteTask={handleDeleteTask}
          openModalForEdit={openModalForEdit}
          toggleTaskStatus={toggleTaskStatus}
        />
      </div>

      {/* Modal */}
      {showModal && (
        <Modal onClose={closeModal} onSave={handleSaveTask}>
          <TaskForm
            taskTitle={newTask}
            setTaskTitle={setNewTask}
            taskDetails={newTaskDetails}
            setTaskDetails={setNewTaskDetails}
            onSubmit={(e) => e.preventDefault()}
          />
        </Modal>
      )}

      {/* Toast Notification */}
      {showToast && (
        <Toast
          message={toastMessage}
          undoAction={handleUndoDelete}
          closeToast={closeToast}
        />
      )}
    </div>
  );
}
