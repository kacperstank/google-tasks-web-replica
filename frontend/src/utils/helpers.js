// utils/helpers.js

/**
 * Filters completed tasks from the task list.
 * @param {Array} tasks - Array of all tasks.
 * @returns {Array} - Array of completed tasks.
 */
export const filterCompletedTasks = (tasks) => tasks.filter((task) => task.is_completed);

/**
 * Resets the values of multiple state setters.
 * @param {Array} setters - Array of state setter functions.
 */
export const resetForm = (setters) => {
  setters.forEach((setter) => setter(""));
};

/**
 * Toggles a boolean state.
 * @param {Function} setter - The state setter function.
 */
export const toggleState = (setter) => setter((prev) => !prev);