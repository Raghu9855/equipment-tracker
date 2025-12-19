import React, { useEffect } from 'react';

const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 600 }}>{title}</h2>
                    <button onClick={onClose} style={{ fontSize: '1.5rem', color: 'var(--text-secondary)' }}>&times;</button>
                </div>
                {children}
            </div>
        </div>
    );
};

export default Modal;
