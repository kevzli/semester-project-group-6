import React from 'react';
import styles from './ActivityCard.module.css';
import Image from 'next/image';

type ActivityCardData = {
  id: number;
  title: string;
  dateRange: string;
  imageUrl: string;
};

const ActivityCard: React.FC<ActivityCardData> = ({ title, dateRange, imageUrl }) => {
  return (
    <div className={styles.activityCard}>
      <Image src={imageUrl} alt="Activity Location" className={styles.activityImage} width={500}
      height={300}
      layout="responsive" />
      <div className={styles.activityInfo}>
        <h2 className={styles.activityTitle}>{title}</h2>
        <p className={styles.activityDate}>{dateRange}</p>
      </div>
    </div>
  );
};

export default ActivityCard;
