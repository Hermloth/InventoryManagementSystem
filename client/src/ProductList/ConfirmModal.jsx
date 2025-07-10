import "./ConfirmModal.css";

export default function ConfirmModal({ message, onConfirm, onCancel }) {
    return (
        <div className="ConfirmModalBackdrop">
            <div className="ConfirmModal">
                <p>{message}</p>
                <div className="ConfirmModalButtons">
                    <button className="Confirm" onClick={onConfirm}>Yes, Delete</button>
                    <button className="Cancel" onClick={onCancel}>Cancel</button>
                </div>
            </div>
        </div>
    );
}