import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReviewCard from '../components/ReviewCard';
import { dealerService, reviewService } from '../services/api';

const DealerDetailsPage = ({ user }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [dealer, setDealer] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadDealerAndReviews();
  }, [id]);

  const loadDealerAndReviews = async () => {
    setLoading(true);
    try {
      const dealerResponse = await dealerService.getDealerById(id);
      setDealer(dealerResponse.data);

      const reviewsResponse = await reviewService.getReviewsByDealer(id);
      setReviews(reviewsResponse.data);
    } catch (err) {
      setError('Failed to load dealer details');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div style={styles.loading}>Loading...</div>;
  }

  if (error || !dealer) {
    return <div style={styles.error}>{error || 'Dealer not found'}</div>;
  }

  return (
    <div style={styles.container}>
      <button onClick={() => navigate('/')} style={styles.backButton}>← Back</button>
      
      <div style={styles.dealerInfo}>
        <h1 style={styles.title}>{dealer.name}</h1>
        <p style={styles.address}>📍 {dealer.address}</p>
        <p style={styles.address}>{dealer.city}, {dealer.state}</p>
        
        <div style={styles.stats}>
          <div style={styles.stat}>
            <span style={styles.statLabel}>Average Rating</span>
            <span style={styles.statValue}>⭐ {dealer.average_rating ? dealer.average_rating.toFixed(1) : 'N/A'}</span>
          </div>
          <div style={styles.stat}>
            <span style={styles.statLabel}>Total Reviews</span>
            <span style={styles.statValue}>💬 {dealer.reviews_count}</span>
          </div>
        </div>

        {user && (
          <button 
            onClick={() => navigate(`/review/${id}`)}
            style={styles.reviewButton}
          >
            Write a Review
          </button>
        )}
      </div>

      <div style={styles.reviewsSection}>
        <h2 style={styles.reviewsTitle}>Reviews ({reviews.length})</h2>
        {reviews.length === 0 ? (
          <p style={styles.noReviews}>No reviews yet. Be the first to review!</p>
        ) : (
          <div style={styles.reviewsList}>
            {reviews.map(review => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '2rem',
  },
  backButton: {
    padding: '0.5rem 1rem',
    backgroundColor: '#95a5a6',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginBottom: '1.5rem',
  },
  dealerInfo: {
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    marginBottom: '2rem',
  },
  title: {
    color: '#2c3e50',
    marginBottom: '1rem',
  },
  address: {
    color: '#555',
    margin: '0.5rem 0',
  },
  stats: {
    display: 'flex',
    gap: '2rem',
    margin: '1.5rem 0',
    paddingTop: '1.5rem',
    borderTop: '1px solid #eee',
  },
  stat: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  statLabel: {
    fontSize: '0.9rem',
    color: '#999',
    marginBottom: '0.25rem',
  },
  statValue: {
    fontSize: '1.3rem',
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  reviewButton: {
    marginTop: '1.5rem',
    padding: '0.75rem 1.5rem',
    backgroundColor: '#27ae60',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  reviewsSection: {
    backgroundColor: '#f9f9f9',
    padding: '2rem',
    borderRadius: '8px',
  },
  reviewsTitle: {
    color: '#2c3e50',
    marginBottom: '1.5rem',
  },
  noReviews: {
    textAlign: 'center',
    color: '#999',
    padding: '2rem',
  },
  reviewsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  loading: {
    textAlign: 'center',
    padding: '3rem',
    color: '#666',
  },
  error: {
    backgroundColor: '#e74c3c',
    color: 'white',
    padding: '1.5rem',
    borderRadius: '4px',
    maxWidth: '500px',
    margin: '2rem auto',
  },
};

export default DealerDetailsPage;
