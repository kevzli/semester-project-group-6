// This is the React component file
import React from 'react';
import styles from './Trending.module.css';

const trends = [
  {
      id: 1,
      name: 'Beijing',
      location: 'China',
      img: 'https://lh5.googleusercontent.com/p/AF1QipMT-owNd7Te6Qye3epDAUnoIfHTiYp_6D6TuVkN=w1080-h624-n-k-no',
      activities: 15,
      places: 8,
      days: '5 days',
      price: 2.5
  },

  {
    id: 2,
    name: 'Tokyo',
    location: 'Japan',
    img: 'https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcQ7ywT4pyvLizrkR0I7sCoR6eC4UyUkQ1436oCBaPDBT_5DiHql_GGF9K5Pv1gsIlfB6txADKa9CRLQd3yKV_BcdS1kp2-8wQHRQ_d6sg',
    activities: 15,
    places: 8,
    days: '5 days',
    price: 2.5
  },
  {
    id: 3,
    name: 'Hong Kong',
    location: 'Hong Kong SAR, China',
    img: 'https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcQSDydkhwCI9zVaLS-832FqHVzfNDP9FEjorrzcZuXyTd6ypQeBsposDigA5fynW74kFNtXZR_alT8Pt2_DVMZ1XJQvcxz6C0t8h81WBg',
    activities: 20,
    places: 10,
    days: '7 days',
    price: 3.0
  },
  // Add as many as you like
];


const Trending = () => {
  return (
    <section className={styles.trending}>
      <div className={styles.heading}>
        <h2>Trips 2024</h2>
        <p>Description</p>
      </div>
      <div className={styles.wrapper}>
        {trends.map((trend) => (
          <div key={trend.id} className={styles.card}>
            <div className={styles.cardHeader}>
              <img src={trend.img} alt={trend.name} className={styles.cardImg} />
              <h3 className={styles.cardTitle}>{trend.name}</h3>
              <p className={styles.cardLocation}>{trend.location}</p>
            </div>
            <div className={styles.cardBody}>
              <div className={styles.cardInfo}>
                <span>{trend.activities} Activities</span>
                <span>{trend.places} Places</span>
                <span>{trend.days}</span>
              </div>
              <div className={styles.cardPricing}>
                <span>From ${trend.price} / Person</span>
              </div>
            </div>
            <button className={styles.cardButton}>Enter</button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Trending;
