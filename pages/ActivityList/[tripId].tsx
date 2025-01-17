import React, { useState, useEffect } from "react";
import TripCard from "../../components/TripCard";
import ActivityCard from "../../components/ActivityCard";
import { useRouter } from "next/router";
import styles from "../ActivityList.module.css";
import { useAuth } from "../../firebase/auth";
import {
  ref,
  getDatabase,
  push,
  get,
  orderByChild,
  child,
} from "firebase/database";
import { db } from "../../firebase/firebase";
import SearchBar from "../../components/SearchBarYelp";
import { TripCardData, ActivityInfo } from "../../CustomTypes";

export const ActivityList: React.FC = () => {
  const router = useRouter();
  const { tripId } = router.query as { tripId: string };
  const [curTripData, setTripData] = useState<TripCardData>();

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
        console.error("Error fetching trip data:", error);
      }
    };

    if (tripId) {
      fetchTripData();
    }
  }, [tripId]); // Add router.query.tripId to the dependency array

  return (
    <div className={styles.Container}>
      {curTripData && <TripCard key={tripId?.toString()} {...curTripData} />}
      {curTripData && (
        <SearchBar
          trip_destination={curTripData.trip_dest}
          trip_id={tripId}
        ></SearchBar>
      )}
      {curTripData?.activities && Object.values(curTripData.activities).map((activity, index) => (
        <ActivityCard key={index} {...activity} />
      ))}
    </div>
  );
};

export default ActivityList;
