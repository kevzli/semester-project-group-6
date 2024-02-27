import React from 'react';
import Review from '../components/Review';
import styles from './ReviewsPage.module.css'; // Assuming you have styles for the page


const ReviewsPage: React.FC = () => {
  // Example data, you could fetch this from an API or state
  const reviewData = [
    { title: "Example Business 1", reviewCount: 777, rating: 5, imageUrl: '/r1.png' },
    { title: "Example Business 2", reviewCount: 250, rating: 4, imageUrl: '/r1.png' },
    { title: "Example Business 3", reviewCount: 120, rating: 3, imageUrl: '/r1.png' },
    // ... more reviews
  ];

  return (
    <div className={styles.reviewsContainer}>
      {reviewData.map((data, index) => (
        <Review key={index}
        title={data.title}
        reviewCount={data.reviewCount}
        rating={data.rating}
        imageUrl={data.imageUrl} />
      ))}
    </div>
  );
};

export default ReviewsPage;
