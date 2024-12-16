import TaskForm from "./TaskForm";

/**
 * A modal dialog for confirming or editing actions.
 */
function Modal({ children, onClose, onSave }) {
  console.log("Modal component rendered");
  return (
    <div className="modal-backdrop">
      <div className="modal-container">
        {children}
        <div className="modal-actions">
          <button className="modal-close-btn" onClick={onClose}>
            Cancel
          </button>
          <button className="modal-save-btn" onClick={onSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
