// Another .tsx file where you use the TripCard component
import React, { useState } from 'react';
import TripCard from '../components/TripCard';
import ActivityCard from '../components/ActivityCard';
import styles from './ActivityList.module.css';


type ActivityCardData = {
  id: number;
  title: string;
  dateRange: string;
  imageUrl: string;
};

const currentTripData = {
  id: 1,
  title: 'Activity 3',
  dateRange: 'September 10 - 12',
  imageUrl: 'f1.png', // Replace with actual image path
  participants: [
    { name: 'Andrew2', imageUrl: 'f1.png' }, // Replace with actual image paths
    { name: 'Andrew', imageUrl: 'f1.png' }
  ]
};

export const ActivityList: React.FC = () => {
  const [activities, setActivities] = useState<ActivityCardData[]>([
    currentTripData
  ]);
  
  const placeholderData = {
    id: 0,
    title: '',
    dateRange: '',
    imageUrl: '', // Placeholder image or leave it empty
  };

  const addNewActivity = () => {
    const newActivity: ActivityCardData = {
      id: activities.length + 1, // Start IDs from 2 since 1 is for current trip
      title: `New Activity ${activities.length + 1}`,
      dateRange: 'New Date Range',
      imageUrl: 'path-to-new-activity-image.png', // Replace with actual path
    };
    setActivities([...activities, newActivity]);
  };

  const placeholdersCount = Math.max(0, 4 - activities.length);

  return (
    <div className={styles.activityList}>
      <TripCard key={currentTripData.id} {...currentTripData} />
      <button className={styles.addButton} onClick={addNewActivity}>
        +
      </button>
      {activities.map(activity => (
        <ActivityCard key={activity.id} {...activity} />
      ))}
      {[...Array(placeholdersCount)].map((_, index) => (
        <div key={`placeholder-${index}`} className={styles.placeholder} />
      ))}
      
    </div>
  );
};

export default ActivityList;
