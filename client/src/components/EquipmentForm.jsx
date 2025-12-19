import React, { useState, useEffect } from 'react';

const EquipmentForm = ({ initialData, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
        name: '',
        type: 'Machine',
        status: 'Active',
        last_cleaned: new Date().toISOString().split('T')[0]
    });

    // Effect to populate form when editing an existing item
    // This allows us to reuse the same form for both Create and Update operations
    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label className="form-label">Equipment Name</label>
                <input
                    type="text"
                    name="name"
                    className="form-input"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Bioreactor X-200"
                />
            </div>

            <div className="form-group">
                <label className="form-label">Type</label>
                <select
                    name="type"
                    className="form-input"
                    value={formData.type}
                    onChange={handleChange}
                >
                    <option value="Machine">Machine</option>
                    <option value="Vessel">Vessel</option>
                    <option value="Tank">Tank</option>
                    <option value="Mixer">Mixer</option>
                </select>
            </div>

            <div className="form-group">
                <label className="form-label">Status</label>
                <select
                    name="status"
                    className="form-input"
                    value={formData.status}
                    onChange={handleChange}
                >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Under Maintenance">Under Maintenance</option>
                </select>
            </div>

            <div className="form-group">
                <label className="form-label">Last Cleaned Date</label>
                <input
                    type="date"
                    name="last_cleaned"
                    className="form-input"
                    value={formData.last_cleaned}
                    onChange={handleChange}
                    required
                />
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem', justifyContent: 'flex-end' }}>
                <button type="button" className="btn btn-secondary" onClick={onCancel}>
                    Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                    {initialData ? 'Update Equipment' : 'Add Equipment'}
                </button>
            </div>
        </form>
    );
};

export default EquipmentForm;
