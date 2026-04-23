import React from 'react';
import { Link } from 'react-router-dom';

const DealerCard = ({ dealer, user }) => {
  return (
    <div style={styles.card}>
      <h3 style={styles.title}>{dealer.name}</h3>
      <p style={styles.info}>📍 {dealer.city}, {dealer.state}</p>
      <p style={styles.info}>📎 {dealer.address}</p>
      <div style={styles.stats}>
        <span>⭐ Rating: {dealer.average_rating ? dealer.average_rating.toFixed(1) : 'N/A'}</span>
        <span>💬 Reviews: {dealer.reviews_count}</span>
      </div>
      <div style={styles.actions}>
        <Link to={`/dealer/${dealer.id}`} style={styles.button}>
          View Details
        </Link>
        {user && (
          <Link to={`/review/${dealer.id}`} style={{...styles.button, backgroundColor: '#27ae60'}}>
            Write Review
          </Link>
        )}
      </div>
    </div>
  );
};

const styles = {
  card: {
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '1.5rem',
    marginBottom: '1rem',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  title: {
    fontSize: '1.3rem',
    marginBottom: '0.5rem',
    color: '#2c3e50',
  },
  info: {
    color: '#555',
    margin: '0.5rem 0',
    fontSize: '0.9rem',
  },
  stats: {
    display: 'flex',
    gap: '2rem',
    margin: '1rem 0',
    fontSize: '0.95rem',
    color: '#666',
  },
  actions: {
    display: 'flex',
    gap: '1rem',
    marginTop: '1rem',
  },
  button: {
    flex: 1,
    padding: '0.75rem 1rem',
    backgroundColor: '#3498db',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '4px',
    textAlign: 'center',
    cursor: 'pointer',
    fontSize: '0.9rem',
  },
};

export default DealerCard;
