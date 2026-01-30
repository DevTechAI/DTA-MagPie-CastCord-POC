export default function Modal({ data, onClose }) {
  const name = data?.name?.trim() || "";
  const thankYouHeading = name ? `Thank you, ${name}!` : "Thank you!";

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content modal-thank-you" onClick={(e) => e.stopPropagation()}>
        <h3>{thankYouHeading}</h3>
        <p className="modal-message">Your application has been submitted successfully.</p>

        <pre>{JSON.stringify(data, null, 2)}</pre>

        <button className="btn btn-secondary" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}
