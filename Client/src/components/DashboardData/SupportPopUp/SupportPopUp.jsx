const SupportPopUp = ({ isVisible, professional, onClose }) => {
  if (!isVisible) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Bla bla...</h2>

        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};
export default { SupportPopUp };
