// TripCard.tsx
import React from 'react';
import styles from './TripCard.module.css';


type Participant = {
  name: string;
  imageUrl: string;
};

type TripCardData = {
  title: string;
  startDate: string;
  endDate: string;
  imageUrl: string;
  participants: Participant[];
};


const TripCard: React.FC<TripCardData> = ({ title, startDate, endDate, imageUrl, participants }) => {
  return (
    <div className={styles.tripCard}>
      <img src={imageUrl} alt="Trip Location" className={styles.tripImage} />
      <div className={styles.tripInfo}>
        <h2 className={styles.tripTitle}>{title}</h2>
        <p className={styles.tripDate}>{startDate} - {endDate}</p>
        <div className={styles.participants}>
          {participants.map((participant, index) => (
            <img key={index} src={participant.imageUrl} alt={participant.name} className={styles.participant} />
          ))}
        </div>
      </div>
    </div>
    
  );
};

export default TripCard;
