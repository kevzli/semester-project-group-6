import { React, useEffect, useState } from "react";
import { Dialog, DialogTitle, Button } from "@mui/material";
import {
  LocalizationProvider,
  DateCalendar,
} from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { ref, getDatabase, push } from "firebase/database";
import { auth } from "../firebase/firebase";
import { useAuth } from "../firebase/auth";

export default function Trips() {
  const [tripTitle, setTripTitle] = useState("");
  // const [notes, setNotes] = useState([]);
  // const [selectedNote, setSelectedNote] = useState(null);
  const [isTripModalOpen, setTripModal] = useState(false);
  const [tripDates, setTripDates] = useState(null);

  const { authUser } = useAuth();
  const db = getDatabase();
  const tripDatabaseRef = ref(db, "trips/");
  const openTripModal = () => {
    setTripModal(!isTripModalOpen);
  };

  const handleAddTrip = () => {
    if (!tripTitle.trim()) {
      alert("Please enter a valid trip title");
      return;
    }

    // Use the push method to generate a unique key for the new trip
    const newTripRef = push(tripDatabaseRef, {
      trip_name: tripTitle,
      trip_owner: authUser,
    });
    console.log(tripDates);
    setTripTitle("");
    setTripModal(false);
  };

  return (
    <>
      <button onClick={openTripModal}>Add Trip</button>

      <Dialog open={isTripModalOpen} onClose={openTripModal} className>
        <DialogTitle> Create New Trip</DialogTitle>
        <div className="Trip-Container">
          <input
            value={tripTitle}
            onChange={(e) => setTripTitle(e.target.value)}
            placeholder="Trip Title"
            className="trip-title-input"
          />
          <LocalizationProvider dateAdapter= {AdapterDayjs}>
            <DateCalendar
              value={tripDates}
              onChange={(newValue) => setTripDates(newValue)}
            />
          </LocalizationProvider>

          <Button variant="contained" size="large" onClick={handleAddTrip}>
            Add Trip
          </Button>
        </div>
      </Dialog>
    </>
  );
}
