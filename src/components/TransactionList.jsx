import React, { useState, useMemo } from 'react';
import { mockCategories } from '../mockData';
import { Search, Filter, Trash2 } from 'lucide-react';

export default function TransactionList({ transactions, role, onDelete }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');

  const filtered = useMemo(() => {
    return transactions.filter(t => {
      const matchSearch = t.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchCat = filterCategory === 'All' ? true : t.category === filterCategory;
      return matchSearch && matchCat;
    }).sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort latest first
  }, [transactions, searchTerm, filterCategory]);

  return (
    <div className="card" style={{ marginTop: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <h2 className="text-xl">Recent Transactions</h2>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative' }}>
            <Search className="text-muted" size={16} style={{ position: 'absolute', left: '10px', top: '10px' }} />
            <input 
              type="text" 
              className="text-input" 
              placeholder="Search..." 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              style={{ paddingLeft: '2rem' }}
            />
          </div>
          <select 
            className="select-input"
            value={filterCategory}
            onChange={e => setFilterCategory(e.target.value)}
          >
            <option value="All">All Categories</option>
            {mockCategories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Type</th>
              {role === 'Admin' && <th>Action</th>}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr><td colSpan="6" style={{ textAlign: 'center' }} className="text-muted">No transactions found.</td></tr>
            )}
            {filtered.map(t => (
              <tr key={t.id}>
                <td className="text-sm">{t.date}</td>
                <td className="text-sm font-bold">{t.description}</td>
                <td><span className="badge text-xs" style={{ background: 'var(--border-color)', color: 'var(--text-main)' }}>{t.category}</span></td>
                <td className={`text-sm ${t.type === 'income' ? 'text-income' : 'text-expense'}`}>
                  {t.type === 'income' ? '+' : '-'}${t.amount.toFixed(2)}
                </td>
                <td>
                  <span className={`badge ${t.type === 'income' ? 'badge-income' : 'badge-expense'}`}>
                    {t.type}
                  </span>
                </td>
                {role === 'Admin' && (
                  <td>
                    <button className="btn" onClick={() => onDelete(t.id)} title="Delete" style={{ padding: '0.25rem 0.5rem', background: 'transparent' }}>
                      <Trash2 size={16} className="text-expense" />
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
