export default function Modal({ data, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3>Thank you!</h3>
        <p className="modal-message">Your application has been submitted successfully.</p>

        <pre>{JSON.stringify(data, null, 2)}</pre>

        <button className="btn btn-secondary" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}
