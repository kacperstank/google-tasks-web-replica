/**
 * Notification with undo and close options.
 */
function Toast({ message, undoAction, closeToast }) {
  return (
    <div className="toast">
      <span>{message}</span>
      <button className="toast-undo-btn" onClick={undoAction}>
        Undo
      </button>
      <button className="toast-close-btn" onClick={closeToast}>
        ✕
      </button>
    </div>
  );
}

export default Toast;
