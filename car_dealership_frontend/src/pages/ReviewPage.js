import React from 'react';
import ReviewForm from '../components/ReviewForm';

const ReviewPage = () => {
  return (
    <div style={styles.container}>
      <ReviewForm />
    </div>
  );
};

const styles = {
  container: {
    padding: '2rem 0',
  },
};

export default ReviewPage;
