const BASE_URL = "http://127.0.0.1:8000/tasks/";

/* ================= API Functions ================= */

/**
 * Fetch tasks from the server.
 * @returns {Promise} A promise that resolves to the list of tasks.
 */
export const fetchTasks = async () => {
  const response = await fetch(BASE_URL);
  if (!response.ok) throw new Error("Failed to fetch tasks");
  return response.json();
};

/**
 * Add a new task.
 * @param {Object} taskData - The task data ({ title, details, is_completed }).
 * @returns {Promise} A promise that resolves to the created task.
 */
export const addTask = async (taskData) => {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(taskData),
  });
  if (!response.ok) throw new Error("Failed to add task");
  return response.json();
};

/**
 * Delete a task.
 * @param {number} taskId - The ID of the task to delete.
 * @returns {Promise} A promise that resolves when the task is deleted.
 */
export const deleteTask = async (taskId) => {
  const response = await fetch(`${BASE_URL}${taskId}/`, { method: "DELETE" });
  if (!response.ok) throw new Error("Failed to delete task");
  return true; // Return success indication
};

/**
 * Update a task.
 * @param {number} taskId - The ID of the task to update.
 * @param {Object} taskData - The updated task data ({ title, details, is_completed }).
 * @returns {Promise} A promise that resolves to the updated task.
 */
export const saveTask = async (taskId, taskData) => {
  const response = await fetch(`${BASE_URL}${taskId}/`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(taskData),
  });
  if (!response.ok) throw new Error("Failed to save task");
  return response.json();
};

/**
 * Undo the last deleted task by re-adding it.
 * @param {Object} taskData - The task data to restore.
 * @returns {Promise} A promise that resolves to the restored task.
 */
export const undoDelete = async (taskData) => {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(taskData),
  });
  if (!response.ok) throw new Error("Failed to undo delete");
  return response.json();
};