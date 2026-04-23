import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { reviewService } from '../services/api';

const ReviewForm = () => {
  const { dealerId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    dealer: dealerId,
    rating: 5,
    comment: '',
    purchase: false,
    purchase_date: '',
    car_make: '',
    car_model: '',
    year: new Date().getFullYear(),
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [sentiment, setSentiment] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await reviewService.submitReview(formData);
      navigate(`/dealer/${dealerId}`);
    } catch (err) {
      setError('Failed to submit review');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.form}>
        <h2 style={styles.title}>Submit Your Review</h2>
        {error && <div style={styles.error}>{error}</div>}
        {sentiment && <div style={styles.sentiment}>Sentiment: {sentiment}</div>}
        
        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Rating:</label>
            <select
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              style={styles.input}
            >
              <option value={5}>5 - Excellent</option>
              <option value={4}>4 - Good</option>
              <option value={3}>3 - Average</option>
              <option value={2}>2 - Poor</option>
              <option value={1}>1 - Terrible</option>
            </select>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Your Comment:</label>
            <textarea
              name="comment"
              value={formData.comment}
              onChange={handleChange}
              style={{...styles.input, minHeight: '120px'}}
              required
              placeholder="Share your experience..."
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.checkbox}>
              <input
                type="checkbox"
                name="purchase"
                checked={formData.purchase}
                onChange={handleChange}
              />
              I purchased a car from this dealer
            </label>
          </div>

          {formData.purchase && (
            <>
              <div style={styles.row}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Car Make:</label>
                  <input
                    type="text"
                    name="car_make"
                    value={formData.car_make}
                    onChange={handleChange}
                    style={styles.input}
                    placeholder="Toyota"
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Car Model:</label>
                  <input
                    type="text"
                    name="car_model"
                    value={formData.car_model}
                    onChange={handleChange}
                    style={styles.input}
                    placeholder="Camry"
                  />
                </div>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Year:</label>
                <input
                  type="number"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  style={styles.input}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Purchase Date:</label>
                <input
                  type="date"
                  name="purchase_date"
                  value={formData.purchase_date}
                  onChange={handleChange}
                  style={styles.input}
                />
              </div>
            </>
          )}

          <button 
            type="submit" 
            style={styles.button}
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit Review'}
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
    margin: '2rem auto',
    padding: '2rem',
  },
  form: {
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  title: {
    textAlign: 'center',
    marginBottom: '1.5rem',
    color: '#2c3e50',
  },
  error: {
    backgroundColor: '#e74c3c',
    color: 'white',
    padding: '1rem',
    borderRadius: '4px',
    marginBottom: '1rem',
  },
  sentiment: {
    backgroundColor: '#3498db',
    color: 'white',
    padding: '1rem',
    borderRadius: '4px',
    marginBottom: '1rem',
  },
  formGroup: {
    marginBottom: '1rem',
  },
  label: {
    display: 'block',
    marginBottom: '0.5rem',
    color: '#333',
    fontWeight: 'bold',
  },
  checkbox: {
    display: 'flex',
    alignItems: 'center',
    color: '#333',
    cursor: 'pointer',
    gap: '0.5rem',
  },
  input: {
    width: '100%',
    padding: '0.75rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '1rem',
    boxSizing: 'border-box',
    fontFamily: 'inherit',
  },
  row: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1rem',
  },
  button: {
    width: '100%',
    padding: '0.75rem',
    backgroundColor: '#27ae60',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginTop: '1rem',
  },
};

export default ReviewForm;
