// TripCard.tsx
import React from 'react';
import styles from './TripCard.module.css';
import stockImage from '../public/a1.png';
import stockImage2 from '../public/f1.png';
import Image from 'next/image';
import { Button } from '@mui/material';


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
          <Button> Add a Participant</Button>
          {participants.map((participant, index) => (
            <Image key={index} src={stockImage2.src} alt={participant.id} className={styles.participant} width={70}
            height={70} />
          ))}
        </div>
      </div>
    </div>
    
  );
};

export default TripCard;
