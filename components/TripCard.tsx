// TripCard.tsx
import React from 'react';
import styles from './TripCard.module.css';
import stockImage from '../public/f1.png';


type Participant = {
  imageURL: string;
  id: string;
};

type TripCardData = {
  trip_name: string;
  trip_owner: string;
  trip_dest: string;
  start_date: string;
  end_date: string;
  participants: Participant[];

};


const TripCard: React.FC<TripCardData> = ({ trip_name, trip_owner, start_date, end_date, participants}) => {
  return (
    <div className={styles.tripCard}>
      <img src={stockImage.src} alt="Trip Location" className={styles.tripImage} />
      <div className={styles.tripInfo}>
        <h2 className={styles.tripTitle}>{trip_name}</h2>
        <p className={styles.tripDate}>{start_date} - {end_date}</p>
        <div className={styles.participants}>
          {participants.map((participant, index) => (
            <img key={index} src={stockImage.src} alt={participant.id} className={styles.participant} />
          ))}
        </div>
      </div>
    </div>
    
  );
};

export default TripCard;
