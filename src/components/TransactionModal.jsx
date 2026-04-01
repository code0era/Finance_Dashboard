import React, { useState } from 'react';
import { mockCategories } from '../mockData';

export default function TransactionModal({ isOpen, onClose, onSave }) {
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    category: mockCategories[0],
    type: 'expense',
    date: new Date().toISOString().split('T')[0]
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.description || !formData.amount) return;
    onSave({
      id: Date.now().toString(),
      ...formData,
      amount: parseFloat(formData.amount)
    });
    setFormData({ ...formData, description: '', amount: '' });
  };

  return (
    <div className="modal-overlay">
      <div className="card modal-content">
        <h2 className="text-xl" style={{ marginBottom: '1rem' }}>Add Transaction (Admin)</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="text-sm text-muted">Description</label>
            <input 
              type="text" 
              className="text-input"
              value={formData.description} 
              onChange={e => setFormData({...formData, description: e.target.value})}
              autoFocus
            />
          </div>
          <div className="form-group">
            <label className="text-sm text-muted">Amount</label>
            <input 
              type="number" 
              step="0.01"
              className="text-input"
              value={formData.amount} 
              onChange={e => setFormData({...formData, amount: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label className="text-sm text-muted">Type</label>
            <select 
              className="select-input"
              value={formData.type} 
              onChange={e => setFormData({...formData, type: e.target.value})}
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </div>
          <div className="form-group">
            <label className="text-sm text-muted">Category</label>
            <select 
              className="select-input"
              value={formData.category} 
              onChange={e => setFormData({...formData, category: e.target.value})}
            >
              {mockCategories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label className="text-sm text-muted">Date</label>
            <input 
              type="date" 
              className="text-input"
              value={formData.date} 
              onChange={e => setFormData({...formData, date: e.target.value})}
            />
          </div>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
            <button type="button" className="btn" onClick={onClose} style={{ flex: 1, justifyContent: 'center' }}>Cancel</button>
            <button type="submit" className="btn btn-primary" style={{ flex: 1, justifySelf: 'stretch', justifyContent: 'center' }}>Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}
