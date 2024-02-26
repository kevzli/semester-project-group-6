import React, { useState, useEffect } from 'react';
import TripCard from '../../components/TripCard';
import ActivityCard from '../../components/ActivityCard';
import { useRouter } from 'next/router';
import styles from '../ActivityList.module.css';
import { useAuth } from "../../firebase/auth";
import { ref, getDatabase, push, get, orderByChild, child } from "firebase/database";
import { db } from '../../firebase/firebase';

export const ActivityList: React.FC = () => {
  const router = useRouter();
  const [curTripData, setTripData] = useState(null);

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
    imageUrl: 'f1.png', // Replace with the actual image path
    participants: [
      { name: 'Andrew2', imageUrl: 'f1.png' },
      { name: 'Andrew', imageUrl: 'f1.png' }
    ]
  };

  useEffect(() => {
    const { tripId } = router.query;
    const tripDatabaseRef = ref(db, "trips/" + tripId);
    const fetchTripData = async () => {
      try {
        const tripSnapshot = await get(tripDatabaseRef);
        if (tripSnapshot.exists()) {
          setTripData(tripSnapshot.val());
        } else {
          console.error(`Trip with ID ${tripId} not found.`);
        }
      } catch (error) {
        console.error('Error fetching trip data:', error);
      }
    };

    if (tripId) {
      fetchTripData();
      // Fetch activities or other data related to the trip as needed
    }
  }, [router.query.tripId]); // Add router.query.tripId to the dependency array

  const [activities, setActivities] = useState<ActivityCardData[]>([currentTripData]);

  const placeholderData = {
    id: 0,
    title: '',
    dateRange: '',
    imageUrl: '', // Placeholder image or leave it empty
  };

  const addNewActivity = () => {
    const newActivity: ActivityCardData = {
      id: activities.length + 1,
      title: `New Activity ${activities.length + 1}`,
      dateRange: 'New Date Range',
      imageUrl: 'path-to-new-activity-image.png', // Replace with the actual path
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
