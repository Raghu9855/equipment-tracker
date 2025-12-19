import React from 'react';
import { FaEdit, FaTrash, FaPlus, FaSearch } from 'react-icons/fa';

const EquipmentTable = ({ data, onEdit, onDelete, onAdd }) => {
    const getStatusBadge = (status) => {
        switch (status) {
            case 'Active': return 'badge badge-active';
            case 'Inactive': return 'badge badge-inactive';
            case 'Under Maintenance': return 'badge badge-maintenance';
            default: return 'badge badge-inactive';
        }
    };

    return (
        <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h2 style={{ fontSize: '1.25rem' }}>Equipment List</h2>
                <button className="btn btn-primary" onClick={onAdd}>
                    <FaPlus /> Add Equipment
                </button>
            </div>

            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Status</th>
                            <th>Last Cleaned</th>
                            <th style={{ textAlign: 'right' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data && data.length > 0 ? (
                            data.map((item) => (
                                <tr key={item.id}>
                                    <td style={{ fontWeight: 500 }}>{item.name}</td>
                                    <td>{item.type}</td>
                                    <td>
                                        <span className={getStatusBadge(item.status)}>{item.status}</span>
                                    </td>
                                    <td style={{ fontFamily: 'monospace' }}>
                                        {new Date(item.last_cleaned).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                                    </td>
                                    <td style={{ textAlign: 'right' }}>
                                        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                                            <button
                                                className="btn btn-secondary"
                                                style={{ padding: '0.4rem' }}
                                                onClick={() => onEdit(item)}
                                                title="Edit"
                                            >
                                                <FaEdit />
                                            </button>
                                            <button
                                                className="btn btn-danger"
                                                style={{ padding: '0.4rem' }}
                                                onClick={() => onDelete(item.id)}
                                                title="Delete"
                                            >
                                                <FaTrash />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
                                    No equipment found. Click "Add Equipment" to get started.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EquipmentTable;
