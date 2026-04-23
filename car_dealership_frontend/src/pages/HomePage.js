import React, { useState, useEffect } from 'react';
import DealerCard from '../components/DealerCard';
import { dealerService } from '../services/api';

const HomePage = ({ user }) => {
  const [dealers, setDealers] = useState([]);
  const [filteredDealers, setFilteredDealers] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadDealers();
  }, []);

  const loadDealers = async () => {
    setLoading(true);
    try {
      const response = await dealerService.getAllDealers();
      setDealers(response.data);
      setFilteredDealers(response.data);
    } catch (err) {
      setError('Failed to load dealers');
    } finally {
      setLoading(false);
    }
  };

  const handleStateFilter = async (e) => {
    const state = e.target.value;
    setSelectedState(state);
    
    if (state === '') {
      setFilteredDealers(dealers);
    } else {
      try {
        const response = await dealerService.getDealersByState(state);
        setFilteredDealers(response.data);
      } catch (err) {
        setError('Failed to filter dealers');
      }
    }
  };

  const states = [...new Set(dealers.map(d => d.state))].sort();

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Welcome to Cars Dealership</h1>
      
      <div style={styles.filterSection}>
        <label style={styles.label}>Filter by State:</label>
        <select 
          value={selectedState}
          onChange={handleStateFilter}
          style={styles.select}
        >
          <option value="">All States</option>
          {states.map(state => (
            <option key={state} value={state}>{state}</option>
          ))}
        </select>
      </div>

      {error && <div style={styles.error}>{error}</div>}

      {loading ? (
        <div style={styles.loading}>Loading dealers...</div>
      ) : (
        <>
          <p style={styles.info}>Found {filteredDealers.length} dealers</p>
          <div style={styles.dealersList}>
            {filteredDealers.map(dealer => (
              <DealerCard key={dealer.id} dealer={dealer} user={user} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem',
  },
  title: {
    textAlign: 'center',
    color: '#2c3e50',
    marginBottom: '2rem',
  },
  filterSection: {
    backgroundColor: '#fff',
    padding: '1.5rem',
    borderRadius: '8px',
    marginBottom: '2rem',
    display: 'flex',
    gap: '1rem',
    alignItems: 'center',
  },
  label: {
    fontWeight: 'bold',
    color: '#333',
  },
  select: {
    padding: '0.75rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '1rem',
  },
  error: {
    backgroundColor: '#e74c3c',
    color: 'white',
    padding: '1rem',
    borderRadius: '4px',
    marginBottom: '1rem',
  },
  loading: {
    textAlign: 'center',
    padding: '2rem',
    color: '#666',
  },
  info: {
    textAlign: 'center',
    color: '#666',
    marginBottom: '1rem',
  },
  dealersList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '1rem',
  },
};

export default HomePage;
