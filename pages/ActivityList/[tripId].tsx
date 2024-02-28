import React, { useState, useEffect } from 'react';
import TripCard from '../../components/TripCard';
import ActivityCard from '../../components/ActivityCard';
import { useRouter } from 'next/router';
import styles from '../ActivityList.module.css';
import { useAuth } from "../../firebase/auth";
import { ref, getDatabase, push, get, orderByChild, child } from "firebase/database";
import { db } from '../../firebase/firebase';
import SearchBar from '../../components/SearchBarYelp';

export const ActivityList: React.FC = () => {
  const router = useRouter();
  const {tripId} = router.query;
  const [curTripData, setTripData] = useState<TripCardData>();
  

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

  type ActivityCardData = {
    id: number;
    title: string;
    dateRange: string;
    imageUrl: string;
  };


  useEffect(() => {
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
    }
    
  }, [tripId]); // Add router.query.tripId to the dependency array

  const [activities, setActivities] = useState<ActivityCardData[]>([]);

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

  const activityModal = () => {
    
  }

  const placeholdersCount = Math.max(0, 4 - activities.length);

  return (
    <div className={styles.Container}>
      {curTripData && 
        <TripCard key={tripId?.toString()} {...curTripData} />
      }
      <SearchBar trip_destination={curTripData?.trip_dest}></SearchBar>
      
      <button className={styles.addButton} onClick={activityModal}>
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
