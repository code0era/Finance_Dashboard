import React, { useState, useEffect } from 'react';
import { mockTransactions } from './mockData';
import Overview from './components/Overview';
import TransactionList from './components/TransactionList';
import TransactionModal from './components/TransactionModal';
import { Moon, Sun, UserCheck, User, Plus } from 'lucide-react';

function App() {
  const [theme, setTheme] = useState('dark');
  const [role, setRole] = useState('Viewer');
  const [transactions, setTransactions] = useState(mockTransactions);
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  const toggleRole = () => setRole(prev => prev === 'Viewer' ? 'Admin' : 'Viewer');

  const addTransaction = (t) => {
    setTransactions([t, ...transactions]);
    setModalOpen(false);
  };

  const deleteTransaction = (id) => {
    if (confirm('Delete transaction?')) {
        setTransactions(transactions.filter(t => t.id !== id));
    }
  };

  return (
    <div className="app-container">
      {/* Sidebar Mockup */}
      <aside className="sidebar card">
        <div>
          <h1 className="text-xl" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-primary)' }}>
            <div style={{ width: '24px', height: '24px', background: 'var(--accent-primary)', borderRadius: '4px' }}></div>
            FinDash
          </h1>
        </div>
        
        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <button className="btn" onClick={toggleTheme} style={{ justifyContent: 'center' }}>
            {theme === 'dark' ? <Sun size={16}/> : <Moon size={16}/>} 
            {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
          </button>

          <button className="btn" onClick={toggleRole} style={{ justifyContent: 'center' }}>
            {role === 'Admin' ? <UserCheck size={16} className="text-income"/> : <User size={16}/>} 
            Role: {role}
          </button>
        </div>
      </aside>

      <main className="main-content">
        <header className="header">
          <div>
            <span className="text-muted text-sm">Welcome back,</span>
            <div className="text-2xl" style={{ marginTop: '4px' }}>Here is your financial summary</div>
          </div>
          <div className="header-actions">
            {role === 'Admin' && (
              <button className="btn btn-primary" onClick={() => setModalOpen(true)}>
                <Plus size={16} /> Add Transaction
              </button>
            )}
          </div>
        </header>

        <Overview transactions={transactions} />
        
        <TransactionList 
          transactions={transactions} 
          role={role} 
          onDelete={deleteTransaction} 
        />
      </main>

      <TransactionModal 
        isOpen={isModalOpen} 
        onClose={() => setModalOpen(false)} 
        onSave={addTransaction}
      />
    </div>
  );
}

export default App;
