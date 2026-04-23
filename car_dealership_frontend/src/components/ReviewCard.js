import React from 'react';

const ReviewCard = ({ review }) => {
  const getSentimentColor = (sentiment) => {
    switch (sentiment) {
      case 'positive':
        return '#27ae60';
      case 'negative':
        return '#e74c3c';
      default:
        return '#f39c12';
    }
  };

  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <div>
          <h4 style={styles.username}>{review.user_name}</h4>
          <p style={styles.date}>{new Date(review.created_at).toLocaleDateString()}</p>
        </div>
        <div style={styles.ratingAndSentiment}>
          <span style={styles.rating}>⭐ {review.rating}/5</span>
          <span 
            style={{
              ...styles.sentiment,
              backgroundColor: getSentimentColor(review.sentiment)
            }}
          >
            {review.sentiment.charAt(0).toUpperCase() + review.sentiment.slice(1)}
          </span>
        </div>
      </div>
      <p style={styles.comment}>{review.comment}</p>
      {review.purchase && (
        <div style={styles.carInfo}>
          <span>🚗 {review.car_make} {review.car_model} ({review.year})</span>
        </div>
      )}
    </div>
  );
};

const styles = {
  card: {
    backgroundColor: '#f9f9f9',
    border: '1px solid #e0e0e0',
    borderRadius: '6px',
    padding: '1rem',
    marginBottom: '1rem',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '1rem',
  },
  username: {
    margin: 0,
    fontSize: '1rem',
    color: '#2c3e50',
  },
  date: {
    margin: '0.25rem 0 0 0',
    fontSize: '0.85rem',
    color: '#999',
  },
  ratingAndSentiment: {
    display: 'flex',
    gap: '0.5rem',
    alignItems: 'center',
  },
  rating: {
    fontSize: '0.9rem',
    fontWeight: 'bold',
  },
  sentiment: {
    color: 'white',
    padding: '0.25rem 0.75rem',
    borderRadius: '12px',
    fontSize: '0.8rem',
    fontWeight: 'bold',
  },
  comment: {
    color: '#333',
    lineHeight: '1.5',
    marginBottom: '0.5rem',
  },
  carInfo: {
    fontSize: '0.85rem',
    color: '#666',
    backgroundColor: '#e8f4f8',
    padding: '0.5rem',
    borderRadius: '4px',
  },
};

export default ReviewCard;
