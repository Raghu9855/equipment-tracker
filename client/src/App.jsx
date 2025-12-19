import React, { useState, useEffect } from 'react';
import { getEquipment, addEquipment, updateEquipment, deleteEquipment } from './api';
import EquipmentTable from './components/EquipmentTable';
import EquipmentForm from './components/EquipmentForm';
import Modal from './components/Modal';

function App() {
  const [equipment, setEquipment] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchEquipment = async () => {
    try {
      setIsLoading(true);
      const response = await getEquipment();
      setEquipment(response.data.data); // Adjust based on your API response structure
    } catch (error) {
      console.error("Failed to fetch equipment:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEquipment();
  }, []);

  const handleAdd = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const [deleteConfirmationId, setDeleteConfirmationId] = useState(null);

  const confirmDelete = (id) => {
    setDeleteConfirmationId(id);
  };

  const executeDelete = async () => {
    if (deleteConfirmationId) {
      try {
        await deleteEquipment(deleteConfirmationId);
        setDeleteConfirmationId(null);
        fetchEquipment();
      } catch (error) {
        console.error("Failed to delete equipment:", error);
      }
    }
  };

  const cancelDelete = () => {
    setDeleteConfirmationId(null);
  };


  const handleFormSubmit = async (formData) => {
    try {
      if (editingItem) {
        await updateEquipment(editingItem.id, formData);
      } else {
        await addEquipment(formData);
      }
      setIsModalOpen(false);
      fetchEquipment();
    } catch (error) {
      console.error("Failed to save equipment:", error);
      alert("Failed to save data. Please check the console for details.");
    }
  };

  return (
    <div className="container">
      <header style={{ marginBottom: '3rem', textAlign: 'center' }}>
        {/* Simple header with a gradient text effect needed to make it pop */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
          <img src="/logo.svg" alt="Leucine Logo" style={{ width: '40px', height: '40px' }} />
          <h1 style={{ fontSize: '2.5rem', marginBottom: 0, color: 'white', textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>Equipment Tracker</h1>
        </div>
        <p style={{ color: '#e2e8f0', fontSize: '1.1rem' }}>Manage your pharmaceutical manufacturing equipment.</p>
      </header>

      {/* 
        Loading state handling. 
        In a real app, I'd probably use a skeleton loader here for better UX.
      */}
      {isLoading ? (
        <div style={{ textAlign: 'center', padding: '4rem' }}>Loading...</div>
      ) : (
        <EquipmentTable
          data={equipment}
          onEdit={handleEdit}
          onDelete={confirmDelete}
          onAdd={handleAdd}
        />
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingItem ? "Edit Equipment" : "Add New Equipment"}
      >
        <EquipmentForm
          initialData={editingItem}
          onSubmit={handleFormSubmit}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={!!deleteConfirmationId}
        onClose={cancelDelete}
        title="Confirm Delete"
      >
        <div style={{ padding: '1rem 0' }}>
          <p className="text-gray-600 mb-6">Are you sure you want to delete this equipment?</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
            <button className="btn btn-secondary" onClick={cancelDelete}>Cancel</button>
            <button className="btn btn-danger" onClick={executeDelete}>Delete</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default App;
