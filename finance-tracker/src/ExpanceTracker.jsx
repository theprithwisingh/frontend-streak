import React, { useState, useEffect, useReducer, useMemo, useCallback, useRef, createContext, useContext, memo } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Download, Plus, Trash2, Edit2, TrendingUp, TrendingDown, DollarSign, Calendar, Filter, X, Save, Search, Wallet, CreditCard, PieChart as PieChartIcon, BarChart3, ArrowUpRight, ArrowDownRight } from 'lucide-react';

// ==================== CONTEXT FOR THEME & SETTINGS ====================
const AppContext = createContext();

const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
};

// ==================== CUSTOM HOOKS ====================

// Custom hook for local storage with React state
const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = useCallback((value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  }, [key, storedValue]);

  return [storedValue, setValue];
};

// Custom hook for debounced values
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};

// Custom hook for previous value
const usePrevious = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
};

// Custom hook for window dimensions
const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};

// ==================== REDUCER FOR TRANSACTIONS ====================
const transactionReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TRANSACTION':
      return [...state, { ...action.payload, id: Date.now() }];
    
    case 'EDIT_TRANSACTION':
      return state.map(t => t.id === action.payload.id ? action.payload : t);
    
    case 'DELETE_TRANSACTION':
      return state.filter(t => t.id !== action.payload);
    
    case 'LOAD_TRANSACTIONS':
      return action.payload;
    
    case 'CLEAR_ALL':
      return [];
    
    default:
      return state;
  }
};

// ==================== CONSTANTS ====================
const CATEGORIES = [
  { name: 'Food & Dining', color: '#FF6B6B', gradient: 'from-red-400 to-pink-500', icon: '🍔' },
  { name: 'Transportation', color: '#4ECDC4', gradient: 'from-cyan-400 to-teal-500', icon: '🚗' },
  { name: 'Shopping', color: '#A78BFA', gradient: 'from-purple-400 to-indigo-500', icon: '🛍️' },
  { name: 'Entertainment', color: '#FB923C', gradient: 'from-orange-400 to-amber-500', icon: '🎬' },
  { name: 'Bills & Utilities', color: '#60A5FA', gradient: 'from-blue-400 to-sky-500', icon: '💡' },
  { name: 'Healthcare', color: '#F472B6', gradient: 'from-pink-400 to-rose-500', icon: '⚕️' },
  { name: 'Education', color: '#C084FC', gradient: 'from-violet-400 to-purple-500', icon: '📚' },
  { name: 'Travel', color: '#34D399', gradient: 'from-emerald-400 to-green-500', icon: '✈️' },
  { name: 'Income', color: '#10B981', gradient: 'from-green-400 to-emerald-600', icon: '💰' },
  { name: 'Other', color: '#94A3B8', gradient: 'from-slate-400 to-gray-500', icon: '📌' },
];

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// ==================== UTILITY FUNCTIONS ====================
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

const exportToCSV = (data) => {
  const headers = ['Date', 'Description', 'Category', 'Amount', 'Type'];
  const csvContent = [
    headers.join(','),
    ...data.map(t => [
      t.date,
      `"${t.description}"`,
      t.category,
      t.amount,
      t.type
    ].join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `expenses_${new Date().toISOString().split('T')[0]}.csv`;
  a.click();
  window.URL.revokeObjectURL(url);
};

// ==================== MEMOIZED COMPONENTS ====================

const StatCard = memo(({ title, value, icon: Icon, trend, gradient, subtitle }) => (
  <div className="relative group">
    <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl blur-xl -z-10" 
         style={{background: `linear-gradient(135deg, ${gradient})`}}></div>
    <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/20 h-full">
      <div className="flex items-start justify-between mb-4">
        <div className={`p-4 rounded-xl bg-gradient-to-br ${gradient} shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="w-7 h-7 text-white" />
        </div>
        {trend !== undefined && (
          <div className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-semibold ${
            trend > 0 ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'
          }`}>
            {trend > 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
            <span>{Math.abs(trend)}%</span>
          </div>
        )}
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
        <p className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-1">
          {value}
        </p>
        {subtitle && <p className="text-xs text-gray-400">{subtitle}</p>}
      </div>
    </div>
  </div>
));

const TransactionItem = memo(({ transaction, onEdit, onDelete }) => {
  const category = CATEGORIES.find(c => c.name === transaction.category);
  
  return (
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-2xl blur-xl" 
           style={{background: `linear-gradient(135deg, ${category?.color}, ${category?.color}44)`}}></div>
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 relative overflow-hidden">
        {/* Accent line */}
        <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${category?.gradient}`}></div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 flex-1 ml-3">
            <div 
              className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-lg bg-gradient-to-br ${category?.gradient} transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}
            >
              {category?.icon}
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-gray-800 text-lg mb-1">{transaction.description}</h4>
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-500 flex items-center">
                  <Calendar className="w-3.5 h-3.5 mr-1" />
                  {formatDate(transaction.date)}
                </span>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full bg-gradient-to-r ${category?.gradient} text-white shadow-sm`}>
                  {transaction.category}
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="text-right">
              <span 
                className={`text-2xl font-bold ${
                  transaction.type === 'income' 
                    ? 'bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent' 
                    : 'bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent'
                }`}
              >
                {transaction.type === 'income' ? '+' : '-'}{formatCurrency(Math.abs(transaction.amount))}
              </span>
            </div>
            
            <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button
                onClick={() => onEdit(transaction)}
                className="p-2.5 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-xl transition-all duration-300 transform hover:scale-110"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => onDelete(transaction.id)}
                className="p-2.5 text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition-all duration-300 transform hover:scale-110"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

// ==================== MAIN COMPONENT ====================
const ExpenseTracker = () => {
  // State management with useReducer for complex state
  const [transactions, dispatch] = useReducer(transactionReducer, []);
  
  // Local state with various hooks
  const [showModal, setShowModal] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('list'); // list, grid, chart
  
  // Custom hooks
  const [darkMode, setDarkMode] = useLocalStorage('darkMode', false);
  const debouncedSearch = useDebounce(searchQuery, 300);
  const previousTransactionCount = usePrevious(transactions.length);
  const { width } = useWindowSize();
  
  // Load transactions from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('transactions');
    if (stored) {
      dispatch({ type: 'LOAD_TRANSACTIONS', payload: JSON.parse(stored) });
    }
  }, []);
  
  // Save transactions to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);
  
  // Derived state with useMemo for performance optimization
  const filteredTransactions = useMemo(() => {
    return transactions.filter(t => {
      const transactionDate = new Date(t.date);
      const matchesMonth = transactionDate.getMonth() === selectedMonth;
      const matchesYear = transactionDate.getFullYear() === selectedYear;
      const matchesCategory = categoryFilter === 'All' || t.category === categoryFilter;
      const matchesSearch = t.description.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
                           t.category.toLowerCase().includes(debouncedSearch.toLowerCase());
      
      return matchesMonth && matchesYear && matchesCategory && matchesSearch;
    });
  }, [transactions, selectedMonth, selectedYear, categoryFilter, debouncedSearch]);
  
  const categoryData = useMemo(() => {
    const expenses = filteredTransactions.filter(t => t.type === 'expense');
    const grouped = expenses.reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + Math.abs(t.amount);
      return acc;
    }, {});
    
    return Object.entries(grouped).map(([name, value]) => ({
      name,
      value: parseFloat(value.toFixed(2)),
      color: CATEGORIES.find(c => c.name === name)?.color || '#95A5A6'
    }));
  }, [filteredTransactions]);
  
  const monthlyData = useMemo(() => {
    const data = [];
    for (let month = 0; month < 12; month++) {
      const monthTransactions = transactions.filter(t => {
        const date = new Date(t.date);
        return date.getMonth() === month && date.getFullYear() === selectedYear;
      });
      
      const income = monthTransactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);
      
      const expenses = monthTransactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + Math.abs(t.amount), 0);
      
      data.push({
        month: MONTHS[month],
        income: parseFloat(income.toFixed(2)),
        expenses: parseFloat(expenses.toFixed(2)),
        net: parseFloat((income - expenses).toFixed(2))
      });
    }
    return data;
  }, [transactions, selectedYear]);
  
  const summary = useMemo(() => {
    const income = filteredTransactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const expenses = filteredTransactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);
    
    return {
      income,
      expenses,
      balance: income - expenses,
      transactionCount: filteredTransactions.length
    };
  }, [filteredTransactions]);
  
  // Event handlers with useCallback to prevent unnecessary re-renders
  const handleAddTransaction = useCallback((transaction) => {
    if (editingTransaction) {
      dispatch({ type: 'EDIT_TRANSACTION', payload: { ...transaction, id: editingTransaction.id } });
    } else {
      dispatch({ type: 'ADD_TRANSACTION', payload: transaction });
    }
    setShowModal(false);
    setEditingTransaction(null);
  }, [editingTransaction]);
  
  const handleEdit = useCallback((transaction) => {
    setEditingTransaction(transaction);
    setShowModal(true);
  }, []);
  
  const handleDelete = useCallback((id) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      dispatch({ type: 'DELETE_TRANSACTION', payload: id });
    }
  }, []);
  
  const handleExport = useCallback(() => {
    exportToCSV(filteredTransactions);
  }, [filteredTransactions]);
  
  // Effect to show notification when transactions change
  useEffect(() => {
    if (previousTransactionCount !== undefined && transactions.length > previousTransactionCount) {
      // Could trigger a toast notification here
      console.log('New transaction added!');
    }
  }, [transactions.length, previousTransactionCount]);
  
  const isMobile = width < 768;
  
  return (
    <AppContext.Provider value={{ darkMode, setDarkMode }}>
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="relative z-10 p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <div className="bg-white/60 backdrop-blur-xl rounded-3xl p-6 md:p-8 shadow-2xl border border-white/20 mb-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="mb-6 md:mb-0">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="p-3 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl shadow-lg">
                        <Wallet className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent">
                          Expense Tracker
                        </h1>
                        <p className="text-gray-600 mt-1">Smart financial management made simple</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => {
                        setEditingTransaction(null);
                        setShowModal(true);
                      }}
                      className="bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 text-white px-6 py-3.5 rounded-xl flex items-center space-x-2 hover:shadow-2xl transform hover:scale-105 transition-all duration-300 font-semibold"
                    >
                      <Plus className="w-5 h-5" />
                      <span>Add Transaction</span>
                    </button>
                    
                    <button
                      onClick={handleExport}
                      className="bg-white/90 backdrop-blur-sm text-gray-700 px-6 py-3.5 rounded-xl flex items-center space-x-2 hover:shadow-xl transition-all duration-300 border border-gray-200 font-semibold hover:bg-white"
                    >
                      <Download className="w-5 h-5" />
                      <span>Export CSV</span>
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Filters */}
              <div className="bg-white/60 backdrop-blur-xl rounded-2xl p-5 shadow-xl border border-white/20">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="relative group">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-purple-600 transition-colors" />
                    <input
                      type="text"
                      placeholder="Search transactions..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/80 backdrop-blur-sm transition-all font-medium"
                    />
                  </div>
                  
                  <select
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                    className="px-4 py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/80 backdrop-blur-sm font-medium transition-all cursor-pointer"
                  >
                    {MONTHS.map((month, index) => (
                      <option key={index} value={index}>{month} 2026</option>
                    ))}
                  </select>
                  
                  <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                    className="px-4 py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/80 backdrop-blur-sm font-medium transition-all cursor-pointer"
                  >
                    {[2024, 2025, 2026].map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                  
                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="px-4 py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/80 backdrop-blur-sm font-medium transition-all cursor-pointer"
                  >
                    <option value="All">All Categories</option>
                    {CATEGORIES.map(cat => (
                      <option key={cat.name} value={cat.name}>{cat.icon} {cat.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatCard
                title="Total Income"
                value={formatCurrency(summary.income)}
                icon={TrendingUp}
                gradient="from-green-400 to-emerald-600"
                subtitle="This month"
              />
              <StatCard
                title="Total Expenses"
                value={formatCurrency(summary.expenses)}
                icon={TrendingDown}
                gradient="from-red-400 to-pink-600"
                subtitle="This month"
              />
              <StatCard
                title="Net Balance"
                value={formatCurrency(summary.balance)}
                icon={Wallet}
                gradient={summary.balance >= 0 ? 'from-blue-400 to-cyan-600' : 'from-orange-400 to-red-600'}
                subtitle={summary.balance >= 0 ? 'Positive flow' : 'Negative flow'}
              />
              <StatCard
                title="Transactions"
                value={summary.transactionCount}
                icon={CreditCard}
                gradient="from-purple-400 to-indigo-600"
                subtitle="This month"
              />
            </div>
          
          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Pie Chart - Category Breakdown */}
            <div className="bg-white/60 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-gradient-to-br from-pink-500 to-rose-500 rounded-lg">
                  <PieChartIcon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">Expense Distribution</h3>
              </div>
              {categoryData.length > 0 ? (
                <ResponsiveContainer width="100%" height={320}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={isMobile ? 90 : 110}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value) => formatCurrency(value)}
                      contentStyle={{
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        backdropFilter: 'blur(10px)',
                        borderRadius: '12px',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-80 flex flex-col items-center justify-center text-gray-400">
                  <PieChartIcon className="w-16 h-16 mb-3 opacity-30" />
                  <p className="font-medium">No expense data available</p>
                </div>
              )}
            </div>
            
            {/* Bar Chart - Monthly Comparison */}
            <div className="bg-white/60 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg">
                  <BarChart3 className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">Monthly Overview</h3>
              </div>
              <ResponsiveContainer width="100%" height={320}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip 
                    formatter={(value) => formatCurrency(value)}
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      backdropFilter: 'blur(10px)',
                      borderRadius: '12px',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Legend />
                  <Bar dataKey="income" fill="#10b981" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="expenses" fill="#ef4444" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Area Chart - Trend Analysis */}
          <div className="bg-white/60 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20 mb-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">Yearly Financial Trend</h3>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={monthlyData}>
                <defs>
                  <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorNet" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  formatter={(value) => formatCurrency(value)}
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '12px',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Legend />
                <Area type="monotone" dataKey="income" stroke="#10b981" fillOpacity={1} fill="url(#colorIncome)" strokeWidth={3} />
                <Area type="monotone" dataKey="expenses" stroke="#ef4444" fillOpacity={1} fill="url(#colorExpenses)" strokeWidth={3} />
                <Area type="monotone" dataKey="net" stroke="#3b82f6" fillOpacity={1} fill="url(#colorNet)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          
          {/* Transactions List */}
          <div className="bg-white/60 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-br from-violet-500 to-purple-500 rounded-lg">
                  <CreditCard className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">Recent Transactions</h3>
                  <p className="text-sm text-gray-500">
                    {filteredTransactions.length} transaction{filteredTransactions.length !== 1 ? 's' : ''} found
                  </p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-5 py-2.5 rounded-xl font-semibold transition-all duration-300 ${
                    viewMode === 'list' 
                      ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  List View
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-5 py-2.5 rounded-xl font-semibold transition-all duration-300 ${
                    viewMode === 'grid' 
                      ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Grid View
                </button>
              </div>
            </div>
            
            {filteredTransactions.length > 0 ? (
              <div className={`${viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 gap-5' : 'space-y-4'}`}>
                {filteredTransactions
                  .sort((a, b) => new Date(b.date) - new Date(a.date))
                  .map(transaction => (
                    <TransactionItem
                      key={transaction.id}
                      transaction={transaction}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                    />
                  ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="inline-block p-6 bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl mb-4">
                  <DollarSign className="w-20 h-20 text-gray-400" />
                </div>
                <h4 className="text-xl font-bold text-gray-700 mb-2">No transactions found</h4>
                <p className="text-gray-500 mb-6">Try adjusting your filters or add a new transaction</p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={() => {
                      setCategoryFilter('All');
                      setSearchQuery('');
                    }}
                    className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all font-semibold"
                  >
                    Clear Filters
                  </button>
                  <button
                    onClick={() => {
                      setEditingTransaction(null);
                      setShowModal(true);
                    }}
                    className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl hover:shadow-xl transition-all font-semibold"
                  >
                    Add Transaction
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
        
        {/* Transaction Modal */}
        {showModal && (
          <TransactionModal
            transaction={editingTransaction}
            onSave={handleAddTransaction}
            onClose={() => {
              setShowModal(false);
              setEditingTransaction(null);
            }}
          />
        )}
      </div>
    </AppContext.Provider>
  );
};

// ==================== TRANSACTION MODAL ====================
const TransactionModal = ({ transaction, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    description: transaction?.description || '',
    amount: transaction?.amount ? Math.abs(transaction.amount) : '',
    category: transaction?.category || 'Food & Dining',
    date: transaction?.date || new Date().toISOString().split('T')[0],
    type: transaction?.type || 'expense',
  });
  
  const [errors, setErrors] = useState({});
  
  // Validation with useCallback
  const validate = useCallback(() => {
    const newErrors = {};
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (!formData.amount || formData.amount <= 0) {
      newErrors.amount = 'Amount must be greater than 0';
    }
    
    if (!formData.date) {
      newErrors.date = 'Date is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    onSave({
      ...formData,
      amount: formData.type === 'income' 
        ? parseFloat(formData.amount)
        : -Math.abs(parseFloat(formData.amount))
    });
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  const selectedCategory = CATEGORIES.find(c => c.name === formData.category);
  
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 max-w-lg w-full shadow-2xl border border-white/20 transform animate-slideUp">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <div className={`p-3 bg-gradient-to-br ${formData.type === 'income' ? 'from-green-500 to-emerald-600' : 'from-red-500 to-pink-600'} rounded-2xl shadow-lg`}>
              {formData.type === 'income' ? <TrendingUp className="w-6 h-6 text-white" /> : <TrendingDown className="w-6 h-6 text-white" />}
            </div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              {transaction ? 'Edit Transaction' : 'Add Transaction'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-xl"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-3">
              Transaction Type
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, type: 'expense' }))}
                className={`relative overflow-hidden py-4 rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 ${
                  formData.type === 'expense'
                    ? 'bg-gradient-to-br from-red-500 to-pink-600 text-white shadow-2xl'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <span className="relative z-10 flex items-center justify-center space-x-2">
                  <TrendingDown className="w-5 h-5" />
                  <span>Expense</span>
                </span>
              </button>
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, type: 'income' }))}
                className={`relative overflow-hidden py-4 rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 ${
                  formData.type === 'income'
                    ? 'bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-2xl'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <span className="relative z-10 flex items-center justify-center space-x-2">
                  <TrendingUp className="w-5 h-5" />
                  <span>Income</span>
                </span>
              </button>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-3">
              Description *
            </label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className={`w-full px-5 py-4 border-2 rounded-2xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition-all font-medium bg-white/50 ${
                errors.description ? 'border-red-400' : 'border-gray-200'
              }`}
              placeholder="e.g., Grocery shopping, Salary, etc."
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-2 flex items-center">
                <span className="mr-1">⚠️</span> {errors.description}
              </p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-3">
              Amount *
            </label>
            <div className="relative">
              <span className="absolute left-5 top-1/2 transform -translate-y-1/2 text-2xl font-bold text-gray-500">
                $
              </span>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                step="0.01"
                className={`w-full pl-12 pr-5 py-4 border-2 rounded-2xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition-all font-bold text-xl bg-white/50 ${
                  errors.amount ? 'border-red-400' : 'border-gray-200'
                }`}
                placeholder="0.00"
              />
            </div>
            {errors.amount && (
              <p className="text-red-500 text-sm mt-2 flex items-center">
                <span className="mr-1">⚠️</span> {errors.amount}
              </p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-3">
              Category *
            </label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-2xl">
                {selectedCategory?.icon}
              </div>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full pl-14 pr-5 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition-all font-semibold bg-white/50 cursor-pointer appearance-none"
                style={{
                  backgroundImage: `linear-gradient(to right, ${selectedCategory?.color}15, ${selectedCategory?.color}05)`,
                }}
              >
                {CATEGORIES.map(cat => (
                  <option key={cat.name} value={cat.name}>
                    {cat.icon} {cat.name}
                  </option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-3">
              Date *
            </label>
            <div className="relative">
              <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className={`w-full pl-12 pr-5 py-4 border-2 rounded-2xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition-all font-medium bg-white/50 ${
                  errors.date ? 'border-red-400' : 'border-gray-200'
                }`}
              />
            </div>
            {errors.date && (
              <p className="text-red-500 text-sm mt-2 flex items-center">
                <span className="mr-1">⚠️</span> {errors.date}
              </p>
            )}
          </div>
          
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-4 bg-gray-100 text-gray-700 rounded-2xl hover:bg-gray-200 transition-all font-bold hover:shadow-lg transform hover:scale-105"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 text-white rounded-2xl hover:shadow-2xl transform hover:scale-105 transition-all font-bold flex items-center justify-center space-x-2"
            >
              <Save className="w-5 h-5" />
              <span>{transaction ? 'Update' : 'Save'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExpenseTracker;

// Add this to your global CSS or create a style tag
const styles = `
  @keyframes blob {
    0% {
      transform: translate(0px, 0px) scale(1);
    }
    33% {
      transform: translate(30px, -50px) scale(1.1);
    }
    66% {
      transform: translate(-20px, 20px) scale(0.9);
    }
    100% {
      transform: translate(0px, 0px) scale(1);
    }
  }

  .animate-blob {
    animation: blob 7s infinite;
  }

  .animation-delay-2000 {
    animation-delay: 2s;
  }

  .animation-delay-4000 {
    animation-delay: 4s;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .animate-fadeIn {
    animation: fadeIn 0.3s ease-in-out;
  }

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-slideUp {
    animation: slideUp 0.3s ease-out;
  }

  /* Scrollbar styling */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background: linear-gradient(135deg, #9333ea, #ec4899);
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(135deg, #7e22ce, #db2777);
  }
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);
}
