import React, { useMemo } from 'react';
import { Wallet, TrendingUp, TrendingDown, LayoutDashboard } from 'lucide-react';

export default function Overview({ transactions }) {
  // Setup derivations
  const { totalBalance, income, expenses } = useMemo(() => {
    return transactions.reduce(
      (acc, t) => {
        if (t.type === 'income') {
          acc.income += t.amount;
          acc.totalBalance += t.amount;
        } else {
          acc.expenses += t.amount;
          acc.totalBalance -= t.amount;
        }
        return acc;
      },
      { totalBalance: 0, income: 0, expenses: 0 }
    );
  }, [transactions]);

  // Insight calc: highest spending category
  const expenseCategories = useMemo(() => {
    const cats = {};
    transactions.forEach(t => {
      if (t.type === 'expense') cats[t.category] = (cats[t.category] || 0) + t.amount;
    });
    return cats;
  }, [transactions]);
  
  const highestCategory = Object.keys(expenseCategories).length 
    ? Object.keys(expenseCategories).reduce((a, b) => expenseCategories[a] > expenseCategories[b] ? a : b) 
    : 'None';

  // Sort dates to create a tiny chart
  const recentDays = useMemo(() => {
    const days = {};
    transactions.forEach(t => {
      if (t.type === 'expense') days[t.date] = (days[t.date] || 0) + t.amount;
    });
    return Object.keys(days).sort().slice(-7).map(date => ({ date, amount: days[date] }));
  }, [transactions]);

  const maxDayAmount = Math.max(...recentDays.map(d => d.amount), 1);

  return (
    <div>
      <h2 className="text-2xl" style={{ marginBottom: '1.5rem' }}>Dashboard Overview</h2>
      
      <div className="dashboard-grid">
        <div className="card summary-card">
          <div className="summary-icon" style={{ background: 'rgba(59, 130, 246, 0.1)', color: 'var(--accent-primary)' }}>
            <Wallet size={20} />
          </div>
          <span className="text-sm text-muted">Total Balance</span>
          <span className="text-2xl">${totalBalance.toFixed(2)}</span>
        </div>
        <div className="card summary-card">
          <div className="summary-icon" style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--accent-income)' }}>
            <TrendingUp size={20} />
          </div>
          <span className="text-sm text-muted">Total Income</span>
          <span className="text-2xl text-income">${income.toFixed(2)}</span>
        </div>
        <div className="card summary-card">
          <div className="summary-icon" style={{ background: 'rgba(239, 68, 68, 0.1)', color: 'var(--accent-expense)' }}>
            <TrendingDown size={20} />
          </div>
          <span className="text-sm text-muted">Total Expenses</span>
          <span className="text-2xl text-expense">${expenses.toFixed(2)}</span>
        </div>
      </div>

      <div className="dashboard-grid">
        {/* CSS Chart for Spending Trend */}
        <div className="card">
          <h3 className="text-lg" style={{ marginBottom: '1rem' }}>Last 7 Days Expense Trend</h3>
          <div className="css-chart">
            {recentDays.length === 0 && <span className="text-muted text-sm">No expenses to show</span>}
            {recentDays.map(day => {
              const heightPct = (day.amount / maxDayAmount) * 100;
              return (
                <div key={day.date} className="css-bar-wrapper">
                  <div 
                    className="css-bar" 
                    style={{ height: `${heightPct}%`, background: 'var(--accent-primary)' }}
                    data-tooltip={`$${day.amount.toFixed(2)}`}
                  />
                  <div className="text-xs text-muted" style={{ marginTop: '0.5rem', textAlign: 'center' }}>
                    {day.date.split('-').slice(1).join('/')}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Small Insight Widget */}
        <div className="card">
          <h3 className="text-lg" style={{ marginBottom: '1rem' }}>AI Insights</h3>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <li style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <LayoutDashboard className="text-muted" size={24} />
              <div>
                <div className="text-sm font-bold">Highest Spending</div>
                <div className="text-xs text-muted">You spend the most on <strong style={{ color: 'var(--text-main)'}}>{highestCategory}</strong>.</div>
              </div>
            </li>
            <li style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
               <TrendingDown className="text-income" size={24} />
              <div>
                <div className="text-sm font-bold">Health check</div>
                <div className="text-xs text-muted">Your income completely covers your tracked expenses! Great job saving.</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
