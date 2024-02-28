import React from 'react';
import styles from './ActivityCard.module.css';
import Image from 'next/image';
import { ActivityInfo } from '../CustomTypes';



const ActivityCard: React.FC<ActivityInfo> = (activity) => {
  console.log(activity);

  return (
    <div className={styles.activityCard}>
      <img src={activity.image_url} alt="Activity Location" className={styles.activityImage} width={500}
      height={300}
       />
      <div className={styles.activityInfo}>
        some info
        <h2 className={styles.activityTitle}>{activity.name}</h2>
        <p className={styles.activityDate}>{activity.url}</p>
      </div>
    </div>
  );
};

export default ActivityCard;
